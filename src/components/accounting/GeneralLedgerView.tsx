import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { Download, Search, Filter } from "lucide-react";
import { Account } from "@/types/journalEntry";

interface LedgerEntry {
  id: string;
  date: string;
  reference: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
}

interface AccountLedger {
  account: Account;
  entries: LedgerEntry[];
  openingBalance: number;
  closingBalance: number;
}

interface GeneralLedgerViewProps {
  accounts: Account[];
  onExport: () => void;
  onPrint: () => void;
}

export default function GeneralLedgerView({
  accounts,
  onExport,
  onPrint,
}: GeneralLedgerViewProps) {
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      .toISOString()
      .split("T")[0],
    end: new Date().toISOString().split("T")[0],
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Mock ledger data for demonstration
  const mockLedgerData: Record<string, LedgerEntry[]> = {
    a1: [
      {
        id: "l1",
        date: "2023-07-01",
        reference: "JV-2307-0001",
        description: "Pembelian peralatan kantor",
        debit: 5000000,
        credit: 0,
        balance: 5000000,
      },
      {
        id: "l2",
        date: "2023-07-20",
        reference: "JV-2307-0004",
        description: "Pembelian komputer",
        debit: 8000000,
        credit: 0,
        balance: 13000000,
      },
    ],
    a2: [
      {
        id: "l3",
        date: "2023-07-01",
        reference: "JV-2307-0001",
        description: "Pembelian peralatan kantor",
        debit: 0,
        credit: 5000000,
        balance: -5000000,
      },
      {
        id: "l4",
        date: "2023-07-10",
        reference: "JV-2307-0002",
        description: "Pembayaran gaji karyawan",
        debit: 0,
        credit: 15000000,
        balance: -20000000,
      },
      {
        id: "l5",
        date: "2023-07-05",
        reference: "JV-2307-0003",
        description: "Penerimaan setoran anggota",
        debit: 7500000,
        credit: 0,
        balance: -12500000,
      },
      {
        id: "l6",
        date: "2023-07-20",
        reference: "JV-2307-0004",
        description: "Pembelian komputer",
        debit: 0,
        credit: 8000000,
        balance: -20500000,
      },
    ],
    a3: [
      {
        id: "l7",
        date: "2023-07-10",
        reference: "JV-2307-0002",
        description: "Pembayaran gaji karyawan",
        debit: 15000000,
        credit: 0,
        balance: 15000000,
      },
    ],
    a4: [
      {
        id: "l8",
        date: "2023-07-05",
        reference: "JV-2307-0003",
        description: "Penerimaan setoran anggota",
        debit: 0,
        credit: 7500000,
        balance: 7500000,
      },
    ],
  };

  // Get the selected account's ledger
  const getAccountLedger = (accountId: string): AccountLedger | null => {
    const account = accounts.find((a) => a.id === accountId);
    if (!account) return null;

    const entries = mockLedgerData[accountId] || [];

    // Filter entries by date range and search term
    const filteredEntries = entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);

      const matchesDate = entryDate >= startDate && entryDate <= endDate;

      const matchesSearch =
        searchTerm === "" ||
        entry.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesDate && matchesSearch;
    });

    // Calculate opening and closing balances
    const openingBalance =
      account.balance -
      entries.reduce((sum, entry) => sum + (entry.debit - entry.credit), 0);
    const closingBalance = account.balance;

    return {
      account,
      entries: filteredEntries,
      openingBalance,
      closingBalance,
    };
  };

  const selectedLedger = selectedAccount
    ? getAccountLedger(selectedAccount)
    : null;

  const handleExport = () => {
    if (!selectedLedger) {
      alert("Pilih akun terlebih dahulu");
      return;
    }

    onExport();
  };

  const handlePrint = () => {
    if (!selectedLedger) {
      alert("Pilih akun terlebih dahulu");
      return;
    }

    onPrint();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-4 flex-grow">
          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pilih Akun
            </label>
            <select
              className="w-full border rounded-md px-3 py-2"
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
            >
              <option value="">-- Pilih Akun --</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.code} - {account.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Mulai
            </label>
            <Input
              type="date"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
            />
          </div>

          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Akhir
            </label>
            <Input
              type="date"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex gap-2 items-end">
          <Button
            variant="outline"
            onClick={handleExport}
            className="flex items-center gap-2"
          >
            <Download size={16} />
            <span>Export</span>
          </Button>
          <Button onClick={handlePrint}>Cetak</Button>
        </div>
      </div>

      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
        <Input
          className="pl-10"
          placeholder="Cari berdasarkan referensi atau deskripsi"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {selectedLedger ? (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 p-4 border-b">
            <h3 className="text-lg font-medium">
              {selectedLedger.account.code} - {selectedLedger.account.name}
            </h3>
            <p className="text-sm text-gray-500">
              Jenis: {getAccountTypeLabel(selectedLedger.account.type)}
            </p>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Referensi</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead className="text-right">Debit (Rp)</TableHead>
                <TableHead className="text-right">Kredit (Rp)</TableHead>
                <TableHead className="text-right">Saldo (Rp)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} className="font-medium">
                  Saldo Awal
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(selectedLedger.openingBalance)}
                </TableCell>
              </TableRow>

              {selectedLedger.entries.length > 0 ? (
                selectedLedger.entries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{formatDate(entry.date)}</TableCell>
                    <TableCell>{entry.reference}</TableCell>
                    <TableCell>{entry.description}</TableCell>
                    <TableCell className="text-right">
                      {entry.debit > 0 ? formatCurrency(entry.debit) : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      {entry.credit > 0 ? formatCurrency(entry.credit) : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(entry.balance)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    Tidak ada transaksi dalam periode ini
                  </TableCell>
                </TableRow>
              )}

              <TableRow className="bg-gray-50">
                <TableCell colSpan={5} className="font-medium">
                  Saldo Akhir
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(selectedLedger.closingBalance)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg bg-gray-50">
          <p className="text-gray-500">Pilih akun untuk melihat buku besar</p>
        </div>
      )}
    </div>
  );
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getAccountTypeLabel(type: Account["type"]): string {
  switch (type) {
    case "asset":
      return "Aset";
    case "liability":
      return "Kewajiban";
    case "equity":
      return "Ekuitas";
    case "revenue":
      return "Pendapatan";
    case "expense":
      return "Beban";
    default:
      return type;
  }
}
