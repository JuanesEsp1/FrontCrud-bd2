'use client';
import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Clientes from "./components/Clientes/Clientes";
import Productos from "./components/Productos/Productos";
import Usuarios from "./components/Usuarios/Usuarios";
import Ventas from "./components/Ventas/Ventas";
import Inventario from "./components/Inventario/Inventario";

const Home = () => {
 
    const [isOpen, setIsOpen] = useState(3);

    return (
        <div className="w-full h-full flex flex-row">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="w-full h-screen flex flex-col">
                    <div className="w-full h-28 bg-slate-200">
                        <div className="w-[400px] h-20 flex items-center pl-6 text-4xl font-semibold text-white bg-gradient-to-r from-[#3C3E6C] via-[#5555AD] to-[#7F88D5]">
                            {
                                isOpen === 1? 'Seccion de Clientes'
                                    : isOpen === 2? 'Seccion de Inventario'
                                    : isOpen === 3? 'Seccion de Productos'
                                    : isOpen === 4? 'Seccion de Usuarios'
                                    : isOpen === 5? 'Seccion de Ventas'
                                    : null
                            }
                        </div>
                    </div>
                <div className="w-full h-full overflow-y-auto">
                    {
                        isOpen === 1 ? <Clientes />
                            : isOpen === 2 ? <Inventario />
                                : isOpen === 3 ? <Productos />
                                    : isOpen === 4 ? <Usuarios />
                                        : isOpen === 5 ? <Ventas />
                                            : null
                    }
                </div>
            </div>
            
        </div>
    );
}

export default Home;
