import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreditCard, Download, Plus, Upload } from "lucide-react";

export default function SavingsPage() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Tabungan Saya</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">Unduh Laporan</Button>
          <Button>Transaksi Baru</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-blue-50">
          <CardHeader className="pb-2">
            <CardTitle>Tabungan Reguler</CardTitle>
            <CardDescription>Rekening tabungan utama</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Rp35.525.000</div>
            <p className="text-sm text-muted-foreground mt-2">
              Suku bunga 2,5%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Dana Darurat</CardTitle>
            <CardDescription>Tabungan hari hujan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Rp17.400.000</div>
            <p className="text-sm text-muted-foreground mt-2">
              Suku bunga 1,75%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Tabungan Liburan</CardTitle>
            <CardDescription>Tabungan tujuan khusus</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Rp10.875.000</div>
            <p className="text-sm text-muted-foreground mt-2">
              Suku bunga 2,0%
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaksi Terbaru</CardTitle>
          <CardDescription>Transaksi tabungan terbaru Anda</CardDescription>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  date: "2023-07-01",
                  desc: "Setoran",
                  account: "Tabungan Reguler",
                  amount: "+Rp2.900.000",
                  balance: "Rp35.525.000",
                },
                {
                  date: "2023-06-25",
                  desc: "Kredit Bunga",
                  account: "Tabungan Reguler",
                  amount: "+Rp181.250",
                  balance: "Rp32.625.000",
                },
                {
                  date: "2023-06-20",
                  desc: "Setoran",
                  account: "Dana Darurat",
                  amount: "+Rp1.450.000",
                  balance: "Rp17.400.000",
                },
                {
                  date: "2023-06-15",
                  desc: "Setoran",
                  account: "Tabungan Liburan",
                  amount: "+Rp725.000",
                  balance: "Rp10.875.000",
                },
                {
                  date: "2023-06-10",
                  desc: "Setoran",
                  account: "Tabungan Reguler",
                  amount: "+Rp2.900.000",
                  balance: "Rp32.443.750",
                },
              ].map((tx, i) => (
                <TableRow key={i}>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell>{tx.desc}</TableCell>
                  <TableCell>{tx.account}</TableCell>
                  <TableCell className="text-green-600">{tx.amount}</TableCell>
                  <TableCell>{tx.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Buat Setoran</CardTitle>
            <CardDescription>
              Tambahkan dana ke rekening tabungan Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="account">Pilih Rekening</Label>
                <select className="w-full p-2 border rounded-md">
                  <option>Tabungan Reguler</option>
                  <option>Dana Darurat</option>
                  <option>Tabungan Liburan</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Jumlah</Label>
                <Input id="amount" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Catatan (Opsional)</Label>
                <Input
                  id="notes"
                  placeholder="Tambahkan catatan untuk transaksi ini"
                />
              </div>
              <Button className="w-full">Kirim Permintaan Setoran</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Target Tabungan</CardTitle>
            <CardDescription>
              Lacak kemajuan Anda menuju target tabungan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Dana Liburan</span>
                  <span>Rp10.875.000 / Rp29.000.000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: "37.5%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Mobil Baru</span>
                  <span>Rp50.750.000 / Rp145.000.000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: "35%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Uang Muka Rumah</span>
                  <span>Rp174.000.000 / Rp725.000.000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: "24%" }}
                  ></div>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Tambah Target Baru
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
