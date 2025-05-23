import React from "react";
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

interface SavingsProductFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (product: {
    name: string;
    description: string;
    interestRate: string;
    minBalance: string;
  }) => void;
}

export default function SavingsProductDialog({
  isOpen,
  onOpenChange,
  onSave,
}: SavingsProductFormProps) {
  const [product, setProduct] = React.useState({
    name: "",
    description: "",
    interestRate: "",
    minBalance: "",
  });

  const handleSave = () => {
    // Validate inputs
    if (
      !product.name ||
      !product.description ||
      !product.interestRate ||
      !product.minBalance
    ) {
      alert("Please fill in all required fields");
      return;
    }

    onSave(product);
    setProduct({
      name: "",
      description: "",
      interestRate: "",
      minBalance: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Savings Product</DialogTitle>
          <DialogDescription>
            Create a new savings product for your members.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="product-name" className="text-right">
              Product Name
            </Label>
            <Input
              id="product-name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="interest-rate" className="text-right">
              Interest Rate (%)
            </Label>
            <Input
              id="interest-rate"
              type="number"
              step="0.01"
              value={product.interestRate}
              onChange={(e) =>
                setProduct({ ...product, interestRate: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="min-balance" className="text-right">
              Min. Balance ($)
            </Label>
            <Input
              id="min-balance"
              type="number"
              step="0.01"
              value={product.minBalance}
              onChange={(e) =>
                setProduct({ ...product, minBalance: e.target.value })
              }
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
