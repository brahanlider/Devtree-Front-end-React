import { Link } from "react-router-dom";

export default function LoginView() {
  return (
    <>
      <h1 className="text-4xl font-bold text-white">Iniciar Sesión</h1>


      
      <nav className="mt-10">
        <Link
          to="/auth/register"
          className="block text-lg text-center text-white"
        >
          ¿No tienes cuentas? Registrate
        </Link>
      </nav>
    </>
  );
}
