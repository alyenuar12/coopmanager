import { createClient } from "../../supabase/client";
import { calculateCreditScore } from "./creditScoring";

export interface PayLaterOptions {
  userId: string;
  amount: number;
  term: number; // in months
  purpose: string;
}

export interface InstallmentPlan {
  totalAmount: number;
  term: number; // in months
  monthlyPayment: number;
  interestRate: number;
  totalInterest: number;
  installments: Installment[];
}

export interface Installment {
  installmentNumber: number;
  dueDate: Date;
  amount: number;
  principal: number;
  interest: number;
  status: "pending" | "paid" | "overdue";
}

export interface PayLaterApplication {
  id: string;
  userId: string;
  amount: number;
  term: number;
  purpose: string;
  status: "pending" | "approved" | "rejected";
  installmentPlan?: InstallmentPlan;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Check if a user is eligible for Pay Later
 * @param userId User ID to check eligibility for
 * @returns Eligibility status and credit limit
 */
export async function checkEligibility(
  userId: string,
): Promise<{ eligible: boolean; creditLimit: number; paymentTerms: number[] }> {
  // Calculate credit score to determine eligibility
  const creditScore = await calculateCreditScore(userId);

  return {
    eligible: creditScore.score >= 580, // Minimum score for eligibility
    creditLimit: creditScore.creditLimit,
    paymentTerms: creditScore.paymentTerms,
  };
}

/**
 * Create a Pay Later application
 * @param options Pay Later application options
 * @returns Created application with status
 */
export async function createPayLaterApplication(
  options: PayLaterOptions,
): Promise<PayLaterApplication> {
  const supabase = createClient();

  // Check eligibility first
  const { eligible, creditLimit } = await checkEligibility(options.userId);

  if (!eligible) {
    throw new Error("User is not eligible for Pay Later");
  }

  if (options.amount > creditLimit) {
    throw new Error(`Amount exceeds credit limit of ${creditLimit}`);
  }

  // Create application record
  const { data, error } = await supabase
    .from("pay_later_applications")
    .insert({
      user_id: options.userId,
      amount: options.amount,
      term: options.term,
      purpose: options.purpose,
      status: "pending",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create Pay Later application: ${error.message}`);
  }

  return {
    id: data.id,
    userId: data.user_id,
    amount: data.amount,
    term: data.term,
    purpose: data.purpose,
    status: data.status,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
  };
}

/**
 * Generate an installment plan for a Pay Later application
 * @param amount Total amount to finance
 * @param term Term in months
 * @returns Installment plan with payment schedule
 */
export function generateInstallmentPlan(
  amount: number,
  term: number,
): InstallmentPlan {
  // Calculate interest rate based on term
  const interestRate = getInterestRateForTerm(term);

  // Calculate monthly payment (simplified formula)
  const monthlyInterestRate = interestRate / 12;
  const monthlyPayment =
    (amount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -term));

  // Calculate total interest
  const totalPayment = monthlyPayment * term;
  const totalInterest = totalPayment - amount;

  // Generate installment schedule
  const installments: Installment[] = [];
  let remainingPrincipal = amount;

  for (let i = 1; i <= term; i++) {
    const interestPayment = remainingPrincipal * monthlyInterestRate;
    const principalPayment = monthlyPayment - interestPayment;
    remainingPrincipal -= principalPayment;

    const dueDate = new Date();
    dueDate.setMonth(dueDate.getMonth() + i);

    installments.push({
      installmentNumber: i,
      dueDate,
      amount: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      status: "pending",
    });
  }

  return {
    totalAmount: amount,
    term,
    monthlyPayment,
    interestRate,
    totalInterest,
    installments,
  };
}

/**
 * Get interest rate based on term length
 * @param term Term in months
 * @returns Annual interest rate
 */
function getInterestRateForTerm(term: number): number {
  switch (term) {
    case 1:
      return 0.08; // 8% for 1 month
    case 3:
      return 0.1; // 10% for 3 months
    case 6:
      return 0.12; // 12% for 6 months
    default:
      return 0.15; // Default rate
  }
}

/**
 * Approve a Pay Later application
 * @param applicationId Application ID to approve
 * @returns Updated application
 */
export async function approvePayLaterApplication(
  applicationId: string,
): Promise<PayLaterApplication> {
  const supabase = createClient();

  // Get application details
  const { data: application, error: fetchError } = await supabase
    .from("pay_later_applications")
    .select("*")
    .eq("id", applicationId)
    .single();

  if (fetchError || !application) {
    throw new Error(`Application not found: ${fetchError?.message}`);
  }

  // Generate installment plan
  const installmentPlan = generateInstallmentPlan(
    application.amount,
    application.term,
  );

  // Update application status
  const { data: updatedApplication, error: updateError } = await supabase
    .from("pay_later_applications")
    .update({
      status: "approved",
      updated_at: new Date().toISOString(),
    })
    .eq("id", applicationId)
    .select()
    .single();

  if (updateError) {
    throw new Error(`Failed to approve application: ${updateError.message}`);
  }

  // Create installment records
  const installmentRecords = installmentPlan.installments.map(
    (installment) => ({
      application_id: applicationId,
      user_id: application.user_id,
      installment_number: installment.installmentNumber,
      due_date: installment.dueDate.toISOString(),
      amount: installment.amount,
      principal: installment.principal,
      interest: installment.interest,
      status: installment.status,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }),
  );

  const { error: installmentError } = await supabase
    .from("pay_later_installments")
    .insert(installmentRecords);

  if (installmentError) {
    throw new Error(
      `Failed to create installment records: ${installmentError.message}`,
    );
  }

  return {
    id: updatedApplication.id,
    userId: updatedApplication.user_id,
    amount: updatedApplication.amount,
    term: updatedApplication.term,
    purpose: updatedApplication.purpose,
    status: updatedApplication.status,
    installmentPlan,
    createdAt: new Date(updatedApplication.created_at),
    updatedAt: new Date(updatedApplication.updated_at),
  };
}

/**
 * Get all Pay Later applications for a user
 * @param userId User ID to get applications for
 * @returns List of applications
 */
export async function getUserPayLaterApplications(
  userId: string,
): Promise<PayLaterApplication[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("pay_later_applications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch applications: ${error.message}`);
  }

  return (data || []).map((app) => ({
    id: app.id,
    userId: app.user_id,
    amount: app.amount,
    term: app.term,
    purpose: app.purpose,
    status: app.status,
    createdAt: new Date(app.created_at),
    updatedAt: new Date(app.updated_at),
  }));
}

/**
 * Get all installments for a Pay Later application
 * @param applicationId Application ID to get installments for
 * @returns List of installments
 */
export async function getApplicationInstallments(
  applicationId: string,
): Promise<Installment[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("pay_later_installments")
    .select("*")
    .eq("application_id", applicationId)
    .order("installment_number", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch installments: ${error.message}`);
  }

  return (data || []).map((inst) => ({
    installmentNumber: inst.installment_number,
    dueDate: new Date(inst.due_date),
    amount: inst.amount,
    principal: inst.principal,
    interest: inst.interest,
    status: inst.status,
  }));
}

/**
 * Process a scheduled payment for a Pay Later installment
 * Client-side wrapper that calls the server action
 * @param installmentId ID of the installment to process
 * @returns Updated installment with new status
 */
export async function processScheduledPayment(
  installmentId: string,
): Promise<{ success: boolean; message: string; status: string }> {
  try {
    // In a real implementation, this would call a server action
    // For now, we'll simulate a successful payment 90% of the time
    const isSuccessful = Math.random() > 0.1;

    if (!isSuccessful) {
      return {
        success: false,
        message: "Payment processing failed. Please try again.",
        status: "pending",
      };
    }

    return {
      success: true,
      message: "Payment processed successfully.",
      status: "paid",
    };
  } catch (error) {
    console.error("Error processing payment:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
      status: "pending",
    };
  }
}

/**
 * Cancel a scheduled payment
 * Client-side wrapper that calls the server action
 * @param installmentId ID of the installment to cancel
 * @returns Result of the cancellation
 */
export async function cancelScheduledPayment(
  installmentId: string,
): Promise<{ success: boolean; message: string; status: string }> {
  try {
    // In a real implementation, this would call a server action
    // For now, we'll simulate a successful cancellation
    return {
      success: true,
      message: "Payment cancelled successfully.",
      status: "cancelled",
    };
  } catch (error) {
    console.error("Error cancelling payment:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
      status: "pending",
    };
  }
}
