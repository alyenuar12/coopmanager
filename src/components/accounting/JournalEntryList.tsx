import { useState } from "react";
import { JournalEntry } from "@/types/journalEntry";
import JournalEntryItem from "./JournalEntryItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Filter, Search } from "lucide-react";

interface JournalEntryListProps {
  entries: JournalEntry[];
  onNewEntry: () => void;
  onEditEntry: (entry: JournalEntry) => void;
  onVoidEntry: (entry: JournalEntry) => void;
  onExport: () => void;
}

export default function JournalEntryList({
  entries,
  onNewEntry,
  onEditEntry,
  onVoidEntry,
  onExport,
}: JournalEntryListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Filter entries based on search term and status
  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      searchTerm === "" ||
      entry.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || entry.status === filterStatus;

    return matchesSearch && matchesStatus;
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
            placeholder="Cari jurnal berdasarkan referensi atau deskripsi"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select
            className="border rounded-md px-3 py-2"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Semua Status</option>
            <option value="draft">Draft</option>
            <option value="posted">Diposting</option>
            <option value="voided">Dibatalkan</option>
          </select>
          <Button
            variant="outline"
            onClick={onExport}
            className="flex items-center gap-2"
          >
            <Download size={16} />
            <span>Export</span>
          </Button>
          <Button onClick={onNewEntry}>Jurnal Baru</Button>
        </div>
      </div>

      {filteredEntries.length > 0 ? (
        <div className="space-y-4">
          {filteredEntries.map((entry) => (
            <JournalEntryItem
              key={entry.id}
              entry={entry}
              onEdit={onEditEntry}
              onVoid={onVoidEntry}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border rounded-md bg-gray-50">
          <p className="text-gray-500">Tidak ada jurnal ditemukan</p>
        </div>
      )}
    </div>
  );
}
