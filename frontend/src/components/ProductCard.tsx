import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

type ProductCardProps = {
  name: string;
  image: string;
};

const ProductCard = ({ name, image }: ProductCardProps) => {
  return (
    <div className="bg-white group rounded-md border border-gray-200 hover:shadow-md transition-shadow duration-200 p-4 flex flex-col items-center justify-between relative h-[150px] w-[150px] md:h-[200px] md:w-[200px] cursor-pointer">
      <div className="h-24 flex items-center justify-center mb-auto">
        <Image
          src={image}
          alt={name}
          width={80}
          height={220}
          className="object-contain max-h-full"
        />
      </div>
      <div className="w-full flex items-center justify-between mt-2">
        <p className="text-sm text-gray-800 font-normal truncate">{name}</p>
        <ArrowUpRight
          size={24}
          className="h-4 w-4 group-hover:rotate-45 transiton duration-300 font-bold"
        />
      </div>
    </div>
  );
};

export default ProductCard;
