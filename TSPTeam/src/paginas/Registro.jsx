import { Link } from 'react-router-dom'

function Registro() {
  return (
    <section className="max-w-sm">
      <h1 className="text-3xl">Crear cuenta</h1>
      <p className="mt-3 text-neutral-600">
        ¿Ya tienes cuenta?{' '}
        <Link to="/ingreso" className="text-acento-700 underline underline-offset-2">
          Inicia sesión
        </Link>
        .
      </p>
    </section>
  )
}

export default Registro
