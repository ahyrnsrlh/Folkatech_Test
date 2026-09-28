const sortOptions = [
  ["", "Produk Terbaru"],
  ["name", "Nama Produk"],
  ["price", "Harga"],
  ["rating", "Rating"],
  ["review_count", "Jumlah Review"],
  ["created_at", "Tanggal"],
];

function ProductSort({ sort, order, onChange }) {
  return (
    <label className="flex items-center justify-between gap-1.5 whitespace-nowrap text-[12px] text-(--color-muted) max-[640px]:w-full max-[640px]:flex-wrap max-[640px]:justify-start">
      <span>Urutkan</span>
      <select className="min-h-7.25 rounded-xs border border-(--color-line) bg-white px-2 text-[12px] text-(--color-ink)" name="sort" value={sort} onChange={onChange}>
        {sortOptions.map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <select
        className="hidden"
        name="order"
        value={order}
        onChange={onChange}
        aria-label="Arah pengurutan"
      >
        <option value="asc">Naik</option>
        <option value="desc">Turun</option>
      </select>
    </label>
  );
}

export default ProductSort;
