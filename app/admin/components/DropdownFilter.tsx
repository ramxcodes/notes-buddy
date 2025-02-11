"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type FilterOption = "all" | "premium";

interface Option {
  value: FilterOption;
  label: string;
}

interface DropdownFilterProps {
  value: FilterOption;
  onChange: (value: FilterOption) => void;
  options: Option[];
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({ value, onChange, options }) => {
  return (
    <Select value={value} onValueChange={(val) => onChange(val as FilterOption)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select option" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DropdownFilter;
