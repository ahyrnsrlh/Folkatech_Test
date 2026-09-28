import { Link } from "react-router-dom";

function AuthFooter({ prompt, linkLabel, to }) {
  return (
    <p className="m-0 text-center text-(--color-muted)">
      {prompt}{" "}
      <Link
        className="font-bold text-(--color-brand-dark) no-underline hover:text-(--color-brand)"
        to={to}
      >
        {linkLabel}
      </Link>
    </p>
  );
}

export default AuthFooter;
