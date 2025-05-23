export interface Loan {
  id: string;
  userId: string;
  loanType: LoanType;
  principal: number;
  outstandingAmount: number;
  interestRate: number;
  term: number; // in months
  nextPaymentDate: Date;
  status: LoanStatus;
  paymentSchedule: PaymentSchedule;
  paymentMethod: PaymentMethod;
  createdAt: Date;
  updatedAt: Date;
}

export enum LoanType {
  PERSONAL = "Personal Loan",
  BUSINESS = "Business Loan",
  HOME_IMPROVEMENT = "Home Improvement",
  EDUCATION = "Education Loan",
  EMERGENCY = "Emergency Loan",
}

export enum LoanStatus {
  PENDING = "Pending Review",
  UNDER_EVALUATION = "Under Evaluation",
  DOCUMENT_VERIFICATION = "Document Verification",
  APPROVED = "Approved",
  DISBURSED = "Disbursed",
  CURRENT = "Current",
  OVERDUE = "Overdue",
  PAID = "Paid",
  REJECTED = "Rejected",
  CANCELLED = "Cancelled",
}

export enum PaymentMethod {
  CASH = "Cash",
  BANK_TRANSFER = "Bank Transfer",
  DEDUCTION = "Savings Deduction",
  QRIS = "QRIS",
  VIRTUAL_ACCOUNT = "Virtual Account",
  PAY_LATER = "Pay Later",
}

export interface PaymentSchedule {
  installments: LoanInstallment[];
  totalPayments: number;
  totalInterest: number;
  firstPaymentDate: Date;
  lastPaymentDate: Date;
}

export interface LoanInstallment {
  installmentNumber: number;
  dueDate: Date;
  amount: number;
  principal: number;
  interest: number;
  status: InstallmentStatus;
  paymentDate?: Date;
  paymentMethod?: PaymentMethod;
  transactionId?: string;
}

export enum InstallmentStatus {
  PENDING = "Pending",
  PAID = "Paid",
  OVERDUE = "Overdue",
  SCHEDULED = "Scheduled",
}

export interface LoanApplication {
  id: string;
  userId: string;
  loanType: LoanType;
  amount: number;
  purpose: string;
  term: number; // in months
  status: LoanStatus;
  paymentMethod: PaymentMethod;
  documents: LoanDocument[];
  createdAt: Date;
  updatedAt: Date;
}

export interface LoanDocument {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: Date;
}

export interface LoanPayment {
  id: string;
  loanId: string;
  userId: string;
  amount: number;
  paymentDate: Date;
  paymentMethod: PaymentMethod;
  installmentNumber?: number;
  transactionId?: string;
  status: "Pending" | "Completed" | "Failed";
  scheduledDate?: Date; // For Pay Later scheduled payments
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Calculate loan installment plan
 * @param principal Loan principal amount
 * @param interestRate Annual interest rate (decimal)
 * @param term Loan term in months
 * @returns Payment schedule with installments
 */
export function calculateLoanSchedule(
  principal: number,
  interestRate: number,
  term: number,
): PaymentSchedule {
  const monthlyRate = interestRate / 12;
  const monthlyPayment =
    (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));

  const installments: LoanInstallment[] = [];
  let remainingPrincipal = principal;
  let totalInterest = 0;

  const firstPaymentDate = new Date();
  firstPaymentDate.setDate(1); // First day of next month
  firstPaymentDate.setMonth(firstPaymentDate.getMonth() + 1);

  const lastPaymentDate = new Date(firstPaymentDate);
  lastPaymentDate.setMonth(lastPaymentDate.getMonth() + term - 1);

  for (let i = 1; i <= term; i++) {
    const interestPayment = remainingPrincipal * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    remainingPrincipal -= principalPayment;
    totalInterest += interestPayment;

    const dueDate = new Date(firstPaymentDate);
    dueDate.setMonth(firstPaymentDate.getMonth() + i - 1);

    installments.push({
      installmentNumber: i,
      dueDate,
      amount: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      status: InstallmentStatus.PENDING,
    });
  }

  return {
    installments,
    totalPayments: monthlyPayment * term,
    totalInterest,
    firstPaymentDate,
    lastPaymentDate,
  };
}

/**
 * Check if a loan payment is eligible for Pay Later
 * @param loanId Loan ID
 * @param amount Payment amount
 * @param creditLimit User's credit limit
 * @returns Eligibility status
 */
export function isEligibleForPayLater(
  loanId: string,
  amount: number,
  creditLimit: number,
): boolean {
  // Basic eligibility check
  return amount <= creditLimit && amount > 0;
}
