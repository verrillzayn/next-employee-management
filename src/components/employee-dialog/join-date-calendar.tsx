"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

type TJoinDateCalendarProps = {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
};

const JoinDateCalendar = ({ value, onChange }: TJoinDateCalendarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date"
          className="justify-between w-48 font-normal">
          {value ? value.toLocaleDateString() : "Select date"}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 overflow-hidden" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(e) => onChange(e)}
          className="border rounded-md shadow-sm"
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
};

export default JoinDateCalendar;
