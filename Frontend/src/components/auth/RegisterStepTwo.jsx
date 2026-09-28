import AuthButton from "./AuthButton.jsx";
import AuthFormError from "./AuthFormError.jsx";
import AuthInput from "./AuthInput.jsx";
import PasswordInput from "./PasswordInput.jsx";

function RegisterStepTwo({ form, onChange, error, onSubmit, onBack, loading }) {
  return (
    <>
      <button className="mb-7 flex items-center gap-2 border-0 bg-transparent p-0 text-[17px] font-bold text-(--color-brand-dark) hover:text-(--color-brand)" type="button" onClick={onBack}>
        <span aria-hidden="true">&#8592;</span> Kembali
      </button>
      <form className="grid gap-[22px] max-[520px]:gap-[17px]" onSubmit={onSubmit} noValidate>
        <AuthInput
          id="register-phone"
          name="phone"
          label="Nomor Telepon"
          placeholder="Nomor Telepon"
          autoComplete="tel"
          value={form.phone}
          onChange={onChange}
        />
        <PasswordInput
          id="register-password"
          name="password"
          label="Password"
          placeholder="Password"
          autoComplete="new-password"
          value={form.password}
          onChange={onChange}
        />
        <PasswordInput
          id="register-password-confirmation"
          name="password_confirmation"
          label="Konfirmasi Password"
          placeholder="Konfirmasi Password"
          autoComplete="new-password"
          value={form.password_confirmation}
          onChange={onChange}
        />
        <AuthFormError error={error} />
        <AuthButton type="submit" loading={loading}>
          SELANJUTNYA
        </AuthButton>
      </form>
    </>
  );
}

export default RegisterStepTwo;
