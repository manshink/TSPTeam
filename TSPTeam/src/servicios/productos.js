import api from './api'

export async function obtenerProductos() {
  const { data } = await api.get('/products')
  return data
}

export async function obtenerProducto(id) {
  const { data } = await api.get(`/products/${id}`)
  return data
}

export async function obtenerCategorias() {
  const { data } = await api.get('/products/categories')
  return data
}
