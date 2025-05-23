"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import JournalEntryList from "@/components/accounting/JournalEntryList";
import NewJournalEntryDialog from "@/components/accounting/NewJournalEntryDialog";
import GeneralLedgerView from "@/components/accounting/GeneralLedgerView";
import FinancialStatementView from "@/components/accounting/FinancialStatementView";
import { JournalEntry, Account } from "@/types/journalEntry";

// Mock data for journal entries
const mockJournalEntries: JournalEntry[] = [
  {
    id: "j1",
    date: "2023-07-15",
    reference: "JV-2307-0001",
    description: "Pembelian peralatan kantor",
    status: "posted",
    created_at: "2023-07-15T10:00:00Z",
    updated_at: "2023-07-15T10:00:00Z",
    created_by: "user1",
    entries: [
      {
        id: "jl1",
        journal_entry_id: "j1",
        account_id: "a1",
        account_name: "Peralatan Kantor",
        debit: 5000000,
        credit: 0,
        description: "Pembelian meja dan kursi",
      },
      {
        id: "jl2",
        journal_entry_id: "j1",
        account_id: "a2",
        account_name: "Kas",
        debit: 0,
        credit: 5000000,
        description: "Pembayaran tunai",
      },
    ],
  },
  {
    id: "j2",
    date: "2023-07-10",
    reference: "JV-2307-0002",
    description: "Pembayaran gaji karyawan",
    status: "posted",
    created_at: "2023-07-10T09:30:00Z",
    updated_at: "2023-07-10T09:30:00Z",
    created_by: "user1",
    entries: [
      {
        id: "jl3",
        journal_entry_id: "j2",
        account_id: "a3",
        account_name: "Beban Gaji",
        debit: 15000000,
        credit: 0,
        description: "Gaji bulan Juli",
      },
      {
        id: "jl4",
        journal_entry_id: "j2",
        account_id: "a2",
        account_name: "Kas",
        debit: 0,
        credit: 15000000,
        description: "Pembayaran gaji",
      },
    ],
  },
  {
    id: "j3",
    date: "2023-07-05",
    reference: "JV-2307-0003",
    description: "Penerimaan setoran anggota",
    status: "draft",
    created_at: "2023-07-05T14:20:00Z",
    updated_at: "2023-07-05T14:20:00Z",
    created_by: "user1",
    entries: [
      {
        id: "jl5",
        journal_entry_id: "j3",
        account_id: "a2",
        account_name: "Kas",
        debit: 7500000,
        credit: 0,
        description: "Setoran anggota",
      },
      {
        id: "jl6",
        journal_entry_id: "j3",
        account_id: "a4",
        account_name: "Simpanan Anggota",
        debit: 0,
        credit: 7500000,
        description: "Setoran simpanan",
      },
    ],
  },
];

// Mock data for accounts
const mockAccounts: Account[] = [
  {
    id: "a1",
    code: "1001",
    name: "Peralatan Kantor",
    type: "asset",
    balance: 13000000,
    is_active: true,
  },
  {
    id: "a2",
    code: "1002",
    name: "Kas",
    type: "asset",
    balance: 29500000,
    is_active: true,
  },
  {
    id: "a3",
    code: "5001",
    name: "Beban Gaji",
    type: "expense",
    balance: 15000000,
    is_active: true,
  },
  {
    id: "a4",
    code: "2001",
    name: "Simpanan Anggota",
    type: "liability",
    balance: -7500000,
    is_active: true,
  },
  {
    id: "a5",
    code: "4001",
    name: "Pendapatan Bunga",
    type: "revenue",
    balance: -8500000,
    is_active: true,
  },
  {
    id: "a6",
    code: "5002",
    name: "Beban Operasional",
    type: "expense",
    balance: 3500000,
    is_active: true,
  },
  {
    id: "a7",
    code: "1003",
    name: "Piutang Anggota",
    type: "asset",
    balance: 45000000,
    is_active: true,
  },
  {
    id: "a8",
    code: "2002",
    name: "Hutang Bank",
    type: "liability",
    balance: -35000000,
    is_active: true,
  },
  {
    id: "a9",
    code: "3001",
    name: "Modal Anggota",
    type: "equity",
    balance: -55000000,
    is_active: true,
  },
  {
    id: "a10",
    code: "4002",
    name: "Pendapatan Jasa",
    type: "revenue",
    balance: -12500000,
    is_active: true,
  },
];

