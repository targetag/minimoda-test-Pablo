# GET /productos/{id} devuelve 200 para un producto inexistente

**Etiqueta propuesta** `api`  
**Severidad propuesta** Media. El consumidor recibe una respuesta exitosa para un recurso inexistente y debe interpretar el cuerpo para detectar que no hay producto.  
**Entorno** MiniModa API 1.0.0, modo `con-defectos`, `http://localhost:4000`.

## Pasos para reproducir

1. Confirmá que el ID 999 está ausente del catálogo de prueba.
2. Ejecutá en PowerShell:

```powershell
curl.exe --noproxy '*' -i 'http://localhost:4000/productos/999'
```

## Resultado esperado

HTTP 404 con el esquema `Error`, que requiere `codigo`, `mensaje` y `detalles`.

Contrato local: `paths./productos/{id}.get.responses.404` y `components.schemas.Error`.

## Resultado obtenido

HTTP 200 OK.

```json
{"producto":null}
```

Evidencia de la colección: [API-01](../resultados/coleccion.txt).
