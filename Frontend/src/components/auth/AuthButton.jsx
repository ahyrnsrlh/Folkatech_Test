function AuthButton({ children, loading = false, ...props }) {
  return (
    <button
      className="min-h-[58px] cursor-pointer rounded-[7px] border-0 bg-(--color-brand) font-(--font-display) text-[17px] font-extrabold tracking-[0.02em] text-white uppercase shadow-[0_3px_5px_rgb(0_0_0_/_16%)] transition-[background,transform] duration-150 enabled:hover:bg-(--color-brand-dark) enabled:hover:-translate-y-px disabled:cursor-wait disabled:opacity-[0.65]"
      disabled={loading}
      {...props}
    >
      {loading ? "Memproses..." : children}
    </button>
  );
}

export default AuthButton;
