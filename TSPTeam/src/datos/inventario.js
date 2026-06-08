const inventario = {
  1: { stock: 8, marca: 'Fjällräven' },
  2: { stock: 40, marca: 'UrbanFit' },
  3: { stock: 15, marca: 'NorthPeak' },
  4: { stock: 0, marca: 'UrbanFit' },
  5: { stock: 5, marca: 'John Hardy' },
  6: { stock: 3, marca: 'Aurelia' },
  7: { stock: 11, marca: 'Aurelia' },
  8: { stock: 18, marca: 'Pierced Owl' },
  9: { stock: 22, marca: 'Western Digital' },
  10: { stock: 30, marca: 'SanDisk' },
  11: { stock: 25, marca: 'Silicon Power' },
  12: { stock: 12, marca: 'Western Digital' },
  13: { stock: 7, marca: 'Acer' },
  14: { stock: 4, marca: 'Samsung' },
  15: { stock: 9, marca: 'Biylaclesen' },
  16: { stock: 14, marca: 'Lock and Love' },
  17: { stock: 20, marca: 'Rokka&Rolla' },
  18: { stock: 35, marca: 'MBJ' },
  19: { stock: 28, marca: 'Opna' },
  20: { stock: 0, marca: 'Danvouy' },
}

export function stockDe(id) {
  const registro = inventario[id]
  return registro ? registro.stock : 0
}

export function marcaDe(id) {
  const registro = inventario[id]
  return registro ? registro.marca : 'Genérica'
}