// Journal Entries Content Component
function JournalEntriesContent() {
  const [entries, setEntries] = useState<JournalEntry[]>(mockJournalEntries);
  const [isNewEntryDialogOpen, setIsNewEntryDialogOpen] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<JournalEntry | undefined>(
    undefined,
  );

  const handleNewEntry = () => {
    setCurrentEntry(undefined);
    setIsNewEntryDialogOpen(true);
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setCurrentEntry(entry);
    setIsNewEntryDialogOpen(true);
  };

  const handleVoidEntry = (entry: JournalEntry) => {
    if (
      confirm(`Apakah Anda yakin ingin membatalkan jurnal ${entry.reference}?`)
    ) {
      const updatedEntries = entries.map((e) =>
        e.id === entry.id ? { ...e, status: "voided" as const } : e,
      );
      setEntries(updatedEntries);
    }
  };

  const handleSaveEntry = (
    entryData: Omit<
      JournalEntry,
      "id" | "created_at" | "updated_at" | "created_by"
    >,
  ) => {
    if (currentEntry) {
      // Update existing entry
      const updatedEntries = entries.map((e) =>
        e.id === currentEntry.id
          ? {
              ...currentEntry,
              ...entryData,
              updated_at: new Date().toISOString(),
            }
          : e,
      );
      setEntries(updatedEntries);
    } else {
      // Create new entry
      const newEntry: JournalEntry = {
        id: `j${entries.length + 1}`,
        ...entryData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: "current_user",
        entries: entryData.entries.map((line, index) => ({
          ...line,
          id: `jl${entries.reduce((acc, e) => acc + e.entries.length, 0) + index + 1}`,
          journal_entry_id: `j${entries.length + 1}`,
        })),
      };
      setEntries([newEntry, ...entries]);
    }
  };

  const handleExport = () => {
    // In a real app, this would generate a CSV or Excel file
    const headers = [
      "Reference",
      "Date",
      "Description",
      "Status",
      "Debit Total",
      "Credit Total",
    ];

    const csvContent = [
      headers.join(","),
      ...entries.map((entry) => {
        const totalDebit = entry.entries.reduce(
          (sum, line) => sum + line.debit,
          0,
        );
        const totalCredit = entry.entries.reduce(
          (sum, line) => sum + line.credit,
          0,
        );

        return [
          entry.reference,
          entry.date,
          `"${entry.description}"`,
          entry.status,
          totalDebit,
          totalCredit,
        ].join(",");
      }),
    ].join("\n");

    // Create a Blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `journal_entries_${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <JournalEntryList
        entries={entries}
        onNewEntry={handleNewEntry}
        onEditEntry={handleEditEntry}
        onVoidEntry={handleVoidEntry}
        onExport={handleExport}
      />

      <NewJournalEntryDialog
        isOpen={isNewEntryDialogOpen}
        onOpenChange={setIsNewEntryDialogOpen}
        onSave={handleSaveEntry}
        accounts={mockAccounts}
        initialData={currentEntry}
      />
    </>
  );
}

// General Ledger Content Component
function GeneralLedgerContent({ accounts }: { accounts: Account[] }) {
  const handleExport = () => {
    // In a real app, this would generate a CSV or Excel file
    const headers = [
      "Date",
      "Reference",
      "Description",
      "Debit",
      "Credit",
      "Balance",
    ];

    const csvContent = [
      headers.join(","),
      // Sample data for export
      "2023-07-01,JV-2307-0001,Pembelian peralatan kantor,5000000,0,5000000",
      "2023-07-20,JV-2307-0004,Pembelian komputer,8000000,0,13000000",
    ].join("\n");

    // Create a Blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `general_ledger_${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    // In a real app, this would generate a printable view
    window.print();
  };

  return (
    <GeneralLedgerView
      accounts={accounts}
      onExport={handleExport}
      onPrint={handlePrint}
    />
  );
}

