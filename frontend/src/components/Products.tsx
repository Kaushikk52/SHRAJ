import { products } from "@/constants/constant";
import ProductCard from "./ProductCard";

const Products = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mx-auto">
      {products.slice(0, 4).map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          image={product.image}
        />
      ))}
    </div>
  );
};

export default Products;
