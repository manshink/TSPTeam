import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { obtenerProducto } from '../servicios/productos'
import { useCarrito } from '../hooks/useCarrito'
import { formatearPrecio } from '../lib/formato'
import { traducirCategoria } from '../datos/categorias'
import { stockDe, marcaDe } from '../datos/inventario'

function DetalleProducto() {
  const { id } = useParams()
  const { agregar } = useCarrito()
  const [producto, setProducto] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)
  const [cantidad, setCantidad] = useState(1)
  const [agregado, setAgregado] = useState(false)

  useEffect(() => {
    setCargando(true)
    setCantidad(1)
    obtenerProducto(id)
      .then((datos) => setProducto(datos))
      .catch(() => setError(true))
      .finally(() => setCargando(false))
  }, [id])

  useEffect(() => {
    if (!agregado) return
    const temporizador = setTimeout(() => setAgregado(false), 2500)
    return () => clearTimeout(temporizador)
  }, [agregado])

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
  const agotado = stock === 0
  const estiloPaso =
    'h-9 w-9 rounded-md border border-neutral-300 text-neutral-700 hover:border-neutral-400 disabled:opacity-40'

  function bajar() {
    setCantidad((actual) => Math.max(1, actual - 1))
  }

  function subir() {
    setCantidad((actual) => Math.min(stock, actual + 1))
  }

  function alAgregar() {
    agregar({
      id: producto.id,
      titulo: producto.title,
      precio: producto.price,
      imagen: producto.image,
      cantidad,
    })
    setAgregado(true)
  }

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

        {agotado ? (
          <button
            type="button"
            disabled
            className="mt-8 rounded-md bg-neutral-200 px-5 py-2.5 text-sm text-neutral-500"
          >
            Agotado
          </button>
        ) : (
          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button type="button" onClick={bajar} disabled={cantidad <= 1} className={estiloPaso}>
                -
              </button>
              <span className="w-8 text-center">{cantidad}</span>
              <button type="button" onClick={subir} disabled={cantidad >= stock} className={estiloPaso}>
                +
              </button>
            </div>
            <button
              type="button"
              onClick={alAgregar}
              className="rounded-md bg-acento-700 px-5 py-2.5 text-sm text-white hover:bg-acento-800"
            >
              Agregar al carrito
            </button>
          </div>
        )}

        {agregado && <p className="mt-3 text-sm text-acento-700">Agregado al carrito.</p>}

        <Link to="/catalogo" className="mt-8 inline-block text-acento-700 underline underline-offset-2">
          Volver al catálogo
        </Link>
      </div>
    </article>
  )
}

export default DetalleProducto
