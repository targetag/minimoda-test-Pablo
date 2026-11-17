# Clase 5 · Casos de prueba

**Autor** · Pablo Villeda

Destino previsto: proyecto MINIMODA, suite «Clase 5 · Exploratorio MiniModa». Precondición común: abrir la demo en un contexto nuevo y usar únicamente datos sintéticos. Prioridades propuestas.

## C5-01 · Stock agotado

- **Pasos y datos.** Tienda → Enterito de Algodón Nubes → abrir ficha y revisar botón.
- **Esperado según el kit.** Manual §1 p. 3: un agotado se oculta y su ficha no abre.
- **Observado.** El producto aparece, la ficha /producto/2 abre y el botón Sin stock está deshabilitado. [E02](evidencia-playwright.md#e02--tienda-y-fichas)
- **Tipo y prioridad.** Funcional · media.

## C5-02 · Persistencia del carrito

- **Pasos y datos.** Agregar Gorrito de Lana Osito desde /producto/3; abrir carrito, subir a 15 unidades y recargar.
- **Esperado según el kit.** Manual §2 p. 3: las prendas se conservan al recargar.
- **Observado.** El contador pasó de 15 a 0 y apareció «Tu carrito está vacío». [E03](evidencia-playwright.md#e03--carrito-antes-y-después-de-recargar)
- **Tipo y prioridad.** Funcional · media.

## C5-03 · Envío gratis en Argentina

- **Pasos y datos.** Con Gorrito de Lana Osito a $5.600, abrir checkout desde el carrito con 9, 14 y 15 unidades. Dejar Argentina y registrar envío. Usar Atrás, sin recargar, para ajustar la cantidad.
- **Esperado según el kit.** Manual §3 y Sprint 14 HIST-18: envío gratis desde $50.000. Changelog 0.9.0 y Lucas: desde $80.000. Ambas reglas implican envío gratis a $84.000.
- **Observado.** Cobró $3.500 con $50.400, $78.400 y $84.000. [E05](evidencia-playwright.md#e05--envío-argentina-a-distintos-subtotales)
- **Tipo y prioridad.** Funcional · alta.

## C5-04 · Cupón de bienvenida

- **Pasos y datos.** Agregar un gorrito. Abrir checkout y revisar Datos y envío, Pago, Confirmación y Resumen. Si aparece un control de cupón, introducir MINIMODA10.
- **Esperado según el kit.** Manual §3 y changelog 0.9.1: el cupón descuenta 10% del subtotal de prendas.
- **Observado.** Con $5.600 en prendas no apareció control de cupón. Aplicación y cálculo A VERIFICAR. [E04](evidencia-playwright.md#e04--checkout-con-una-prenda-y-costos-por-país)
- **Tipo y prioridad.** Funcional · media.

## C5-05 · Longitud mínima de contraseña

- **Pasos y datos.** Abrir Registro. Usar Persona QA, miniqa@example.test, 18 años, Argentina y aceptar términos. En contextos separados, introducir y confirmar Qa1234, Qa12345 y Qa123456. Enviar.
- **Esperado según el kit.** Sprint 14 HIST-12: mínimo 6 caracteres. Manual §4: mínimo 8.
- **Observado.** 6 y 7 se rechazan con «La contraseña debe tener al menos 8 caracteres». Con 8 hay registro exitoso. [E06](evidencia-playwright.md#e06--registro-con-contextos-nuevos)
- **Tipo y prioridad.** Límites · media.

## C5-06 · Edad mínima de registro

- **Pasos y datos.** Completar Registro con Persona QA, miniqa@example.test, contraseña y confirmación Qa123456, Argentina y términos aceptados. Enviar con 12, 13, 17 y 18 años en contextos separados.
- **Esperado según el kit.** Sprint 14 HIST-12: mínimo 18 años. Manual §4: revisar el rango en el formulario.
- **Observado.** 12 se rechaza con «La edad debe estar entre 13 y 120». Se aceptan 13, 17 y 18. [E06](evidencia-playwright.md#e06--registro-con-contextos-nuevos)
- **Tipo y prioridad.** Límites · alta.

## C5-07 · Interés de Créditos

- **Pasos y datos.** Abrir /creditos con límite inicial disponible. Introducir 10000, seleccionar 3 cuotas y solicitar el crédito. Revisar historial y deuda.
- **Esperado según el kit.** Manual §5 e HIST-21: financiación sin interés.
- **Observado.** Historial de crédito aprobado con $1.000 de interés. Deuda $11.000. [E07](evidencia-playwright.md#e07--créditos-y-ficha)
- **Tipo y prioridad.** Funcional · alta.

## C5-08 · Acceso a Ayuda

- **Pasos y datos.** Abrir el inicio, revisar los enlaces del pie y navegar directamente a /ayuda. Registrar el estado HTTP.
- **Esperado según el kit.** Manual §6, README y changelog 0.8.0: Ayuda disponible. Lucas afirma que la ruta da 404.
- **Observado.** No hay enlace de Ayuda en el pie. /ayuda devolvió HTTP 404 y «No encontramos esta página». [E08](evidencia-playwright.md#e08--ayuda-legales-y-bandeja)
- **Tipo y prioridad.** Funcional · media.

## C5-09 · Confirmación con carrito vacío

- **Pasos y datos.** Abrir /checkout sin prendas. Completar Persona QA, Calle Demo 123, miniqa@example.test, Argentina, tarjeta de aprobación 4111111111111111 de la demo, 12/30 y CVV 123. Pulsar Confirmar compra.
- **Esperado según el kit.** Manual §3, HIST-18 y changelog 0.9.1: se bloquea la compra sin prendas.
- **Observado.** Aparece «Compra confirmada. Orden» mientras el resumen sigue vacío. Mensaje en Bandeja A VERIFICAR. [E09](evidencia-playwright.md#e09--confirmación-con-carrito-vacío)
- **Tipo y prioridad.** Negativo · alta.

Para el run de tres casos de la guía, selección propuesta: C5-03, C5-06 y C5-09. Las referencias son locales; los IDs de Qase se asignan al importar.
