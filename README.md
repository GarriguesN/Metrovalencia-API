# Metrovalencia Schedule App

Esta es una aplicación que utiliza la API de Metrovalencia para obtener los horarios de los metros en cada una de las paradas. La aplicación está desarrollada en Nuxt.js y utiliza un servidor proxy con Express (Node.js) para realizar las peticiones a la API y recoger los datos.

## Requisitos

- Node.js v14 o superior
- npm o yarn

## Instalación

1. Clona este repositorio:

    ```bash
    git clone https://github.com/GarriguesN/Metrovalencia-API.git
    cd Metrovalencia-API
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

    o si usas yarn:

    ```bash
    yarn install
    ```

## Configuración

1. Configura las variables de entorno necesarias en nuxt.config.js.

## Ejecución en Desarrollo

1. Inicia el servidor proxy:

    ```bash
    node application/mvapi/server/proxy.cjs
    ```

2. En una nueva terminal, inicia el servidor de desarrollo de Nuxt.js:

    ```bash
    npm run dev
    ```

    o si usas yarn:

    ```bash
    yarn dev
    ```

3. Abre tu navegador y navega a `http://localhost:3000`.

## Construcción para Producción

1. Compila la aplicación para producción:

    ```bash
    npm run build
    ```

    o si usas yarn:

    ```bash
    yarn build
    ```

2. Inicia el servidor en modo producción:

    ```bash
    npm run start
    ```

    o si usas yarn:

    ```bash
    yarn start
    ```

## Estructura del Proyecto

- `.nuxt/`: Archivos generados por Nuxt.js.
- `.output/`: Archivos de salida del build.
- `assets/`: Contiene los recursos estáticos como imágenes y estilos.
- `certs/`: Contiene los certificados SSL.
- `node_modules/`: Dependencias del proyecto.
- `public/`: Archivos públicos que se sirven directamente.
- `services/`: Servicios para interactuar con la API y servidor proxy.
- `service-worker/`: Archivos del service worker.
- `nuxt.config.js`: Configuración de Nuxt.js.
- `package.json`: Dependencias y scripts del proyecto.
- `tailwind.config.js`: Configuración de TailwindCSS.
- `tsconfig.json`: Configuración de TypeScript.
- `application/mvapi/`: Contiene todos los archivos principales de la aplicación.


## Configuración de PWA

La aplicación está configurada como una PWA usando `@vite-pwa/nuxt` y `nuxt-primevue` para los componentes UI. La configuración PWA incluye:

- Estrategias de servicio: `injectManifest` o `generateSW`.
- Archivos incluidos: `favicon.svg`, `favicon.ico`, `robots.txt`, `apple-touch-icon.png`.
- Iconos de la PWA configurados en `manifest`.

## Contribuir

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Agrega nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
