function AuthFormError({ error }) {
  if (!error) return null;

  return (
    <p className="mt-[-5px] mb-0 text-[14px] leading-[1.4] text-[#b42318]" role="alert">
      {error}
    </p>
  );
}

export default AuthFormError;
