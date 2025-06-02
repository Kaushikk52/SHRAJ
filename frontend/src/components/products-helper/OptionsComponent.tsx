import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";

type MoreProps = {
  img?: string[]; // lowercase `string` (capital `String` is a JS object wrapper)
  options?: string[];
};

export default function OptionsComponent({ img, options }: MoreProps) {
  return (
    <ScrollArea className="h-[40vh]">
      {img ? (
        <div>
          {img.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`image-${index}`}
              height={500}
              width={500}
            />
          ))}
        </div>
      ) : (
        options?.map((feature) => (
          <div className="flex items-center gap-5" key={feature}>
            <span>•</span>
            <p className="text-sm w-[70%] text-slate-700">{feature}</p>
          </div>
        ))
      )}
    </ScrollArea>
  );
}
