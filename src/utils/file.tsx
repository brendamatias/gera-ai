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
