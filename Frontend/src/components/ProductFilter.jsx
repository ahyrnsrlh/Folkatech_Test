import { useState } from "react";

const filterLabels = {
  origin: "Origin",
  species: "Species",
  roast_level: "Roast Level",
  tasted: "Tasted",
  processing: "Processing",
};

function Chevron({ collapsed = false }) {
  return (
    <svg
      className={`h-2.25 w-2.25 text-[#777] transition-transform duration-150 ${collapsed ? "rotate-180" : ""}`}
      viewBox="0 0 10 7"
      fill="none"
      aria-hidden="true"
    >
      <path d="m1 6 4-4 4 4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function PriceRangeFilter({ minPrice, maxPrice, onApply }) {
  const minimum = 50000;
  const maximum = 2250000;
  const [priceRange, setPriceRange] = useState({
    min: Number(minPrice) || minimum,
    max: Number(maxPrice) || maximum,
  });
  const minPosition = ((priceRange.min - minimum) / (maximum - minimum)) * 100;
  const maxPosition = ((priceRange.max - minimum) / (maximum - minimum)) * 100;

  function applyPriceRange(event) {
    const input = event.currentTarget;
    if (input.type === "range") {
      onApply("price_range", priceRange);
    }
  }

  return (
    <section className="px-3 pt-2.5 pb-2.5" aria-label="Filter harga">
      <h3 className="mb-1 m-0 text-[14px] font-semibold text-[#666]">Harga</h3>
      <div className="relative mx-1.25 h-4.5 before:absolute before:top-1.75 before:right-0 before:left-0 before:h-1 before:rounded before:bg-[#8a8a8a] before:content-['']">
        <span
          className="absolute top-1.75 z-1 h-1 rounded bg-(--color-brand)"
          style={{ left: `${minPosition}%`, right: `${100 - maxPosition}%` }}
        />
        <span
          className="absolute top-[3.5px] z-2 h-2.75 w-2.75 -translate-x-1/2 rounded-full bg-(--color-brand)"
          style={{ left: `${minPosition}%` }}
        />
        <span
          className="absolute top-[3.5px] z-2 h-2.75 w-2.75 -translate-x-1/2 rounded-full bg-(--color-brand)"
          style={{ left: `${maxPosition}%` }}
        />
        <input
          aria-label="Harga minimum"
          className="pointer-events-none absolute inset-0 z-3 h-4.5 w-full appearance-none bg-transparent opacity-0 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-transparent"
          type="range" min={minimum} max={maximum} step="1000" value={priceRange.min}
          onChange={(event) => setPriceRange((current) => ({ ...current, min: Math.min(Number(event.target.value), current.max - 1000) }))}
          onPointerUp={applyPriceRange} onKeyUp={applyPriceRange}
        />
        <input
          aria-label="Harga maksimum"
          className="pointer-events-none absolute inset-0 z-4 h-4.5 w-full appearance-none bg-transparent opacity-0 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-transparent"
          type="range" min={minimum} max={maximum} step="1000" value={priceRange.max}
          onChange={(event) => setPriceRange((current) => ({ ...current, max: Math.max(Number(event.target.value), current.min + 1000) }))}
          onPointerUp={applyPriceRange} onKeyUp={applyPriceRange}
        />
      </div>
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-1.25 text-[10px] text-[#aaa]">
        <span>Rp</span>
        <span className="overflow-hidden bg-[#f7f7f7] px-1.75 py-1.25 text-ellipsis whitespace-nowrap">{priceRange.min.toLocaleString("id-ID")}</span>
        <span className="whitespace-nowrap">- Rp</span>
        <span className="overflow-hidden bg-[#f7f7f7] px-1.75 py-1.25 text-ellipsis whitespace-nowrap">{priceRange.max.toLocaleString("id-ID")}</span>
      </div>
    </section>
  );
}

function ProductFilter({ values, groups, onApply, onReset }) {
  const [collapsed, setCollapsed] = useState({});
  const [filtersCollapsed, setFiltersCollapsed] = useState(false);

  function toggleSection(name) {
    setCollapsed((current) => ({ ...current, [name]: !current[name] }));
  }

  return (
    <aside className="self-start bg-transparent pb-3 max-[900px]:mb-5.5 max-[900px]:grid max-[900px]:grid-cols-2 max-[900px]:gap-x-3 max-[640px]:gap-x-2 max-[520px]:grid-cols-1" aria-label="Filter produk">
      <div className="col-span-full mb-0.5 flex items-center justify-between">
        <h2 className="m-0 text-[15px] font-bold text-(--color-ink)">
          URUTKAN BERDASARKAN
        </h2>
        <button
          type="button"
          className="grid h-6 w-6 place-items-center border-0 bg-transparent p-0"
          onClick={() => setFiltersCollapsed((current) => !current)}
          aria-label={filtersCollapsed ? "Buka semua filter" : "Tutup semua filter"}
          aria-expanded={!filtersCollapsed}
        >
          <Chevron collapsed={filtersCollapsed} />
        </button>
      </div>
      {!filtersCollapsed && (
        <>
          <PriceRangeFilter
            key={`${values.min_price || ""}:${values.max_price || ""}`}
            minPrice={values.min_price}
            maxPrice={values.max_price}
            onApply={onApply}
          />
          {Object.entries(filterLabels).map(([name, label]) => {
            const options = groups?.[name] || [];
            const isCollapsed = Boolean(collapsed[name]);
            const panelId = `filter-options-${name}`;

            return (
              <section className="min-w-0 border-t-[5px] border-t-white" key={name}>
                <h3 className="m-0">
                  <button
                    type="button"
                    className="flex min-h-7.25 w-full cursor-pointer items-center justify-between border-0 bg-[#f3f3f3] px-3 py-1.25 text-left text-[14px] font-semibold text-[#575757] focus-visible:outline-2 focus-visible:outline-(--color-brand) focus-visible:outline-offset-2"
                    onClick={() => toggleSection(name)}
                    aria-expanded={!isCollapsed}
                    aria-controls={panelId}
                  >
                    <span>{label}</span>
                    <Chevron collapsed={isCollapsed} />
                  </button>
                </h3>
                {!isCollapsed && (
                  <div className="grid gap-1 px-3 pt-1 pb-2.5" id={panelId}>
                    {options.map(({ value, count }) => (
                      <label className="flex min-h-4.5 min-w-0 cursor-pointer items-center gap-2 text-[13px] text-[#8b8b8b]" key={value}>
                        <input
                          className="m-0 h-3 w-3 accent-(--color-brand)"
                          type="checkbox"
                          checked={values[name] === value}
                          onChange={() =>
                            onApply(name, values[name] === value ? "" : value)
                          }
                        />
                        <span className="min-w-0 flex-1">{value}</span>
                        <span className="ml-auto whitespace-nowrap text-[#999]">({count})</span>
                      </label>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
          <button
            className="mt-2 ml-3 cursor-pointer border-0 bg-transparent p-0 text-[12px] text-[#888] underline"
            type="button"
            onClick={onReset}
          >
            Reset filter
          </button>
        </>
      )}
    </aside>
  );
}

export default ProductFilter;
