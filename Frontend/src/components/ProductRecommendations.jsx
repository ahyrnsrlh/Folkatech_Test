import ProductCard from "./ProductCard.jsx";

function ProductRecommendations({ products }) {
  if (products.length === 0) return null;

  return (
    <section className="mt-16 w-full max-[900px]:mt-13.5 max-[700px]:mt-11" aria-label="Rekomendasi produk">
      <h2 className="relative mx-auto mb-15 w-fit pb-4.75 text-center text-[18px] font-extrabold text-[#666] uppercase after:absolute after:right-1/2 after:bottom-0 after:h-0.75 after:w-36.5 after:translate-x-1/2 after:bg-(--color-brand) after:content-['']">
        Rekomendasi untuk Anda
      </h2>
      <div className="grid grid-cols-3 gap-x-4 gap-y-8.75 max-[900px]:gap-x-4.5 max-[700px]:grid-cols-2 max-[700px]:gap-3.5 max-[520px]:grid-cols-2 max-[420px]:grid-cols-1">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductRecommendations;
