import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthButton from "../components/auth/AuthButton.jsx";
import AuthCard from "../components/auth/AuthCard.jsx";
import AuthDivider from "../components/auth/AuthDivider.jsx";
import AuthFooter from "../components/auth/AuthFooter.jsx";
import AuthInput from "../components/auth/AuthInput.jsx";
import PasswordInput from "../components/auth/PasswordInput.jsx";
import { useAuth } from "../context/useAuth.js";
import { login as loginRequest } from "../services/authService.js";

function getErrorMessage(error) {
  const response = error.response?.data;
  if (response?.errors?.length) return response.errors[0].message;
  return response?.message || "Gagal masuk. Silakan coba lagi.";
}

function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/products" replace />;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!form.email || !form.password) {
      setError("Email dan password wajib diisi.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Masukkan alamat email yang valid.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    try {
      const response = await loginRequest(form);
      login(response.data.data.token);
      navigate(location.state?.from?.pathname || "/products", {
        replace: true,
      });
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthCard title="Masuk">
      <form className="grid gap-[22px] max-[520px]:gap-[17px]" onSubmit={handleSubmit} noValidate>
        <AuthInput
          id="login-email"
          name="email"
          label="Email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
        />
        <PasswordInput
          id="login-password"
          name="password"
          label="Password"
          placeholder="Password"
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange}
        />
        <div className="mt-[-8px] flex justify-end">
          <button className="cursor-not-allowed border-0 bg-transparent p-0 text-(--color-brand-dark) opacity-[0.85]" type="button" disabled>
            Lupa Password?
          </button>
        </div>
        {error && (
          <p className="mt-[-5px] mb-0 text-[14px] leading-[1.4] text-[#b42318]" role="alert">
            {error}
          </p>
        )}
        <AuthButton type="submit" loading={isSubmitting}>
          MASUK
        </AuthButton>
      </form>
      <AuthDivider />
      <AuthFooter
        prompt="Belum punya akun?"
        linkLabel="Daftar Sekarang"
        to="/register"
      />
    </AuthCard>
  );
}

export default Login;
