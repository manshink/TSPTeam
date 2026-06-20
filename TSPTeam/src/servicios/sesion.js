import api from './api'

export async function autenticar(usuario, contrasena) {
  const { data } = await api.post('/auth/login', {
    username: usuario,
    password: contrasena,
  })
  return data.token
}

export async function registrarUsuario(usuario) {
  const { data } = await api.post('/users', usuario)
  return data
}
