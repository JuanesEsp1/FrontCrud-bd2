'use client';
import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Productos from "./components/Productos/Productos";

const Home = () => {
 
    const [isOpen, setIsOpen] = useState(1);

    return (
        <div className="w-full h-full flex flex-row">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="w-full h-screen flex flex-col">
                    <div className="w-full h-28 bg-slate-200">
                        <div className="w-[400px] h-20 flex items-center pl-6 text-4xl font-semibold text-white bg-gradient-to-r from-[#3C3E6C] via-[#5555AD] to-[#7F88D5]">
                            {
                                isOpen === 1? 'Seccion de Productos'
                                    : null
                            }
                        </div>
                    </div>
                <div className="w-full h-full bg-white overflow-y-auto">
                    {
                        isOpen === 1 ? <Productos />
                            : null
                    }
                </div>
            </div>
            
        </div>
    );
}

export default Home;
