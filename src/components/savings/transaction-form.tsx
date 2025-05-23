import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TransactionFormProps {
  member: string;
  type: "Setoran" | "Penarikan" | "Bunga";
  amount: string;
  onMemberChange: (value: string) => void;
  onTypeChange: (value: "Setoran" | "Penarikan" | "Bunga") => void;
  onAmountChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function TransactionForm({
  member,
  type,
  amount,
  onMemberChange,
  onTypeChange,
  onAmountChange,
  onSave,
  onCancel,
}: TransactionFormProps) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="member" className="text-right">
          Anggota
        </Label>
        <Input
          id="member"
          value={member}
          onChange={(e) => onMemberChange(e.target.value)}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="type" className="text-right">
          Jenis
        </Label>
        <Select
          value={type}
          onValueChange={(value) =>
            onTypeChange(value as "Setoran" | "Penarikan" | "Bunga")
          }
        >
          <SelectTrigger id="type" className="col-span-3">
            <SelectValue placeholder="Pilih jenis transaksi" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Setoran">Setoran</SelectItem>
            <SelectItem value="Penarikan">Penarikan</SelectItem>
            <SelectItem value="Bunga">Bunga</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="amount" className="text-right">
          Jumlah
        </Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          className="col-span-3"
        />
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onCancel}>
          Batal
        </Button>
        <Button onClick={onSave}>Simpan</Button>
      </div>
    </div>
  );
}
