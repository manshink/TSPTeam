import { Link } from 'react-router-dom'

function Ingreso() {
  return (
    <section className="max-w-sm">
      <h1 className="text-3xl">Iniciar sesión</h1>
      <p className="mt-3 text-neutral-600">
        ¿No tienes cuenta?{' '}
        <Link to="/registro" className="text-acento-700 underline underline-offset-2">
          Regístrate
        </Link>
        .
      </p>
    </section>
  )
}

export default Ingreso
