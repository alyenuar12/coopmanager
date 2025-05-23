-- Add credit score fields to users table
ALTER TABLE users
ADD COLUMN IF NOT EXISTS credit_score INTEGER,
ADD COLUMN IF NOT EXISTS credit_limit NUMERIC(10, 2),
ADD COLUMN IF NOT EXISTS credit_score_updated_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS payment_terms INTEGER[];

-- Create pay_later_applications table
CREATE TABLE IF NOT EXISTS pay_later_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  amount NUMERIC(10, 2) NOT NULL,
  term INTEGER NOT NULL,
  purpose TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create pay_later_installments table
CREATE TABLE IF NOT EXISTS pay_later_installments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL REFERENCES pay_later_applications(id),
  user_id UUID NOT NULL REFERENCES users(id),
  installment_number INTEGER NOT NULL,
  due_date TIMESTAMP WITH TIME ZONE NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  principal NUMERIC(10, 2) NOT NULL,
  interest NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL,
  payment_date TIMESTAMP WITH TIME ZONE,
  payment_method TEXT,
  transaction_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create savings_transactions table if it doesn't exist
CREATE TABLE IF NOT EXISTS savings_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  amount NUMERIC(10, 2) NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create loan_payments table if it doesn't exist
CREATE TABLE IF NOT EXISTS loan_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  loan_id UUID NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id),
  amount NUMERIC(10, 2) NOT NULL,
  payment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  payment_method TEXT NOT NULL,
  installment_number INTEGER,
  transaction_id TEXT,
  status TEXT NOT NULL,
  scheduled_date TIMESTAMP WITH TIME ZONE,
  is_late BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable row level security
ALTER TABLE pay_later_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE pay_later_installments ENABLE ROW LEVEL SECURITY;
ALTER TABLE savings_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE loan_payments ENABLE ROW LEVEL SECURITY;

-- Create policies for pay_later_applications
DROP POLICY IF EXISTS "Users can view their own applications" ON pay_later_applications;
CREATE POLICY "Users can view their own applications"
  ON pay_later_applications FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all applications" ON pay_later_applications;
CREATE POLICY "Admins can view all applications"
  ON pay_later_applications FOR ALL
  USING (true);

-- Create policies for pay_later_installments
DROP POLICY IF EXISTS "Users can view their own installments" ON pay_later_installments;
CREATE POLICY "Users can view their own installments"
  ON pay_later_installments FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all installments" ON pay_later_installments;
CREATE POLICY "Admins can view all installments"
  ON pay_later_installments FOR ALL
  USING (true);

-- Enable realtime for these tables
alter publication supabase_realtime add table pay_later_applications;
alter publication supabase_realtime add table pay_later_installments;
alter publication supabase_realtime add table savings_transactions;
alter publication supabase_realtime add table loan_payments;