import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/auth/AuthCard.jsx";
import AuthDivider from "../components/auth/AuthDivider.jsx";
import AuthFooter from "../components/auth/AuthFooter.jsx";
import RegisterStepOne from "../components/auth/RegisterStepOne.jsx";
import RegisterStepTwo from "../components/auth/RegisterStepTwo.jsx";
import { register as registerRequest } from "../services/authService.js";

const initialForm = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  password: "",
  password_confirmation: "",
};

function getErrorMessage(error) {
  const response = error.response?.data;
  if (response?.errors?.length) return response.errors[0].message;
  return response?.message || "Gagal membuat akun. Silakan coba lagi.";
}

function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
  }

  function validateStepOne() {
    if (!form.first_name || !form.last_name || !form.email) {
      return "Nama depan, nama belakang, dan email wajib diisi.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return "Masukkan alamat email yang valid.";
    }
    return "";
  }

  function validateStepTwo() {
    if (!form.phone || !form.password || !form.password_confirmation) {
      return "Nomor telepon, password, dan konfirmasi password wajib diisi.";
    }
    if (form.password.length < 8) {
      return "Password minimal 8 karakter.";
    }
    if (form.password !== form.password_confirmation) {
      return "Konfirmasi password tidak sesuai.";
    }
    return "";
  }

  function continueToStepTwo(event) {
    event.preventDefault();
    const validationError = validateStepOne();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setStep(2);
  }

  async function submitRegistration(event) {
    event.preventDefault();
    const validationError = validateStepTwo();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError("");
    try {
      await registerRequest(form);
      navigate("/login", { replace: true, state: { registered: true } });
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthCard title="Daftar Sekarang" className="min-h-[480px]">
      {step === 1 ? (
        <RegisterStepOne
          form={form}
          onChange={handleChange}
          error={error}
          onSubmit={continueToStepTwo}
        />
      ) : (
        <RegisterStepTwo
          form={form}
          onChange={handleChange}
          error={error}
          onSubmit={submitRegistration}
          onBack={() => {
            setStep(1);
            setError("");
          }}
          loading={isSubmitting}
        />
      )}
      <AuthDivider />
      <AuthFooter prompt="Sudah punya akun?" linkLabel="Masuk" to="/login" />
    </AuthCard>
  );
}

export default Register;
