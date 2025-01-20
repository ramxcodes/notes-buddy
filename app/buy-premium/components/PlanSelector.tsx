"use client";

import BlurFade from "@/components/ui/blur-fade";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PlanSelectorProps {
  label: string;
  options: string[];
  selectedOption: string;
  onSelect: (value: string) => void;
}

export function PlanSelector({
  label,
  options,
  selectedOption,
  onSelect,
}: PlanSelectorProps) {
  return (
    <BlurFade delay={0.2} inView>
      <div className="space-y-2">
        <label className="block text-sm font-medium">{label}</label>
        <DropdownMenu>
          <DropdownMenuTrigger className="block w-full px-3 py-2 border rounded-md shadow-sm text-left">
            {selectedOption || `Select ${label}`}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => onSelect("")}>
              {`Select ${label}`}
            </DropdownMenuItem>
            {options.map((option) => (
              <DropdownMenuItem key={option} onSelect={() => onSelect(option)}>
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </BlurFade>
  );
}
