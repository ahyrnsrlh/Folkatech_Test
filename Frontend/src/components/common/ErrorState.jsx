function ErrorState({ message, onRetry }) {
  return (
    <div className="grid min-h-[260px] place-content-center gap-2 border border-(--color-line) bg-white p-[30px] text-center text-(--color-muted)" role="alert">
      <p className="m-0 font-bold text-[#b42318]">{message}</p>
      <button className="justify-self-center cursor-pointer border-0 bg-transparent font-bold text-(--color-brand-dark)" type="button" onClick={onRetry}>
        Coba lagi
      </button>
    </div>
  );
}

export default ErrorState;
