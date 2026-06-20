import { useContext } from 'react'
import { AutenticacionContext } from '../contexto/AutenticacionContext'

export function useAutenticacion() {
  return useContext(AutenticacionContext)
}
