# Actualización supervisada del catálogo

## Fuente de verdad actual

El sitio conserva el catálogo dentro de `public/index.html`, en seis elementos `article.product.reveal`. No usa JSON en tiempo de ejecución, API ni CMS. Se preservó el HTML original byte por byte para evitar alterar el renderizado, las animaciones o el funcionamiento sin JavaScript. Separarlo en un generador sería una fase futura con pruebas de equivalencia propias.

`catalog.snapshot.json` es una referencia de comprobación con identificadores estables; editarla por sí sola **no cambia la página**. Los IDs no se agregaron al HTML ni se dependen del orden visual para futuras asignaciones comerciales: identificar siempre por ID y nombre.

| ID de referencia | Nombre exacto | Precio CLP | Imagen |
| --- | --- | ---: | --- |
| toallas-cleanso | Toallas húmedas Cleanso | 1200 | assets/toallas-cleanso.jpeg |
| traperos | Traperos húmedos | 1500 | assets/traperos.jpeg |
| desinfectantes | Toallas desinfectantes | 1200 | assets/desinfectantes.jpeg |
| cocina | Toallas de cocina | 2500 | assets/cocina.jpeg |
| panitos | Pañitos húmedos | 1000 | assets/panitos.jpeg |
| mini | Toallas húmedas pequeñas | 1000 | assets/mini.jpeg |

## Esquema real y referencia

- `name`: texto de `h3`.
- `description`: texto de `p.detail`, conservar cantidades y atributos.
- `price_clp`: entero CLP sin separadores; en HTML se presenta con `$` y puntos de miles.
- `unit`: `c/u` en `span.per`, salvo el producto mini, que no lo tiene.
- `image`: atributo `src` relativo a `public/`; los archivos residen en `public/assets/`.
- `alt`: descripción original accesible de la imagen.
- `whatsapp_url`: `href` de `a.ask`. El número público es `56983658040`.
- `id`: identificador estable de referencia en `catalog.snapshot.json`, no dato del DOM original.

## Flujo de actualización

1. Recibir del responsable un listado explícito por ID, campos y valores nuevos; adjuntar imágenes exactas, sin inventar producto, stock, precio ni promociones.
2. Crear una rama y registrar el estado inicial. Detenerse si existe un conflicto o no se puede identificar un producto.
3. Editar únicamente el bloque del producto en `public/index.html`. Cambiar también la cifra del texto de WhatsApp cuando el producto la incluya; conservar el número.
4. Mantener las imágenes originales salvo reemplazo autorizado. Si se reemplazan, actualizar `src`, `alt` y la referencia verificable con autorización.
5. Revisar el diff comercial completo con el responsable. Ajustar `catalog.snapshot.json` a los cambios autorizados.
6. Los hashes de `source-integrity.json` fijan la línea base de migración: un cambio autorizado requiere recalcular los hashes afectados y documentar la nueva línea base y motivo. No actualizar hashes automáticamente para hacer pasar un error; conservar los hashes iniciales en Git. El commit fuente de Sites queda como procedencia histórica, no debe atribuirse a nuevas versiones comerciales.
7. Ejecutar `npm ci --ignore-scripts`, `npm test` y `npm run build`. Revisar escritorio y móvil, textos, imágenes, enlaces y consola.
8. Cuando Pages esté configurado, abrir PR y validar Preview. Aprobar cambios antes de integrar en `main`. No desplegar al Site original.

No hay búsquedas, filtros, modales, ventanas de detalle, carrito ni checkout que actualizar. Los botones Consultar son enlaces directos de WhatsApp. No enviar mensajes durante una prueba sin autorización expresa.

## Entrada recomendada para agentes

Un archivo de cambios con `product_id`, `fields`, `old_values`, `new_values`, `approved_by` y `approved_at`; imágenes con nombres locales y hash. Rechazar IDs duplicados, precios ambiguos, números de contacto nuevos o cambios de diseño no autorizados. El agente prepara un diff y una Preview; el responsable aprueba. Sin n8n, correos entrantes automáticos ni credenciales persistidas en el repositorio.
