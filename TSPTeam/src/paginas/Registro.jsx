import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAutenticacion } from '../hooks/useAutenticacion'

function Registro() {
  const { registrar } = useAutenticacion()
  const navegar = useNavigate()
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  const estiloCampo =
    'rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-acento-600'

  function revisarDatos() {
    if (!nombre.trim()) return 'Escribe tu nombre.'
    if (!correo.includes('@') || !correo.includes('.')) return 'El correo no parece válido.'
    if (contrasena.length < 6) return 'La contraseña debe tener al menos 6 caracteres.'
    return ''
  }

  async function enviar(evento) {
    evento.preventDefault()
    const aviso = revisarDatos()
    if (aviso) {
      setError(aviso)
      return
    }
    setError('')
    setEnviando(true)
    try {
      await registrar({ nombre: nombre.trim(), correo: correo.trim(), contrasena })
      navegar('/')
    } catch (fallo) {
      setError(fallo.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section className="max-w-sm">
      <h1 className="text-3xl">Crear cuenta</h1>
      <p className="mt-3 text-neutral-600">
        ¿Ya tienes cuenta?{' '}
        <Link to="/ingreso" className="text-acento-700 underline underline-offset-2">
          Inicia sesión
        </Link>
        .
      </p>

      <form onSubmit={enviar} className="mt-8 flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm text-neutral-700">
          Nombre
          <input
            type="text"
            value={nombre}
            onChange={(evento) => setNombre(evento.target.value)}
            className={estiloCampo}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-neutral-700">
          Correo
          <input
            type="email"
            value={correo}
            onChange={(evento) => setCorreo(evento.target.value)}
            className={estiloCampo}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-neutral-700">
          Contraseña
          <input
            type="password"
            value={contrasena}
            onChange={(evento) => setContrasena(evento.target.value)}
            className={estiloCampo}
          />
        </label>

        {error && <p className="text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={enviando}
          className="rounded-md bg-acento-700 px-4 py-2 text-sm text-white hover:bg-acento-800 disabled:opacity-60"
        >
          {enviando ? 'Creando...' : 'Crear cuenta'}
        </button>
      </form>
    </section>
  )
}

export default Registro
