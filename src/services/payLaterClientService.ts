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
