import { useEffect, useState } from "react";
import Swal from 'sweetalert2'


const useProductos = () => {

  const [producto, setProducto] = useState([]);
    
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [productosFiltrados, setProductosFiltrados] = useState(producto);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [editProduct, setEditProduct] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    precio: '',
    stock: ''
  }); 
  
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    precio: '',
    stock: '',
    descripcion: '',
    estado: 'activo'
  });

  const [fecha, setFecha] = useState('');

  const fechaActual = (date) => {
    const fechaActual = new Date(date);
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1; // Los meses van de 0 a 11, por eso sumamos 1
    const anio = fechaActual.getFullYear();
    const fechaFormateada = `${anio}/${mes}/${dia}`;
    return fechaFormateada;
    // setFecha(fechaFormateada);
  } 

    useEffect(() => {
      getDataInit();
      fechaActual();
    }, []);
  
    useEffect(() => {
      getDataInit();
    }, [refreshData]);
  

  useEffect(() => {
    const resultados = producto.filter(producto =>
      producto.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      producto.descripcion?.toLowerCase().includes(busqueda.toLowerCase())
    );
    setProductosFiltrados(resultados);
  }, [busqueda, producto]);


  const getDataInit = async () => {
    try {
      const response = await fetch('http://localhost:3001/productos');
      console.log(response);
      // Verifica si la respuesta es correcta
      if (!response.ok) {
        throw new Error('Error al obtener productos: ' + response.statusText); // Manejo de errores si la respuesta no es correcta
      }

      const result = await response.json(); // Obtener el resultado en formato JSON
      
      result.forEach((item) => {
         item.fecha = fechaActual(item.fecha)
      })

      orderProductsById(result);
      console.log('Datos obtenidos:', result); // Imprimir los datos obtenidos
      return result; // Retornar la información de productos
    } catch (error) {
      console.error('Error:', error.message); // Loguear el error
      throw new Error('Error en la solicitud: ' + error.message); // Manejo de errores
    }
  };

  const orderProductsById = (products) => {
    const productsOrder = products.sort((a, b) => a.id - b.id);
    setProducto(productsOrder);
  }

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      });

      if (!response.ok) {
        alertError();
        throw new Error('Error al agregar producto: ' + response.statusText);
      }

      alertCreate();
      setRefreshData(!refreshData);
      const result = await response.json();
      setProducto([...producto, result]);
      setNewProduct({ nombre: '', descripcion: '', precio: '', stock: '', estado: 'activo' }); 
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };  


  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      id: editProduct.id,
      nombre: editProduct.nombre,
      descripcion: editProduct.descripcion,
      precio: editProduct.precio, 
      stock: editProduct.stock
    };
    try {
      const response = await fetch(`http://localhost:3001/actualizar/${editProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)  
      });
      if (response.ok) {
        setIsEditModalOpen(false);
        setEditProduct({
          nombre: '',
          descripcion: '',
          precio: '', 
          stock: ''
        });
        alertUpdate();
        setRefreshData(!refreshData);
        // setBusqueda('');
      } else {
        alertError();
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    } 
  }

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/productos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {  
        setRefreshData(!refreshData);
        console.log('Producto eliminado correctamente');
      } else {
        console.error('Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  } 

  
  const handleEditProduct = (id) => {
    setIsEditModalOpen(true);
    const product = producto.find(producto => producto.id === id);
    setEditProduct(product);
  } 

    
 const formatText = (text) => {
      if (text == null) {
        return text;
      }
      if (text.length > 30) {
        return text.slice(0, 30) + '...';
      }
      return text;
  };



  /* ---------- alertas----------- */


  // alerta de eliminación  
  const alertDelete = (id, nombre) => {
    Swal.fire({
    title: "¿Estás seguro? ",
    text: "Esta acción es irreversible. ¿Quieres continuar?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
          handleDeleteProduct(id)
          Swal.fire({
              title: "Eliminado!",
              text: `El producto (${nombre}) ha sido eliminado.`,
              icon: "success"
          });
      }
    });
  }

  // alerta de creacion de producto
  const alertCreate = () => {
    Swal.fire({
      title: "Producto creado",
      text: "El producto ha sido creado correctamente",
      icon: "success"
    });
  } 

  // alerta de actualización de producto
  const alertUpdate = () => {
    Swal.fire({
      title: "Producto actualizado",
      text: "El producto ha sido actualizado correctamente",
      icon: "success"
    });
  }

  // alerta de error
  const alertError = () => {
    Swal.fire({
      title: "Error",
      text: "Hubo un error al actualizar el producto",
      icon: "warning"
    });
  }

  // paginador
  // ... otros estados ...
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 8; // Ajusta este número según necesites

  // Calcular productos para la página actual
  const indiceUltimo = paginaActual * productosPorPagina;
  const indicePrimero = indiceUltimo - productosPorPagina;
  const productosActuales = productosFiltrados.slice(indicePrimero, indiceUltimo);
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };





    return {
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
      alertDelete,
      productosActuales,
      paginaActual,
      cambiarPagina,
      totalPaginas
    }
}

export default useProductos;
