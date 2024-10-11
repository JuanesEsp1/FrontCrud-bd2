"use client";

import imagen from "../asset/imgs/fondo4.jpg"

import { ToastContainer, toast } from "react-toastify"; 
import logicPage from "./logicPage";
import 'react-toastify/dist/ReactToastify.css'; // Importar los estilos de toastify
import Image from "next/image";

export default function Login() {
  

  const { onSubmit, register, handleSubmit, errors, showPassword, setShowPassword } = logicPage();
   
  return (
    
      <div className="w-full h-screen flex items-center relative justify-center">
        <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-l from-[#201A32] from-35% z-10"></div>
        <div className="w-[70%] h-full">
          <div className="w-full h-full flex justify-center items-center bg-black z-50">
            <Image 
              src={imagen} 
              alt="fondo" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-[30%] h-full flex justify-center pr-28 items-center z-20">
          <div className="w-[360px] p-8 rounded">
            <div className="w-full flex justify-center items-center">
              <div className="text-4xl font-bold text-white mb-10">Iniciar Sesión</div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6"> {/* Usar handleFormSubmit */}
              <div className="mb-4 relative z-0">
                <input 
                  type="email" 
                  id="correo" 
                  autoComplete="off"
                  className="block py-2.5 px-2 w-full text-lg text-white bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 peer" 
                  placeholder=" " 
                  {...register("correo", {
                    required: "El correo electrónico es requerido",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Correo electrónico inválido",
                    },
                  })}
                />
                <label 
                  htmlFor="correo" 
                  className="absolute text-lg text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Correo electrónico
                </label>
                {errors.correo && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.correo.message}
                  </p>
                )}
              </div>
              <div className="mb-4 relative z-0">
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  autoComplete="off"
                  className="block py-2.5 px-2 pr-9 w-full text-lg text-white bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 peer" 
                  placeholder=" " 
                  {...register("password", {
                    required: "La contraseña es requerida",
                    minLength: {
                      value: 5,
                      message: "La contraseña debe tener al menos 6 caracteres",
                    },
                  })}
                />
                {
                  !showPassword ?
                    <svg onClick={()=>setShowPassword(!showPassword)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-white size-6 absolute right-2 top-3.5 cursor-pointer">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.007 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  :
                    <svg onClick={()=>setShowPassword(!showPassword)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-white size-6 absolute right-2 top-3.5 cursor-pointer">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                }
                <label 
                  htmlFor="correo" 
                  className="absolute text-lg text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Contraseña
                </label>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-[#ce793c] text-white font-semibold text-lg p-2 rounded-md hover:bg-[#d5914a]"
              >
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
        <ToastContainer /> {/* Contenedor de notificaciones */}
      </div>
  );
}
