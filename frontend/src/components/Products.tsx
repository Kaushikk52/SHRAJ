import { products } from "@/constants/constant";
import ProductCard from "./ProductCard";

const Products = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-20 mx-auto">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          image={product.image}
        />
      ))}
    </div>
  );
};

export default Products;
