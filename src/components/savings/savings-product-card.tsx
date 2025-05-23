import React from "react";
import { CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SavingsProductProps {
  name: string;
  description: string;
  interestRate: string;
  minBalance: string;
  activeAccounts: number;
  iconColor?: string;
  onClick?: () => void;
}

export default function SavingsProductCard({
  name,
  description,
  interestRate,
  minBalance,
  activeAccounts,
  iconColor = "text-blue-600",
  onClick,
}: SavingsProductProps) {
  return (
    <Card
      className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer bg-white"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="flex items-center mb-4">
          <CreditCard className={`w-8 h-8 ${iconColor} mr-3`} />
          <h3 className="text-lg font-semibold">{name}</h3>
        </div>
        <p className="text-gray-600 mb-2">{description}</p>
        <div className="text-sm text-gray-500 space-y-1">
          <p>
            Suku Bunga: <span className="font-medium">{interestRate}</span>
          </p>
          <p>
            Saldo Minimal: <span className="font-medium">{minBalance}</span>
          </p>
          <p>
            Rekening Aktif:{" "}
            <span className="font-medium">{activeAccounts}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
