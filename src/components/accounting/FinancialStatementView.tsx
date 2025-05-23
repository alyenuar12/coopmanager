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
import { Download, Printer, Calendar } from "lucide-react";
import { Account } from "@/types/journalEntry";

type StatementType = "income" | "balance" | "cashflow" | "trial";

interface FinancialStatementViewProps {
  accounts: Account[];
  statementType: StatementType;
  onExport: () => void;
  onPrint: () => void;
}

export default function FinancialStatementView({
  accounts,
  statementType,
  onExport,
  onPrint,
}: FinancialStatementViewProps) {
  const [period, setPeriod] = useState<{ start: string; end: string }>({
    start: new Date(new Date().getFullYear(), 0, 1).toISOString().split("T")[0], // January 1st of current year
    end: new Date().toISOString().split("T")[0], // Today
  });

  // Get statement title based on type
  const getStatementTitle = () => {
    switch (statementType) {
      case "income":
        return "Laporan Laba Rugi";
      case "balance":
        return "Neraca";
      case "cashflow":
        return "Laporan Arus Kas";
      case "trial":
        return "Neraca Saldo";
      default:
        return "Laporan Keuangan";
    }
  };

  // Get statement description based on type
  const getStatementDescription = () => {
    switch (statementType) {
      case "income":
        return "Pendapatan, beban, dan laba bersih";
      case "balance":
        return "Aset, kewajiban, dan ekuitas";
      case "cashflow":
        return "Arus kas masuk dan keluar";
      case "trial":
        return "Saldo debit dan kredit untuk semua akun";
      default:
        return "";
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Render income statement
  const renderIncomeStatement = () => {
    // Mock data for income statement
    const revenueAccounts = accounts.filter((a) => a.type === "revenue");
    const expenseAccounts = accounts.filter((a) => a.type === "expense");

    const totalRevenue = revenueAccounts.reduce(
      (sum, account) => sum + Math.abs(account.balance),
      0,
    );
    const totalExpenses = expenseAccounts.reduce(
      (sum, account) => sum + Math.abs(account.balance),
      0,
    );
    const netIncome = totalRevenue - totalExpenses;

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Koperasi XYZ</h2>
          <h3 className="text-xl font-semibold">{getStatementTitle()}</h3>
          <p className="text-gray-500">
            Untuk periode {formatDate(period.start)} sampai{" "}
            {formatDate(period.end)}
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Pendapatan</h4>
          <Table>
            <TableBody>
              {revenueAccounts.length > 0 ? (
                revenueAccounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell>{account.name}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(Math.abs(account.balance))}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center">
                    Tidak ada data pendapatan
                  </TableCell>
                </TableRow>
              )}
              <TableRow className="font-medium">
                <TableCell>Total Pendapatan</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(totalRevenue)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Beban</h4>
          <Table>
            <TableBody>
              {expenseAccounts.length > 0 ? (
                expenseAccounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell>{account.name}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(Math.abs(account.balance))}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center">
                    Tidak ada data beban
                  </TableCell>
                </TableRow>
              )}
              <TableRow className="font-medium">
                <TableCell>Total Beban</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(totalExpenses)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="border-t-2 pt-4">
          <Table>
            <TableBody>
              <TableRow className="font-bold text-lg">
                <TableCell>Laba Bersih</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(netIncome)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    );
  };

  // Render balance sheet
  const renderBalanceSheet = () => {
    // Mock data for balance sheet
    const assetAccounts = accounts.filter((a) => a.type === "asset");
    const liabilityAccounts = accounts.filter((a) => a.type === "liability");
    const equityAccounts = accounts.filter((a) => a.type === "equity");

    const totalAssets = assetAccounts.reduce(
      (sum, account) => sum + Math.abs(account.balance),
      0,
    );
    const totalLiabilities = liabilityAccounts.reduce(
      (sum, account) => sum + Math.abs(account.balance),
      0,
    );
    const totalEquity = equityAccounts.reduce(
      (sum, account) => sum + Math.abs(account.balance),
      0,
    );

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Koperasi XYZ</h2>
          <h3 className="text-xl font-semibold">{getStatementTitle()}</h3>
          <p className="text-gray-500">Per tanggal {formatDate(period.end)}</p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Aset</h4>
          <Table>
            <TableBody>
              {assetAccounts.length > 0 ? (
                assetAccounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell>{account.name}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(Math.abs(account.balance))}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center">
                    Tidak ada data aset
                  </TableCell>
                </TableRow>
              )}
              <TableRow className="font-medium">
                <TableCell>Total Aset</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(totalAssets)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Kewajiban</h4>
          <Table>
            <TableBody>
              {liabilityAccounts.length > 0 ? (
                liabilityAccounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell>{account.name}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(Math.abs(account.balance))}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center">
                    Tidak ada data kewajiban
                  </TableCell>
                </TableRow>
              )}
              <TableRow className="font-medium">
                <TableCell>Total Kewajiban</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(totalLiabilities)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Ekuitas</h4>
          <Table>
            <TableBody>
              {equityAccounts.length > 0 ? (
                equityAccounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell>{account.name}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(Math.abs(account.balance))}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center">
                    Tidak ada data ekuitas
                  </TableCell>
                </TableRow>
              )}
              <TableRow className="font-medium">
                <TableCell>Total Ekuitas</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(totalEquity)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="border-t-2 pt-4">
          <Table>
            <TableBody>
              <TableRow className="font-bold text-lg">
                <TableCell>Total Kewajiban dan Ekuitas</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(totalLiabilities + totalEquity)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    );
  };

  // Render cash flow statement
  const renderCashFlowStatement = () => {
    // Mock data for cash flow statement
    const operatingActivities = [
      { description: "Penerimaan dari anggota", amount: 75000000 },
      { description: "Pembayaran kepada pemasok", amount: -25000000 },
      { description: "Pembayaran gaji karyawan", amount: -15000000 },
      { description: "Pembayaran bunga", amount: -2500000 },
      { description: "Pembayaran pajak", amount: -5000000 },
    ];

    const investingActivities = [
      { description: "Pembelian peralatan", amount: -13000000 },
      { description: "Penjualan investasi", amount: 5000000 },
    ];

    const financingActivities = [
      { description: "Penerimaan dari pinjaman", amount: 20000000 },
      { description: "Pembayaran dividen", amount: -7500000 },
    ];

    const netOperating = operatingActivities.reduce(
      (sum, item) => sum + item.amount,
      0,
    );
    const netInvesting = investingActivities.reduce(
      (sum, item) => sum + item.amount,
      0,
    );
    const netFinancing = financingActivities.reduce(
      (sum, item) => sum + item.amount,
      0,
    );
    const netCashFlow = netOperating + netInvesting + netFinancing;

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Koperasi XYZ</h2>
          <h3 className="text-xl font-semibold">{getStatementTitle()}</h3>
          <p className="text-gray-500">
            Untuk periode {formatDate(period.start)} sampai{" "}
            {formatDate(period.end)}
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Aktivitas Operasi</h4>
          <Table>
            <TableBody>
              {operatingActivities.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.amount)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="font-medium">
                <TableCell>Kas Bersih dari Aktivitas Operasi</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(netOperating)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Aktivitas Investasi</h4>
          <Table>
            <TableBody>
              {investingActivities.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.amount)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="font-medium">
                <TableCell>Kas Bersih dari Aktivitas Investasi</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(netInvesting)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Aktivitas Pendanaan</h4>
          <Table>
            <TableBody>
              {financingActivities.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.amount)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="font-medium">
                <TableCell>Kas Bersih dari Aktivitas Pendanaan</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(netFinancing)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="border-t-2 pt-4">
          <Table>
            <TableBody>
              <TableRow className="font-medium">
                <TableCell>Kenaikan (Penurunan) Bersih Kas</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(netCashFlow)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Kas Awal Periode</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(50000000)}
                </TableCell>
              </TableRow>
              <TableRow className="font-bold text-lg">
                <TableCell>Kas Akhir Periode</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(50000000 + netCashFlow)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    );
  };

  // Render trial balance
  const renderTrialBalance = () => {
    // Group accounts by type for trial balance
    const accountsByType = accounts.reduce(
      (acc, account) => {
        if (!acc[account.type]) {
          acc[account.type] = [];
        }
        acc[account.type].push(account);
        return acc;
      },
      {} as Record<string, Account[]>,
    );

    // Calculate totals
    let totalDebit = 0;
    let totalCredit = 0;

    accounts.forEach((account) => {
      if (account.balance > 0) {
        totalDebit += account.balance;
      } else {
        totalCredit += Math.abs(account.balance);
      }
    });

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Koperasi XYZ</h2>
          <h3 className="text-xl font-semibold">{getStatementTitle()}</h3>
          <p className="text-gray-500">Per tanggal {formatDate(period.end)}</p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kode</TableHead>
              <TableHead>Nama Akun</TableHead>
              <TableHead className="text-right">Debit (Rp)</TableHead>
              <TableHead className="text-right">Kredit (Rp)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell>{account.code}</TableCell>
                <TableCell>{account.name}</TableCell>
                <TableCell className="text-right">
                  {account.balance > 0 ? formatCurrency(account.balance) : "-"}
                </TableCell>
                <TableCell className="text-right">
                  {account.balance < 0
                    ? formatCurrency(Math.abs(account.balance))
                    : "-"}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="font-bold">
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className="text-right">
                {formatCurrency(totalDebit)}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(totalCredit)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  };

  // Render the appropriate statement based on type
  const renderStatement = () => {
    switch (statementType) {
      case "income":
        return renderIncomeStatement();
      case "balance":
        return renderBalanceSheet();
      case "cashflow":
        return renderCashFlowStatement();
      case "trial":
        return renderTrialBalance();
      default:
        return <div>Pilih jenis laporan</div>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-4 flex-grow">
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Mulai
            </label>
            <Input
              type="date"
              value={period.start}
              onChange={(e) => setPeriod({ ...period, start: e.target.value })}
            />
          </div>
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Akhir
            </label>
            <Input
              type="date"
              value={period.end}
              onChange={(e) => setPeriod({ ...period, end: e.target.value })}
            />
          </div>
        </div>
        <div className="flex gap-2 items-end">
          <Button
            variant="outline"
            onClick={onExport}
            className="flex items-center gap-2"
          >
            <Download size={16} />
            <span>Export</span>
          </Button>
          <Button onClick={onPrint} className="flex items-center gap-2">
            <Printer size={16} />
            <span>Cetak</span>
          </Button>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6">{renderStatement()}</div>
    </div>
  );
}
