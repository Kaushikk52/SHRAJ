import Image from "next/image";

type ProductCardProps = {
  name: string;
  image: string;
};

const ProductCard = ({ name, image }: ProductCardProps) => {
  return (
    <div className="relative w-[150px] md:w-[300px] cursor-pointer">
      <div className="relative w-full h-[180px] md:h-[370px]">
        <Image src={image} alt={name} fill className="object-contain" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white text-center py-4 rounded-b-md">
        <p className="text-xs md:text-sm font-medium">{name}</p>
      </div>
    </div>
  );
};

export default ProductCard;
