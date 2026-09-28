import ProductCard from "./ProductCard.jsx";

function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-8.75 max-[520px]:grid-cols-2 max-[520px]:gap-2.5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
