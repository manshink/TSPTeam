import { useEffect, useState } from 'react'
import { obtenerProductos } from '../servicios/productos'
import TarjetaProducto from '../componentes/TarjetaProducto'

function Catalogo() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    obtenerProductos()
      .then((datos) => setProductos(datos))
      .catch(() => setError(true))
      .finally(() => setCargando(false))
  }, [])

  if (cargando) {
    return <p className="text-neutral-500">Cargando productos...</p>
  }

  if (error) {
    return <p className="text-neutral-600">No pudimos cargar el catálogo. Intenta de nuevo más tarde.</p>
  }

  return (
    <section>
      <h1 className="text-3xl">Catálogo</h1>
      <p className="mt-2 text-neutral-600">{productos.length} artículos disponibles</p>
      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {productos.map((producto) => (
          <TarjetaProducto key={producto.id} producto={producto} />
        ))}
      </div>
    </section>
  )
}

export default Catalogo
