import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAutenticacion } from '../hooks/useAutenticacion'

function Ingreso() {
  const { iniciarSesion } = useAutenticacion()
  const navegar = useNavigate()
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  const estiloCampo =
    'rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-acento-600'

  async function enviar(evento) {
    evento.preventDefault()
    if (!correo.trim() || !contrasena) {
      setError('Completa tu correo y tu contraseña.')
      return
    }
    setError('')
    setEnviando(true)
    try {
      await iniciarSesion(correo.trim(), contrasena)
      navegar('/')
    } catch (fallo) {
      setError(fallo.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section className="max-w-sm">
      <h1 className="text-3xl">Iniciar sesión</h1>
      <p className="mt-3 text-neutral-600">
        ¿No tienes cuenta?{' '}
        <Link to="/registro" className="text-acento-700 underline underline-offset-2">
          Regístrate
        </Link>
        .
      </p>

      <form onSubmit={enviar} className="mt-8 flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm text-neutral-700">
          Correo o usuario
          <input
            type="text"
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
          {enviando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <p className="mt-6 text-xs text-neutral-500">
        Para probar puedes usar la cuenta de demostración mor_2314 con la contraseña 83r5^_.
      </p>
    </section>
  )
}

export default Ingreso
