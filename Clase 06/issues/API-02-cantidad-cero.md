# POST /carritos/{carritoId}/items acepta cantidad 0

**Etiqueta propuesta** `api`  
**Severidad propuesta** Media. El carrito guarda un ítem con una cantidad inválida y la API informa que se agregó correctamente.  
**Entorno** MiniModa API 1.0.0, modo `con-defectos`, `http://localhost:4000`.

## Pasos para reproducir

Con el producto 3 disponible en el catálogo, ejecutá en PowerShell:

```powershell
$base = 'http://localhost:4000'
$carrito = curl.exe --noproxy '*' -fsS -X POST "$base/carritos" | ConvertFrom-Json
'{"productoId":3,"cantidad":0}' | curl.exe --noproxy '*' -i -X POST "$base/carritos/$($carrito.id)/items" -H 'Content-Type: application/json' --data-binary '@-'
```

## Resultado esperado

HTTP 400 con el esquema `Error`. La cantidad debe ser un entero mayor o igual a 1.

Contrato local: `paths./carritos/{carritoId}/items.post.responses.400`, `components.schemas.NuevoItem.properties.cantidad.minimum` y `components.schemas.Error`.

## Resultado obtenido

HTTP 201 Created. El carrito de la reproducción quedó con un ítem cuya cantidad es 0.

```json
{"id":"c-4","estado":"abierto","items":[{"productoId":3,"nombre":"Gorrito de Lana Osito","precioUnitario":"5600","cantidad":0,"subtotal":0}],"subtotal":0}
```

Evidencia de la colección: [API-02](../resultados/coleccion.txt).
