import { useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import ErrorMessage from "../components/ErrorMessage";
import { ProfileForm, TUser } from "../types";
import { updateImage, updateUser } from "../api/DevTreeApi";
import { toast } from "sonner";

export default function ProfileView() {
  const queryClient = useQueryClient();
  const data: TUser = queryClient.getQueryData(["user"])!;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues: {
      handle: data.handle,
      description: data.description,
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: updateImage,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], (prevData: TUser) => {
        return {
          ...prevData,
          image: data,
        };
      });
      // ({ queryKey: ["user"] }); // Optimistic Updates
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      uploadImageMutation.mutate(e.target.files[0]);
    }
  };

  const handleUserProfileForm = (formData: ProfileForm) => {
    updateProfileMutation.mutate(formData);
  };

  return (
    <form
      className="p-10 space-y-5 bg-white rounded-lg"
      onSubmit={handleSubmit(handleUserProfileForm)}
    >
      <legend className="text-2xl text-center text-slate-800">
        Editar Información
      </legend>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Handle:</label>
        <input
          type="text"
          className="p-2 border-none rounded-lg bg-slate-100"
          placeholder="handle o Nombre de Usuario"
          {...register("handle", {
            required: "El nombre de Usuario es obligatorio",
          })}
        />
        {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="description">Descripción:</label>
        <textarea
          className="p-2 border-none rounded-lg bg-slate-100"
          placeholder="Tu Descripción"
          {...register("description", {
            required: "El nombre de Usuario es obligatorio",
          })}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Imagen:</label>
        <input
          id="image"
          type="file"
          name="handle"
          className="p-2 border-none rounded-lg bg-slate-100"
          accept="image/*"
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="w-full p-2 text-lg font-bold uppercase rounded-lg cursor-pointer bg-cyan-400 text-slate-600"
        value="Guardar Cambios"
      />
    </form>
  );
}
