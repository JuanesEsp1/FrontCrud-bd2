"use client";
import { useRouter } from 'next/navigation';
import { useLogin } from "./useLogin";
// import { getUsuarios } from "@/db";

export default function Login() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useLogin();



  const router = useRouter(); 

  // const onSubmit = (data) => {
  //   // Aquí iría la lógica para manejar el inicio de sesión
  //   console.log("Intento de inicio de sesión con:", data);
  //   const response = getUsuarios(data);
  //   console.log(response);
  //   if(response.length > 0){
  //     // router.push("/Home");
  //   }else{
  //     console.log("No se encontró el usuario");
  //   }
  //   console.log(response);
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <div className=" flex justify-center items-center">
          <div className="text-2xl font-bold mb-4">Iniciar Sesión</div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border rounded-md"
              {...register("email", {
                required: "El correo electrónico es requerido",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Correo electrónico inválido",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border rounded-md"
              {...register("password", {
                required: "La contraseña es requerida",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >  
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
