function EmptyState() {
  return (
    <div className="grid min-h-[260px] place-content-center gap-2 border border-(--color-line) bg-white p-[30px] text-center text-(--color-muted)">
      <p className="m-0 font-bold text-(--color-ink)">Tidak ada produk yang ditemukan.</p>
      <span>Coba ubah pencarian atau filter.</span>
    </div>
  );
}

export default EmptyState;
