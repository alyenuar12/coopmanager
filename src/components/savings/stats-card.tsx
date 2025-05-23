import React from "react";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  changeColor?: string;
}

// Helper function to format currency to IDR
const formatToIDR = (value: string): string => {
  // Check if the value is a currency string with $ sign
  if (value.startsWith("$")) {
    // Remove $ and commas, convert to number
    const numericValue = parseFloat(value.replace("$", "").replace(/,/g, ""));
    // Format to IDR
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(numericValue * 15000); // Assuming conversion rate of 1 USD = 15000 IDR
  }
  return value; // Return as is if not a currency value
};

export default function StatsCard({
  title,
  value,
  change,
  changeColor = "text-green-600",
}: StatsCardProps) {
  // Format the value to IDR if it's a currency
  const formattedValue = formatToIDR(value);

  // Format the change text to IDR if it contains a currency value
  let formattedChange = change;
  if (change && change.includes("$")) {
    // Extract the currency part and format it
    formattedChange = change.replace(/\$(\d[\d,.]*)/g, (match) => {
      return formatToIDR(match);
    });
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{formattedValue}</p>
      {formattedChange && (
        <p className={`text-xs ${changeColor}`}>{formattedChange}</p>
      )}
    </div>
  );
}
