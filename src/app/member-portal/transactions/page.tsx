import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TransactionsPage() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold tracking-tight">Transaksi</h1>

      <Card>
        <CardHeader>
          <CardTitle>Transaksi Terbaru</CardTitle>
          <CardDescription>
            Lihat transaksi rekening terbaru Anda
          </CardDescription>
          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <Input placeholder="Cari transaksi..." className="max-w-sm" />
            <div className="flex items-center gap-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Semua rekening" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua rekening</SelectItem>
                  <SelectItem value="savings">Rekening Tabungan</SelectItem>
                  <SelectItem value="loan">Rekening Pinjaman</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="30 hari terakhir" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 hari terakhir</SelectItem>
                  <SelectItem value="60">60 hari terakhir</SelectItem>
                  <SelectItem value="90">90 hari terakhir</SelectItem>
                  <SelectItem value="year">Tahun ini</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">Filter</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Rekening</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Saldo</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  date: "2023-07-01",
                  desc: "Setoran Tabungan",
                  account: "Tabungan",
                  amount: "+Rp7.500.000",
                  balance: "Rp37.500.000",
                  status: "Selesai",
                },
                {
                  date: "2023-06-28",
                  desc: "Pembayaran Pinjaman",
                  account: "Pinjaman",
                  amount: "-Rp5.250.000",
                  balance: "Rp69.750.000",
                  status: "Selesai",
                },
                {
                  date: "2023-06-25",
                  desc: "Kredit Bunga",
                  account: "Tabungan",
                  amount: "+Rp187.500",
                  balance: "Rp30.000.000",
                  status: "Selesai",
                },
                {
                  date: "2023-06-20",
                  desc: "Setoran Tabungan",
                  account: "Tabungan",
                  amount: "+Rp7.500.000",
                  balance: "Rp29.812.500",
                  status: "Selesai",
                },
                {
                  date: "2023-06-15",
                  desc: "Pembayaran Pinjaman",
                  account: "Pinjaman",
                  amount: "-Rp5.250.000",
                  balance: "Rp75.000.000",
                  status: "Selesai",
                },
              ].map((tx, i) => (
                <TableRow key={i}>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell>{tx.desc}</TableCell>
                  <TableCell>{tx.account}</TableCell>
                  <TableCell
                    className={
                      tx.amount.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {tx.amount}
                  </TableCell>
                  <TableCell>{tx.balance}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                      {tx.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-center mt-4">
            <Button variant="outline">Muat Lebih Banyak</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Unduh Laporan</CardTitle>
            <CardDescription>Unduh laporan rekening Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Laporan Juni 2023</p>
                  <p className="text-sm text-muted-foreground">
                    Semua rekening
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Unduh
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Laporan Mei 2023</p>
                  <p className="text-sm text-muted-foreground">
                    Semua rekening
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Unduh
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Laporan April 2023</p>
                  <p className="text-sm text-muted-foreground">
                    Semua rekening
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Unduh
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analitik Transaksi</CardTitle>
            <CardDescription>Lihat pola pengeluaran Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center border rounded-md">
              <p className="text-muted-foreground">
                Grafik analitik transaksi akan ditampilkan di sini
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
