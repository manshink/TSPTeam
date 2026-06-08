import { Link } from 'react-router-dom'

function Inicio() {
  return (
    <section className="max-w-2xl">
      <h1 className="text-4xl leading-tight sm:text-5xl">Productos escogidos, en un solo lugar</h1>
      <p className="mt-5 text-lg text-neutral-600">
        Explora la selección, revisa los detalles de cada artículo y arma tu carrito sin complicaciones.
      </p>
      <Link
        to="/catalogo"
        className="mt-8 inline-block rounded-md bg-acento-700 px-5 py-2.5 text-white hover:bg-acento-800"
      >
        Ver catálogo
      </Link>
    </section>
  )
}

export default Inicio
