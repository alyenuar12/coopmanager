"use client";

import { useState, useEffect } from "react";
import { Package, Search, Plus, Edit, Trash2 } from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { createClient } from "../../../supabase/client";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
  totalValue: number;
  lastUpdated: string;
}

// Fallback data in case database fetch fails
const fallbackInventoryItems = [
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

const categories = [
  "Furniture",
  "Electronics",
  "Office Supplies",
  "Equipment",
  "Other",
];

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("inventory")
          .select("*")
          .order("updated_at", { ascending: false });

        if (error) throw error;

        if (data) {
          // Transform the data to match our InventoryItem type
          const formattedItems: InventoryItem[] = data.map((item) => ({
            id: item.id,
            name: item.name || "",
            category: item.category || "Other",
            quantity: item.quantity || 0,
            unitPrice: item.unit_price || 0,
            totalValue: (item.quantity || 0) * (item.unit_price || 0),
            lastUpdated: new Date(item.updated_at).toISOString().split("T")[0],
          }));
          setItems(formattedItems);
        }
      } catch (err) {
        console.error("Error fetching inventory:", err);
        setError("Failed to load inventory items");
        setItems(fallbackInventoryItems); // Use fallback data if fetch fails
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
    name: "",
    category: "Furniture",
    quantity: 1,
    unitPrice: 0,
  });

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    let parsedValue: string | number = value;

    if (name === "quantity" || name === "unitPrice") {
      parsedValue = parseFloat(value) || 0;
    }

    setNewItem({
      ...newItem,
      [name]: parsedValue,
    });
  };

  const handleAddItem = async () => {
    try {
      const supabase = createClient();
      const today = new Date();

      // Calculate total value
      const totalValue = (newItem.quantity || 0) * (newItem.unitPrice || 0);

      // Insert the new item into the database
      const { data, error } = await supabase
        .from("inventory")
        .insert({
          name: newItem.name || "",
          category: newItem.category || "Other",
          quantity: newItem.quantity || 0,
          unit_price: newItem.unitPrice || 0,
          total_value: totalValue,
          created_at: today.toISOString(),
          updated_at: today.toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        // Format the new item to match our InventoryItem type
        const itemToAdd: InventoryItem = {
          id: data.id,
          name: data.name,
          category: data.category,
          quantity: data.quantity,
          unitPrice: data.unit_price,
          totalValue: data.total_value,
          lastUpdated: today.toISOString().split("T")[0],
        };

        setItems([...items, itemToAdd]);
      }

      setNewItem({
        name: "",
        category: "Furniture",
        quantity: 1,
        unitPrice: 0,
      });
      setIsAddDialogOpen(false);
    } catch (err) {
      console.error("Error adding inventory item:", err);
      alert("Failed to add inventory item. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Package className="h-6 w-6 text-blue-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">
            Inventory Management
          </h1>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="ml-4">
              <Plus className="mr-2 h-4 w-4" /> Add New Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Inventory Item</DialogTitle>
              <DialogDescription>
                Enter the details of the new inventory item below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newItem.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="Item name"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <select
                  id="category"
                  name="category"
                  value={newItem.category}
                  onChange={handleInputChange}
                  className="col-span-3 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="0"
                  value={newItem.quantity}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="unitPrice" className="text-right">
                  Unit Price ($)
                </Label>
                <Input
                  id="unitPrice"
                  name="unitPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={newItem.unitPrice}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddItem}>
                Add Item
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
              <TableHead className="text-right">Actions</TableHead>
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
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
