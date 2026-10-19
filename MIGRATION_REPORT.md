# Informe de migración — Limpieza Práctica para Cada Día

- **Fecha:** 19 de octubre de 2026, America/Santiago.
- **Responsable comercial y aprobación:** Nicolás / Simbyte.
- **Preparación técnica:** Codex.
- **Objetivo:** recuperar el proyecto original y preparar una copia independiente, reproducible y versionada para GitHub; documentar Pages sin desplegar.

## A. Resumen ejecutivo

**Migración incompleta: copia local preparada y comprobada; publicación en GitHub bloqueada.**

Se recuperaron los archivos originales, sin reconstrucción visual ni cambio de framework. El HTML y las seis imágenes son idénticos byte por byte a la fuente de la versión 2 publicada en Sites. La copia puede instalarse con npm y generar una salida estática sin dependencias de terceros. El proyecto original no se modificó ni se republicó.

Se verificaron integridad, catálogo, precios, enlaces, renderizado de escritorio, carga de imágenes y navegación entre anclas. La fidelidad de archivos es exacta; la equivalencia visual se observó en Chrome de escritorio con la fuente original y la copia servidas localmente. No se afirma validación en móvil, apertura de la aplicación WhatsApp ni inspección visual del despliegue remoto original.

La API de GitHub autenticó a `Simbyte-2025`, pero devolvió 404 para el repositorio solicitado. Esto puede significar inexistencia o falta de acceso al repositorio. No hay operación de creación de repositorios en las herramientas disponibles; la navegación a GitHub fue bloqueada por política de acceso del navegador. No se intentó evadir esa restricción. No se creó ni sobrescribió un repositorio remoto. No se creó infraestructura en Cloudflare.

## B. Proyecto original

### Procedencia verificable

- URL original conservada: https://limpieza-practica-para-cada-dia.nicolascaballero.chatgpt.site
- Directorio encontrado en este entorno de ejecución: `/workspace/scratch/99b28032be26/.sites-checkout`.
- Fuente publicada: versión **2**, commit `d3d6465f29ae1fa1b828f2680136711a1064428f`.
- La API de Sites confirmó esa versión y su commit; el HEAD local coincide.
- La fuente no se obtuvo de una captura ni de una reconstrucción aproximada.

### Estructura original

- `.openai/hosting.json`: identifica al Site y declara `dist` como contenido estático. No se exporta.
- `dist/index.html`: documento completo, CSS inline, JavaScript inline y catálogo.
- `dist/assets/`: `toallas-cleanso.jpeg`, `traperos.jpeg`, `desinfectantes.jpeg`, `cocina.jpeg`, `panitos.jpeg`, `mini.jpeg`.
- `.git`: historial de Sites; no se copia al proyecto independiente.

### Stack y comportamiento

HTML5, CSS3, JavaScript nativo y SVG inline del icono de WhatsApp. Sin React, router, gestor de paquetes original, lockfile original, API, base de datos, autenticación en la página, almacenamiento, cookies de aplicación o integración de GPT Sites necesaria en runtime.

Una sola página `/`. Anclas `#inicio` y `#productos`. Secciones: encabezado, hero, catálogo, llamada final, pie y botón fijo móvil. CSS con breakpoints de 800, 580 y 360 px. Fuentes del sistema, incluyendo Avenir cuando está instalada; no hay fuentes descargadas. Gradientes, hover, scroll suave, animación de estrellas e IntersectionObserver para aparición de tarjetas; fallback cuando no existe IntersectionObserver y preferencia de movimiento reducido.

No existen buscadores, filtros, modales, ventanas de detalles, formularios, carrito, pasarela ni checkout. Las tarjetas ofrecen el enlace Consultar a WhatsApp; no se añadieron funciones para simular componentes ausentes.

### Catálogo y contacto conservados

