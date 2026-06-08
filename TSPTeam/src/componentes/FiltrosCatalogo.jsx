import { traducirCategoria } from '../datos/categorias'

function FiltrosCatalogo({ valores, categorias, marcas, alCambiar, alLimpiar }) {
  const estiloControl =
    'rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-acento-600'

  return (
    <div className="mt-4 flex flex-wrap items-end gap-3 border-t border-neutral-200 pt-4">
      <label className="flex flex-col gap-1 text-xs text-neutral-500">
        Categoría
        <select
          value={valores.categoria}
          onChange={(evento) => alCambiar('categoria', evento.target.value)}
          className={estiloControl}
        >
          <option value="">Todas</option>
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {traducirCategoria(categoria)}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-xs text-neutral-500">
        Marca
        <select
          value={valores.marca}
          onChange={(evento) => alCambiar('marca', evento.target.value)}
          className={estiloControl}
        >
          <option value="">Todas</option>
          {marcas.map((marca) => (
            <option key={marca} value={marca}>
              {marca}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-xs text-neutral-500">
        Precio mínimo
        <input
          type="number"
          min="0"
          value={valores.precioMin}
          onChange={(evento) => alCambiar('precioMin', evento.target.value)}
          placeholder="0"
          className={`${estiloControl} w-28`}
        />
      </label>

      <label className="flex flex-col gap-1 text-xs text-neutral-500">
        Precio máximo
        <input
          type="number"
          min="0"
          value={valores.precioMax}
          onChange={(evento) => alCambiar('precioMax', evento.target.value)}
          placeholder="0"
          className={`${estiloControl} w-28`}
        />
      </label>

      <label className="flex flex-col gap-1 text-xs text-neutral-500">
        Ordenar
        <select
          value={valores.orden}
          onChange={(evento) => alCambiar('orden', evento.target.value)}
          className={estiloControl}
        >
          <option value="">Relevancia</option>
          <option value="precio-asc">Precio: menor a mayor</option>
          <option value="precio-desc">Precio: mayor a menor</option>
          <option value="nombre">Nombre (A-Z)</option>
        </select>
      </label>

      <button
        type="button"
        onClick={alLimpiar}
        className="ml-auto rounded-md border border-neutral-300 px-3 py-2 text-sm text-neutral-600 hover:border-neutral-400 hover:text-neutral-900"
      >
        Limpiar
      </button>
    </div>
  )
}

export default FiltrosCatalogo
