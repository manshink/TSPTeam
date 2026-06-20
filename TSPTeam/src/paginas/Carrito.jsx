import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCarrito } from '../hooks/useCarrito'
import { useAutenticacion } from '../hooks/useAutenticacion'
import { formatearPrecio } from '../lib/formato'
import { subtotalArticulo, calcularTotal } from '../lib/calculos'

function Carrito() {
  const { articulos, cambiarCantidad, eliminar, vaciar } = useCarrito()
  const { haySesion, usuario } = useAutenticacion()
  const [confirmado, setConfirmado] = useState(false)

  if (confirmado) {
    return (
      <section className="mx-auto max-w-lg py-12 text-center">
        <h1 className="text-3xl">¡Gracias por tu compra!</h1>
        <p className="mt-3 text-neutral-600">
          Tu pedido quedó registrado{usuario ? `, ${usuario.nombre}` : ''}. Te enviaremos los detalles
          por correo.
        </p>
        <Link
          to="/catalogo"
          className="mt-6 inline-block rounded-md bg-acento-700 px-5 py-2.5 text-sm text-white hover:bg-acento-800"
        >
          Seguir comprando
        </Link>
      </section>
    )
  }

  if (articulos.length === 0) {
    return (
      <section className="py-12 text-center">
        <h1 className="text-3xl">Tu carrito</h1>
        <p className="mt-3 text-neutral-600">Todavía no has agregado artículos.</p>
        <Link
          to="/catalogo"
          className="mt-6 inline-block rounded-md bg-acento-700 px-5 py-2.5 text-sm text-white hover:bg-acento-800"
        >
          Ver catálogo
        </Link>
      </section>
    )
  }

  const total = calcularTotal(articulos)
  const estiloPaso =
    'h-8 w-8 rounded-md border border-neutral-300 text-neutral-700 hover:border-neutral-400'

  function finalizar() {
    vaciar()
    setConfirmado(true)
  }

  return (
    <section className="mx-auto max-w-3xl">
      <h1 className="text-3xl">Tu carrito</h1>

      <ul className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200">
        {articulos.map((articulo) => (
          <li key={articulo.id} className="flex gap-4 py-5">
            <img
              src={articulo.imagen}
              alt={articulo.titulo}
              className="h-20 w-20 shrink-0 object-contain"
            />
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="line-clamp-2 text-sm text-neutral-900">{articulo.titulo}</p>
                  <p className="mt-0.5 text-sm text-neutral-500">
                    {formatearPrecio(articulo.precio)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => eliminar(articulo.id)}
                  className="shrink-0 text-sm text-neutral-400 hover:text-red-700"
                >
                  Eliminar
                </button>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => cambiarCantidad(articulo.id, articulo.cantidad - 1)}
                    className={estiloPaso}
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm">{articulo.cantidad}</span>
                  <button
                    type="button"
                    onClick={() => cambiarCantidad(articulo.id, articulo.cantidad + 1)}
                    className={estiloPaso}
                  >
                    +
                  </button>
                </div>
                <p className="text-sm font-medium text-neutral-900">
                  {formatearPrecio(subtotalArticulo(articulo))}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={vaciar}
          className="text-sm text-neutral-500 hover:text-neutral-900"
        >
          Vaciar carrito
        </button>
        <p className="font-serif text-2xl text-neutral-900">Total: {formatearPrecio(total)}</p>
      </div>

      <div className="mt-8 flex flex-col items-end gap-2">
        {haySesion ? (
          <button
            type="button"
            onClick={finalizar}
            className="rounded-md bg-acento-700 px-5 py-2.5 text-sm text-white hover:bg-acento-800"
          >
            Finalizar compra
          </button>
        ) : (
          <p className="text-sm text-neutral-600">
            <Link to="/ingreso" className="text-acento-700 underline underline-offset-2">
              Inicia sesión
            </Link>{' '}
            para finalizar tu compra.
          </p>
        )}
      </div>
    </section>
  )
}

export default Carrito
