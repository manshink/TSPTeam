import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { obtenerProductos } from '../servicios/productos'
import { formatearPrecio } from '../lib/formato'
import { traducirCategoria } from '../datos/categorias'
import TarjetaProducto from '../componentes/TarjetaProducto'

function Inicio() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    obtenerProductos()
      .then((datos) => setProductos(datos))
      .catch(() => setProductos([]))
  }, [])

  const destacado = productos[0]
  const masDestacados = productos.slice(1, 5)

  return (
    <div className="space-y-16">
      <section className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-acento-700">Catálogo virtual · 2026</p>
          <h1 className="mt-4 text-4xl leading-tight sm:text-5xl">
            Productos escogidos, en un solo lugar
          </h1>
          <p className="mt-5 text-lg text-neutral-600">
            Explora la selección, revisa los detalles de cada artículo y arma tu carrito sin
            complicaciones.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/catalogo"
              className="rounded-md bg-acento-700 px-5 py-2.5 text-white hover:bg-acento-800"
            >
              Ver catálogo
            </Link>
            <Link to="/registro" className="text-acento-700 underline underline-offset-2">
              Crear una cuenta
            </Link>
          </div>
        </div>

        {destacado ? (
          <Link
            to={`/producto/${destacado.id}`}
            className="block rounded-lg border border-neutral-200 bg-white p-6 transition-colors hover:border-neutral-300"
          >
            <img
              src={destacado.image}
              alt={destacado.title}
              className="mx-auto aspect-square w-full max-w-xs object-contain"
            />
            <div className="mt-4 border-t border-neutral-200 pt-4">
              <p className="text-xs text-neutral-500">{traducirCategoria(destacado.category)}</p>
              <p className="mt-1 line-clamp-1 text-sm text-neutral-900">{destacado.title}</p>
              <p className="mt-1 font-serif text-lg text-neutral-900">
                {formatearPrecio(destacado.price)}
              </p>
            </div>
          </Link>
        ) : (
          <div className="h-80 rounded-lg border border-neutral-200 bg-stone-100" />
        )}
      </section>

      {masDestacados.length > 0 && (
        <section>
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl">Destacados</h2>
            <Link to="/catalogo" className="text-sm text-acento-700 underline underline-offset-2">
              Ver todo el catálogo
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {masDestacados.map((producto) => (
              <TarjetaProducto key={producto.id} producto={producto} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default Inicio
