import { useEffect, useState } from 'react'
import { obtenerProductos } from '../servicios/productos'
import TarjetaProducto from '../componentes/TarjetaProducto'

function Catalogo() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)
  const [busqueda, setBusqueda] = useState('')

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

  const termino = busqueda.trim().toLowerCase()
  const productosFiltrados = termino
    ? productos.filter((producto) => producto.title.toLowerCase().includes(termino))
    : productos

  return (
    <section>
      <h1 className="text-3xl">Catálogo</h1>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={busqueda}
          onChange={(evento) => setBusqueda(evento.target.value)}
          placeholder="Buscar por nombre"
          className="w-full rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm outline-none focus:border-acento-600 sm:max-w-xs"
        />
        <p className="text-sm text-neutral-500">{productosFiltrados.length} artículos</p>
      </div>

      {productosFiltrados.length === 0 ? (
        <p className="mt-10 text-neutral-600">
          No encontramos artículos que coincidan con "{busqueda}".
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {productosFiltrados.map((producto) => (
            <TarjetaProducto key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Catalogo
