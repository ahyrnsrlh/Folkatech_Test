function AuthInput({ id, name, label, error, className = "", ...props }) {
  return (
    <div>
      <label className="sr-only" htmlFor={id}>
        {label || props.placeholder}
      </label>
      <input
        id={id}
        name={name}
        aria-invalid={Boolean(error)}
        className={`min-h-[58px] w-full rounded-[7px] border border-[#e7e7e7] bg-white px-[18px] text-(--color-ink) shadow-[0_2px_5px_rgb(0_0_0_/_8%)] outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-(--color-muted) focus:border-(--color-brand) focus:shadow-[0_0_0_3px_rgb(239_61_54_/_12%)] ${className}`.trim()}
        {...props}
      />
      {error && <p className="mt-[-5px] mb-0 text-[14px] leading-[1.4] text-[#b42318]">{error}</p>}
    </div>
  );
}

export default AuthInput;
