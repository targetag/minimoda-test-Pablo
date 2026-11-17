# Clase 5 · Borradores de issues

**Autor** · Pablo Villeda

Repositorio de destino: Simonethg/minimoda-test. Cada borrador conserva la fuente, los pasos, el resultado y la pregunta de decisión.

## I-01 · Confirmación con carrito vacío

- **Fuente y esperado.** Manual §3, HIST-18 y changelog 0.9.1: se bloquea la compra sin prendas.
- **Reproducción.** Abrir /checkout sin prendas. Completar Persona QA, Calle Demo 123, miniqa@example.test, Argentina, tarjeta de aprobación 4111111111111111 de la demo, 12/30 y CVV 123. Pulsar Confirmar compra.
- **Resultado actual.** Aparece «Compra confirmada. Orden» mientras el resumen sigue vacío. Mensaje en Bandeja A VERIFICAR. [E09](evidencia-playwright.md#e09--confirmación-con-carrito-vacío)
- **Hipótesis.** La validación de la ruta directa podría diferir de la del carrito.
- **Pregunta al equipo.** ¿En qué etapa se debe rechazar la confirmación sin prendas?

## I-02 · Envío gratis en Argentina

- **Fuente y esperado.** Manual §3 y Sprint 14 HIST-18: envío gratis desde $50.000. Changelog 0.9.0 y Lucas: desde $80.000. Ambas reglas implican envío gratis a $84.000.
- **Reproducción.** Con Gorrito de Lana Osito a $5.600, abrir checkout desde el carrito con 9, 14 y 15 unidades. Dejar Argentina y registrar envío. Usar Atrás, sin recargar, para ajustar la cantidad.
- **Resultado actual.** Cobró $3.500 con $50.400, $78.400 y $84.000. [E05](evidencia-playwright.md#e05--envío-argentina-a-distintos-subtotales)
- **Hipótesis.** Posible regla sin aplicar o anuncio desactualizado.
- **Pregunta al equipo.** ¿Qué umbral y base de cálculo corresponden a Argentina?

## I-03 · Edad mínima de registro

- **Fuente y esperado.** Sprint 14 HIST-12: mínimo 18 años. Manual §4: revisar el rango en el formulario.
- **Reproducción.** Completar Registro con Persona QA, miniqa@example.test, contraseña y confirmación Qa123456, Argentina y términos aceptados. Enviar con 12, 13, 17 y 18 años en contextos separados.
- **Resultado actual.** 12 se rechaza con «La edad debe estar entre 13 y 120». Se aceptan 13, 17 y 18. [E06](evidencia-playwright.md#e06--registro-con-contextos-nuevos)
- **Hipótesis.** El criterio del sprint podría haber cambiado.
- **Pregunta al equipo.** ¿Se debe aceptar el registro desde los 13 o desde los 18?

## I-04 · Interés de Créditos

- **Fuente y esperado.** Manual §5 e HIST-21: financiación sin interés.
- **Reproducción.** Abrir /creditos con límite inicial disponible. Introducir 10000, seleccionar 3 cuotas y solicitar el crédito. Revisar historial y deuda.
- **Resultado actual.** Historial de crédito aprobado con $1.000 de interés. Deuda $11.000. [E07](evidencia-playwright.md#e07--créditos-y-ficha)
- **Hipótesis.** La promoción podría aplicar a un medio de financiación distinto.
- **Pregunta al equipo.** ¿Créditos al 10% y las cuotas sin interés de la ficha son ofertas distintas?

## I-05 · Cupón de bienvenida

- **Fuente y esperado.** Manual §3 y changelog 0.9.1: el cupón descuenta 10% del subtotal de prendas.
- **Reproducción.** Agregar un gorrito. Abrir checkout y revisar Datos y envío, Pago, Confirmación y Resumen. Si aparece un control de cupón, introducir MINIMODA10.
- **Resultado actual.** Con $5.600 en prendas no apareció control de cupón. Aplicación y cálculo A VERIFICAR. [E04](evidencia-playwright.md#e04--checkout-con-una-prenda-y-costos-por-país)
- **Hipótesis.** La función podría requerir otra condición o haber salido de la demo.
- **Pregunta al equipo.** ¿MINIMODA10 sigue vigente y dónde debe ingresarse?

## I-06 · Persistencia del carrito

- **Fuente y esperado.** Manual §2 p. 3: las prendas se conservan al recargar.
- **Reproducción.** Agregar Gorrito de Lana Osito desde /producto/3; abrir carrito, subir a 15 unidades y recargar.
- **Resultado actual.** El contador pasó de 15 a 0 y apareció «Tu carrito está vacío». [E03](evidencia-playwright.md#e03--carrito-antes-y-después-de-recargar)
- **Hipótesis.** Coincide con la pérdida advertida por Lucas.
- **Pregunta al equipo.** ¿Debe persistir el carrito al recargar o hay que actualizar el manual?

## I-07 · Acceso a Ayuda

- **Fuente y esperado.** Manual §6, README y changelog 0.8.0: Ayuda disponible. Lucas afirma que la ruta da 404.
- **Reproducción.** Abrir el inicio, revisar los enlaces del pie y navegar directamente a /ayuda. Registrar el estado HTTP.
- **Resultado actual.** No hay enlace de Ayuda en el pie. /ayuda devolvió HTTP 404 y «No encontramos esta página». [E08](evidencia-playwright.md#e08--ayuda-legales-y-bandeja)
- **Hipótesis.** La ruta podría seguir en backlog.
- **Pregunta al equipo.** ¿Se prevé habilitar /ayuda o actualizar la documentación con otro destino?