| ID de referencia | Producto | Descripción | CLP | Unidad |
| --- | --- | --- | ---: | --- |
| toallas-cleanso | Toallas húmedas Cleanso | Paquete 80 + 10 unidades | 1200 | c/u |
| traperos | Traperos húmedos | Aroma lavanda · 15 unidades | 1500 | c/u |
| desinfectantes | Toallas desinfectantes | Paquete Eco9 | 1200 | c/u |
| cocina | Toallas de cocina | Paquete 80 + 10 unidades | 2500 | c/u |
| panitos | Pañitos húmedos | Variedad de colores | 1000 | c/u |
| mini | Toallas húmedas pequeñas | Foto: 8 paquetes | 1000 | sin unidad explícita |

Se mantienen nueve enlaces `https://wa.me/56983658040`, seis específicos y tres generales. Los primeros cinco enlaces de producto incluyen la cifra correspondiente; el último pide confirmar el precio, igual que el original. La relación imagen/producto y el texto accesible se conservan.

## C. Migración

### Copia independiente

Directorio: `/workspace/scratch/99b28032be26/limpieza-practica`.

Los siete archivos web se copiaron a `public/`. No se editaron ni transformaron; `source-integrity.json` contiene los SHA-256 de referencia. El build vuelve a verificar la entrada y copia los mismos bytes a `dist/`.

### Adaptaciones mínimas

- Se elimina la dependencia del manifiesto y de la identidad de hosting de Sites por omisión en la copia, sin editar el original.
- Se agregan `package.json` y `package-lock.json` de npm, sin paquetes de terceros.
- Node.js 24.x se utiliza exclusivamente para scripts de desarrollo, validación y build. Probado con Node 24.19.0 y npm 11.9.0.
- Se agregan servidor estático local, comprobaciones de integridad y empaquetado de producción mediante módulos estándar de Node.
- Se agregan `.gitignore`, `.node-version`, `README.md`, `CATALOG_UPDATE.md`, este informe, `source-integrity.json` y `catalog.snapshot.json`.

### Catálogo separado y alcance de los IDs

Se conserva el HTML como fuente de renderizado. `catalog.snapshot.json` proporciona una referencia externa verificable con seis IDs estables para supervisión y pruebas. No introduce fetch ni altera el funcionamiento sin JavaScript. Separar la fuente de datos en un generador sería una modificación adicional no necesaria para la migración fiel y se deja para otra fase.

### Diferencias

El contenido web es idéntico. Cambian únicamente la estructura del repositorio, las herramientas de preparación y la futura plataforma de hosting. Las fuentes del sistema pueden verse distintas en otro dispositivo, como sucede ya con el original. No se han configurado diferencias de headers, caché, errores 404 o dominios de Pages; deben revisarse en su Preview. No se declara equivalencia de infraestructura todavía.

## D. Validación ejecutada

| Comprobación | Resultado y alcance |
| --- | --- |
| `npm install --package-lock-only --ignore-scripts` | Exit 0; lockfile generado sin dependencias |
| `npm ci --ignore-scripts` | Exit 0; instalación reproducible vacía |
| `npm test` | Exit 0; siete hashes, inventario, seis productos y nueve enlaces válidos |
| `npm run build` | Exit 0; verificación de `public` y `dist`, copia exacta |
| Catálogo comercial | Nombres, descripciones, precios, unidades, alt, imágenes y URLs iguales a la referencia |
| Archivos de imagen | Seis JPEG originales, 1280 × 960, firmas JPEG verificadas |
| Metadatos de imágenes | EXIF limitado a resolución, orientación, espacio de color y dimensiones; sin GPS, autor, fecha de captura ni datos de dispositivo detectados en los campos revisados |
| Escritorio | Chrome, viewport observado 1363 × 936; tres columnas, sin overflow horizontal |
| Imágenes en navegador | Siete elementos img cargados (hero más seis productos), naturalWidth > 0 |
| Navegación | Clic en Ver productos llevó a `#productos`; clic en marca llevó a `#inicio` |
| Animación de aparición | Tarjetas visibles al llegar al catálogo; código original conservado |
| Consola | No se observaron errores de la aplicación; sí mensajes de una extensión del navegador, ajenos al código de la landing |
| Comparación visual | Referencia original local y copia local observadas en escritorio; sin cambios de archivos web |
| Móvil | Pendiente: no se ejecutó una sesión con viewport móvil; CSS responsive conservado, sin afirmar prueba funcional |
| WhatsApp externo | URL, número y texto decodificado comprobados; apertura de WhatsApp/app y envío de mensajes no probados |
| Modales, filtros y búsqueda | No aplican: ausentes en el original y en la copia |
| Comparación visual con URL remota | No ejecutada; procedencia de la fuente respaldada por el commit de la versión publicada obtenido de Sites |
| Prueba HTTP directa desde shell a localhost:4173 | No completada: conexión rechazada por la separación del servicio de preview; no se cuenta como prueba aprobada. El navegador sí cargó la preview supervisada |
| Original intacto | Git limpio, sin diff, mismo HEAD después de preparar y probar la copia; ninguna llamada de guardado o despliegue a Sites |

