import { useState } from "react";
import { Account } from "@/types/journalEntry";
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
import { Search } from "lucide-react";

interface AccountsListProps {
  accounts: Account[];
  onAddAccount: () => void;
  onEditAccount: (account: Account) => void;
}

export default function AccountsList({
  accounts,
  onAddAccount,
  onEditAccount,
}: AccountsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [accountType, setAccountType] = useState("all");

  // Filter accounts based on search term and type
  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch =
      searchTerm === "" ||
      account.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = accountType === "all" || account.type === accountType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex-grow">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            className="pl-10"
            placeholder="Cari akun berdasarkan kode atau nama"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select
            className="border rounded-md px-3 py-2"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
          >
            <option value="all">Semua Jenis</option>
            <option value="asset">Aset</option>
            <option value="liability">Kewajiban</option>
            <option value="equity">Ekuitas</option>
            <option value="revenue">Pendapatan</option>
            <option value="expense">Beban</option>
          </select>
          <Button onClick={onAddAccount}>Akun Baru</Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kode</TableHead>
            <TableHead>Nama Akun</TableHead>
            <TableHead>Jenis</TableHead>
            <TableHead className="text-right">Saldo (Rp)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAccounts.length > 0 ? (
            filteredAccounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell className="font-medium">{account.code}</TableCell>
                <TableCell>{account.name}</TableCell>
                <TableCell>{getAccountTypeLabel(account.type)}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(account.balance)}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      account.is_active
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {account.is_active ? "Aktif" : "Tidak Aktif"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditAccount(account)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                Tidak ada akun ditemukan
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
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
