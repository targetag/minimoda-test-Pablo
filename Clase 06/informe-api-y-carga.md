# Clase 6 · Informe de pruebas de API y de carga

**API** · MiniModa API 1.0.0 · modo con-defectos · http://localhost:4000  
**Herramientas** · Postman, Postman CLI y k6 · IA usada: Codex  
**Fuente de resultados esperados** · Contrato OpenAPI 3.0.3 servido por `GET /openapi.json` en localhost.

## 1. Casos

Todos los paths usan `http://localhost:4000`. Para los casos con carrito, guardá el ID devuelto al crearlo. Confirmá que el producto usado existe y tiene stock suficiente antes de agregarlo.

| ID | Tipo | Solicitud | Esperado según el contrato | Cita del contrato | Obtenido | ¿Pasa? |
|---|---|---|---|---|---|---|
| API-01 | Negativo | `GET /productos/999`. Confirmar previamente que 999 está ausente del catálogo. | 404 con el esquema Error. | `paths./productos/{id}.get.responses.404` | 200. El cuerpo no cumple el esquema Error. | No |
| API-02 | Negativo | Con un carrito recién creado, `POST /carritos/{carritoId}/items` con `{"productoId":3,"cantidad":0}`. | 400 con el esquema Error. El mínimo de cantidad es 1. | `paths./carritos/{carritoId}/items.post.responses.400`, `components.schemas.NuevoItem.properties.cantidad.minimum` | El carrito se creó con 201. La cantidad 0 también devolvió 201 y el cuerpo no cumple el esquema Error. | No |
| API-03 | Valor límite | `GET /productos?max=0` | 200 con ListaProductos. Cada producto devuelto tiene precio igual a 0. Una lista vacía cumple el filtro. | `paths./productos.get.parameters` (parámetro `max`), `paths./productos.get.responses.200`, `components.schemas.Producto.properties.precio.minimum` | 200. Pasaron las aserciones de ListaProductos y del filtro de precio. | Sí |
| API-04 | Secuencia | `POST /carritos` → `POST /carritos/{carritoId}/items` con `{"productoId":3,"cantidad":1}` → `GET /carritos/{carritoId}`. | 201 → 201 → 200. La lectura devuelve el mismo ID y el ítem agregado con cantidad 1 y precioUnitario numérico. | `paths./carritos.post.responses.201`, `paths./carritos/{carritoId}/items.post.responses.201`, `paths./carritos/{carritoId}.get.responses.200`, `components.schemas.ItemCarrito` | 201 → 201 → 200. precioUnitario fue el texto `"5600"`, donde el contrato exige un número. | No |
| API-05 | Idempotencia | Crear un carrito nuevo y agregar el producto 3 con cantidad 1. Enviar dos veces `POST /pedidos` con el mismo JSON `{"carritoId":"{{carritoId}}","email":"ana@ejemplo.com","tarjeta":"4111111111111111"}` y la misma `Idempotency-Key`, nueva para cada corrida. | 201 en ambos envíos. Misma ID de pedido y `Idempotent-Replayed: true` en la segunda respuesta. | `paths./pedidos.post.description`, `paths./pedidos.post.responses.201.headers.Idempotent-Replayed` | 201 → 201 en los envíos del pedido. La repetición devolvió el mismo ID y el encabezado `Idempotent-Replayed: true`. | Sí |
| API-06 | Formato de error | `GET /productos?pagina=0` | 400. El cuerpo tiene `codigo` y `mensaje` de tipo string y `detalles` como lista de strings. | `paths./productos.get.parameters` (parámetro `pagina`), `paths./productos.get.responses.400`, `components.schemas.Error` | 400. El cuerpo cumple el esquema Error. | Sí |

## 2. Resultados de la colección

Ejecutado el 18 de noviembre de 2026 con Postman CLI 1.91.0 con el entorno local. El comando reproducible desde la raíz del repositorio de entrega es el siguiente.

```powershell
$carpeta = 'Clase 06'
postman.cmd collection run "$carpeta/coleccion/MiniModa-Clase-06.postman_collection.json" -e "$carpeta/coleccion/local.postman_environment.json" --reporters cli
```

- 13 solicitudes ejecutadas contra `http://localhost:4000`, sin errores de transporte.
- 22 de 27 aserciones pasaron y 5 fallaron. El comando terminó con código 1.
- La búsqueda `GET /productos/buscar?q=remera` devolvió 200 y `productos` fue una lista.
- Postman CLI emitió un aviso de permisos para su carpeta de logs. La ejecución completó todas las solicitudes y aserciones.

Salida de la corrida: [resultados/coleccion.txt](resultados/coleccion.txt).

## 3. Issues

Reportes del paso 5 (etiqueta propuesta `api`):

- [API-01 · Producto inexistente](issues/API-01-producto-inexistente.md)
- [API-02 · Cantidad cero](issues/API-02-cantidad-cero.md)

La publicación como issues de GitHub está pendiente porque la sección Issues está desactivada en el repositorio.

## 4. Preguntas para el equipo

- ¿Los valores de `codigo` y el texto literal de `mensaje` deben ser estables para cada error? El esquema define sus tipos y muestra un ejemplo de `codigo`.

## 5. Carga y conclusión

Pendiente.
