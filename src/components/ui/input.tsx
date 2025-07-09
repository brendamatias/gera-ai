import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";

interface InputProps extends React.ComponentProps<"input"> {
  required?: boolean;
  label?: string;
}

function Input({ required, className, type, label, id, ...props }: InputProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-[6px]">
      {label && (
        <Label htmlFor={inputId}>
          {label}{" "}
          {required && <span className="text-[#FF1F00] text-base">*</span>}
        </Label>
      )}

      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-transparent flex h-[46px] w-full min-w-0 rounded-[6px] border bg-white px-4 py-3 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
    </div>
  );
}

export { Input };
