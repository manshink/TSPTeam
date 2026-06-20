import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAutenticacion } from '../hooks/useAutenticacion'
import { useCarrito } from '../hooks/useCarrito'

function BarraNavegacion() {
  const { usuario, haySesion, cerrarSesion } = useAutenticacion()
  const { cantidadTotal } = useCarrito()
  const navegar = useNavigate()
  const [menuAbierto, setMenuAbierto] = useState(false)

  const estiloEnlace = ({ isActive }) =>
    isActive ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'

  function cerrarMenu() {
    setMenuAbierto(false)
  }

  function salir() {
    cerrarSesion()
    cerrarMenu()
    navegar('/')
  }

  const enlaces = (
    <>
      <NavLink to="/" end onClick={cerrarMenu} className={estiloEnlace}>
        Inicio
      </NavLink>
      <NavLink to="/catalogo" onClick={cerrarMenu} className={estiloEnlace}>
        Catálogo
      </NavLink>
      <NavLink to="/carrito" onClick={cerrarMenu} className={estiloEnlace}>
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
        <NavLink to="/ingreso" onClick={cerrarMenu} className={estiloEnlace}>
          Ingresar
        </NavLink>
      )}
    </>
  )

  return (
    <header className="border-b border-neutral-200">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          to="/"
          onClick={cerrarMenu}
          className="font-serif text-2xl tracking-tight text-neutral-900"
        >
          Vitrina
        </Link>

        <nav className="hidden items-center gap-5 text-sm sm:flex sm:gap-7">{enlaces}</nav>

        <button
          type="button"
          onClick={() => setMenuAbierto((abierto) => !abierto)}
          aria-label="Menú"
          className="flex flex-col gap-1.5 p-1 sm:hidden"
        >
          <span className="h-0.5 w-6 bg-neutral-800" />
          <span className="h-0.5 w-6 bg-neutral-800" />
          <span className="h-0.5 w-6 bg-neutral-800" />
        </button>
      </div>

      {menuAbierto && (
        <nav className="flex flex-col items-start gap-4 border-t border-neutral-200 px-4 py-5 text-sm sm:hidden">
          {enlaces}
        </nav>
      )}
    </header>
  )
}

export default BarraNavegacion
