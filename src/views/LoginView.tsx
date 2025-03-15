import { Link } from "react-router-dom";

export default function LoginView() {
  return (
    <>
      <div className="text-2xl text-red-600">LoginView</div>
      <nav>
        <Link to="/auth/register">¿No tienes cuentas? Registrate</Link>
      </nav>
    </>
  );
}
