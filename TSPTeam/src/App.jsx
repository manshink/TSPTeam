import { Routes, Route } from 'react-router-dom'
import Disposicion from './componentes/Disposicion'
import Inicio from './paginas/Inicio'
import Catalogo from './paginas/Catalogo'
import DetalleProducto from './paginas/DetalleProducto'
import Carrito from './paginas/Carrito'
import Ingreso from './paginas/Ingreso'
import Registro from './paginas/Registro'

function App() {
  return (
    <Routes>
      <Route element={<Disposicion />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/ingreso" element={<Ingreso />} />
        <Route path="/registro" element={<Registro />} />
      </Route>
    </Routes>
  )
}

export default App
