import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";
import { Label } from "./label";

interface SliderProps
  extends Omit<
    React.ComponentProps<typeof SliderPrimitive.Root>,
    "value" | "defaultValue" | "onValueChange"
  > {
  label?: string;
  value: number;
  defaultValue?: number;
  onValueChange: (value: number) => void;
}

function Slider({
  id,
  className,
  defaultValue = 0,
  value,
  min = 0,
  max = 100,
  step = 1,
  label,
  onValueChange,
  ...props
}: SliderProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-[6px]">
      {label && (
        <div className="flex justify-between items-center">
          <Label htmlFor={inputId}>{label}</Label>
          <span className="text-xs text-muted-foreground">{value}</span>
        </div>
      )}

      <SliderPrimitive.Root
        id={inputId}
        data-slot="slider"
        value={[value]}
        defaultValue={[defaultValue]}
        min={min}
        max={max}
        step={step}
        onValueChange={([v]) => onValueChange(v)}
        className={cn(
          "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
        >
          <SliderPrimitive.Range
            data-slot="slider-range"
            className="bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
          />
        </SliderPrimitive.Track>

        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          aria-label="Slider handle"
          className="border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      </SliderPrimitive.Root>
    </div>
  );
}

export { Slider };
