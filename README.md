# Vitrina — Catálogo Virtual

Aplicación web de catálogo virtual desarrollada para la asignatura Desarrollo de Software en Equipo (TSP) del
Politécnico Grancolombiano. Permite explorar un catálogo de productos, buscarlos, filtrarlos y consultar el
detalle de cada artículo. El proyecto se desarrolla siguiendo la metodología TSPi.

Los productos provienen de Fake Store API.

## Funcionalidades

- Catálogo con al menos 20 artículos: imagen, nombre, precio, categoría y existencias.
- Búsqueda por nombre.
- Filtros por categoría, marca y rango de precio, con ordenamiento.
- Detalle de cada producto con la descripción ampliada.

El registro e inicio de sesión y el carrito de compras están en desarrollo.

## Tecnologías

- React + Vite (JavaScript)
- Tailwind CSS
- React Router
- Axios
- Context API
- Fake Store API

## Ejecutar en local

Requisitos: Node.js 18 o superior y npm.

El código de la aplicación está dentro de la carpeta `TSPTeam` del repositorio. Para correrlo:

```
git clone https://github.com/manshink/TSPTeam.git
cd TSPTeam/TSPTeam
npm install
npm run dev
```

Al iniciar, Vite muestra una dirección local (por defecto http://localhost:5173) para abrir la tienda en el
navegador.

Otros comandos:

- `npm run build` genera la versión de producción.
- `npm run preview` sirve esa versión localmente para revisarla.

## Estructura

```
src/
  componentes/   barra de navegación, tarjeta de producto, filtros y layout
  paginas/       inicio, catálogo, detalle, carrito, ingreso y registro
  servicios/     consumo de Fake Store API
  datos/         existencias, marcas y categorías
  lib/           utilidades (formato de precio)
```

## Equipo

- Joseph Benavides Diaz — Líder del equipo
- Mateo Roldan Taborda — Gerente de desarrollo
- Jorge Eduardo Calderón García — Gerente de planeación
- Maria Alejandra Bernal Páez — Gerente de soporte
- Andres Galvis Paipa — Gerente de calidad
- Cristhian Diaz Diaz — Gerente de calidad
