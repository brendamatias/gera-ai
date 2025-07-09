import html2canvas from "html2canvas-pro";
import type { RefObject } from "react";

export const generateFilename = (
  prefix: string = "file",
  extension: string = "png"
): string => {
  const now = new Date();

  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");

  return `${prefix}-${day}-${month}-${year}_${hours}-${minutes}.${extension}`;
};

export const captureAndDownloadImage = async (
  ref: RefObject<HTMLElement | null>,
  filename: string
) => {
  const element = ref.current;
  if (!element) return;

  const canvas = await html2canvas(element);
  const dataUrl = canvas.toDataURL("image/png");

  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  link.click();
};
