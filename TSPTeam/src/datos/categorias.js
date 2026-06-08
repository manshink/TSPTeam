const nombres = {
  electronics: 'Electrónica',
  jewelery: 'Joyería',
  "men's clothing": 'Ropa de hombre',
  "women's clothing": 'Ropa de mujer',
}

export function traducirCategoria(categoria) {
  return nombres[categoria] || categoria
}
