import { createContext, useEffect, useReducer } from 'react'
import { stockDe } from '../datos/inventario'

const CLAVE_CARRITO = 'vitrina_carrito'

export const CarritoContext = createContext(null)

function leerCarrito() {
  const guardado = localStorage.getItem(CLAVE_CARRITO)
  return guardado ? JSON.parse(guardado) : []
}

function reductor(articulos, accion) {
  switch (accion.tipo) {
    case 'agregar': {
      const presente = articulos.find((articulo) => articulo.id === accion.articulo.id)
      if (presente) {
        const tope = stockDe(presente.id)
        return articulos.map((articulo) =>
          articulo.id === accion.articulo.id
            ? { ...articulo, cantidad: Math.min(tope, articulo.cantidad + accion.articulo.cantidad) }
            : articulo,
        )
      }
      return [...articulos, accion.articulo]
    }
    case 'cambiarCantidad':
      return articulos.map((articulo) =>
        articulo.id === accion.id
          ? { ...articulo, cantidad: Math.min(stockDe(articulo.id), Math.max(1, accion.cantidad)) }
          : articulo,
      )
    case 'eliminar':
      return articulos.filter((articulo) => articulo.id !== accion.id)
    case 'vaciar':
      return []
    default:
      return articulos
  }
}

export function CarritoProvider({ children }) {
  const [articulos, despachar] = useReducer(reductor, undefined, leerCarrito)

  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(articulos))
  }, [articulos])

  function agregar(articulo) {
    despachar({ tipo: 'agregar', articulo })
  }

  function cambiarCantidad(id, cantidad) {
    despachar({ tipo: 'cambiarCantidad', id, cantidad })
  }

  function eliminar(id) {
    despachar({ tipo: 'eliminar', id })
  }

  function vaciar() {
    despachar({ tipo: 'vaciar' })
  }

  const cantidadTotal = articulos.reduce((suma, articulo) => suma + articulo.cantidad, 0)

  const valor = { articulos, cantidadTotal, agregar, cambiarCantidad, eliminar, vaciar }

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>
}
