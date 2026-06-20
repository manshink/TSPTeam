import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAutenticacion } from '../hooks/useAutenticacion'
import { useCarrito } from '../hooks/useCarrito'

function BarraNavegacion() {
  const { usuario, haySesion, cerrarSesion } = useAutenticacion()
  const { cantidadTotal } = useCarrito()
  const navegar = useNavigate()

  const estiloEnlace = ({ isActive }) =>
    isActive ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'

  function salir() {
    cerrarSesion()
    navegar('/')
  }

  return (
    <header className="border-b border-neutral-200">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="font-serif text-2xl tracking-tight text-neutral-900">
          Vitrina
        </Link>
        <nav className="flex items-center gap-5 text-sm sm:gap-7">
          <NavLink to="/" end className={estiloEnlace}>
            Inicio
          </NavLink>
          <NavLink to="/catalogo" className={estiloEnlace}>
            Catálogo
          </NavLink>
          <NavLink to="/carrito" className={estiloEnlace}>
            Carrito
            {cantidadTotal > 0 && (
              <span className="ml-1.5 rounded-full bg-acento-700 px-1.5 py-0.5 text-xs text-white">
                {cantidadTotal}
              </span>
            )}
          </NavLink>
          {haySesion ? (
            <div className="flex items-center gap-4">
              <span className="text-neutral-700">Hola, {usuario.nombre}</span>
              <button onClick={salir} className="text-neutral-500 hover:text-neutral-900">
                Salir
              </button>
            </div>
          ) : (
            <NavLink to="/ingreso" className={estiloEnlace}>
              Ingresar
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  )
}

export default BarraNavegacion
