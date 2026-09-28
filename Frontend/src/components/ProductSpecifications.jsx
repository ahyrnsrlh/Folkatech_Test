import { useState } from "react";

const specificationLabels = {
  dimensions: "Dimensi",
  weight: "Berat",
  capacity: "Kapasitas",
  color: "Warna",
  brand: "Brand",
};

function SpecificationList({ specifications }) {
  return (
    <dl className="m-0">
      {specifications.map(([key, value]) => (
        <div className="flex gap-2" key={key}>
          <dt className="min-w-23.75 after:content-[':']">{specificationLabels[key] || key}</dt>
          <dd className="m-0">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function ProductSpecifications({ product }) {
  const [activeTab, setActiveTab] = useState("description");
  const specifications = Object.entries(product.specifications || {}).filter(
    ([, value]) => value,
  );

  return (
    <section className="mx-auto mt-18 w-full max-w-304.5 max-[900px]:mt-13.5 max-[700px]:mt-11" aria-label="Deskripsi dan informasi produk">
      <div className="flex justify-center gap-25 max-[700px]:gap-5">
        {[
          ["description", "Deskripsi"],
          ["information", "Informasi"],
        ].map(([tab, label]) => (
          <button
            className={`relative min-w-65 cursor-pointer border-0 bg-transparent pb-4.25 text-[18px] font-extrabold uppercase max-[700px]:min-w-32.5 max-[700px]:text-[15px] ${activeTab === tab ? "text-(--color-brand) after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.75 after:bg-(--color-brand) after:content-['']" : "text-[#c4c4c4]"}`}
            type="button"
            key={tab}
            onClick={() => setActiveTab(tab)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="max-w-none px-5.5 pt-7 text-[15px] leading-[1.75] text-[#777] max-[700px]:px-0">
        {activeTab === "description" ? (
          <>
            <p className="mb-2.5">{product.description}</p>
            {specifications.length > 0 && (
              <div>
                <p className="mb-0">Spesifikasi:</p>
                <SpecificationList specifications={specifications} />
              </div>
            )}
          </>
        ) : (
          <SpecificationList specifications={specifications} />
        )}
      </div>
    </section>
  );
}

export default ProductSpecifications;
