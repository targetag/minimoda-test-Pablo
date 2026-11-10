# Resultados de QA del checkout de MiniModa

**9 de noviembre de 2026 a las 8:22:35 p. m. (Guatemala) · Chromium · 42.4 s**

**8 PASSED · 1 FAILED · 0 BLOCKED · 0 SKIPPED.** Tasa de aprobación del **88,9 %**. Se ejecutaron nueve casos y diez intentos, incluido el reintento del carrito vacío.

Se usó el CSV de importación del proyecto MINIMODA como inventario. Los identificadores del reporte son referencias locales. Qase quedó pendiente de sincronización porque no había acceso autenticado ni IDs verificados. Se excluyeron los cinco casos exclusivos de catálogo, carrito o stock y los flujos de registro y login.

Entorno. [Demo pública de MiniModa](https://minimoda-navy.vercel.app/) con un contexto aislado por caso, datos ficticios y tarjetas públicas de simulación. Se reutilizaron siete tests y se añadieron CHECKOUT-PRICE y CHECKOUT-BACK. La comprobación de TypeScript pasó.

Comando desde la carpeta `qa-automation`

```powershell
npm.cmd exec --offline -- playwright test tests/checkout --project=chromium --workers=1
```

| Caso | Resultado | Intentos | Duración de intentos | Defecto |
|---|---|---:|---:|---|
| CHECKOUT-SUCCESS | PASSED | 1 | 3.63 s | — |
| CHECKOUT-REQUIRED | PASSED | 1 | 2.68 s | — |
| CHECKOUT-EMAIL | PASSED | 1 | 2.65 s | — |
| CHECKOUT-DECLINE-0002 | PASSED | 1 | 2.03 s | — |
| CHECKOUT-DECLINE-9995 | PASSED | 1 | 1.86 s | — |
| CHECKOUT-DECLINE-0069 | PASSED | 1 | 1.97 s | — |
| CHECKOUT-EMPTY | FAILED | 2 | 18.72 s | MM-QA-EMPTY |
| CHECKOUT-PRICE | PASSED | 1 | 2.00 s | — |
| CHECKOUT-BACK | PASSED | 1 | 1.98 s | — |

## Pasos y resultados

### CHECKOUT-SUCCESS

| Paso | Acción | Esperado | Observado |
|---:|---|---|---|
| 1 | Agregar un gorrito y abrir checkout. | El resumen muestra una unidad y un subtotal de $5.600. | Coincide con lo esperado. |
| 2 | Completar el formulario con datos sintéticos y enviar con la tarjeta pública de aprobación. | Aparece «Compra confirmada». | Coincide con lo esperado. |
| 3 | Abrir la bandeja desde la confirmación. | Hay un solo correo con la misma referencia MM y el email de prueba. | Coincide con lo esperado. |

### CHECKOUT-REQUIRED

| Paso | Acción | Esperado | Observado |
|---:|---|---|---|
| 1 | Abrir checkout con un producto y enviar el formulario vacío. | La aplicación valida los campos sin procesar una compra. | Coincide con lo esperado. |
| 2 | Revisar los errores y la bandeja simulada. | Aparecen seis avisos obligatorios. No hay confirmación ni correo de pedido. | Coincide con lo esperado. |

### CHECKOUT-EMAIL

| Paso | Acción | Esperado | Observado |
|---:|---|---|---|
| 1 | Completar el formulario y enviar con el correo `invalid-email`. | La validación rechaza el correo mal formado. | Coincide con lo esperado. |
| 2 | Revisar el estado del campo, el resultado y la bandeja. | El campo tiene `aria-invalid=true`. No hay confirmación ni correo de pedido. | Coincide con lo esperado. |

### CHECKOUT-DECLINE-0002

| Paso | Acción | Esperado | Observado |
|---:|---|---|---|
| 1 | Abrir checkout con un gorrito y enviar con la tarjeta de demo terminada en `0002`. | El pago simulado se rechaza. | Coincide con lo esperado. |
| 2 | Revisar la alerta, el resumen y la bandeja. | Aparece «Tarjeta rechazada». El artículo sigue en el resumen y no se confirma el pedido ni se emite un correo. | Coincide con lo esperado. |

### CHECKOUT-DECLINE-9995

| Paso | Acción | Esperado | Observado |
|---:|---|---|---|
| 1 | Abrir checkout con un gorrito y enviar con la tarjeta de demo terminada en `9995`. | El pago simulado se rechaza por saldo insuficiente. | Coincide con lo esperado. |
| 2 | Revisar la alerta, el resumen y la bandeja. | Aparece «Fondos insuficientes». Se conserva el artículo y no hay confirmación ni correo. | Coincide con lo esperado. |

### CHECKOUT-DECLINE-0069

| Paso | Acción | Esperado | Observado |
|---:|---|---|---|
| 1 | Abrir checkout con un gorrito y enviar con la tarjeta de demo terminada en `0069`. | El pago simulado se rechaza por vencimiento. | Coincide con lo esperado. |
| 2 | Revisar la alerta, el resumen y la bandeja. | Aparece «Tarjeta vencida». Se conserva el artículo y no hay confirmación ni correo. | Coincide con lo esperado. |

### CHECKOUT-EMPTY

| Paso | Acción | Esperado | Observado |
|---:|---|---|---|
| 1 | Abrir `/carrito`, comprobar contador cero y navegar directamente a `/checkout`. | El carrito está vacío. | Coincide con lo esperado. |
| 2 | Revisar subtotal y disponibilidad del botón. Si permite continuar, enviar datos sintéticos y tarjeta pública de aprobación una vez. | El sistema debe impedir confirmar una orden sin productos. | La interfaz permitió enviar el formulario. El resultado se comprobó en el paso siguiente. |
| 3 | Comprobar si aparece una confirmación y revisar la bandeja simulada. | No debe aparecer una referencia de orden ni una confirmación. | Apareció una confirmación en los dos intentos. En el reintento también apareció un correo en la bandeja simulada. |

### CHECKOUT-PRICE

| Paso | Acción | Esperado | Observado |
|---:|---|---|---|
| 1 | Registrar el precio unitario del gorrito en catálogo y agregar dos unidades. | El subtotal del carrito equivale al precio unitario multiplicado por dos. | Coincide con lo esperado. |
| 2 | Abrir checkout desde el carrito y comprobar el resumen. | Se mantienen las dos unidades y el mismo subtotal. | Coincide con lo esperado. |
| 3 | Comparar «Estimado» con el subtotal y el envío mostrados. | El importe estimado es igual al subtotal más el envío. | Coincide con lo esperado. |

### CHECKOUT-BACK

| Paso | Acción | Esperado | Observado |
|---:|---|---|---|
| 1 | Agregar una unidad y abrir el carrito. | El gorrito figura con cantidad uno. | Coincide con lo esperado. |
| 2 | Abrir checkout y usar Atrás del navegador. | El carrito conserva el producto y la cantidad. | Coincide con lo esperado. |
| 3 | Volver a abrir checkout desde el carrito. | Se conservan la línea y el subtotal. | Coincide con lo esperado. |

## MM-QA-EMPTY · Compra simulada confirmada con carrito vacío

**Defecto reproducido en 2 de 2 intentos.** Severidad alta en el flujo de checkout. Con el contador en cero, el subtotal de prendas en $0 y el acceso directo a /checkout, el formulario permitió enviar los datos de demo y mostró «Compra confirmada». En el reintento, el checkout y la bandeja simulada mostraron la misma orden `MM-252193` con un envío de $3.500.

Impacto. El flujo puede emitir una confirmación de pedido sin artículos. Se comprobó el comportamiento de la interfaz pública de demostración.

Reproducción. Seguir los tres pasos de CHECKOUT-EMPTY con un contexto nuevo. El test permanece como regresión con su resultado esperado original.

Corrección propuesta. Bloquear el envío si el carrito está vacío y repetir la validación en la capa que crea la orden. Retest pendiente.

Evidencia del reintento. [Confirmación con carrito vacío](carrito-vacio-confirmacion.png) · [Bandeja simulada](carrito-vacio-bandeja.png) · [Traza de Playwright](carrito-vacio-trace.zip)

## Incidencias de ejecución

El intento inicial no alcanzó la aplicación por un error de resolución DNS. Con el acceso de red habilitado, una ejecución diagnóstica detectó un selector ambiguo en el test de precios. Se ajustó al identificador observado del precio del producto y se repitió la selección completa. Los resultados de arriba corresponden a esa última ejecución.

[Reporte HTML de Playwright](playwright-html/index.html) · [Reporte JSON](playwright-results.json)
