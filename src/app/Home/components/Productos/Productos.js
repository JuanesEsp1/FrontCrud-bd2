"use client";

import useProductos from "./useProductos";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import Modal from "../../../components/modal/Modal"
import { FiSearch } from "react-icons/fi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";


const Productos = () => {
  const {
    handleAddProduct,
    isModalOpen,
    setIsModalOpen,
    newProduct,
    setNewProduct,
    handleUpdateProduct,
    handleEditProduct,
    isEditModalOpen,
    setIsEditModalOpen,
    editProduct,
    setEditProduct,
    busqueda,
    setBusqueda,
    alertDelete,
    productosActuales,
    paginaActual,
    cambiarPagina,
    totalPaginas,
    categorias,
    stockBajo,
    busquedaSelect,
    setBusquedaSelect
  } = useProductos();


  return (
    <div className="container mx-auto pt-6 flex flex-col gap-4">
      {stockBajo.length > 0 && (
      <div className="rounded-md bg-yellow-50 p-4">
        <div className="flex">
          <div className="shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-yellow-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
          </div>
          <div className="ml-3">
              <h3 className="text-xl font-medium text-yellow-800">Stock bajo en {stockBajo.length} productos</h3>
            <div className="mt-2 text-lg text-yellow-700">
              <p>
                Algunos productos tienen un stock bajo. Te recomendamos revisar los niveles de inventario para evitar rupturas de stock y garantizar la disponibilidad para tus clientes. 🛒
              </p>
            </div>
          </div>
        </div>
      </div>
      )}
      <div className="w-full flex flex-row gap-2 items-center">
        <div className="w-full flex flex-row justify-between gap-2 items-center">
          <div className="text-2xl font-bold flex flex-row gap-2 items-center mb-2">
            <div>Agregar Productos</div>
            <button
              className="bg-[#7F88D5] text-white font-bold py-2 px-4 rounded-md"
              onClick={() => setIsModalOpen(true)}>
              <MdAdd />
            </button>
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <div>
            <select
              value={busquedaSelect}
              onChange={(e) => {
                setBusquedaSelect(e.target.value);
              }}
              className="p-2 border border-gray-300 rounded-md outline-none">
              <option disabled value="">Categorias</option>
              <option value="">ninguna</option>
              {categorias.map((categoria, index) => (
                <option key={index} value={categoria.id}>{categoria.nombre}</option>
              ))}
            </select>
          </div>
          <div className="relative flex flex-row gap-2 items-center">
            <FiSearch className="absolute left-2 text-2xl text-gray-500"/>
            <input
              disabled={busquedaSelect.length > 0 ? true : false}
              className={`${busquedaSelect.length > 0 ? 'cursor-not-allowed bg-gray-200' : ''} p-2 pl-10 pr-4 border-[1.5px] border-gray-300 rounded-2xl outline-none`}
              type="text"
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="min-w-full overflow-y-auto h-[60vh] shadow-lg mt-2 shadow-slate-300 rounded-lg">
        <table className="min-w-full table-auto bg-white  rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6">ID</th>
              <th className="py-3 px-6">Nombre</th>
              <th className="py-3 px-6">Categoría</th>
              <th className="py-3 px-6">Precio</th>
              <th className="py-3 px-6">stock</th>
              <th className="py-3 px-6">Activo</th>
              <th className="py-3 px-6">Stock minimo</th>
              <th className="py-3 px-6">Fecha de Creación</th>
              <th className="py-3 px-6">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-md  font-normal">
            {productosActuales.map((producto) => (
              <tr
                key={producto.id}
                className={`border-b border-gray-200 hover:bg-gray-100 ${producto.stock < producto.stockMinimo ? 'bg-red-100 hover:bg-red-200' : ''} `}
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {producto.id}
                </td>
                <td className="py-3 px-6 text-left">{producto.nombre}</td>
                <td className="py-3 px-6 text-left">{
                  categorias.map((categoria) => (
                    categoria.id === producto.categoria ? categoria.nombre : ''
                  ))
                }</td>
                <td className="py-3 px-6 text-left">{producto.precio}</td>
                <td className="py-3 px-6 text-center">{producto.stock}</td>
                <td className="py-3 px-6 text-center">
                  {producto.estado === 'true' ? (
                    <span className="bg-[#99A5E0] text-white py-2 px-4 rounded-full text-md">
                      Activo
                    </span>
                  ) : (
                    <span className="bg-red-200 text-red-700 py-2 px-4 rounded-full text-md">
                      Inactivo
                    </span>
                  )}
                </td>
                <td className="py-3 px-6 text-center">
                  {producto.stockMinimo}
                </td>
                <td className="py-3 px-6 text-center">
                  {producto.fecha}
                </td>
                <td className="py-3 px-6 text-center flex justify-center gap-2">
                  <button
                    onClick={() => handleEditProduct(producto.id)}
                    className="bg-blue-500 text-lg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    <MdEdit />
                  </button>
                  <button
                    onClick={() => alertDelete(producto.id)}
                    className="bg-red-500 text-lg hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-end">
        <div className="flex items-center gap-2 bg-white p-4 rounded-lg text-lg shadow">
          <button
            onClick={() => cambiarPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
            className={`p-2 rounded-full ${paginaActual === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-[#7F88D5] hover:bg-[#7F88D5] hover:text-white'
              }`}
          >
            <IoIosArrowBack />
          </button>

          {(() => {
            let paginas = [];
            if (totalPaginas <= 5) {
              // Si hay 5 o menos páginas, mostrar todas
              paginas = [...Array(totalPaginas)].map((_, i) => i + 1);
            } else {
              // Si estamos en las primeras 3 páginas
              if (paginaActual <= 3) {
                paginas = [1, 2, 3, '...', totalPaginas];
              }
              // Si estamos en las últimas 3 páginas
              else if (paginaActual >= totalPaginas - 2) {
                paginas = [1, '...', totalPaginas - 2, totalPaginas - 1, totalPaginas];
              }
              // Si estamos en medio
              else {
                paginas = [1, '...', paginaActual, '...', totalPaginas];
              }
            }

            return paginas.map((pagina, index) => (
              pagina === '...' ? (
                <span key={`dots-${index}`} className="px-2 text-gray-500">...</span>
              ) : (
                <button
                  key={index}
                  onClick={() => cambiarPagina(pagina)}
                  className={`w-8 h-8 rounded-full ${paginaActual === pagina
                      ? 'bg-[#7F88D5] text-white'
                      : 'text-[#7F88D5] hover:bg-[#7F88D5] hover:text-white'
                    }`}
                >
                  {pagina}
                </button>
              )
            ));
          })()}

          <button
            onClick={() => cambiarPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
            className={`p-2 rounded-full ${paginaActual === totalPaginas
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-[#7F88D5] hover:bg-[#7F88D5] hover:text-white'
              }`}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>

      {isEditModalOpen === true ? (
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-2">Editar Producto</h2>
        <div className="w-full h-[1px] bg-gray-300 mb-3"></div>
        <form
          className="w-[500px]  flex flex-col justify-center gap-4 "
          onSubmit={handleUpdateProduct}>
          <input
            className="p-2 border border-gray-300 rounded-md outline-none"
            type="text"
            placeholder="Nombre"
            value={editProduct.nombre}  
            onChange={(e) => setEditProduct({ ...editProduct, nombre: e.target.value })}
            required
          />
          <select
            className="p-2 border border-gray-300 rounded-md outline-none"
            value={editProduct.categoria}
            onChange={(e) => setEditProduct({ ...editProduct, categoria: e.target.value })}
            required
          >
            <option disabled value="">Selecciona una categoría</option>
            {categorias.map((categoria, index) => (
              <option key={index} value={categoria.id}>{categoria.nombre}</option>
            ))}
          </select>
          <input
            className="p-2 border border-gray-300 rounded-md outline-none"
            type="number"
            placeholder="Precio"
            value={editProduct.precio}  
            onChange={(e) => setEditProduct({ ...editProduct, precio: e.target.value })}
            required
          />
          <input
            className="p-2 border border-gray-300 rounded-md outline-none"
            type="number"
            placeholder="Cantidad"
            value={editProduct.stock}  
            onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })}
            required
            />
          <select
            className="p-2 border border-gray-300 rounded-md outline-none"
            value={editProduct.estado}
            onChange={(e) => setEditProduct({ ...editProduct, estado: e.target.value })}
            required
          >
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
          <input
            className="p-2 border border-gray-300 rounded-md outline-none"
            type="number"
            placeholder="Stock minimo"
            value={editProduct.stockMinimo}  
            onChange={(e) => setEditProduct({ ...editProduct, stockMinimo: e.target.value })}
            required
          />
          <div className="flex justify-end gap-2"> 
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded-md">
                Cancelar
              </button>
              <button
                type="submit"
                onClick={handleUpdateProduct}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md">
                Editar
              </button>
          </div>
        </form>
      </Modal>
      ) :
      null
      }

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-2xl font-bold mb-2">Agregar Producto</h2>
        <div className="w-full h-[1px] bg-gray-300 mb-3"></div>
        <form
          className="w-[500px]  flex flex-col justify-center gap-4 "
          onSubmit={handleAddProduct}>
          <input
            className="p-2 border border-gray-300 rounded-md outline-none"
            type="text"
            placeholder="Nombre"
            value={newProduct.nombre}
            onChange={(e) => setNewProduct({ ...newProduct, nombre: e.target.value })} required
          />
          <select
            className="p-2 border border-gray-300 rounded-md outline-none"
            value={newProduct.categoria}
            onChange={(e) => setNewProduct({ ...newProduct, categoria: e.target.value })}
            required
          >
            <option disabled value="">Selecciona una categoría</option>
            {categorias.map((categoria, index) => (
              <option key={index} value={categoria.id}>{categoria.nombre}</option>
            ))}
          </select>
          <input
            className="p-2 border border-gray-300 rounded-md outline-none"
            type="number"
            placeholder="Precio"
            value={newProduct.precio}
            onChange={(e) => setNewProduct({ ...newProduct, precio: e.target.value })}
            required
          />
          <input
            className="p-2 border border-gray-300 rounded-md outline-none "
            type="number"
            placeholder="Cantidad"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            required
          />
          <div className="flex justify-end gap-2"> 
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded-md">
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md">
              Agregar
            </button>
          </div>
        </form>
      </Modal>
      
    </div>
  );
};

export default Productos;
