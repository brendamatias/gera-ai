import logo from "@/assets/logo.png";
import { useForm, Controller } from "react-hook-form";
import { Download } from "lucide-react";
import { useRef, useState } from "react";

import {
  Button,
  Input,
  PreviewImage,
  Slider,
  type PreviewImageHandle,
} from "@/components";

type FormValues = {
  image: FileList;
  topText: string;
  topSize: number;
  bottomText: string;
  bottomSize: number;
};

export const Home = () => {
  const previewRef = useRef<PreviewImageHandle>(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, control, watch } = useForm<FormValues>({
    defaultValues: {
      topSize: 33,
      bottomSize: 33,
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
  const isValid = !!(imageFile && topText && bottomText);

  const onSubmit = async () => {
    if (!isValid) return;

    setLoading(true);
    await previewRef.current?.capture();
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <img src={logo} alt="Gera Aí" />

      <hr className="border-t border-black opacity-20 my-[30px]" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 items-stretch">
        <PreviewImage
          ref={previewRef}
          imageFile={imageFile}
          topText={topText}
          topSize={topSize}
          bottomText={bottomText}
          bottomSize={bottomSize}
        />

        <form onSubmit={handleSubmit(onSubmit)}>
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
                  min={8}
                  max={80}
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
                  min={8}
                  max={80}
                  step={1}
                />
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-6"
            disabled={!isValid}
            loading={loading}
            icon={<Download />}
          >
            Download
          </Button>
        </form>
      </div>
    </div>
  );
};
