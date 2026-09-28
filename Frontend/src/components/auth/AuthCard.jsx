function AuthCard({ title, children, className = "" }) {
  return (
    <main className="grid min-h-screen grid-cols-[minmax(0,1fr)] place-items-center bg-(--color-canvas) px-5 py-8">
      <section
        className={`w-full min-w-0 max-w-[556px] rounded-[10px] border border-[#ededed] bg-white px-[34px] pt-10 pb-8 shadow-[0_8px_22px_rgb(0_0_0_/_10%)] max-[520px]:px-5 max-[520px]:pt-[30px] max-[520px]:pb-[26px] ${className}`.trim()}
        aria-labelledby="auth-title"
      >
        <h1
          id="auth-title"
          className="mb-[30px] font-(--font-display) text-[clamp(28px,4vw,34px)] leading-[1.1] font-extrabold text-(--color-brand-dark)"
        >
          {title}
        </h1>
        {children}
      </section>
    </main>
  );
}

export default AuthCard;
