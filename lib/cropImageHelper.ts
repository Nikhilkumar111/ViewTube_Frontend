// /lib/cropImageHelper.ts
import { Area } from "react-easy-crop";

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", reject);
    image.crossOrigin = "anonymous"; // to avoid CORS issues
    image.src = url;
  });
  

export const getCroppedImg = async (imageSrc: string, crop: Area): Promise<string> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No 2D context found");

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  // 🧠 Capture slightly more area around the selected crop (less zoomed-in)
  const paddingFactor = 0.2; // increase this to show more of the image (0.2 = 20% more area)
  const paddedWidth = crop.width * (1 + paddingFactor);
  const paddedHeight = crop.height * (1 + paddingFactor);
  const paddedX = Math.max(0, crop.x - crop.width * paddingFactor / 2);
  const paddedY = Math.max(0, crop.y - crop.height * paddingFactor / 2);

  canvas.width = paddedWidth;
  canvas.height = paddedHeight;

  ctx.drawImage(
    image,
    paddedX * scaleX,
    paddedY * scaleY,
    paddedWidth * scaleX,
    paddedHeight * scaleY,
    0,
    0,
    paddedWidth,
    paddedHeight
  );

  return new Promise<string>((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) return;
      const fileUrl = URL.createObjectURL(blob);
      resolve(fileUrl);
    }, "image/jpeg", 0.95);
  });
};
