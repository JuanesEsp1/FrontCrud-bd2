'use client'
import { FaShoppingCart, FaUsers, FaCalculator, FaUser, FaShoppingBasket, FaCog, FaClipboardList } from 'react-icons/fa';

const Sidebar = ({isOpen, setIsOpen}) => {
 
 

    return (
        <div className="bg-[#3C3E6C] text-white h-screen w-20 flex flex-col justify-between items-center py-4">
            <div className='w-full h-full max-h-[400px] text-xl flex flex-col items-center justify-center'>
                <div className="w-full h-full flex items-center justify-center mb-4 hover:bg-white hover:text-[#54307f]  cursor-pointer">
                    logo
                </div>
                <div title='Clientes' className='w-full h-full'>
                    <div onClick={()=>setIsOpen(1)}  className={`w-full h-full flex items-center justify-center mb-4 hover:bg-slate-50 cursor-pointer hover:text-[#54307f] ${isOpen === 1 ? 'bg-slate-50 text-[#54307f]' : ''}`}>
                        <FaShoppingCart />
                    </div>
                </div>
                <div title='Inventario' className='w-full h-full' >
                    <div onClick={()=>setIsOpen(2)}  className={`w-full h-full flex items-center justify-center mb-4 hover:bg-slate-50 cursor-pointer hover:text-[#54307f] ${isOpen === 2 ? 'bg-slate-50 text-[#54307f]' : ''}`}>
                        <FaClipboardList />
                    </div>
                </div>
                <div title='Productos' className='w-full h-full   ' >
                    <div onClick={()=>setIsOpen(3)}  className={`w-full h-full flex items-center justify-center mb-4 hover:bg-slate-50 cursor-pointer hover:text-[#54307f] ${isOpen === 3 ? 'bg-slate-50 text-[#54307f]' : ''}`}>
                        <FaCalculator />
                    </div>
                </div>
                <div title='Usuarios' className='w-full h-full' >
                    <div onClick={()=>setIsOpen(4)}  className={`w-full h-full flex items-center justify-center mb-4 hover:bg-slate-50 cursor-pointer hover:text-[#54307f] ${isOpen === 4 ? 'bg-slate-50 text-[#54307f]' : ''}`}>
                        <FaUsers />
                    </div>
                </div>
                <div title='Ventas' className='w-full h-full' >
                    <div onClick={()=>setIsOpen(5)}  className={`w-full h-full flex items-center justify-center mb-4 hover:bg-slate-50 cursor-pointer hover:text-[#54307f] ${isOpen === 5 ? 'bg-slate-50 text-[#54307f]' : ''}`}>
                        <FaShoppingBasket />
                    </div>
                </div>
            </div>
                <div className='w-full ' >
                    <div onClick={()=>setIsOpen(6)}  className={`w-full h-full flex items-center justify-center mb-4 hover:bg-slate-50 cursor-pointer hover:text-[#54307f] ${isOpen === 6 ? 'bg-slate-50 text-[#54307f]' : ''}`}>
                        <FaCog />
                    </div>
                </div>
            
            
        </div>
    );
};

export default Sidebar;
