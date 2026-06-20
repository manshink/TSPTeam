export function subtotalArticulo(articulo) {
  return articulo.precio * articulo.cantidad
}

export function calcularTotal(articulos) {
  return articulos.reduce((total, articulo) => total + subtotalArticulo(articulo), 0)
}
