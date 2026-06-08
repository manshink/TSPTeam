import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { obtenerProducto } from '../servicios/productos'
import { formatearPrecio } from '../lib/formato'
import { traducirCategoria } from '../datos/categorias'
import { stockDe, marcaDe } from '../datos/inventario'

function DetalleProducto() {
  const { id } = useParams()
  const [producto, setProducto] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setCargando(true)
    obtenerProducto(id)
      .then((datos) => setProducto(datos))
      .catch(() => setError(true))
      .finally(() => setCargando(false))
  }, [id])

  if (cargando) {
    return <p className="text-neutral-500">Cargando...</p>
  }

  if (error || !producto) {
    return (
      <div>
        <p className="text-neutral-600">No encontramos este producto.</p>
        <Link to="/catalogo" className="mt-3 inline-block text-acento-700 underline underline-offset-2">
          Volver al catálogo
        </Link>
      </div>
    )
  }

  const stock = stockDe(producto.id)

  return (
    <article className="grid gap-10 md:grid-cols-2">
      <div className="rounded-lg border border-neutral-200 bg-white p-8">
        <img
          src={producto.image}
          alt={producto.title}
          className="mx-auto aspect-square w-full max-w-sm object-contain"
        />
      </div>
      <div>
        <p className="text-sm text-neutral-500">
          {traducirCategoria(producto.category)} · {marcaDe(producto.id)}
        </p>
        <h1 className="mt-2 text-3xl leading-tight">{producto.title}</h1>
        <p className="mt-4 font-serif text-2xl text-neutral-900">{formatearPrecio(producto.price)}</p>
        <p className="mt-2 text-sm text-neutral-500">
          {stock > 0 ? `${stock} disponibles` : 'Agotado'}
        </p>
        <p className="mt-6 leading-relaxed text-neutral-700">{producto.description}</p>
        <Link to="/catalogo" className="mt-8 inline-block text-acento-700 underline underline-offset-2">
          Volver al catálogo
        </Link>
      </div>
    </article>
  )
}

export default DetalleProducto
