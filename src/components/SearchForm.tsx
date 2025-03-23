import { useForm } from "react-hook-form";
import slugify from "react-slugify";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "./ErrorMessage";
import { searchByHandle } from "../api/DevTreeApi";
import { Link } from "react-router-dom";

export default function SearchForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      handle: "",
    },
  });

  const mutation = useMutation({
    mutationFn: searchByHandle,
  });

  const handle = watch("handle");

  const handleSearch = () => {
    const slug = slugify(handle);
    mutation.mutate(slug);
  };
  // console.log(mutation);

  return (
    <form onSubmit={handleSubmit(handleSearch)} className="space-y-5">
      <div className="relative flex items-center px-2 bg-white">
        <label htmlFor="handle">devtree.com/</label>
        <input
          type="text"
          id="handle"
          className="flex-1 p-2 bg-transparent border-none focus:ring-0"
          placeholder="elonmusk, zuck, jeffbezos"
          {...register("handle", {
            required: "Un Nombre de Usuario es obligatorio",
          })}
        />
      </div>
      {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}

      <div className="mt-10">
        {mutation.isPending && <p className="text-center">Cargando ....</p>}
        {mutation.error && (
          <p className="font-black text-center text-red-600">
            {mutation.error.message}
          </p>
        )}
        {mutation.data && (
          <p className="font-bold text-center text-cyan-500">
            {mutation.data} ir a{" "}
            <Link
              state={{ handle: slugify(handle) }}
              to={"/auth/register"}
              className="font-black text-cyan-800"
            >
              Registro
            </Link>
          </p>
        )}
      </div>

      <input
        type="submit"
        className="w-full p-3 text-lg font-bold uppercase rounded-lg cursor-pointer bg-cyan-400 text-slate-600"
        value="Obtener mi DevTree"
      />
    </form>
  );
}