Se observó un aviso de npm por `http-proxy` configurado en el entorno anfitrión. No produjo fallos ni se copió esa configuración al repositorio. No hubo errores de compilación ni correcciones al contenido comercial.

La prueba de escritorio se realizó sobre la fuente `public` de la copia. La salida `dist` fue comprobada por hashes e inventario; no se afirma un despliegue de producción ni una prueba HTTP independiente de `npm run preview`.

### Auditoría previa a publicación

Se revisa el conjunto de archivos de la copia mediante inventario y patrones de credenciales, claves privadas y tokens conocidos. Las imágenes se revisaron además por metadatos EXIF. No se incluyen `.openai`, `.git` original, archivos `.env`, credenciales, perfiles de usuario, descargas, capturas de navegador ni logs. El teléfono comercial ya público se conserva expresamente por ser parte del sitio. No hay dependencias de terceros que auditar ni paquetes de runtime. La auditoría es acotada a estos archivos; no constituye garantía de detección universal de secretos.

## E. GitHub

- **Destino solicitado:** https://github.com/Simbyte-2025/limpieza-practica
- **Cuenta autenticada:** `Simbyte-2025`, verificada por el complemento GitHub.
- **Respuesta de consulta:** 404; no permite distinguir por sí sola repositorio ausente de repositorio no accesible.
- **Visibilidad solicitada:** pública; no aplicada ni verificada remotamente.
- **Rama prevista:** `main`; copia local preparada en esa rama.
- **Descripción prevista:** `Landing de catálogo de productos de limpieza — proyecto piloto Simbyte`.
- **Hash de commit publicado:** ninguno; no se hizo push ni se creó commit remoto.
- **Conflictos de historial:** ninguno manipulado; no se accedió ni sobrescribió historial remoto.
- **Limitación:** herramienta de creación ausente, GitHub CLI no instalado/autenticado en este entorno y navegación a GitHub bloqueada por política. No se eludió la política.
- **Archivos principales:** `public/index.html`, seis imágenes, scripts, paquete/lockfile, manifiestos de prueba y los tres documentos requeridos.
- **Próximo paso necesario:** crear un repositorio vacío accesible con la cuenta correcta, o continuar desde un entorno local autorizado con GitHub CLI. Reconsultar contenido e historial antes de publicar; si existen, detenerse para autorización.

## F. Cloudflare Pages — solo documentación

| Parámetro | Propuesta |
| --- | --- |
| Producto | Cloudflare Pages con integración Git nativa |
| Framework preset | None / sitio estático |
| Directorio raíz | raíz del repositorio |
| Instalación local | `npm ci --ignore-scripts` |
| Build | `npm run build` |
| Salida | `dist` |
| Node | 24.x, archivo `.node-version` con `24` |
| Rama de producción | `main` |
| Variables de aplicación y secretos | ninguna |
| Dominio previsto | `demo-limpieza.simbytelabs.com`, aún no configurado |
| Bindings / persistencia / funciones | ninguno |

La detección del campo `engines` no debe usarse como único mecanismo en Pages; el archivo `.node-version` declara la versión explícita. La instalación automática de Pages puede usar el lockfile; no se necesita un gestor distinto. No hace falta Worker, Wrangler, adaptador React, `_redirects` de SPA, clave API de WhatsApp ni token Cloudflare en GitHub.

