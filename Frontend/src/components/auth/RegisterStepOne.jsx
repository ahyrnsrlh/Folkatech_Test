import AuthButton from "./AuthButton.jsx";
import AuthFormError from "./AuthFormError.jsx";
import AuthInput from "./AuthInput.jsx";

function RegisterStepOne({ form, onChange, error, onSubmit }) {
  return (
    <form className="grid gap-[22px] max-[520px]:gap-[17px]" onSubmit={onSubmit} noValidate>
      <AuthInput
        id="register-first-name"
        name="first_name"
        label="Nama Depan"
        placeholder="Nama Depan"
        autoComplete="given-name"
        value={form.first_name}
        onChange={onChange}
      />
      <AuthInput
        id="register-last-name"
        name="last_name"
        label="Nama Belakang"
        placeholder="Nama Belakang"
        autoComplete="family-name"
        value={form.last_name}
        onChange={onChange}
      />
      <AuthInput
        id="register-email"
        name="email"
        label="Email"
        type="email"
        placeholder="Email"
        autoComplete="email"
        value={form.email}
        onChange={onChange}
      />
      <AuthFormError error={error} />
      <AuthButton type="submit">SELANJUTNYA</AuthButton>
    </form>
  );
}

export default RegisterStepOne;
