import { Link, NavLink } from 'react-router-dom'

function BarraNavegacion() {
  const estiloEnlace = ({ isActive }) =>
    isActive ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'

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
          </NavLink>
          <NavLink to="/ingreso" className={estiloEnlace}>
            Ingreso
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default BarraNavegacion
