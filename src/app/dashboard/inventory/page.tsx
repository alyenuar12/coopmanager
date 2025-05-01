"use client";

import { useState } from "react";
import { Package, Search } from "lucide-react";
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

const inventoryItems = [
  {
    id: "INV001",
    name: "Office Desk",
    category: "Furniture",
    quantity: 15,
    unitPrice: 250.0,
    totalValue: 3750.0,
    lastUpdated: "2023-10-15",
  },
  {
    id: "INV002",
    name: "Office Chair",
    category: "Furniture",
    quantity: 30,
    unitPrice: 120.0,
    totalValue: 3600.0,
    lastUpdated: "2023-10-15",
  },
  {
    id: "INV003",
    name: "Laptop Computer",
    category: "Electronics",
    quantity: 10,
    unitPrice: 1200.0,
    totalValue: 12000.0,
    lastUpdated: "2023-10-10",
  },
  {
    id: "INV004",
    name: "Printer",
    category: "Electronics",
    quantity: 5,
    unitPrice: 350.0,
    totalValue: 1750.0,
    lastUpdated: "2023-10-12",
  },
  {
    id: "INV005",
    name: "Filing Cabinet",
    category: "Furniture",
    quantity: 8,
    unitPrice: 180.0,
    totalValue: 1440.0,
    lastUpdated: "2023-10-08",
  },
];

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = inventoryItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Package className="h-6 w-6 text-blue-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">
            Inventory Management
          </h1>
        </div>
        <Button variant="outline" className="ml-4">
          Add New Item
        </Button>
      </div>

      <div className="mb-6 flex items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search inventory..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="ml-4 flex space-x-2">
          <Button variant="outline">Filter</Button>
          <Button variant="outline">Export</Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Unit Price</TableHead>
              <TableHead className="text-right">Total Value</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">
                  ${item.unitPrice.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  ${item.totalValue.toFixed(2)}
                </TableCell>
                <TableCell>{item.lastUpdated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
