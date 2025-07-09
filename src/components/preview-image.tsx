import { cn } from "@/lib";
import { Image } from "lucide-react";
import { forwardRef } from "react";

interface PreviewImageProps {
  imageSrc: string | null;
  topText: string;
  topSize: number;
  bottomText: string;
  bottomSize: number;
}

const PreviewImage = forwardRef<HTMLDivElement, PreviewImageProps>(
  ({ imageSrc, topText, topSize, bottomText, bottomSize }, ref) => {
    return (
      <div
        ref={ref}
        role="img"
        aria-label={`${topText} ${bottomText}`}
        className="h-full relative max-h-[416px] w-full bg-gray-200 rounded-[6px] overflow-hidden flex items-center justify-center"
      >
        {imageSrc ? (
          <>
            <img src={imageSrc} alt="Preview" className="object-contain" />

            <OverlayText text={topText} fontSize={topSize} position="top" />
            <OverlayText
              text={bottomText}
              fontSize={bottomSize}
              position="bottom"
            />
          </>
        ) : (
          <Image className="w-16 h-16 text-gray-400" />
        )}
      </div>
    );
  }
);

interface OverlayTextProps {
  text: string;
  fontSize: number;
  position: "top" | "bottom";
}

const OverlayText = ({ text, fontSize, position }: OverlayTextProps) => {
  return (
    <div
      className={cn(
        "absolute w-full text-center text-white p-4 font-impact font-normal uppercase pointer-events-none",
        position === "top" ? "top-0" : "bottom-0"
      )}
      style={{
        fontSize: `${fontSize}px`,
        WebkitTextStrokeWidth: "1px",
        WebkitTextStrokeColor: "#000",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
      }}
    >
      {text}
    </div>
  );
};

export { PreviewImage };
