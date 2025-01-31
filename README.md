# ricardocr98-microservices-patterns-bookstore-frontend

Este repositorio contiene el frontend de un e-commerce de libros, construido con TypeScript y Vite. El proyecto forma parte de una tesis y demuestra la implementación de patrones de microservicios.

## Tabla de Contenidos

- [Descripción](#descripcion)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías Utilizadas](#tecnologias-utilizadas)
- [Configuración y Ejecución](#configuracion-y-ejecucion)
- [Arquitectura](#arquitectura)
- [Patrones de Microservicios](#patrones-de-microservicios)
- [Funcionalidades](#funcionalidades)
- [Contribución](#contribucion)
- [Licencia](#licencia)

## Descripción <a name="descripcion"></a>

El frontend de este e-commerce de libros se enfoca en proporcionar una interfaz de usuario intuitiva y eficiente para la navegación, búsqueda y compra de libros.  Está desarrollado utilizando TypeScript para garantizar la calidad del código y Vite para un desarrollo rápido y optimizado.  El proyecto se integra con una arquitectura de microservicios, lo que permite una mayor escalabilidad y mantenibilidad.

## Tecnologías Utilizadas <a name="tecnologias-utilizadas"></a>

- **TypeScript:** Lenguaje de programación.
- **Vite:** Herramienta de construcción.
- **React:** Librería para la interfaz de usuario.
- **Redux:**  Manejo del estado de la aplicación.
- **Material UI (MUI):** Librería de componentes de interfaz de usuario (opcional, basado en la estructura).
- **Axios:** Cliente HTTP para realizar peticiones a la API.
- **ESLint:** Linter para el código.
- **Prettier:** Formateador de código.

## Configuración y Ejecución <a name="configuracion-y-ejecucion"></a>

1. Clona el repositorio: `git clone https://github.com/RicardoCR98/microservices-patterns-bookstore-frontend.git`
2. Instala las dependencias:  `yarn install`
3. Inicia el servidor de desarrollo: `yarn dev`

## Arquitectura <a name="arquitectura"></a>

El frontend se comunica con una serie de microservicios a través de la capa de `api`.  Se ha considerado el uso de Redux para la gestión del estado global de la aplicación. La estructura de componentes está diseñada para ser reutilizable y escalable.

## Patrones de Microservicios <a name="patrones-de-microservicios"></a>

Este proyecto demuestra la implementación de patrones de microservicios en el frontend, como:

* **Backend for Frontend (BFF):** La capa de `api` actúa como un BFF, adaptando los datos de los diferentes microservicios a las necesidades del frontend.

## Funcionalidades <a name="funcionalidades"></a>

* **Navegación y búsqueda de libros:** Permite a los usuarios explorar el catálogo de libros y encontrar títulos específicos.
* **Detalles del producto:** Muestra información detallada de cada libro, incluyendo la descripción, autor, precio, etc.
* **Carrito de compras:** Permite a los usuarios agregar libros al carrito y gestionar su contenido.
* **Proceso de compra:**  Guía a los usuarios a través del proceso de compra, incluyendo la selección de la dirección de envío y el método de pago.
* **Gestión de usuarios (admin):**  Funcionalidades para el administrador para la gestión de usuarios.
* **Autenticación:**  Implementación de autenticación de usuarios.
