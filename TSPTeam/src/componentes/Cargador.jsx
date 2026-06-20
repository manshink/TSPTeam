function Cargador({ texto = 'Cargando...' }) {
  return (
    <div className="flex items-center gap-3 py-10 text-neutral-500">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-300 border-t-acento-600" />
      <span className="text-sm">{texto}</span>
    </div>
  )
}

export default Cargador
