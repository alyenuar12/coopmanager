import { createClient } from "../../supabase/server";
import { Database } from "@/types/supabase";

export interface CreditScoreFactors {
  savingsHistory: number; // 0-100
  loanRepaymentHistory: number; // 0-100
  transactionConsistency: number; // 0-100
  membershipDuration: number; // in months
}

export interface CreditScoreResult {
  score: number; // 300-850 range
  creditLimit: number;
  paymentTerms: number[]; // Available payment terms in months [1, 3, 6]
  factors: CreditScoreFactors;
  lastUpdated: Date;
}

/**
 * Calculate credit score based on member's financial behavior
 * @param userId The user ID to calculate credit score for
 * @returns CreditScoreResult with score and credit limit
 */
export async function calculateCreditScore(
  userId: string,
): Promise<CreditScoreResult> {
  const supabase = await createClient();

  // Get user's savings history
  const { data: savingsData } = await supabase
    .from("savings_transactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  // Get user's loan repayment history
  const { data: loanData } = await supabase
    .from("loan_payments")
    .select("*")
    .eq("user_id", userId)
    .order("payment_date", { ascending: false });

  // Get user's membership information
  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  // Calculate factors (simplified version - would be more complex in production)
  const factors: CreditScoreFactors = {
    savingsHistory: calculateSavingsScore(savingsData || []),
    loanRepaymentHistory: calculateLoanRepaymentScore(loanData || []),
    transactionConsistency: calculateTransactionConsistency(savingsData || []),
    membershipDuration: calculateMembershipDuration(
      userData?.created_at || new Date().toISOString(),
    ),
  };

  // Calculate overall score (300-850 range)
  const score = calculateOverallScore(factors);

  // Determine credit limit based on score
  const creditLimit = determineCreditLimit(score, factors);

  // Determine available payment terms
  const paymentTerms = determinePaymentTerms(score);

  // Update user's credit score in the database
  await updateUserCreditScore(userId, score, creditLimit);

  return {
    score,
    creditLimit,
    paymentTerms,
    factors,
    lastUpdated: new Date(),
  };
}

/**
 * Update user's credit score in the database
 */
async function updateUserCreditScore(
  userId: string,
  score: number,
  creditLimit: number,
): Promise<void> {
  const supabase = await createClient();

  await supabase
    .from("users")
    .update({
      credit_score: score,
      credit_limit: creditLimit,
      credit_score_updated_at: new Date().toISOString(),
    })
    .eq("id", userId);
}

/**
 * Calculate score based on savings history
 */
function calculateSavingsScore(savingsData: any[]): number {
  if (!savingsData.length) return 0;

  // Calculate total savings amount
  const totalSavings = savingsData.reduce((sum, transaction) => {
    return transaction.type === "deposit" ? sum + transaction.amount : sum;
  }, 0);

  // Calculate consistency of deposits
  const regularDeposits = savingsData.filter(
    (t) => t.type === "deposit",
  ).length;

  // Score based on total savings and consistency (simplified)
  let score =
    Math.min(totalSavings / 1000, 80) + Math.min(regularDeposits * 2, 20);
  return Math.min(Math.round(score), 100);
}

/**
 * Calculate score based on loan repayment history
 */
function calculateLoanRepaymentScore(loanData: any[]): number {
  if (!loanData.length) return 50; // Neutral score if no loan history

  // Count on-time payments vs late payments
  const totalPayments = loanData.length;
  const onTimePayments = loanData.filter((payment) => !payment.is_late).length;

  // Calculate score based on payment reliability
  return Math.round((onTimePayments / totalPayments) * 100);
}

/**
 * Calculate transaction consistency score
 */
function calculateTransactionConsistency(transactions: any[]): number {
  if (!transactions.length) return 0;

  // Simplified: Look at frequency of transactions
  const monthlyTransactions = groupTransactionsByMonth(transactions);
  const consistencyScore =
    calculateConsistencyFromMonthlyData(monthlyTransactions);

  return Math.min(Math.round(consistencyScore), 100);
}

/**
 * Group transactions by month for consistency analysis
 */
function groupTransactionsByMonth(transactions: any[]): Record<string, number> {
  const monthlyData: Record<string, number> = {};

  transactions.forEach((transaction) => {
    const date = new Date(transaction.created_at);
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = 0;
    }
    monthlyData[monthKey]++;
  });

  return monthlyData;
}

/**
 * Calculate consistency score from monthly transaction data
 */
function calculateConsistencyFromMonthlyData(
  monthlyData: Record<string, number>,
): number {
  const months = Object.keys(monthlyData);
  if (months.length <= 1) return 50;

  const values = Object.values(monthlyData);
  const average = values.reduce((sum, val) => sum + val, 0) / values.length;

  // Calculate standard deviation to measure consistency
  const variance =
    values.reduce((sum, val) => sum + Math.pow(val - average, 2), 0) /
    values.length;
  const stdDev = Math.sqrt(variance);

  // Lower standard deviation means more consistent behavior
  const consistencyScore = 100 - Math.min((stdDev / average) * 100, 50);
  return consistencyScore;
}

/**
 * Calculate membership duration score
 */
function calculateMembershipDuration(createdAt: string): number {
  const memberSince = new Date(createdAt);
  const now = new Date();

  // Calculate months of membership
  const months =
    (now.getFullYear() - memberSince.getFullYear()) * 12 +
    (now.getMonth() - memberSince.getMonth());

  return months;
}

/**
 * Calculate overall credit score
 */
function calculateOverallScore(factors: CreditScoreFactors): number {
  // Weights for different factors
  const weights = {
    savingsHistory: 0.3,
    loanRepaymentHistory: 0.4,
    transactionConsistency: 0.2,
    membershipDuration: 0.1,
  };

  // Calculate weighted score (base 100)
  const baseScore =
    factors.savingsHistory * weights.savingsHistory +
    factors.loanRepaymentHistory * weights.loanRepaymentHistory +
    factors.transactionConsistency * weights.transactionConsistency +
    Math.min((factors.membershipDuration / 24) * 100, 100) *
      weights.membershipDuration;

  // Convert to 300-850 scale
  return Math.round(300 + (baseScore / 100) * 550);
}

/**
 * Determine credit limit based on score and factors
 */
function determineCreditLimit(
  score: number,
  factors: CreditScoreFactors,
): number {
  // Base credit limit on score
  let baseLimit = 0;

  if (score < 580) {
    baseLimit = 0; // No credit
  } else if (score < 670) {
    baseLimit = 500; // Low credit
  } else if (score < 740) {
    baseLimit = 1000; // Medium credit
  } else if (score < 800) {
    baseLimit = 2000; // Good credit
  } else {
    baseLimit = 5000; // Excellent credit
  }

  // Adjust based on savings history (simplified)
  const savingsMultiplier = 1 + factors.savingsHistory / 100;

  return Math.round(baseLimit * savingsMultiplier);
}

/**
 * Determine available payment terms based on credit score
 */
function determinePaymentTerms(score: number): number[] {
  if (score < 580) return [];
  if (score < 670) return [1];
  if (score < 740) return [1, 3];
  return [1, 3, 6];
}
