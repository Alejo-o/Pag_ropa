import React, { useEffect, useState } from 'react';
import styles from './CarritoCard.module.css';

function CarritoCards() {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const guardado = localStorage.getItem('carrito');
    setCarrito(guardado ? JSON.parse(guardado) : []);
  }, []);

  const handleEliminar = (id) => {
    const nuevoCarrito = carrito.filter(p => p.id !== id);
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  // Calcular el total sumando los precios multiplicados por cantidad
  const getTotal = () => {
    return carrito.reduce((acc, item) => {
      const match = item.precio.match(/([\d,.]+)/);
      let valor = 0;
      if (match) {
        valor = parseFloat(match[1].replace(/\./g, '').replace(',', '.'));
      }
      return acc + valor * (item.cantidad || 1);
    }, 0);
  };

  return (
    <div className={styles['carrito-cards-container']}>
      <h2 className={styles['carrito-cards-title']}>Productos en el carrito</h2>
      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <div className={styles['carrito-cards-list']}>
            {carrito.map(item => (
              <div key={item.id} className={styles['carrito-card']}>
                <img src={item.img} alt={item.nombre} className={styles['carrito-card-img']} />
                <h3>{item.nombre}</h3>
                <p>{item.precio}</p>
                <p>Talla: <b>{item.talla}</b></p>
                <p>Cantidad: <b>{item.cantidad}</b></p>
                <button onClick={() => handleEliminar(item.id)} className={styles['carrito-card-btn']} title="Eliminar">Eliminar ×</button>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '30px', fontWeight: '700', fontSize: '1.2rem', color: '#111' }}>
            Total: ${getTotal().toLocaleString('es-CO', { minimumFractionDigits: 2 })} COP
          </div>
        </>
      )}
      <button
        className={styles['carrito-card-btn']}
        style={{ marginTop: '30px', padding: '10px 40px', background: '#13020f', color: '#fff', border: 'none', borderRadius: '0.2rem', fontWeight: '700', cursor: 'pointer' }}
        onClick={() => window.location.reload()}
      >
        Ir al inicio
      </button>
    </div>
  );
}

export default CarritoCards;
