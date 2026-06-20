import { useContext } from 'react'
import { CarritoContext } from '../contexto/CarritoContext'

export function useCarrito() {
  return useContext(CarritoContext)
}
