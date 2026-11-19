# Clase 6 · Informe de pruebas de API y de carga

**API** · MiniModa API 1.0.0 · modo con-defectos · http://localhost:4000  
**Herramientas** · Postman, Postman CLI y k6 · IA usada: Codex  
**Fuente de resultados esperados** · Contrato OpenAPI 3.0.3 servido por `GET /openapi.json` en localhost.

## 1. Casos

Todos los paths usan `http://localhost:4000`. Para los casos con carrito, guardá el ID devuelto al crearlo. Confirmá que el producto usado existe y tiene stock suficiente antes de agregarlo.

| ID | Tipo | Solicitud | Esperado según el contrato | Cita del contrato | Obtenido | ¿Pasa? |
|---|---|---|---|---|---|---|
| API-01 | Negativo | `GET /productos/999`. Confirmar previamente que 999 está ausente del catálogo. | 404 con el esquema Error. | `paths./productos/{id}.get.responses.404` | Pendiente | Pendiente |
| API-02 | Negativo | Con un carrito recién creado, `POST /carritos/{carritoId}/items` con `{"productoId":3,"cantidad":0}`. | 400 con el esquema Error. El mínimo de cantidad es 1. | `paths./carritos/{carritoId}/items.post.responses.400`, `components.schemas.NuevoItem.properties.cantidad.minimum` | Pendiente | Pendiente |
| API-03 | Valor límite | `GET /productos?max=0` | 200 con ListaProductos. Cada producto devuelto tiene precio igual a 0. Una lista vacía cumple el filtro. | `paths./productos.get.parameters` (parámetro `max`), `paths./productos.get.responses.200`, `components.schemas.Producto.properties.precio.minimum` | Pendiente | Pendiente |
| API-04 | Secuencia | `POST /carritos` → `POST /carritos/{carritoId}/items` con `{"productoId":3,"cantidad":1}` → `GET /carritos/{carritoId}`. | 201 → 201 → 200. La lectura devuelve el mismo ID y el ítem agregado con cantidad 1 y precioUnitario numérico. | `paths./carritos.post.responses.201`, `paths./carritos/{carritoId}/items.post.responses.201`, `paths./carritos/{carritoId}.get.responses.200`, `components.schemas.ItemCarrito` | Pendiente | Pendiente |
| API-05 | Idempotencia | Crear un carrito nuevo y agregar el producto 3 con cantidad 1. Enviar dos veces `POST /pedidos` con el mismo JSON `{"carritoId":"{{carritoId}}","email":"ana@ejemplo.com","tarjeta":"4111111111111111"}` y la misma `Idempotency-Key`, nueva para cada corrida. | 201 en ambos envíos. Misma ID de pedido y `Idempotent-Replayed: true` en la segunda respuesta. | `paths./pedidos.post.description`, `paths./pedidos.post.responses.201.headers.Idempotent-Replayed` | Pendiente | Pendiente |
| API-06 | Formato de error | `GET /productos?pagina=0` | 400. El cuerpo tiene `codigo` y `mensaje` de tipo string y `detalles` como lista de strings. | `paths./productos.get.parameters` (parámetro `pagina`), `paths./productos.get.responses.400`, `components.schemas.Error` | Pendiente | Pendiente |

## 2. Resultados de la colección

Pendiente de ejecución con Postman CLI.

## 3. Issues

Pendientes de evidencia de la ejecución.

## 4. Preguntas para el equipo

- ¿Los valores de `codigo` y el texto literal de `mensaje` deben ser estables para cada error? El esquema define sus tipos y muestra un ejemplo de `codigo`.

## 5. Carga y conclusión

Pendiente.
