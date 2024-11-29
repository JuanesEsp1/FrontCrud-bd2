'use client'
import { FaCalculator, FaBox } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { BiLogOut } from "react-icons/bi";

const Sidebar = ({isOpen, setIsOpen}) => {
 
    const router = useRouter();

    return (
        <div className="bg-[#3C3E6C] text-white h-screen w-20 flex flex-col justify-between items-center">
            <div className='w-full h-full max-h-[400px] text-xl flex flex-col items-center justify-start'>
                <div className="w-full h-24 flex items-center justify-center hover:bg-white hover:text-[#54307f]  cursor-pointer">
                    logo
                </div>
                <div title='Productos' className='w-full h-20   ' >
                    <div onClick={()=>setIsOpen(1)}  className={`w-full h-full flex items-center justify-center hover:transition-all duration-300 hover:bg-white cursor-pointer hover:text-[#54307f] ${isOpen === 3 ? 'bg-slate-50 text-[#54307f]' : ''}`}>
                        <FaBox />
                    </div>
                </div>
            </div>
            <div className='w-full ' >
                <div onClick={()=>router.push('/')}  className={`w-full h-20 flex items-center justify-center  hover:bg-slate-50 cursor-pointer hover:text-[#54307f] ${isOpen === 2 ? 'bg-slate-50 text-[#54307f]' : ''}`}>
                    <BiLogOut className='p-5 w-full h-full hover:text-[#54307f] hover:transition-all duration-300 hover:-translate-x-1'  />
                </div>
            </div>
            
            
        </div>
    );
};

export default Sidebar;
