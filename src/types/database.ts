export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          avatar_url: string | null;
          user_id: string;
          token_identifier: string;
          image: string | null;
          created_at: string;
          updated_at: string | null;
          email: string | null;
          name: string | null;
          full_name: string | null;
          is_active: boolean;
          role: string;
          credit_score: number | null;
          credit_limit: number | null;
          credit_score_updated_at: string | null;
          payment_terms: number[] | null;
        };
        Insert: {
          id: string;
          avatar_url?: string | null;
          user_id: string;
          token_identifier: string;
          image?: string | null;
          created_at: string;
          updated_at?: string | null;
          email?: string | null;
          name?: string | null;
          full_name?: string | null;
          is_active?: boolean;
          role?: string;
          credit_score?: number | null;
          credit_limit?: number | null;
          credit_score_updated_at?: string | null;
          payment_terms?: number[] | null;
        };
        Update: {
          id?: string;
          avatar_url?: string | null;
          user_id?: string;
          token_identifier?: string;
          image?: string | null;
          created_at?: string;
          updated_at?: string | null;
          email?: string | null;
          name?: string | null;
          full_name?: string | null;
          is_active?: boolean;
          role?: string;
          credit_score?: number | null;
          credit_limit?: number | null;
          credit_score_updated_at?: string | null;
          payment_terms?: number[] | null;
        };
      };
      members: {
        Row: {
          id: string;
          name: string;
          email: string | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      inventory: {
        Row: {
          id: string;
          name: string;
          category: string;
          quantity: number;
          unit_price: number;
          total_value: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category?: string;
          quantity?: number;
          unit_price?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string;
          quantity?: number;
          unit_price?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      pay_later_applications: {
        Row: {
          id: string;
          user_id: string;
          amount: number;
          term: number;
          purpose: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          amount: number;
          term: number;
          purpose: string;
          status: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          amount?: number;
          term?: number;
          purpose?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      pay_later_installments: {
        Row: {
          id: string;
          application_id: string;
          user_id: string;
          installment_number: number;
          due_date: string;
          amount: number;
          principal: number;
          interest: number;
          status: string;
          payment_date: string | null;
          payment_method: string | null;
          transaction_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          application_id: string;
          user_id: string;
          installment_number: number;
          due_date: string;
          amount: number;
          principal: number;
          interest: number;
          status: string;
          payment_date?: string | null;
          payment_method?: string | null;
          transaction_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          application_id?: string;
          user_id?: string;
          installment_number?: number;
          due_date?: string;
          amount?: number;
          principal?: number;
          interest?: number;
          status?: string;
          payment_date?: string | null;
          payment_method?: string | null;
          transaction_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      savings_transactions: {
        Row: {
          id: string;
          user_id: string;
          amount: number;
          type: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          amount: number;
          type: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          amount?: number;
          type?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      loan_payments: {
        Row: {
          id: string;
          loan_id: string;
          user_id: string;
          amount: number;
          payment_date: string;
          payment_method: string;
          installment_number: number | null;
          transaction_id: string | null;
          status: string;
          scheduled_date: string | null;
          is_late: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          loan_id: string;
          user_id: string;
          amount: number;
          payment_date: string;
          payment_method: string;
          installment_number?: number | null;
          transaction_id?: string | null;
          status: string;
          scheduled_date?: string | null;
          is_late?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          loan_id?: string;
          user_id?: string;
          amount?: number;
          payment_date?: string;
          payment_method?: string;
          installment_number?: number | null;
          transaction_id?: string | null;
          status?: string;
          scheduled_date?: string | null;
          is_late?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      savings_products: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          interest_rate: number;
          minimum_balance: number;
          term_period: number | null;
          term_unit: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          interest_rate: number;
          minimum_balance: number;
          term_period?: number | null;
          term_unit?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          interest_rate?: number;
          minimum_balance?: number;
          term_period?: number | null;
          term_unit?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      savings_accounts: {
        Row: {
          id: string;
          user_id: string;
          product_id: string | null;
          account_number: string;
          balance: number;
          is_active: boolean;
          opened_date: string;
          maturity_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id?: string | null;
          account_number: string;
          balance?: number;
          is_active?: boolean;
          opened_date?: string;
          maturity_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_id?: string | null;
          account_number?: string;
          balance?: number;
          is_active?: boolean;
          opened_date?: string;
          maturity_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      loan_products: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          interest_rate: number;
          term_period: number;
          term_unit: string;
          minimum_amount: number;
          maximum_amount: number;
          processing_fee: number;
          late_payment_fee: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          interest_rate: number;
          term_period: number;
          term_unit: string;
          minimum_amount: number;
          maximum_amount: number;
          processing_fee?: number;
          late_payment_fee?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          interest_rate?: number;
          term_period?: number;
          term_unit?: string;
          minimum_amount?: number;
          maximum_amount?: number;
          processing_fee?: number;
          late_payment_fee?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      loans: {
        Row: {
          id: string;
          user_id: string;
          product_id: string | null;
          loan_number: string;
          principal_amount: number;
          interest_rate: number;
          term_period: number;
          term_unit: string;
          status: string;
          disbursement_date: string | null;
          maturity_date: string | null;
          total_repayment: number;
          remaining_balance: number;
          next_payment_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id?: string | null;
          loan_number: string;
          principal_amount: number;
          interest_rate: number;
          term_period: number;
          term_unit: string;
          status: string;
          disbursement_date?: string | null;
          maturity_date?: string | null;
          total_repayment: number;
          remaining_balance: number;
          next_payment_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_id?: string | null;
          loan_number?: string;
          principal_amount?: number;
          interest_rate?: number;
          term_period?: number;
          term_unit?: string;
          status?: string;
          disbursement_date?: string | null;
          maturity_date?: string | null;
          total_repayment?: number;
          remaining_balance?: number;
          next_payment_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      loan_installments: {
        Row: {
          id: string;
          loan_id: string;
          user_id: string;
          installment_number: number;
          due_date: string;
          amount: number;
          principal: number;
          interest: number;
          status: string;
          payment_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          loan_id: string;
          user_id: string;
          installment_number: number;
          due_date: string;
          amount: number;
          principal: number;
          interest: number;
          status: string;
          payment_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          loan_id?: string;
          user_id?: string;
          installment_number?: number;
          due_date?: string;
          amount?: number;
          principal?: number;
          interest?: number;
          status?: string;
          payment_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      accounting_accounts: {
        Row: {
          id: string;
          account_number: string;
          name: string;
          type: string;
          category: string;
          balance: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          account_number: string;
          name: string;
          type: string;
          category: string;
          balance?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          account_number?: string;
          name?: string;
          type?: string;
          category?: string;
          balance?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      journal_entries: {
        Row: {
          id: string;
          entry_number: string;
          transaction_date: string;
          description: string | null;
          status: string;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          entry_number: string;
          transaction_date: string;
          description?: string | null;
          status: string;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          entry_number?: string;
          transaction_date?: string;
          description?: string | null;
          status?: string;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      journal_entry_items: {
        Row: {
          id: string;
          journal_entry_id: string;
          account_id: string;
          debit: number;
          credit: number;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          journal_entry_id: string;
          account_id: string;
          debit?: number;
          credit?: number;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          journal_entry_id?: string;
          account_id?: string;
          debit?: number;
          credit?: number;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: string;
          is_read: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          message: string;
          type: string;
          is_read?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          message?: string;
          type?: string;
          is_read?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
