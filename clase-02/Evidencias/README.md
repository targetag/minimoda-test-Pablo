# Evidencias — MiniModa, clase 02

Esta carpeta reúne copias de las evidencias existentes en el repositorio al 4 de noviembre de 2026. No se ejecutaron pruebas nuevas para esta reorganización. Los originales permanecen en sus ubicaciones anteriores.

## Bugs encontrados

| Hallazgo | Evidencia disponible | Alcance |
|---|---|---|
| Compra con carrito vacío | [Reporte de defectos](defects.md#empty-cart-demo-purchase-accepted) y [reporte manual de Qase](checkout-negativo-qase.md) | Confirmación de compra con subtotal 0 y envío 3500 en la demo. El reporte manual registra el paso 3 fallido. No acredita un cobro real. |
| Cantidad superior al stock | [Reporte de defectos](defects.md#cart-quantity-exceeds-displayed-stock) | Cantidad 26 con stock visible 25; reproducido históricamente en Chromium y Chrome. |
| Resultado conjunto | [Verificación histórica](verification.md) | Corrida del 28 de octubre: 32 ejecuciones aprobadas y 4 fallidas, de 36. |

Los documentos mencionan screenshots y trazas de los fallos guardados en archivos locales de aquella ejecución. Esos archivos no están versionados ni disponibles en el espacio de trabajo de esta entrega, por lo que no se agregan capturas de esos bugs.

## Capturas existentes de Qase

Estas imágenes documentan los casos de registro y la suite en Qase; no son capturas de los bugs de carrito o checkout.

| Archivo | Referencia en el repositorio |
|---|---|
| [Suite de casos](qase-suite-casos.png) | Vista de suite de Qase |
| [Registro exitoso](qase-MM-4-registro-alta-exitosa.png) | MM-4 |
| [Contraseña de 7 caracteres](qase-MM-5-registro-password-7.png) | MM-5 |
| [Edad 12](qase-MM-6-registro-edad-12.png) | MM-6 |

Origen: [clase-01/evidencias](../../clase-01/evidencias/). Se copian sin modificar; las referencias MM proceden de sus nombres y no acreditan por sí solas una ejecución aprobada.

## Descubrimientos relevantes

El [registro de exploración](site-exploration.md) documenta:

- La tienda usa datos ficticios, pagos simulados y correos guardados en el navegador.
- Las tarjetas demo permiten probar aprobación, rechazo, fondos insuficientes y vencimiento.
- El registro exige contraseña de al menos 8 caracteres y edad entera entre 13 y 120.
- La navegación completa podía perder el carrito; se conserva como observación pendiente de requisitos, no como defecto confirmado.
- La bandeja simulada permite revisar mensajes de compra y bienvenida.

## Procedencia de los documentos

| Copia en esta carpeta | Original |
|---|---|
| defects.md | [qa-automation/docs/defects.md](../../qa-automation/docs/defects.md) |
| verification.md | [qa-automation/docs/verification.md](../../qa-automation/docs/verification.md) |
| site-exploration.md | [qa-automation/docs/site-exploration.md](../../qa-automation/docs/site-exploration.md) |
| checkout-negativo-qase.md | [Reporte manual de checkout](../../Checkout%20Negative%20Testing%20QASE%20Test%20-%20QA%20Report%20Bug%20Evidencia) |

Los documentos históricos mantienen sus fechas y limitaciones originales. Los casos de prueba están en [Casos/README.md](../Casos/README.md).
