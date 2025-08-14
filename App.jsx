import { useState } from 'react';
import CardCompra from './CardCompra';
import CarritoCards from './CarritoCards';
import './App.css';

function App() {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('carrito');
    return guardado ? JSON.parse(guardado) : [];
  });
  const [mostrarCarritoCards, setMostrarCarritoCards] = useState(false);

  const productos = [
    {
      img: 'producto1.jpg',
      nombre: 'T-shit ¨norbita¨',
      precio: 'Precio:  $59.900,00 COP',
    },
    {
      img: 'producto2.jpg',
      nombre: 'pants ¨Spikes Pants¨',
      precio: 'Precio:  $95.900,00 COP',
    },
    {
      img: 'producto3.jpg',
      style: { position: 'relative' },
      nombre: 'Buzo Blanco ¨norbita¨',
      precio: 'Precio:  $45.900,00 COP',
    },
    {
      img: 'producto4.jpg',
      nombre: 'Bandana Pants',
      precio: 'Precio:  $45.900,00 COP',
    },
  ];


  if (productoSeleccionado) {
    return <CardCompra producto={productoSeleccionado} />;
  }
  if (mostrarCarritoCards) {
    return <CarritoCards />;
  }

  return (
    <div>
      <header>
        <h1>NOSE'S STORE</h1>
        <nav>
          <ul style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Hombres</a></li>
            <li><a href="#">Mujeres</a></li>
            <li><a href="#">Accesorios</a></li>
            <li><a href="#">Ofertas</a></li>
            <li><a href="#">Contacto</a></li>
            <li>
              <button
                style={{
                  background: '#fff',
                  color: '#13020f',
                  fontWeight: '700',
                  border: '1px solid #13020f',
                  borderRadius: '0.2rem',
                  padding: '5px 15px',
                  cursor: 'pointer',
                  marginLeft: '10px',
                  position: 'relative',
                }}
                onClick={() => setMostrarCarritoCards(true)}
              >
                🛒 Carrito
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <div className="container" style={{ textAlign: 'center' }}>
          <section>
            <h2>Nuevas llegadas</h2>
            {productos.slice(0, 2).map((prod) => (
              <div
                className="product"
                key={prod.nombre}
                style={prod.style || {}}
              >
                <img src={prod.img} alt={prod.nombre} />
                <h3>{prod.nombre}</h3>
                <p>{prod.precio}</p>
                <button onClick={() => setProductoSeleccionado(prod)}>Agregar al carrito</button>
              </div>
            ))}
          </section>

          <section>
            <h2>Ofertas especiales</h2>
            {productos.slice(2, 4).map((prod) => (
              <div
                className="product"
                key={prod.nombre}
                style={prod.style || {}}
              >
                <img src={prod.img} alt={prod.nombre} />
                <h3>{prod.nombre}</h3>
                <p>{prod.precio}</p>
                <button onClick={() => setProductoSeleccionado(prod)}>Agregar al carrito</button>
              </div>
            ))}
          </section>
        </div>
      </main>

      <footer>
        <p>Todos los derechos reservados Alejandro &copy; 2025</p>
      </footer>
    </div>
  );
}

export default App;
