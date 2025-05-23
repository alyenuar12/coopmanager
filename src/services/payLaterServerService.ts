// This file contains server-side functions for the Pay Later service
// These functions should only be imported in Server Components

import { createClient } from "../../supabase/server";

/**
 * Process a scheduled payment for a Pay Later installment (Server-side version)
 * @param installmentId ID of the installment to process
 * @returns Updated installment with new status
 */
export async function processScheduledPaymentServer(
  installmentId: string,
): Promise<{ success: boolean; message: string; status: string }> {
  const supabase = await createClient();

  try {
    // First, get the installment details
    const { data: installment, error: fetchError } = await supabase
      .from("pay_later_installments")
      .select("*, pay_later_applications(user_id, amount)")
      .eq("id", installmentId)
      .single();

    if (fetchError || !installment) {
      throw new Error(`Installment not found: ${fetchError?.message}`);
    }

    // Process payment (in a real app, this would integrate with a payment gateway)
    // For now, we'll simulate a successful payment 90% of the time
    const isSuccessful = Math.random() > 0.1;

    if (!isSuccessful) {
      return {
        success: false,
        message: "Payment processing failed. Please try again.",
        status: "pending",
      };
    }

    // Update the installment status
    const { error: updateError } = await supabase
      .from("pay_later_installments")
      .update({
        status: "paid",
        payment_date: new Date().toISOString(),
        payment_method: "automatic",
        transaction_id: `txn_${Date.now()}`,
        updated_at: new Date().toISOString(),
      })
      .eq("id", installmentId);

    if (updateError) {
      throw new Error(`Failed to update installment: ${updateError.message}`);
    }

    // Record the payment in loan_payments table
    const { error: paymentError } = await supabase
      .from("loan_payments")
      .insert({
        loan_id: installment.application_id,
        user_id: installment.pay_later_applications.user_id,
        amount: installment.amount,
        payment_date: new Date().toISOString(),
        payment_method: "Pay Later",
        installment_number: installment.installment_number,
        transaction_id: `txn_${Date.now()}`,
        status: "Completed",
        is_late: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

    if (paymentError) {
      console.error("Failed to record payment:", paymentError);
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
 * Cancel a scheduled payment (Server-side version)
 * @param installmentId ID of the installment to cancel
 * @returns Result of the cancellation
 */
export async function cancelScheduledPaymentServer(
  installmentId: string,
): Promise<{ success: boolean; message: string; status: string }> {
  const supabase = await createClient();

  try {
    // Update the installment status
    const { error } = await supabase
      .from("pay_later_installments")
      .update({
        status: "cancelled",
        updated_at: new Date().toISOString(),
      })
      .eq("id", installmentId);

    if (error) {
      throw new Error(`Failed to cancel payment: ${error.message}`);
    }

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
