import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Filter as FilterIcon } from "lucide-react";

interface FilterGroupProps {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  onClear: () => void;
}

export function FilterGroup({ label, options, selected, onToggle, onClear }: FilterGroupProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <FilterIcon className="h-4 w-4" />
          {label}
          {selected.length > 0 && (
            <Badge variant="secondary" className="ml-1">
              {selected.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-semibold">Filter by {label.toLowerCase()}</h4>
          <div className="flex flex-wrap gap-2">
            {options.map((opt) => (
              <Button
                key={opt}
                variant={selected.includes(opt) ? "default" : "outline"}
                size="sm"
                onClick={() => onToggle(opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
          {selected.length > 0 && (
            <Button variant="ghost" size="sm" onClick={onClear} className="w-full">
              Clear all
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
