const formateador = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function formatearPrecio(valor) {
  return formateador.format(valor)
}
