import { Button, Input, PreviewImage, Slider } from "@/components";
import logo from "@/assets/logo.png";
import { useForm, Controller } from "react-hook-form";
import { Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas-pro";
import { generateFilename } from "@/utils";

type FormValues = {
  image: FileList;
  topText: string;
  topSize: number[];
  bottomText: string;
  bottomSize: number[];
};

export const Home = () => {
  const previewRef = useRef<HTMLDivElement>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { register, handleSubmit, control, watch } = useForm<FormValues>({
    defaultValues: {
      topSize: [33],
      bottomSize: [33],
    },
  });

  const [image, topText, bottomText, topSize, bottomSize] = watch([
    "image",
    "topText",
    "bottomText",
    "topSize",
    "bottomSize",
  ]);

  const imageFile = image?.[0];

  const onSubmit = async () => {
    if (!previewRef.current) return;

    const canvas = await html2canvas(previewRef.current);
    const dataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = generateFilename("meme", "png");
    link.click();
  };

  useEffect(() => {
    if (!imageFile) return;

    const url = URL.createObjectURL(imageFile);
    setImagePreview(url);

    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  return (
    <div className="space-y-4">
      <img src={logo} alt="Gera Aí" />

      <hr className="border-t border-black opacity-20 my-[30px]" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch"
      >
        <PreviewImage
          ref={previewRef}
          imageSrc={imagePreview}
          topText={topText}
          topSize={topSize?.[0]}
          bottomText={bottomText}
          bottomSize={bottomSize?.[0]}
        />

        <div className="flex flex-col justify-between">
          <div className="space-y-6">
            <Input
              label="Imagem"
              type="file"
              required
              accept="image/*"
              {...register("image", { required: true })}
            />
            <Input
              label="Texto superior"
              placeholder="Primeira linha"
              {...register("topText", { required: true })}
            />
            <Controller
              name="topSize"
              control={control}
              render={({ field }) => (
                <Slider
                  label="Tamanho texto superior:"
                  value={field.value}
                  onValueChange={field.onChange}
                  max={100}
                  step={1}
                />
              )}
            />
            <Input
              label="Texto inferior"
              placeholder="Segunda linha"
              {...register("bottomText", { required: true })}
            />
            <Controller
              name="bottomSize"
              control={control}
              render={({ field }) => (
                <Slider
                  label="Tamanho texto inferior:"
                  value={field.value}
                  onValueChange={field.onChange}
                  max={100}
                  step={1}
                />
              )}
            />
          </div>

          <Button type="submit" className="w-full mt-6">
            <Download className="mr-2" />
            Download
          </Button>
        </div>
      </form>
    </div>
  );
};
