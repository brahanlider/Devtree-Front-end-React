import { Link } from "react-router-dom";

export default function HomeNavigation() {
  return (
    <>
      <Link
        className="p-2 text-xs font-black text-white uppercase cursor-pointer"
        to="/auth/login"
      >
        Iniciar Sesión
      </Link>

      <Link
        className="p-2 text-xs font-black text-black uppercase rounded-lg cursor-pointer bg-lime-500"
        to="/auth/register"
      >
        Registrarme
      </Link>
    </>
  );
}
