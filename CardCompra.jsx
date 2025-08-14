import React, { useState } from 'react';
import styles from './CardCompra.module.css';

function CardCompra({ producto }) {
  const [talla, setTalla] = useState('');
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('carrito');
    return guardado ? JSON.parse(guardado) : [];
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleTalla = (t) => setTalla(t);

  // Regresar a la página principal
  const handleRegresar = () => {
    window.location.reload(); // Simple para volver a App, mejor con router
  };

  // Agregar producto al carrito
  const handleAgregarCarrito = () => {
    if (!talla) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 1000);
      return;
    }
    const item = {
      ...producto,
      talla,
      cantidad: 1,
      id: producto.img + talla,
    };
    // Si ya existe el producto con esa talla, suma cantidad
    const existe = carrito.find(p => p.id === item.id);
    let nuevoCarrito;
    if (existe) {
      nuevoCarrito = carrito.map(p =>
        p.id === item.id ? { ...p, cantidad: p.cantidad + 1 } : p
      );
    } else {
      nuevoCarrito = [...carrito, item];
    }
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 1000);
  };

  // Eliminar producto del carrito
  const handleEliminar = (id) => {
    const nuevoCarrito = carrito.filter(p => p.id !== id);
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  // Actualizar cantidad
  const handleActualizarCantidad = (id, cantidad) => {
    const nuevoCarrito = carrito.map(p =>
      p.id === id ? { ...p, cantidad: cantidad } : p
    );
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  return (
    <div className={styles['card-compra']} style={{ textAlign: 'center', marginTop: '40px', position: 'relative' }}>
      {showAlert && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#13020f',
          color: '#fff',
          padding: '20px 40px',
          borderRadius: '0.5rem',
          fontWeight: '700',
          fontSize: '1.2rem',
          zIndex: 9999,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}>
          {talla ? 'Producto agregado al carrito' : 'Selecciona una talla antes de agregar al carrito'}
        </div>
      )}
      <h2>Comprar producto</h2>
      {producto ? (
        <>
          <img src={producto.img} alt={producto.nombre} style={{ width: '200px' }} />
          <h3 className={styles['card-nombre']}>{producto.nombre}</h3>
          <p className={styles['card-precio']}>{producto.precio}</p>
          <div style={{ margin: '20px 0' }}>
            <p>Selecciona talla:</p>
            {['S', 'M', 'L', 'XL'].map((t) => (
              <button
                key={t}
                style={{
                  margin: '0 8px',
                  padding: '8px 20px',
                  background: talla === t ? '#13020f' : '#fff',
                  color: talla === t ? '#fff' : '#13020f',
                  border: '1px solid #13020f',
                  borderRadius: '0.2rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: '0.3s',
                }}
                onClick={() => handleTalla(t)}
              >
                {t}
              </button>
            ))}
          </div>
          {talla && <p className={styles['card-talla']}>Talla seleccionada: <b>{talla}</b></p>}
          <button onClick={handleRegresar} style={{ marginTop: '30px', padding: '10px 40px', background: '#000', color: '#fff', border: 'none', borderRadius: '0.2rem', fontWeight: '700', cursor: 'pointer' }}>
            Regresar
          </button>
          <button onClick={handleAgregarCarrito} style={{ marginLeft: '20px', marginTop: '30px', padding: '10px 40px', background: '#13020f', color: '#fff', border: 'none', borderRadius: '0.2rem', fontWeight: '700', cursor: 'pointer' }}>
            Agregar al carrito
          </button>
        </>
      ) : (
        <p>No hay producto seleccionado.</p>
      )}

      {/* Mostrar el carrito y CRUD */}
      <div style={{ marginTop: '40px' }}>
  <h3 className={styles['card-nombre']}>Carrito de compras</h3>
        {carrito.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : (
          <table style={{ margin: '0 auto', borderCollapse: 'collapse', }}>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Talla</th>
                <th>Cantidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map(item => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>{item.talla}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default CardCompra;
