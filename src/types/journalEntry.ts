export interface JournalEntry {
  id: string;
  date: string;
  reference: string;
  description: string;
  entries: JournalEntryLine[];
  status: "draft" | "posted" | "voided";
  created_at: string;
  updated_at: string;
  created_by: string;
}

export interface JournalEntryLine {
  id: string;
  journal_entry_id: string;
  account_id: string;
  account_name: string;
  debit: number;
  credit: number;
  description?: string;
}

export interface Account {
  id: string;
  code: string;
  name: string;
  type: "asset" | "liability" | "equity" | "revenue" | "expense";
  balance: number;
  is_active: boolean;
}
