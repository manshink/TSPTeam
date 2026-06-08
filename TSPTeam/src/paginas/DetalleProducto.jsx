import { useParams } from 'react-router-dom'

function DetalleProducto() {
  const { id } = useParams()

  return (
    <section>
      <h1 className="text-3xl">Detalle del producto</h1>
      <p className="mt-3 text-neutral-600">Artículo {id}. Aquí irá la información ampliada.</p>
    </section>
  )
}

export default DetalleProducto
