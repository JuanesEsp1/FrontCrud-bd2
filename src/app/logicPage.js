import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importar los estilos
import { useEffect, useState } from "react";

const logicPage = () => {

    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter(); 

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // // Inicializar el toast

    const onSubmit = async (data) => {
        console.log(data);
        
        const payload = {
            usuario: data.usuario,
            password: data.password
        };

        try {
            // Hacer la solicitud POST al servidor Express
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload), // Enviar los datos del formulario
            });

            const result = await response.json();

            if (response.ok) {
                // Mostrar mensaje de éxito con toast
                toast.success("¡Inicio de sesión exitoso!");
                console.log('Usuario autenticado:', result.user);
                // Redirigir al usuario o guardar un token
                router.push('/Home'); // Ejemplo de redirección
            } else {
                // Mostrar mensaje de error con toast
                toast.error("Error al iniciar sesión.");
            }
        } catch (error) {
            console.error('Error al realizar el login:', error);
            // Mostrar mensaje de error del servidor
            toast.error('Error en el servidor');
        }
    };
    
    return {
        onSubmit,
        register,
        handleSubmit,
        errors,
        showPassword,
        setShowPassword
    };
};

export default logicPage;
