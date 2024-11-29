import { useEffect, useState } from "react";
import Swal from 'sweetalert2'


const useProductos = () => {

  const [producto, setProducto] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);
  const [stockBajo, setStockBajo] = useState([]);
  const [stateInput, setStateInput] = useState(true);
  const [refreshData, setRefreshData] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [busquedaSelect, setBusquedaSelect] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productosFiltrados, setProductosFiltrados] = useState(producto);
  const [editProduct, setEditProduct] = useState({nombre: '', precio: '', stock: '', categoria: '', estado: '', stockMinimo: ''}); 
  const [newProduct, setNewProduct] = useState({nombre: '',  precio: '', stock: '', categoria: '', estado: true, stockMinimo: '5'});

  const [categorias, setCategorias] = useState([
    {id: '1', nombre: 'Camisas y Blusas'},
    {id: '2', nombre: 'Pantalones y Jeans'},
    {id: '3', nombre: 'Vestidos y Faldas'},
    {id: '4', nombre: 'Ropa Deportiva'},
    {id: '5', nombre: 'Ropa Interior'},
    {id: '6', nombre: 'Ropa de Niños'},
    {id: '7', nombre: 'Ropa de Invierno'},
    {id: '8', nombre: 'Zapatos y Sandalias'}
  ]);

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
  
  // filtrar productos por nombre
  useEffect(() => {
    const resultados = producto.filter(producto =>
      producto.nombre?.toLowerCase().includes(busqueda.toLowerCase())
    );
    setProductosFiltrados(resultados);
  }, [busqueda, producto]);

  // filtrar productos por categoria
  useEffect(() => {
    if(busquedaSelect.length > 0){
      setStateInput(false);
    }
    const resultados = producto.filter(producto =>
      producto.categoria?.toLowerCase().includes(busquedaSelect.toLowerCase())
    );
    setProductosFiltrados(resultados);
  }, [busquedaSelect,producto]);



  // obtener productos
  const getDataInit = async () => {
    try {
      const response = await fetch('http://localhost:3001/productos');
      // Verifica si la respuesta es correcta
      if (!response.ok) {
        throw new Error('Error al obtener productos: ' + response.statusText); // Manejo de errores si la respuesta no es correcta
      }

      const result = await response.json(); // Obtener el resultado en formato JSON
      
      result.forEach((item) => {
         item.fecha = fechaActual(item.fecha)
      })

      orderProductsById(result);
      console.log('result', result);
      return result; // Retornar la información de productos
    } catch (error) {
      console.error('Error:', error.message); // Loguear el error
      throw new Error('Error en la solicitud: ' + error.message); // Manejo de errores
    }
  };

  // ordenar productos por id
  const orderProductsById = (products) => {
    const productsOrder = products.sort((a, b) => a.id - b.id);
    productosBajoStock(productsOrder);
    setProducto(productsOrder);
    setLoading(!loading);
  }

  const productosBajoStock = (productsOrder) => {
    stockBajo.length = 0;
    productsOrder.map(producto => {
      if (producto.stock < producto.stockMinimo) {
        stockBajo.push(producto);
      }
    });
  }

  // agregar producto
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if(newProduct.stock < 1){
      newProduct.estado = false;
    }

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
      const result = await response.json();
      setProducto([...producto, result]);
      setNewProduct({ nombre: '', categoria: '', precio: '', stock: '', estado: 'activo', stockMinimo: '5' }); 
      setIsModalOpen(false);
      setRefreshData(!refreshData);
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };  


  // actualizar producto
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
  
    if(editProduct.stock < 1){
      editProduct.estado = false;
    }

    const updatedProduct = {
      nombre: editProduct.nombre,
      precio: editProduct.precio, 
      stock: editProduct.stock,
      categoria: editProduct.categoria,
      estado: editProduct.estado,
      stockMinimo: editProduct.stockMinimo
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
          precio: '', 
          stock: '',
          categoria: '',
          estado: '',
          stockMinimo: ''
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

  // eliminar producto
  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/eliminar/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {  
        setRefreshData(!refreshData);
      } else {
        console.error('Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  } 

  // editar producto
  const handleEditProduct = (id) => {
    setIsEditModalOpen(true);
    const product = producto.find(producto => producto.id === id);
    setEditProduct(product);
  } 


  // formatear texto
 const formatText = (text) => {
      if (text == null) {
        return text;
      }
      if (text.length > 20) {
        return text.slice(0, 20) + '...';
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
  const productosPorPagina = 6; // Ajusta este número según necesites

  // Calcular productos para la página actual
  const indiceUltimo = paginaActual * productosPorPagina;
  const indicePrimero = indiceUltimo - productosPorPagina;
  const productosActuales = productosFiltrados.slice(indicePrimero, indiceUltimo);
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };





    return {
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
    }
}

export default useProductos;
