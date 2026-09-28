function PageArrow({ previous = false }) {
  return (
    <svg
      className={`h-3 w-3 ${previous ? "rotate-180" : ""}`}
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
    >
      <path d="m3 1 4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const buttonClasses =
    "grid h-[34px] min-w-[34px] cursor-pointer place-items-center border border-(--color-line) bg-white text-(--color-ink) disabled:cursor-not-allowed disabled:opacity-45";

  return (
    <nav className="mt-7 flex justify-center gap-1" aria-label="Pagination produk">
      <button
        className={buttonClasses}
        type="button"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        aria-label="Halaman sebelumnya"
      >
        <PageArrow previous />
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (number) => (
          <button
            type="button"
            className={`${buttonClasses} ${number === page ? "border-(--color-brand) bg-(--color-brand) text-white" : ""}`}
            key={number}
            onClick={() => onChange(number)}
            aria-current={number === page ? "page" : undefined}
          >
            {number}
          </button>
        ),
      )}
      <button
        className={buttonClasses}
        type="button"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        aria-label="Halaman berikutnya"
      >
        <PageArrow />
      </button>
    </nav>
  );
}

export default Pagination;
