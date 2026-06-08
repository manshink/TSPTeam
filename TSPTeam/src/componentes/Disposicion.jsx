import { Outlet } from 'react-router-dom'
import BarraNavegacion from './BarraNavegacion'
import PiePagina from './PiePagina'

function Disposicion() {
  return (
    <div className="flex min-h-screen flex-col">
      <BarraNavegacion />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6">
        <Outlet />
      </main>
      <PiePagina />
    </div>
  )
}

export default Disposicion
