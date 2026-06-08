import { Link } from 'react-router-dom'
import { formatearPrecio } from '../lib/formato'
import { traducirCategoria } from '../datos/categorias'

function TarjetaProducto({ producto }) {
  return (
    <article className="flex flex-col">
      <Link
        to={`/producto/${producto.id}`}
        className="block overflow-hidden rounded-lg border border-neutral-200 bg-white transition-colors hover:border-neutral-300"
      >
        <img
          src={producto.image}
          alt={producto.title}
          className="aspect-square w-full object-contain p-6"
        />
      </Link>
      <div className="mt-3">
        <p className="text-xs text-neutral-500">{traducirCategoria(producto.category)}</p>
        <h3 className="mt-1 line-clamp-2 font-sans text-sm leading-snug text-neutral-900">
          {producto.title}
        </h3>
        <p className="mt-2 font-serif text-lg text-neutral-900">{formatearPrecio(producto.price)}</p>
      </div>
    </article>
  )
}

export default TarjetaProducto
