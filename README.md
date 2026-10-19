# Limpieza Práctica para Cada Día

Copia independiente del catálogo original de GPT Sites. HTML, CSS y JavaScript nativos; sin React, dependencias de ejecución, base de datos, API ni servicios específicos de GPT Sites.

## Estado

Preparación local verificada; publicación en GitHub **pendiente por limitación de herramientas y acceso**. No se desplegó en Cloudflare. Ver [MIGRATION_REPORT.md](MIGRATION_REPORT.md).

## Requisitos y comandos

Node.js 24.x y npm. La ejecución web en producción solo necesita un servidor estático; Node se usa para tareas locales y build.

```sh
npm ci --ignore-scripts
npm test
npm run dev
# Abrir http://localhost:4173
npm run build
npm run preview
# Abrir http://localhost:4173 (detener dev antes de preview)
```

`PORT` permite cambiar el puerto local. No hay paquetes de terceros. El lockfile fija el manifiesto vacío de dependencias. El build verifica integridad y copia `public/` a `dist/`, sin transformar HTML, CSS, JS o imágenes.

## Estructura

- `public/index.html`: página, estilos, animaciones, catálogo y enlaces originales.
- `public/assets/`: seis fotografías JPEG originales.
- `scripts/`: servidor local, validación y build con módulos estándar de Node.
- `source-integrity.json`: hashes SHA-256 de los siete archivos originales y commit fuente.
- `catalog.snapshot.json`: referencia verificable de los seis productos; **no es la fuente de renderizado**.
- `CATALOG_UPDATE.md`: ubicación real de datos y flujo de actualización supervisada.
- `MIGRATION_REPORT.md`: resultados, limitaciones y próximos pasos.
- `dist/`: salida generada, excluida de Git.

## GitHub

Destino solicitado: https://github.com/Simbyte-2025/limpieza-practica

No se confirmó la existencia del repositorio: la API autenticada respondió 404. No se sobrescribió ningún repositorio ni se publicó ningún commit remoto. La cuenta conectada es `Simbyte-2025`.

Para continuar desde un entorno local autorizado con GitHub CLI, comprobar de nuevo que el repositorio no existe antes de ejecutar la creación; si contiene historial, detenerse para revisión:

```sh
gh auth status
gh repo view Simbyte-2025/limpieza-practica
# Solo si se confirma que no existe y la cuenta es la correcta:
gh repo create Simbyte-2025/limpieza-practica --public --description "Landing de catálogo de productos de limpieza — proyecto piloto Simbyte" --source . --remote origin --push
```

El archivo `.openai/hosting.json`, las credenciales de Sites, su historial Git y configuración de usuario no se incluyen en esta copia.

## Cloudflare Pages — preparación, sin despliegue

| Campo | Valor propuesto |
| --- | --- |
| Framework | None / estático |
| Raíz | raíz del repositorio |
| Instalación reproducible local | `npm ci --ignore-scripts` |
| Build | `npm run build` |
| Salida | `dist` |
| Node | `24`, declarado en `.node-version` |
| Producción | `main` |
| Variables de runtime / secretos | ninguna |
| Dominio futuro, no configurado | `demo-limpieza.simbytelabs.com` |

Pages normalmente instala las dependencias detectadas antes del build. No hacen falta Functions, Worker, adaptadores de React, bindings, tokens en el repositorio ni reglas SPA: solo existe `/` con anclas `#inicio` y `#productos`. Todos los recursos son relativos al documento. No se incorpora una URL absoluta de la demo al HTML.

Después de publicar en GitHub, en la cuenta personal que administra `simbytelabs.com`: crear un proyecto Pages con integración Git, autorizar únicamente este repositorio, seleccionar `main`, establecer los campos anteriores, comprobar Preview con una rama de prueba y revisar producción antes de asociar el dominio. Confirmar la cuenta y la zona correctas; no intervenir en `grayamigurumis`. Este procedimiento es documentación; no se ejecutó.

Fuentes oficiales consultadas el 19-10-2026:

- https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/
- https://developers.cloudflare.com/pages/configuration/build-configuration/
- https://developers.cloudflare.com/pages/configuration/build-image/

## Alcance

El negocio y contacto públicos se conservan por instrucción del propietario. No se añade una licencia de redistribución para las fotografías: revisar derechos antes de reutilizarlas en otros clientes.
