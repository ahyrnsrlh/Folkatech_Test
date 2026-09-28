import { useState } from "react";
import { Link } from "react-router-dom";
import ProductRating from "./ProductRating.jsx";
import {
  resolveProductImageFallbackUrl,
  resolveProductImageUrl,
} from "../services/productService.js";

function formatPrice(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function ProductCard({ product }) {
  const [imageMissing, setImageMissing] = useState(false);
  const imageUrl = resolveProductImageUrl(product.image);

  function handleImageError(event) {
    const fallbackUrl = resolveProductImageFallbackUrl(product.image);
    if (
      event.currentTarget.dataset.fallbackTried !== "true" &&
      fallbackUrl &&
      fallbackUrl !== event.currentTarget.currentSrc
    ) {
      event.currentTarget.dataset.fallbackTried = "true";
      event.currentTarget.src = fallbackUrl;
      return;
    }

    setImageMissing(true);
  }

  return (
    <Link
      className="grid min-w-0 overflow-hidden rounded-sm border border-(--color-line) bg-white text-inherit no-underline shadow-[0_2px_3px_rgb(0_0_0/5%)] transition-[border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-(--color-brand)"
      to={`/products/${product.id}`}
    >
      <div className="relative grid aspect-square place-items-center bg-white">
        {imageUrl && !imageMissing ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="h-full w-full object-contain"
            onError={handleImageError}
          />
        ) : (
          <span className="text-[12px] text-(--color-muted)">Gambar belum tersedia</span>
        )}
      </div>
      <div className="px-3 pt-2.25 pb-2.75 text-center max-[520px]:px-2 max-[520px]:pt-2.5 max-[520px]:pb-3">
        <h2 className="mb-0 min-h-10 overflow-hidden text-[16px] font-bold text-(--color-ink) [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [display:-webkit-box] max-[520px]:text-[12px]">
          {product.name}
        </h2>
        <p className="my-0.75 text-[13px] text-(--color-muted) max-[520px]:text-[10px]">{product.brand}</p>
        <ProductRating
          className="my-0 flex justify-center gap-1.25 text-[12px] text-[#f5b400] max-[520px]:text-[10px]"
          rating={product.rating}
          reviewCount={product.review_count}
        />
        <p className="mt-1.5 mb-0 text-[16px] font-extrabold text-(--color-brand) max-[520px]:text-[13px]">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}

export default ProductCard;
