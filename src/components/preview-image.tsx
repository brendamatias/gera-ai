import { cn } from "@/lib";
import { captureAndDownloadImage, generateFilename } from "@/utils";
import { Image } from "lucide-react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export interface PreviewImageHandle {
  capture: () => Promise<void>;
}

interface PreviewImageProps {
  imageFile?: File;
  topText: string;
  topSize: number;
  bottomText: string;
  bottomSize: number;
}

const PreviewImage = forwardRef<PreviewImageHandle, PreviewImageProps>(
  ({ imageFile, topText, topSize, bottomText, bottomSize }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    useImperativeHandle(ref, () => ({
      capture: async () => {
        if (!containerRef.current) return;
        await captureAndDownloadImage(containerRef, generateFilename("meme"));
      },
    }));

    useEffect(() => {
      if (!imageFile) return;

      const url = URL.createObjectURL(imageFile);
      setImageSrc(url);

      return () => URL.revokeObjectURL(url);
    }, [imageFile]);

    return (
      <div
        ref={containerRef}
        role="img"
        aria-label={`${topText} ${bottomText}`}
        className="relative w-full h-[300px] md:h-full bg-gray-200 rounded-[6px] overflow-hidden flex items-center justify-center"
      >
        {imageSrc ? (
          <>
            <img
              src={imageSrc}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-cover"
            />

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
