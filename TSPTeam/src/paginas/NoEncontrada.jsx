import { Link } from 'react-router-dom'

function NoEncontrada() {
  return (
    <section className="py-12 text-center">
      <h1 className="text-3xl">Página no encontrada</h1>
      <p className="mt-3 text-neutral-600">La dirección que buscas no existe o cambió.</p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-md bg-acento-700 px-5 py-2.5 text-sm text-white hover:bg-acento-800"
      >
        Volver al inicio
      </Link>
    </section>
  )
}

export default NoEncontrada
