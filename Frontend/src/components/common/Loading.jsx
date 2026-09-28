function Loading({ label = "Memuat produk..." }) {
  return (
    <div className="grid min-h-[260px] place-content-center gap-2 border border-(--color-line) bg-white p-[30px] text-center text-(--color-muted)" role="status">
      <span className="mx-auto h-6 w-6 animate-spin rounded-full border-[3px] border-[#f5c5c3] border-t-(--color-brand)" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export default Loading;
