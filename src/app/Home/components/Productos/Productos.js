"use client";

import useProductos from "./useProductos";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import Modal from "../../../components/modal/Modal"
import { FiSearch } from "react-icons/fi";


const Productos = () => {
  const {
    producto,
    formatText,
    handleAddProduct,
    isModalOpen,
    setIsModalOpen,
    newProduct,
    setNewProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleEditProduct,
    isEditModalOpen,
    setIsEditModalOpen,
    editProduct,
    setEditProduct,
    busqueda,
    setBusqueda,
    productosFiltrados,
    alertDelete
  } = useProductos();


  return (
    <div className="container mx-auto pt-6 flex flex-col gap-4">
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
        <div className="relative flex flex-row gap-2 items-center">
          <FiSearch className="absolute left-2 text-2xl text-gray-500"/>
          <input
            className="p-2 pl-10 pr-4 border-[1.5px] border-gray-300 rounded-2xl outline-none"
            type="text"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>
      <div className="min-w-full overflow-y-auto h-[70vh] shadow-lg mt-2 shadow-slate-300 rounded-lg">
        <table className="min-w-full table-auto bg-white  rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6">ID</th>
              <th className="py-3 px-6">Nombre</th>
              <th className="py-3 px-6">Descripción</th>
              <th className="py-3 px-6">Precio</th>
              <th className="py-3 px-6">Cantidad</th>
              <th className="py-3 px-6">Activo</th>
              <th className="py-3 px-6">Fecha de Creación</th>
              <th className="py-3 px-6">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-md  font-normal">
            {productosFiltrados.map((producto) => (
              <tr
                key={producto.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {producto.id}
                </td>
                <td className="py-3 px-6 text-left">{producto.nombre}</td>
                <td className="py-3 px-6 text-left">{formatText(producto.descripcion)}</td>
                <td className="py-3 px-6 text-left">{producto.precio}</td>
                <td className="py-3 px-6 text-center">{producto.cantidad}</td>
                <td className="py-3 px-6 text-center">
                  {producto.activo ? (
                    <span className="bg-[#99A5E0] text-white py-2 px-4 rounded-full text-md">
                      Sí
                    </span>
                  ) : (
                    <span className="bg-red-200 text-red-700 py-1 px-3 rounded-full text-xs">
                      No
                    </span>
                  )}
                </td>
                <td className="py-3 px-6 text-center">
                  {new Date(producto.fecha_creacion).toLocaleDateString()}
                </td>
                <td className="py-3 px-6 text-center flex justify-center gap-2">
                  <button
                    onClick={() => handleEditProduct(producto.id)}
                    className="bg-blue-500 text-lg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    <MdEdit />
                  </button>
                  <button
                    onClick={() => alertDelete(producto.id, producto.nombre)}
                    className="bg-red-500 text-lg hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
          <input
            className="p-2 border border-gray-300 rounded-md outline-none"
            type="text"
            placeholder="Descripción"
            value={editProduct.descripcion} 
            onChange={(e) => setEditProduct({ ...editProduct, descripcion: e.target.value })}
            required
          />
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
            value={editProduct.cantidad}  
            onChange={(e) => setEditProduct({ ...editProduct, cantidad: e.target.value })}
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
          <input
            className="p-2 border border-gray-300 rounded-md outline-none"
            type="text"
            placeholder="Descripción"
            value={newProduct.descripcion}
            onChange={(e) => setNewProduct({ ...newProduct, descripcion: e.target.value })}
            required
          />
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
            value={newProduct.cantidad}
            onChange={(e) => setNewProduct({ ...newProduct, cantidad: e.target.value })}
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
