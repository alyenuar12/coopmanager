-- Create superadmin user with password in auth.users table
DO $$
DECLARE
  superadmin_uuid UUID := gen_random_uuid(); -- Generate a random UUID
BEGIN
  -- Check if superadmin user already exists in auth.users
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'superadmin@gmail.com') THEN
    -- Insert superadmin user into auth.users
    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      role,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      superadmin_uuid,
      '00000000-0000-0000-0000-000000000000',
      'superadmin@gmail.com',
      crypt('Admin123!', gen_salt('bf')),
      now(),
      now(),
      now(),
      '{"provider":"email","providers":["email"],"role":"admin"}'::jsonb,
      '{"name":"Super Admin"}'::jsonb,
      now(),
      now(),
      'authenticated',
      '',
      '',
      '',
      ''
    );

    -- Check if superadmin user already exists in public.users
    IF NOT EXISTS (SELECT 1 FROM public.users WHERE id = superadmin_uuid) THEN
      -- Insert superadmin user into public.users
      INSERT INTO public.users (
        id,
        email,
        full_name,
        name,
        role,
        created_at,
        updated_at,
        is_active,
        user_id,
        token_identifier
      ) VALUES (
        superadmin_uuid,
        'superadmin@gmail.com',
        'Super Admin',
        'Super Admin',
        'admin',
        now(),
        now(),
        true,
        superadmin_uuid,
        superadmin_uuid
      );
    END IF;
  END IF;
END
$$;

-- Complete the database schema for all cooperative functions

-- Create savings_accounts table if not exists
CREATE TABLE IF NOT EXISTS public.savings_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id),
  product_id UUID REFERENCES public.savings_products(id),
  account_number TEXT NOT NULL UNIQUE,
  balance DECIMAL(12,2) NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  opened_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  maturity_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create savings_transactions table if not exists
CREATE TABLE IF NOT EXISTS public.savings_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id),
  amount DECIMAL(12,2) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('DEPOSIT', 'WITHDRAWAL', 'INTEREST', 'FEE')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create loans table if not exists
CREATE TABLE IF NOT EXISTS public.loans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id),
  product_id UUID REFERENCES public.loan_products(id),
  loan_number TEXT NOT NULL UNIQUE,
  principal_amount DECIMAL(12,2) NOT NULL,
  interest_rate DECIMAL(5,2) NOT NULL,
  term_period INTEGER NOT NULL,
  term_unit TEXT NOT NULL CHECK (term_unit IN ('DAY', 'WEEK', 'MONTH', 'YEAR')),
  status TEXT NOT NULL CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED', 'ACTIVE', 'PAID', 'DEFAULTED')),
  disbursement_date TIMESTAMP WITH TIME ZONE,
  maturity_date TIMESTAMP WITH TIME ZONE,
  total_repayment DECIMAL(12,2) NOT NULL,
  remaining_balance DECIMAL(12,2) NOT NULL,
  next_payment_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create loan_installments table if not exists
CREATE TABLE IF NOT EXISTS public.loan_installments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  loan_id UUID NOT NULL REFERENCES public.loans(id),
  user_id UUID NOT NULL REFERENCES public.users(id),
  installment_number INTEGER NOT NULL,
  due_date TIMESTAMP WITH TIME ZONE NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  principal DECIMAL(12,2) NOT NULL,
  interest DECIMAL(12,2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('PENDING', 'PAID', 'LATE', 'DEFAULTED')),
  payment_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create loan_payments table if not exists
CREATE TABLE IF NOT EXISTS public.loan_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  loan_id UUID NOT NULL REFERENCES public.loans(id),
  user_id UUID NOT NULL REFERENCES public.users(id),
  amount DECIMAL(12,2) NOT NULL,
  payment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  payment_method TEXT NOT NULL,
  installment_number INTEGER,
  transaction_id TEXT,
  status TEXT NOT NULL CHECK (status IN ('PENDING', 'COMPLETED', 'FAILED')),
  scheduled_date TIMESTAMP WITH TIME ZONE,
  is_late BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create notifications table if not exists
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('INFO', 'WARNING', 'ERROR', 'SUCCESS')),
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create accounting_accounts table if not exists
CREATE TABLE IF NOT EXISTS public.accounting_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_number TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE')),
  category TEXT NOT NULL,
  balance DECIMAL(12,2) NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create journal_entries table if not exists (if not already created)
CREATE TABLE IF NOT EXISTS public.journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_number TEXT NOT NULL UNIQUE,
  transaction_date TIMESTAMP WITH TIME ZONE NOT NULL,
  description TEXT,
  status TEXT NOT NULL CHECK (status IN ('DRAFT', 'POSTED', 'VOIDED')),
  created_by UUID REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create journal_entry_items table if not exists (if not already created)
CREATE TABLE IF NOT EXISTS public.journal_entry_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  journal_entry_id UUID NOT NULL REFERENCES public.journal_entries(id),
  account_id UUID NOT NULL REFERENCES public.accounting_accounts(id),
  debit DECIMAL(12,2) NOT NULL DEFAULT 0,
  credit DECIMAL(12,2) NOT NULL DEFAULT 0,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CHECK (debit >= 0 AND credit >= 0),
  CHECK ((debit = 0 AND credit > 0) OR (credit = 0 AND debit > 0))
);

-- Create pay_later_applications table if not exists
CREATE TABLE IF NOT EXISTS public.pay_later_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id),
  amount DECIMAL(12,2) NOT NULL,
  term INTEGER NOT NULL,
  purpose TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED', 'ACTIVE', 'COMPLETED')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create pay_later_installments table if not exists
CREATE TABLE IF NOT EXISTS public.pay_later_installments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES public.pay_later_applications(id),
  user_id UUID NOT NULL REFERENCES public.users(id),
  installment_number INTEGER NOT NULL,
  due_date TIMESTAMP WITH TIME ZONE NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  principal DECIMAL(12,2) NOT NULL,
  interest DECIMAL(12,2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('PENDING', 'PAID', 'LATE', 'DEFAULTED')),
  payment_date TIMESTAMP WITH TIME ZONE,
  payment_method TEXT,
  transaction_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable row level security for new tables
ALTER TABLE public.savings_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.savings_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loan_installments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loan_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accounting_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pay_later_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pay_later_installments ENABLE ROW LEVEL SECURITY;

-- Create policies for new tables
-- Admin policies
CREATE POLICY "Admins can do everything" ON public.savings_accounts FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admins can do everything" ON public.savings_transactions FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admins can do everything" ON public.loans FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admins can do everything" ON public.loan_installments FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admins can do everything" ON public.loan_payments FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admins can do everything" ON public.notifications FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admins can do everything" ON public.accounting_accounts FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admins can do everything" ON public.pay_later_applications FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admins can do everything" ON public.pay_later_installments FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');

-- Member policies (users can only see their own data)
CREATE POLICY "Users can view their own savings accounts" ON public.savings_accounts FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own savings transactions" ON public.savings_transactions FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own loans" ON public.loans FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own loan installments" ON public.loan_installments FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own loan payments" ON public.loan_payments FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own notifications" ON public.notifications FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own pay later applications" ON public.pay_later_applications FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own pay later installments" ON public.pay_later_installments FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Add realtime for new tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.savings_accounts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.savings_transactions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.loans;
ALTER PUBLICATION supabase_realtime ADD TABLE public.loan_installments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.loan_payments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.accounting_accounts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.pay_later_applications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.pay_later_installments;