# Clase 6 · Informe de pruebas de API y de carga
**API:** MiniModa API 1.0.0 · modo con-defectos · http://localhost:4000  
**Herramientas:** Postman + Postman CLI 1.91.0 · k6 v2.4.0 · IA usada: Codex

La verificación inicial devolvió HTTP 200 en `/health`, `/docs` y `/openapi.json`. El contrato OpenAPI 3.0.3 servido en localhost definió los resultados esperados. [Arranque y smoke test](README.md#paso-1--arranque-y-smoke-test)

## 1. Casos

| ID | Tipo | Solicitud | Esperado (contrato) | Cita del contrato | Obtenido | ¿Pasa? |
|---|---|---|---|---|---|---|
| API-01 | Negativo | `GET /productos/999`. Confirmar previamente que 999 está ausente del catálogo. | 404 con el esquema Error. | `paths./productos/{id}.get.responses.404` | 200. El cuerpo no cumple el esquema Error. | No |
| API-02 | Negativo | Con un carrito recién creado, `POST /carritos/{carritoId}/items` con `{"productoId":3,"cantidad":0}`. | 400 con el esquema Error. El mínimo de cantidad es 1. | `paths./carritos/{carritoId}/items.post.responses.400`, `components.schemas.NuevoItem.properties.cantidad.minimum` | El carrito se creó con 201. La cantidad 0 también devolvió 201 y el cuerpo no cumple el esquema Error. | No |
| API-03 | Valor límite | `GET /productos?max=0` | 200 con ListaProductos. Cada producto devuelto tiene precio igual a 0. Una lista vacía cumple el filtro. | `paths./productos.get.parameters` (parámetro `max`), `paths./productos.get.responses.200`, `components.schemas.Producto.properties.precio.minimum` | 200. Pasaron las aserciones de ListaProductos y del filtro de precio. | Sí |
| API-04 | Secuencia | `POST /carritos` → `POST /carritos/{carritoId}/items` con `{"productoId":3,"cantidad":1}` → `GET /carritos/{carritoId}`. | 201 → 201 → 200. La lectura devuelve el mismo ID y el ítem agregado con cantidad 1 y precioUnitario numérico. | `paths./carritos.post.responses.201`, `paths./carritos/{carritoId}/items.post.responses.201`, `paths./carritos/{carritoId}.get.responses.200`, `components.schemas.ItemCarrito` | 201 → 201 → 200. precioUnitario fue el texto `"5600"`, donde el contrato exige un número. | No |
| API-05 | Idempotencia | Crear un carrito nuevo y agregar el producto 3 con cantidad 1. Enviar dos veces `POST /pedidos` con el mismo JSON `{"carritoId":"{{carritoId}}","email":"ana@ejemplo.com","tarjeta":"4111111111111111"}` y la misma `Idempotency-Key`, nueva para cada corrida. | 201 en ambos envíos. Misma ID de pedido y `Idempotent-Replayed: true` en la segunda respuesta. | `paths./pedidos.post.description`, `paths./pedidos.post.responses.201.headers.Idempotent-Replayed` | 201 → 201 en los envíos del pedido. La repetición devolvió el mismo ID y el encabezado `Idempotent-Replayed: true`. | Sí |
| API-06 | Formato de error | `GET /productos?pagina=0` | 400. El cuerpo tiene `codigo` y `mensaje` de tipo string y `detalles` como lista de strings. | `paths./productos.get.parameters` (parámetro `pagina`), `paths./productos.get.responses.400`, `components.schemas.Error` | 400. El cuerpo cumple el esquema Error. | Sí |

## 2. Resultados de la colección

**Comando**

```powershell
$carpeta = 'Clase 06'
postman.cmd collection run "$carpeta/coleccion/MiniModa-Clase-06.postman_collection.json" -e "$carpeta/coleccion/local.postman_environment.json" --reporters cli
```

**Resultado:** 22 de 27 aserciones pasaron en 13 solicitudes. La colección devolvió código 1 por cinco aserciones fallidas en API-01, API-02 y API-04. La búsqueda `q=remera` devolvió HTTP 200 y `productos` como lista.  
**Salida:** [resultados/coleccion.txt](resultados/coleccion.txt)

## 3. Issues

- [#1 · GET /productos/{id} devuelve 200 para un producto inexistente](https://github.com/targetag/minimoda-test-Pablo/issues/1) · etiqueta `api` · [reporte local](issues/API-01-producto-inexistente.md)
- [#2 · POST /carritos/{carritoId}/items acepta cantidad 0](https://github.com/targetag/minimoda-test-Pablo/issues/2) · etiqueta `api` · [reporte local](issues/API-02-cantidad-cero.md)
- [#3 · La búsqueda supera el umbral de p95 con 20 usuarios virtuales](https://github.com/targetag/minimoda-test-Pablo/issues/3) · etiqueta `performance`

## 4. Preguntas para el equipo

- ¿Los valores de `codigo` y el texto literal de `mensaje` deben ser estables para cada error? El esquema define sus tipos y solo muestra un ejemplo de `codigo`.

## 5. Carga y conclusión

**Perfil**

| Campo | Valor |
|---|---|
| Endpoint | `GET /productos/buscar?q=remera` |
| Entorno | k6 y MiniModa API en la misma máquina, `http://localhost:4000`, modo `con-defectos` |
| Usuarios virtuales | Tres corridas separadas con 1, 5 y 20 VU. La corrida de 5 VU es la línea base. |
| Rampa de subida | De 0 a N usuarios en 10 s |
| Carga sostenida | N usuarios durante 30 s |
| Rampa de bajada | De N a 0 usuarios en 5 s |
| Acción por iteración | Una búsqueda y luego una pausa de 1 s |
| Comprobaciones | HTTP 200 y `productos` como lista |
| Umbrales | `http_req_duration: p(95)<300` ms y `http_req_failed: rate<0.01` |

| Corrida | p90 | p95 | Tasa de error | Solicitudes por segundo | Umbrales |
|---|---:|---:|---:|---:|---|
| [1 VU](k6/resultados/resumen-1-vu.txt) | 52.85 ms | 54 ms | 0.00 % | 0.745081 | Ambos cumplidos |
| [5 VU (línea base)](k6/resultados/resumen-5-vu.txt) | 52.3 ms | 54.99 ms | 0.00 % | 3.915957 | Ambos cumplidos |
| [20 VU](k6/resultados/resumen-20-vu.txt) | 405.75 ms | 412.13 ms | 0.00 % | 12.514781 | Latencia incumplida, tasa de error cumplida |

[Script de carga](k6/carga.js) · [Reporte HTML de 20 VU](k6/resultados/reporte-20-vu.html)

**Conclusión:** El smoke test confirmó la disponibilidad de la API local. En Postman pasaron tres de seis casos y se documentaron dos discrepancias en GitHub. La búsqueda pasó las comprobaciones de HTTP 200 y de formato de respuesta. Con k6, el p95 subió de **54.99 ms con 5 VU** a **412.13 ms con 20 VU**, un aumento de aproximadamente 7.5 veces y **112.13 ms por encima del umbral**. Las tres corridas registraron 0 % de errores HTTP. Con 20 VU se completaron 570 solicitudes y pasaron las 1140 comprobaciones funcionales, aunque la latencia incumplió el objetivo. El PR de cierre reúne la conclusión y los enlaces a los tres issues. [PR #4](https://github.com/targetag/minimoda-test-Pablo/pull/4)

**Límites:** k6 y MiniModa compartieron la misma máquina. Se hizo una corrida por nivel, con un perfil programado de 45 s, una sola consulta y el modo `con-defectos`. Los datos sirven para comparar esas corridas. Quedan sin determinar la capacidad en producción, la reproducibilidad del resultado entre corridas y la causa de la degradación.
