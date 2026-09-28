import { useState } from "react";
import ProductRating from "./ProductRating.jsx";
import checkSquareIcon from "../assets/check-square.png";
import heartIcon from "../assets/heart.png";

function formatPrice(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <section className="min-w-0 pt-4 max-[700px]:pt-6" aria-label="Informasi produk">
      <h1 className="mb-2.5 font-(--font-display) text-[22px] leading-tight font-extrabold tracking-[0.02em] text-[#666] uppercase max-[900px]:text-xl">
        {product.name}
      </h1>
      <p className="mt-3 mb-1.25 text-[18px] font-semibold text-[#666]">{product.brand}</p>
      <ProductRating
        className="mb-2 gap-1.25 text-[18px] text-[#f5b400]"
        rating={product.rating}
        reviewCount={product.review_count}
      />
      <div className="my-2 mb-5.5 flex items-center justify-between">
        <p className="m-0 text-[20px] font-bold text-(--color-brand)">{formatPrice(product.price)}</p>
        <p className="m-0 text-[12px] text-[#8ba5ff]">
          {product.stock > 0 ? (
            <>
              <img className="mr-0.75 -mb-0.5 inline-block h-3 w-3 object-contain" src={checkSquareIcon} alt="" />
              Tersedia
            </>
          ) : "Stok habis"}
        </p>
      </div>
      <div className="flex items-center gap-1.75 max-[700px]:flex-wrap">
        <div className="flex h-11.5 items-center border border-(--color-line)" aria-label="Jumlah produk">
          <button
            className="grid h-11 w-12 cursor-pointer place-items-center border-0 bg-white text-[15px] text-(--color-ink) max-[900px]:w-9.5"
            type="button"
            aria-label="Kurangi jumlah"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
          >
            <span className="h-px w-2.5 bg-[#777]" aria-hidden="true" />
          </button>
          <span className="grid h-11 w-12 place-items-center bg-white text-[15px] text-(--color-ink) max-[900px]:w-9.5">
            {quantity}
          </span>
          <button
            className="grid h-11 w-12 cursor-pointer place-items-center border-0 bg-white text-[15px] text-(--color-ink) max-[900px]:w-9.5"
            type="button"
            aria-label="Tambah jumlah"
            onClick={() => setQuantity((value) => value + 1)}
          >
            +
          </button>
        </div>
        <button
          className="h-11.5 flex-1 cursor-not-allowed border-0 bg-(--color-brand) px-4.5 text-[13px] font-bold tracking-[0.01em] text-white uppercase disabled:opacity-100 max-[700px]:min-w-45"
          type="button"
          disabled
        >
          Tambah ke keranjang
        </button>
        <button
          className="grid h-11.5 w-13 cursor-not-allowed place-items-center border-0 bg-[#f5f5f5] p-0 disabled:opacity-100"
          type="button"
          aria-label="Tambahkan ke wishlist"
          disabled
        >
          <img
            className="h-5.5 w-5.5 object-contain filter-[brightness(0)_saturate(100%)_invert(37%)_sepia(89%)_saturate(2250%)_hue-rotate(337deg)_brightness(98%)_contrast(92%)]"
            src={heartIcon}
            alt=""
          />
        </button>
      </div>
      <p className="mt-4.5 mb-0 text-[15px] leading-[1.8] text-[#888]">{product.description}</p>
    </section>
  );
}

export default ProductInfo;
