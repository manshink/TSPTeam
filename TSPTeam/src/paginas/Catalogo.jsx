import { useEffect, useState } from 'react'
import { obtenerProductos } from '../servicios/productos'
import { marcaDe } from '../datos/inventario'
import TarjetaProducto from '../componentes/TarjetaProducto'
import FiltrosCatalogo from '../componentes/FiltrosCatalogo'

const filtrosIniciales = {
  categoria: '',
  marca: '',
  precioMin: '',
  precioMax: '',
  orden: '',
}

function Catalogo() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)
  const [busqueda, setBusqueda] = useState('')
  const [filtros, setFiltros] = useState(filtrosIniciales)

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

  const categorias = [...new Set(productos.map((producto) => producto.category))]
  const marcas = [...new Set(productos.map((producto) => marcaDe(producto.id)))].sort()

  const termino = busqueda.trim().toLowerCase()
  const min = filtros.precioMin === '' ? null : Number(filtros.precioMin)
  const max = filtros.precioMax === '' ? null : Number(filtros.precioMax)

  let productosFiltrados = productos.filter((producto) => {
    if (termino && !producto.title.toLowerCase().includes(termino)) return false
    if (filtros.categoria && producto.category !== filtros.categoria) return false
    if (filtros.marca && marcaDe(producto.id) !== filtros.marca) return false
    if (min !== null && producto.price < min) return false
    if (max !== null && producto.price > max) return false
    return true
  })

  if (filtros.orden === 'precio-asc') {
    productosFiltrados = [...productosFiltrados].sort((a, b) => a.price - b.price)
  } else if (filtros.orden === 'precio-desc') {
    productosFiltrados = [...productosFiltrados].sort((a, b) => b.price - a.price)
  } else if (filtros.orden === 'nombre') {
    productosFiltrados = [...productosFiltrados].sort((a, b) => a.title.localeCompare(b.title))
  }

  const cambiarFiltro = (campo, valor) => {
    setFiltros((actuales) => ({ ...actuales, [campo]: valor }))
  }

  const limpiar = () => {
    setBusqueda('')
    setFiltros(filtrosIniciales)
  }

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

      <FiltrosCatalogo
        valores={filtros}
        categorias={categorias}
        marcas={marcas}
        alCambiar={cambiarFiltro}
        alLimpiar={limpiar}
      />

      {productosFiltrados.length === 0 ? (
        <p className="mt-10 text-neutral-600">No hay artículos que coincidan con tu búsqueda.</p>
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
