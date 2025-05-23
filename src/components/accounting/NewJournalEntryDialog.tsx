import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { JournalEntry, JournalEntryLine } from "@/types/journalEntry";
import { Plus, Trash2 } from "lucide-react";

interface NewJournalEntryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (
    entry: Omit<
      JournalEntry,
      "id" | "created_at" | "updated_at" | "created_by"
    >,
  ) => void;
  accounts: { id: string; code: string; name: string }[];
  initialData?: JournalEntry;
}

export default function NewJournalEntryDialog({
  isOpen,
  onOpenChange,
  onSave,
  accounts,
  initialData,
}: NewJournalEntryDialogProps) {
  const [entryData, setEntryData] = useState<{
    date: string;
    reference: string;
    description: string;
    entries: Omit<JournalEntryLine, "id" | "journal_entry_id">[];
  }>(
    initialData
      ? {
          date: initialData.date,
          reference: initialData.reference,
          description: initialData.description,
          entries: initialData.entries.map((entry) => ({
            account_id: entry.account_id,
            account_name: entry.account_name,
            debit: entry.debit,
            credit: entry.credit,
            description: entry.description,
          })),
        }
      : {
          date: new Date().toISOString().split("T")[0],
          reference: generateReference(),
          description: "",
          entries: [
            {
              account_id: "",
              account_name: "",
              debit: 0,
              credit: 0,
              description: "",
            },
            {
              account_id: "",
              account_name: "",
              debit: 0,
              credit: 0,
              description: "",
            },
          ],
        },
  );

  // Calculate totals
  const totalDebit = entryData.entries.reduce(
    (sum, line) => sum + (line.debit || 0),
    0,
  );
  const totalCredit = entryData.entries.reduce(
    (sum, line) => sum + (line.credit || 0),
    0,
  );
  const isBalanced = totalDebit === totalCredit && totalDebit > 0;

  // Handle adding a new line
  const addLine = () => {
    setEntryData({
      ...entryData,
      entries: [
        ...entryData.entries,
        {
          account_id: "",
          account_name: "",
          debit: 0,
          credit: 0,
          description: "",
        },
      ],
    });
  };

  // Handle removing a line
  const removeLine = (index: number) => {
    if (entryData.entries.length <= 2) return; // Minimum 2 lines required
    setEntryData({
      ...entryData,
      entries: entryData.entries.filter((_, i) => i !== index),
    });
  };

  // Handle updating a line
  const updateLine = (index: number, field: string, value: string | number) => {
    const newEntries = [...entryData.entries];

    if (field === "account_id") {
      const account = accounts.find((a) => a.id === value);
      newEntries[index] = {
        ...newEntries[index],
        [field]: value,
        account_name: account ? account.name : "",
      };
    } else {
      newEntries[index] = {
        ...newEntries[index],
        [field]: value,
      };
    }

    setEntryData({
      ...entryData,
      entries: newEntries,
    });
  };

  // Handle save
  const handleSave = () => {
    if (!isBalanced) {
      alert("Total debit dan kredit harus sama");
      return;
    }

    if (!entryData.date || !entryData.reference || !entryData.description) {
      alert("Mohon lengkapi semua field yang diperlukan");
      return;
    }

    onSave({
      ...entryData,
      status: "draft",
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Jurnal" : "Jurnal Baru"}
          </DialogTitle>
          <DialogDescription>
            Buat entri jurnal baru. Pastikan total debit dan kredit seimbang.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Tanggal</Label>
              <Input
                id="date"
                type="date"
                value={entryData.date}
                onChange={(e) =>
                  setEntryData({ ...entryData, date: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="reference">Nomor Referensi</Label>
              <Input
                id="reference"
                value={entryData.reference}
                onChange={(e) =>
                  setEntryData({ ...entryData, reference: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Deskripsi</Label>
            <Input
              id="description"
              value={entryData.description}
              onChange={(e) =>
                setEntryData({ ...entryData, description: e.target.value })
              }
            />
          </div>

          <div className="border rounded-md p-4">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Akun</th>
                  <th className="text-left py-2">Deskripsi</th>
                  <th className="text-right py-2">Debit (Rp)</th>
                  <th className="text-right py-2">Kredit (Rp)</th>
                  <th className="py-2 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {entryData.entries.map((line, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="py-2">
                      <select
                        className="w-full border rounded px-2 py-1"
                        value={line.account_id}
                        onChange={(e) =>
                          updateLine(index, "account_id", e.target.value)
                        }
                      >
                        <option value="">Pilih Akun</option>
                        {accounts.map((account) => (
                          <option key={account.id} value={account.id}>
                            {account.code} - {account.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2">
                      <Input
                        value={line.description || ""}
                        onChange={(e) =>
                          updateLine(index, "description", e.target.value)
                        }
                        placeholder="Deskripsi"
                      />
                    </td>
                    <td className="py-2">
                      <Input
                        type="number"
                        value={line.debit || ""}
                        onChange={(e) =>
                          updateLine(
                            index,
                            "debit",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        className="text-right"
                        placeholder="0"
                      />
                    </td>
                    <td className="py-2">
                      <Input
                        type="number"
                        value={line.credit || ""}
                        onChange={(e) =>
                          updateLine(
                            index,
                            "credit",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        className="text-right"
                        placeholder="0"
                      />
                    </td>
                    <td className="py-2 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLine(index)}
                        disabled={entryData.entries.length <= 2}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
                <tr className="font-medium">
                  <td colSpan={2} className="py-2 text-right">
                    Total
                  </td>
                  <td className="py-2 text-right">
                    {totalDebit.toLocaleString("id-ID")}
                  </td>
                  <td className="py-2 text-right">
                    {totalCredit.toLocaleString("id-ID")}
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>

            <div className="mt-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addLine}
              >
                <Plus size={16} className="mr-1" /> Tambah Baris
              </Button>
            </div>

            {!isBalanced && totalDebit > 0 && totalCredit > 0 && (
              <p className="text-red-500 text-sm mt-2">
                Jurnal tidak seimbang. Selisih:{" "}
                {Math.abs(totalDebit - totalCredit).toLocaleString("id-ID")}
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button
            onClick={handleSave}
            disabled={
              !isBalanced ||
              !entryData.date ||
              !entryData.reference ||
              !entryData.description
            }
          >
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Helper function to generate a reference number
function generateReference(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `JV-${year}${month}-${random}`;
}
