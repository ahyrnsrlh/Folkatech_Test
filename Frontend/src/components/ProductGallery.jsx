import { useState } from "react";
import {
  resolveProductImageFallbackUrl,
  resolveProductImageUrl,
} from "../services/productService.js";

function ProductGallery({ product }) {
  const images = product.images || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageMissing, setImageMissing] = useState(false);

  if (images.length === 0) {
    return (
      <div className="grid aspect-square place-items-center border border-[#ddd] bg-white text-[13px] text-(--color-muted)">
        Gambar belum tersedia
      </div>
    );
  }

  const activeImage = images[activeIndex];

  function handleImageError(event, imageUrl, isMainImage = false) {
    const fallbackUrl = resolveProductImageFallbackUrl(imageUrl);
    if (
      event.currentTarget.dataset.fallbackTried !== "true" &&
      fallbackUrl &&
      fallbackUrl !== event.currentTarget.currentSrc
    ) {
      event.currentTarget.dataset.fallbackTried = "true";
      event.currentTarget.src = fallbackUrl;
      return;
    }

    if (isMainImage) setImageMissing(true);
    else event.currentTarget.hidden = true;
  }

  return (
    <div className="min-w-0">
      <div className="relative grid aspect-square place-items-center overflow-hidden border border-[#ddd] bg-white">
        {imageMissing ? (
          <span className="absolute text-[13px] text-(--color-muted)">Gambar belum tersedia</span>
        ) : (
          <img
            className="h-full w-full object-contain"
            src={resolveProductImageUrl(activeImage.url)}
            alt={product.name}
            onError={(event) => handleImageError(event, activeImage.url, true)}
          />
        )}
      </div>
      <div className="mt-4 flex gap-1.5 overflow-x-auto" aria-label="Galeri gambar produk">
        {images.map((image, index) => (
          <button
            className="aspect-square flex-[0_0_calc((100%-12px)/3)] cursor-pointer border border-[#ddd] bg-white p-1"
            type="button"
            key={`${image.url}-${index}`}
            onClick={() => {
              setImageMissing(false);
              setActiveIndex(index);
            }}
            aria-label={`Pilih gambar ${index + 1}`}
          >
            <img
              className="h-full w-full object-contain"
              src={resolveProductImageUrl(image.url)}
              alt=""
              aria-hidden="true"
              onError={(event) => handleImageError(event, image.url)}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductGallery;
