import { createContext, useState } from 'react'
import { autenticar, registrarUsuario } from '../servicios/sesion'

const CLAVE_SESION = 'vitrina_sesion'
const CLAVE_USUARIOS = 'vitrina_usuarios'

export const AutenticacionContext = createContext(null)

function leerSesion() {
  const guardada = localStorage.getItem(CLAVE_SESION)
  return guardada ? JSON.parse(guardada) : null
}

function leerUsuarios() {
  const guardados = localStorage.getItem(CLAVE_USUARIOS)
  return guardados ? JSON.parse(guardados) : []
}

export function AutenticacionProvider({ children }) {
  const [usuario, setUsuario] = useState(leerSesion)

  function guardarSesion(sesion) {
    localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion))
    setUsuario(sesion)
  }

  async function iniciarSesion(identificador, contrasena) {
    const registrados = leerUsuarios()
    const local = registrados.find(
      (cuenta) => cuenta.correo === identificador || cuenta.nombre === identificador,
    )

    if (local) {
      if (local.contrasena !== contrasena) {
        throw new Error('La contraseña no es correcta.')
      }
      guardarSesion({ nombre: local.nombre, correo: local.correo })
      return
    }

    let token
    try {
      token = await autenticar(identificador, contrasena)
    } catch {
      throw new Error('No encontramos una cuenta con esos datos.')
    }
    guardarSesion({ nombre: identificador, token })
  }

  async function registrar({ nombre, correo, contrasena }) {
    const registrados = leerUsuarios()
    if (registrados.some((cuenta) => cuenta.correo === correo)) {
      throw new Error('Ya hay una cuenta registrada con ese correo.')
    }

    registrados.push({ nombre, correo, contrasena })
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(registrados))

    await registrarUsuario({ username: nombre, email: correo, password: contrasena }).catch(
      () => null,
    )

    guardarSesion({ nombre, correo })
  }

  function cerrarSesion() {
    localStorage.removeItem(CLAVE_SESION)
    setUsuario(null)
  }

  const valor = {
    usuario,
    haySesion: Boolean(usuario),
    iniciarSesion,
    registrar,
    cerrarSesion,
  }

  return <AutenticacionContext.Provider value={valor}>{children}</AutenticacionContext.Provider>
}