### Procedimiento posterior mínimo

1. Completar publicación y verificar commit y rama en GitHub.
2. En la cuenta personal que administra `simbytelabs.com`, crear un proyecto Pages e importar el repositorio; limitar el permiso GitHub a este proyecto.
3. Seleccionar los parámetros de la tabla. Confirmar `main` como producción y políticas de Preview para ramas/PR.
4. Crear una rama de prueba para obtener Preview, revisar móvil/escritorio, catálogo y enlaces. No inventar URL de Preview: usar la devuelta por Pages.
5. Validar producción en la URL generada por Pages antes de asociar el dominio previsto.
6. Agregar el dominio desde el proyecto Pages y revisar DNS/SSL exclusivamente de ese subdominio. No modificar `grayamigurumis` ni otras zonas/proyectos.

No se comprobó la cuenta Cloudflare ni la propiedad de la zona en esta ejecución: solo se consultó documentación pública mediante el complemento. No se crearon proyectos, builds, previews, DNS, dominios, tokens ni permisos Cloudflare. La posibilidad de desplegar es una inferencia técnica razonable por tratarse de archivos estáticos; queda pendiente la comprobación en Pages.

Fuentes oficiales consultadas el 19-10-2026:

- [Integración GitHub de Pages](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/)
- [Configuración de build](https://developers.cloudflare.com/pages/configuration/build-configuration/)
- [Imagen de build y override de Node](https://developers.cloudflare.com/pages/configuration/build-image/)

## G. Próxima fase, decisiones y seguimiento

### Orden de ejecución

1. Resolver acceso/creación de GitHub, verificar repositorio vacío y publicar el commit local en `main`.
2. Comprobar hashes y contenido contra GitHub y registrar el SHA remoto.
3. Completar validación móvil y apertura de enlaces de WhatsApp sin enviar mensajes.
4. Autorizar por separado la configuración de Pages y el dominio previsto.
5. Crear Preview y producción, con revisión de rutas, HTTPS, caché, 404 y compatibilidad móvil.
6. Implementar actualizaciones de catálogo únicamente mediante cambios supervisados en ramas y PR.

### Actualizaciones mediante agentes

El responsable entrega ID de producto, valores anteriores y nuevos e imágenes aprobadas. El agente valida IDs, prepara un diff comercial, modifica solo datos autorizados, ajusta la referencia y hashes con revisión explícita y ejecuta pruebas. Un humano revisa Preview antes de integrar a producción. Conservar cambios y aprobaciones en Git. No hacen falta n8n ni una automatización que reciba correos. Un generador de catálogo desde JSON puede estudiarse después, con un contrato de datos y pruebas propias; no se implementó aquí.

### Riesgos pendientes

Creación del repositorio bloqueada; no confundir 404 con inexistencia confirmada. Pruebas móviles/WhatsApp pendientes. Diferencias de plataforma de hosting aún no medidas. Revisar derechos de reutilización de las fotografías si se adapta esta plantilla a otros clientes. No resolver limitaciones de infraestructura alterando precios, productos o contacto.

### Criterios de éxito

| Criterio solicitado | Estado |
| --- | --- |
| Original intacto | Cumplido en fuente y sin nuevas publicaciones |
| Copia instalable y build reproducible | Cumplido localmente |
| Funcionalidades principales comprobadas | Parcial: escritorio y datos; móvil/WhatsApp externo pendientes |
| Datos comerciales conservados | Cumplido: identidad por SHA-256 y referencia de catálogo |
| Repositorio público con archivos | Pendiente / bloqueado |
| Commit inicial verificable en GitHub | Pendiente / no publicado |
| Preparación Cloudflare documentada | Cumplido; no desplegado |
| Informe técnico | Entregado |

**Resultado final: migración incompleta.** Responsable del desbloqueo: Nicolás/Simbyte con acceso a creación del repositorio. Codex puede retomar la publicación cuando exista un repositorio vacío autorizado y accesible. Éxito de la próxima fase: SHA remoto verificable, pruebas pendientes completadas y Preview aprobada antes de producción.
