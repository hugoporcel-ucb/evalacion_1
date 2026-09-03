# TechStock — Sistema de Gestión de Inventario y Ventas

Evaluación práctica Semana 1 — Desarrollo de una página web y uso de GIT
(Módulo 1, Maestría)

## Descripción

TechStock es una aplicación web para administrar el inventario de una
tienda de tecnología y registrar las ventas asociadas a ese inventario.
Está construida con **HTML, CSS y JavaScript vanilla**, sin frameworks ni
build tools, y utiliza `localStorage` / `sessionStorage` del navegador
como base de datos, por lo que puede ejecutarse abriendo los archivos
directamente o sirviéndolos con cualquier servidor estático.

## Páginas

| # | Página | Archivo | Descripción |
|---|--------|---------|-------------|
| 1 | Login | `login.html` | Autenticación de usuario (usuario/contraseña). |
| 2 | Dashboard | `dashboard.html` | Resumen general tras el login: totales, ingresos, últimas ventas y productos con stock bajo. |
| 3 | Listado de productos | `productos.html` | Tabla con el catálogo de productos, búsqueda y acciones de editar/eliminar. |
| 4 | Formulario de producto | `producto-form.html` | Registro y edición de productos del inventario. |
| 5 | Listado de ventas | `ventas.html` | Ventas registradas, cada una enlazada a un producto del inventario. |
| 6 | Formulario de venta | `venta-form.html` | Registro de una venta seleccionando un producto existente; descuenta stock automáticamente. |

## Credenciales de demostración

```
Usuario:     admin
Contraseña:  admin123
```

## Cómo ejecutar el proyecto

No requiere instalación de dependencias. Basta con servir la carpeta con
cualquier servidor estático, por ejemplo:

```bash
# Con Python
python -m http.server 8080

# Con Node.js (http-server)
npx http-server -p 8080
```

Luego abrir `http://localhost:8080/login.html` en el navegador.

> También puede abrirse `login.html` directamente con doble clic en la
> mayoría de navegadores, aunque se recomienda usar un servidor local
> para evitar restricciones de `file://`.

## Estructura del proyecto

```
evalacion_1/
├── index.html            # Redirige a login o dashboard según la sesión
├── login.html
├── dashboard.html
├── productos.html
├── producto-form.html
├── ventas.html
├── venta-form.html
├── css/
│   └── style.css
└── js/
    ├── data.js            # Capa de datos (localStorage) y datos semilla
    ├── auth.js            # Login/logout y guardia de sesión
    ├── nav.js              # Sidebar y topbar compartidos
    ├── login.js
    ├── dashboard.js
    ├── productos.js
    ├── producto-form.js
    ├── ventas.js
    └── venta-form.js
```

## Flujo de trabajo con Git

El repositorio sigue un flujo simplificado de Git Flow:

- **`main`** — rama principal, historial estable equivalente a `master`.
- **`develop`** — rama de integración donde se combinan las features.
- **`feature/login`**, **`feature/dashboard`**, **`feature/productos`**,
  **`feature/ventas`** — ramas de desarrollo de cada módulo, integradas a
  `develop` mediante merges.

El código de `develop` se incorpora a `main`/`master` a través de un
Pull Request en GitHub.

## Autor

Hugo Porcel Aliaga
