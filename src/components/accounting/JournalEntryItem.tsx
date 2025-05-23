import { useState } from "react";
import { JournalEntry } from "@/types/journalEntry";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface JournalEntryItemProps {
  entry: JournalEntry;
  onEdit?: (entry: JournalEntry) => void;
  onVoid?: (entry: JournalEntry) => void;
}

export default function JournalEntryItem({
  entry,
  onEdit,
  onVoid,
}: JournalEntryItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate totals
  const totalDebit = entry.entries.reduce((sum, line) => sum + line.debit, 0);
  const totalCredit = entry.entries.reduce((sum, line) => sum + line.credit, 0);

  // Format date
  const formattedDate = new Date(entry.date).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-medium">{entry.reference}</h3>
            <p className="text-sm text-muted-foreground">{formattedDate}</p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(entry.status)}`}
            >
              {getStatusLabel(entry.status)}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Sembunyikan" : "Detail"}
            </Button>
          </div>
        </div>

        <p className="text-sm mb-4">{entry.description}</p>

        {isExpanded && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Akun</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead className="text-right">Debit (Rp)</TableHead>
                <TableHead className="text-right">Kredit (Rp)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entry.entries.map((line) => (
                <TableRow key={line.id}>
                  <TableCell>{line.account_name}</TableCell>
                  <TableCell>{line.description || "-"}</TableCell>
                  <TableCell className="text-right">
                    {line.debit > 0 ? formatCurrency(line.debit) : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    {line.credit > 0 ? formatCurrency(line.credit) : "-"}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="font-medium">
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
        )}

        {isExpanded && (
          <div className="flex justify-end gap-2 mt-4">
            {entry.status !== "voided" && onVoid && (
              <Button variant="outline" size="sm" onClick={() => onVoid(entry)}>
                Batalkan
              </Button>
            )}
            {entry.status === "draft" && onEdit && (
              <Button size="sm" onClick={() => onEdit(entry)}>
                Edit
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function getStatusColor(status: JournalEntry["status"]) {
  switch (status) {
    case "draft":
      return "bg-yellow-100 text-yellow-800";
    case "posted":
      return "bg-green-100 text-green-800";
    case "voided":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getStatusLabel(status: JournalEntry["status"]) {
  switch (status) {
    case "draft":
      return "Draft";
    case "posted":
      return "Diposting";
    case "voided":
      return "Dibatalkan";
    default:
      return status;
  }
}
