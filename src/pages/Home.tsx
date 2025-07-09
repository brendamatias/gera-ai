import { Button, Input, PreviewImage, Slider } from "@/components";
import logo from "@/assets/logo.png";
import { useForm, Controller } from "react-hook-form";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";

type FormValues = {
  image: FileList;
  topText: string;
  topSize: number[];
  bottomText: string;
  bottomSize: number[];
};

export const Home = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { register, handleSubmit, control, watch } = useForm<FormValues>({
    defaultValues: {
      topSize: [33],
      bottomSize: [33],
    },
  });

  const topText = watch("topText");
  const bottomText = watch("bottomText");
  const topSize = watch("topSize")?.[0] ?? 33;
  const bottomSize = watch("bottomSize")?.[0] ?? 33;

  const imageFileList = watch("image");
  const imageFile = imageFileList?.[0];

  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
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
        className="grid grid-cols-2 gap-10 items-stretch"
      >
        <PreviewImage
          imageSrc={imagePreview}
          topText={topText}
          topSize={topSize}
          bottomText={bottomText}
          bottomSize={bottomSize}
        />

        <div className="flex flex-col justify-between">
          <div className="space-y-6">
            <Input
              label="Imagem"
              type="file"
              required
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
