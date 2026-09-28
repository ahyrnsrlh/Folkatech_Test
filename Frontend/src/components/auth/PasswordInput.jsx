import { useState } from "react";

function PasswordInput({ id, name, label, ...props }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <label className="sr-only" htmlFor={id}>
        {label || props.placeholder}
      </label>
      <input
        id={id}
        name={name}
        type={visible ? "text" : "password"}
        className="min-h-[58px] w-full rounded-[7px] border border-[#e7e7e7] bg-white py-0 pr-[78px] pl-[18px] text-(--color-ink) shadow-[0_2px_5px_rgb(0_0_0_/_8%)] outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-(--color-muted) focus:border-(--color-brand) focus:shadow-[0_0_0_3px_rgb(239_61_54_/_12%)]"
        {...props}
      />
      <button
        className="absolute top-1/2 right-[17px] -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0 text-(--color-brand-dark) hover:text-(--color-brand)"
        type="button"
        onClick={() => setVisible((current) => !current)}
        aria-label={visible ? "Sembunyikan password" : "Tampilkan password"}
      >
        {visible ? "Sembunyikan" : "Show"}
      </button>
    </div>
  );
}

export default PasswordInput;
