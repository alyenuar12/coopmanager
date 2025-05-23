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
import { Search, Filter } from "lucide-react";

interface SearchFiltersProps {
  searchTerm: string;
  transactionType: string;
  dateRange: string;
  isAdvancedSearchOpen: boolean;
  accountType: string;
  status: string;
  minAmount: string;
  maxAmount: string;
  onSearchTermChange: (value: string) => void;
  onTransactionTypeChange: (value: string) => void;
  onDateRangeChange: (value: string) => void;
  onToggleAdvancedSearch: () => void;
  onAccountTypeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onMinAmountChange: (value: string) => void;
  onMaxAmountChange: (value: string) => void;
  onResetFilters: () => void;
  onApplyFilters: () => void;
}

export default function SearchFilters({
  searchTerm,
  transactionType,
  dateRange,
  isAdvancedSearchOpen,
  accountType,
  status,
  minAmount,
  maxAmount,
  onSearchTermChange,
  onTransactionTypeChange,
  onDateRangeChange,
  onToggleAdvancedSearch,
  onAccountTypeChange,
  onStatusChange,
  onMinAmountChange,
  onMaxAmountChange,
  onResetFilters,
  onApplyFilters,
}: SearchFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            className="pl-10"
            placeholder="Search by member name, account number, or transaction ID"
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select
            value={transactionType}
            onValueChange={onTransactionTypeChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Transaction Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transaction Types</SelectItem>
              <SelectItem value="deposit">Deposits</SelectItem>
              <SelectItem value="withdrawal">Withdrawals</SelectItem>
              <SelectItem value="interest">Interest</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateRange} onValueChange={onDateRangeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Last 30 Days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">Last 30 Days</SelectItem>
              <SelectItem value="90">Last 90 Days</SelectItem>
              <SelectItem value="365">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            onClick={onToggleAdvancedSearch}
          >
            <Filter size={18} />
          </Button>
        </div>
      </div>

      {/* Advanced Search Options - Conditionally Rendered */}
      {isAdvancedSearchOpen && (
        <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="account-type">Account Type</Label>
            <Select value={accountType} onValueChange={onAccountTypeChange}>
              <SelectTrigger id="account-type">
                <SelectValue placeholder="All Account Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Account Types</SelectItem>
                <SelectItem value="regular">Regular Savings</SelectItem>
                <SelectItem value="premium">Premium Savings</SelectItem>
                <SelectItem value="youth">Youth Savings</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="amount-range">Amount Range</Label>
            <div className="flex items-center gap-2">
              <Input
                id="min-amount"
                placeholder="Min $"
                type="number"
                value={minAmount}
                onChange={(e) => onMinAmountChange(e.target.value)}
              />
              <span>to</span>
              <Input
                id="max-amount"
                placeholder="Max $"
                type="number"
                value={maxAmount}
                onChange={(e) => onMaxAmountChange(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={onStatusChange}>
              <SelectTrigger id="status">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-3 flex justify-end">
            <Button variant="outline" className="mr-2" onClick={onResetFilters}>
              Reset Filters
            </Button>
            <Button onClick={onApplyFilters}>Apply Filters</Button>
          </div>
        </div>
      )}
    </div>
  );
}