// Financial Statements Content Component
function FinancialStatementsContent({ accounts }: { accounts: Account[] }) {
  const [activeStatement, setActiveStatement] = useState<
    "income" | "balance" | "cashflow" | "trial"
  >("income");

  const handleExport = () => {
    // In a real app, this would generate a CSV or Excel file
    const headers = ["Account", "Description", "Amount"];

    const csvContent = [
      headers.join(","),
      // Sample data for export
      "Revenue,Sales Revenue,21000000",
      "Expense,Operating Expenses,18500000",
      "Profit,Net Income,2500000",
    ].join("\n");

    // Create a Blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `${activeStatement}_statement_${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    // In a real app, this would generate a printable view
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button
          variant={activeStatement === "income" ? "default" : "outline"}
          className="h-20 text-lg justify-start px-4"
          onClick={() => setActiveStatement("income")}
        >
          <div className="text-left">
            <div className="font-medium">Laporan Laba Rugi</div>
            <div className="text-sm text-muted-foreground">
              Pendapatan, beban, dan laba
            </div>
          </div>
        </Button>
        <Button
          variant={activeStatement === "balance" ? "default" : "outline"}
          className="h-20 text-lg justify-start px-4"
          onClick={() => setActiveStatement("balance")}
        >
          <div className="text-left">
            <div className="font-medium">Neraca</div>
            <div className="text-sm text-muted-foreground">
              Aset, kewajiban, dan ekuitas
            </div>
          </div>
        </Button>
        <Button
          variant={activeStatement === "cashflow" ? "default" : "outline"}
          className="h-20 text-lg justify-start px-4"
          onClick={() => setActiveStatement("cashflow")}
        >
          <div className="text-left">
            <div className="font-medium">Laporan Arus Kas</div>
            <div className="text-sm text-muted-foreground">
              Arus kas masuk dan keluar
            </div>
          </div>
        </Button>
        <Button
          variant={activeStatement === "trial" ? "default" : "outline"}
          className="h-20 text-lg justify-start px-4"
          onClick={() => setActiveStatement("trial")}
        >
          <div className="text-left">
            <div className="font-medium">Neraca Saldo</div>
            <div className="text-sm text-muted-foreground">
              Saldo debit dan kredit
            </div>
          </div>
        </Button>
      </div>

      <div className="mt-6">
        <FinancialStatementView
          accounts={accounts}
          statementType={activeStatement}
          onExport={handleExport}
          onPrint={handlePrint}
        />
      </div>
    </div>
  );
}

export default function AccountingPage() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Accounting</h1>
      </div>

      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-4">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="journal">Journal Entries</TabsTrigger>
          <TabsTrigger value="ledger">General Ledger</TabsTrigger>
          <TabsTrigger value="statements">Financial Statements</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                View and manage all financial transactions
              </CardDescription>
              <div className="flex items-center gap-2 pt-2">
                <Input
                  placeholder="Search transactions..."
                  className="max-w-sm"
                />
                <Button variant="outline">Filter</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead>Debit</TableHead>
                    <TableHead>Credit</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3, 4, 5].map((item) => (
                    <TableRow key={item}>
                      <TableCell>{new Date().toLocaleDateString()}</TableCell>
                      <TableCell>TRX-{1000 + item}</TableCell>
                      <TableCell>Member Deposit</TableCell>
                      <TableCell>Cash Account</TableCell>
                      <TableCell>$1,000.00</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="journal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Journal Entries</CardTitle>
              <CardDescription>Record and view journal entries</CardDescription>
            </CardHeader>
            <CardContent>
              <JournalEntriesContent />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ledger" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Ledger</CardTitle>
              <CardDescription>
                View the general ledger accounts and transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GeneralLedgerContent accounts={mockAccounts} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Statements</CardTitle>
              <CardDescription>
                Generate and view financial statements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FinancialStatementsContent accounts={mockAccounts} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
