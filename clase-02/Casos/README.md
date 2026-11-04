# Clase 02 — Casos de prueba de MiniModa

**Autor:** Pablo Villeda GUA  
**Aplicación:** [MiniModa](https://minimoda-navy.vercel.app/)  
**Objetivo:** documentar los casos trabajados para MiniModa con precondiciones, datos, pasos y resultados esperados, conservando su relación con Qase y la suite Playwright.

## Fuentes y alcance

Esta guía se elaboró a partir de la documentación y las evidencias ya versionadas en el repositorio:

- [Casos TC-001, TC-002 y TC-003, transcritos del CSV de Qase](../../README_MiniModa_QA_Pablo_villeda_GUA.md#anexo-a-casos-de-prueba-completos-fuente-qase-csv).
- [Práctica de registro](../../clase-01/practica.md) y [captura de la suite Qase](../Evidencias/qase-suite-casos.png).
- [Especificación y trazabilidad de los 18 escenarios automatizados](../../qa-automation/docs/qase-test-cases.md).
- [Exploración de la aplicación](../../qa-automation/docs/site-exploration.md), [datos automatizados](../../qa-automation/utils/test-data.ts) y [verificación histórica](../../qa-automation/docs/verification.md).

Los pasos de los tres casos TC conservan el orden del anexo de Qase. Los datos concretos de automatización se identifican aparte porque el anexo original no fija todos esos valores. Las referencias MM-4, MM-5 y MM-6 proceden de los nombres de las capturas de registro; no se supone que MM y MINIMODA sean el mismo proyecto. El ID numérico de TC-002 debe verificarse en Qase.

**Estado de esta entrega:** documentación; no se ejecutaron nuevamente las pruebas ni se crearon casos o ejecuciones en Qase. Un resultado esperado no equivale a una prueba aprobada.

## Preparación y datos de prueba

1. Abrir la aplicación en Chrome o Chromium.
2. Comenzar cada caso independiente con una sesión limpia, sin carrito, cuenta ni mensajes previos. En Playwright se usa un contexto nuevo por prueba.
3. Usar navegación interna después de agregar productos: la exploración registró pérdida del carrito con recargas completas.
4. Confirmar precio y stock visibles antes de ejecutar. Los valores siguientes son la referencia histórica del 28 de octubre de 2026.
5. Al terminar, cerrar el contexto de prueba para descartar el estado local.

| Dato | Valor de referencia y uso |
|---|---|
| Producto | ID 3, Gorrito de Lana Osito |
| Precio unitario | 5600; la interfaz lo mostraba como $5,600 |
| Stock de referencia | 25; leer nuevamente el stock visible antes de probar su límite |
| Cantidad inicial | 1; subtotal esperado 5600 |
| Dos unidades | Subtotal esperado 11200 |
| Cliente automatizado | QA Automation |
| Email automatizado | qa.automation@example.test |
| Dirección automatizada | 123 Demo Street |
| Contraseña automatizada | DemoOnly123! |
| Registro manual de referencia | Ana Pérez, ana.qa.001@example.com, Abcd1234, edad 25, país Argentina, términos aceptados |
| Email inválido de checkout | invalid-email |
| Tarjeta demo aprobada | 4111111111111111 |
| Tarjeta demo rechazada | 4000000000000002 |
| Fondos insuficientes demo | 4000000000009995 |
| Tarjeta vencida demo | 4000000000000069 |
| Vencimiento válido automatizado | Diciembre del año actual + 3, formato MM/AA; en 2026: 12/29 |

Los números anteriores son los valores públicos de simulación documentados en la demo. MiniModa simula pagos y correos en el navegador. La confirmación visual y la bandeja permiten comprobar el flujo de la demo; no acreditan un cobro bancario ni registros de un backend. El país y CVV deben completarse con valores válidos según la interfaz; las fuentes consultadas no fijan un valor único para esos campos.

## TC-001 — Agregar un producto al carrito

**Título original:** Verify User Can Add a Product to the Shopping Cart.  
**Prioridad:** alta. **Severidad:** crítica. **Tipo:** funcional positivo.

**Objetivo:** comprobar que un producto disponible se agrega con nombre, precio, cantidad y subtotal correctos.

**Precondiciones:** aplicación accesible, conexión disponible, producto con stock y carrito vacío.

**Datos:** producto 3 como referencia reproducible; cantidad predeterminada 1. Registrar su nombre y precio visibles.

| Paso | Acción | Resultado esperado |
|---:|---|---|
| 1 | Entrar a la página principal de MiniModa. | La página carga sin errores. |
| 2 | Abrir el catálogo. | Se muestran productos con nombre, imagen y precio. |
| 3 | Seleccionar un producto con stock. | Se visualiza correctamente la información del producto elegido. |
| 4 | Pulsar Agregar al carrito. | Se agrega el producto y la interfaz informa la acción. |
| 5 | Abrir el carrito. | Aparece el producto seleccionado. |
| 6 | Comparar nombre y precio unitario con el catálogo. | Ambos coinciden. |
| 7 | Revisar la cantidad. | Es 1 si se utilizó la cantidad predeterminada. |
| 8 | Revisar el subtotal. | Es precio unitario × cantidad; con el producto de referencia: 5600 × 1 = 5600. |

**Postcondiciones:** producto presente, subtotal correcto y ausencia de duplicados o cargos inesperados.

**Extensión automatizada CART-ADD:** aumentar a 2 unidades y comprobar total 11200; quitar ambas unidades y verificar carrito vacío y checkout deshabilitado.

**Evidencia histórica:** [reporte manual de carrito/stock](https://app.qase.io/public/report/8fb05302a903294142a80b6d32855d4e357b47a1). La documentación asocia el carrito con MINIMODA-1 / TC-001.

## TC-002 — Completar correctamente el checkout

**Título original:** Verify User Can Successfully Complete Checkout.  
**Prioridad:** alta. **Severidad:** crítica. **Tipo:** funcional positivo.

**Objetivo:** completar una compra válida y obtener una sola confirmación con los datos correctos.

**Precondiciones:** checkout de prueba accesible, al menos un producto con stock en el carrito, datos ficticios válidos y método de pago de prueba aprobado. La definición original también requiere servicio de pedidos operativo para validar registros.

**Datos para la demo:** una unidad del producto 3; cliente y dirección de la tabla; tarjeta aprobada; vencimiento futuro y demás campos válidos según la interfaz.

| Paso | Acción | Resultado esperado |
|---:|---|---|
| 1 | Abrir el carrito. | Productos y subtotal correctos. |
| 2 | Continuar al checkout. | El checkout carga correctamente. |
| 3 | Completar cliente y envío con datos válidos. | Los campos obligatorios se aceptan sin errores. |
| 4 | Ingresar los datos del pago de prueba aprobado. | El formulario acepta los datos. |
| 5 | Revisar precios, envío y total. | Los importes coinciden con los precios y cargos aplicables; el total incluye el envío mostrado. |
| 6 | Pulsar Confirmar compra una sola vez. | Comienza el procesamiento y se impiden envíos duplicados. |
| 7 | Esperar el resultado. | La confirmación aparece después de la aprobación y creación del pedido. |
| 8 | Inspeccionar la confirmación. | Referencia y detalle de compra correctos, si la aplicación los ofrece. |
| 9 | Consultar registros de pedidos cuando exista acceso. | Existe exactamente un pedido con artículos, importe y estado pagado correctos. |

**Postcondiciones:** un solo pedido, pago de prueba exitoso, confirmación visible y carrito actualizado o vaciado según requisitos.

**Comprobación implementada en la demo:** CHECKOUT-SUCCESS verifica subtotal 5600, referencia que comienza con MM y exactamente un correo de confirmación correspondiente en la bandeja simulada. La prevención de doble envío, liquidación real y unicidad en backend no quedan acreditadas por esa comprobación visual. Si no hay acceso a los registros del paso 9, registrar esa limitación; no darlo por aprobado.

**Trazabilidad:** el repositorio documenta TC-002 como cobertura propuesta; su carga e ID real en Qase requieren verificación.

## TC-003 — Rechazar transacciones inválidas

**Título original:** Verify Checkout Rejects Invalid Transactions.  
**Prioridad:** alta. **Severidad:** crítica. **Tipo:** funcional negativo.

**Objetivo:** impedir compras con carrito vacío, datos incompletos, email inválido o pago rechazado.

**Precondiciones:** aplicación de prueba accesible; posibilidad de vaciar el carrito; producto con stock; datos válidos de cliente; tarjeta de prueba rechazada. Para comprobar pedidos y pagos reales se necesitan sus registros.

| Paso | Acción y datos | Resultado esperado |
|---:|---|---|
| 1 | Vaciar el carrito. | No quedan productos y el subtotal de mercadería es cero. |
| 2 | Abrir directamente /checkout. | Redirige al carrito o muestra un estado bloqueado por carrito vacío. |
| 3 | Intentar confirmar la compra vacía, si la interfaz lo permite. | Se bloquea el envío; no se crea pedido ni pago. |
| 4 | Agregar un producto con stock y volver al checkout. | Producto y resumen correctos. |
| 5 | Dejar vacíos los campos obligatorios de cliente y envío. | Permanecen vacíos para probar la validación. |
| 6 | Pulsar Confirmar compra. | Se impide continuar y se señalan los campos faltantes. |
| 7 | Ingresar invalid-email; completar correctamente los demás campos y validar. | Se rechaza el email con un error claro. |
| 8 | Corregir email y demás datos requeridos. | Los datos de cliente y envío pasan la validación. |
| 9 | Ingresar la tarjeta demo rechazada 4000000000000002. | El escenario de rechazo queda preparado. |
| 10 | Pulsar Confirmar compra. | Aparece un error claro de pago rechazado y no se crea un pedido pagado. |
| 11 | Revisar el carrito después del rechazo. | Los productos quedan disponibles para reintentar según requisitos. |
| 12 | Revisar registros de pedidos y pagos, si hay acceso. | No existen cargos exitosos ni pedidos pagados de los intentos rechazados. |

**Postcondiciones:** ningún intento rechazado genera pago exitoso o pedido pagado; el usuario puede corregir datos y recuperar el carrito.

**Resultado manual registrado en Qase el 28 de octubre de 2026:** Failed, caso numérico 3. Pasos 1 y 2 aprobados; paso 3 fallido; pasos 4–12 sin probar. El comentario indica que se permitió completar una compra sin productos y se mostró un cargo de envío. El export no aporta transacción bancaria ni registros de backend.

[Consultar reporte histórico de Qase](https://app.qase.io/public/report/d1aa9f984a4c83377bc85943524577957b18649b/0dc2be4037771c5b2172123a14d590c88c06428c).

**Variantes automatizadas independientes:** formulario vacío → seis errores obligatorios; email inválido → campo inválido y sin confirmación; tarjetas 0002, 9995 y 0069 → “Tarjeta rechazada”, “Fondos insuficientes” y “Tarjeta vencida”, respectivamente, conservando el carrito y sin correo de compra. Separar los escenarios evita que el fallo del carrito vacío impida probar las demás validaciones.

## Casos de registro vinculados con las evidencias Qase

Las siguientes instrucciones desarrollan los escenarios descritos en la práctica. Los datos manuales proceden de esa práctica; no se afirma una transcripción literal del contenido de las capturas ni una ejecución nueva.

**Precondiciones comunes:** abrir /registro con formulario limpio y usar un email ficticio distinto por ejecución.

### MM-4 — Registro con datos válidos

**Prioridad:** alta. **Tipo:** funcional positivo.

| Paso | Acción y datos | Resultado esperado |
|---:|---|---|
| 1 | Ingresar Ana Pérez y ana.qa.001@example.com. | Nombre y email aceptados. |
| 2 | Ingresar Abcd1234 en contraseña y confirmación. | Se cumple el mínimo de 8 caracteres y ambas coinciden. |
| 3 | Ingresar edad 25 y seleccionar Argentina. | Edad dentro de 13–120 y país seleccionado. |
| 4 | Marcar términos y pulsar Crear cuenta. | Registro completado con confirmación de éxito. |
| 5 | Consultar la bandeja simulada. | Mensaje de bienvenida correspondiente; esta es una comprobación adicional de la automatización. |

**Postcondición:** cuenta demo creada en el contexto de prueba. El texto exacto de éxito quedó “A VERIFICAR” en la práctica original.

[Evidencia existente MM-4](../Evidencias/qase-MM-4-registro-alta-exitosa.png).

### MM-5 — Rechazar contraseña de 7 caracteres

**Prioridad:** alta. **Tipo:** límite / negativo.

| Paso | Acción y datos | Resultado esperado |
|---:|---|---|
| 1 | Completar Ana Pérez, ana.qa.004a@example.com, edad 25 y Argentina; aceptar términos. | Los demás campos son válidos. |
| 2 | Ingresar Abcd123 en contraseña y confirmación. | Ambas coinciden y tienen exactamente 7 caracteres. |
| 3 | Pulsar Crear cuenta. | Se bloquea el registro y se indica el mínimo de 8 caracteres. |
| 4 | Revisar el estado del formulario. | No hay confirmación de registro exitoso. |

**Postcondición:** cuenta no creada. La variante automatizada usa QaDemo1, también de 7 caracteres.

[Evidencia existente MM-5](../Evidencias/qase-MM-5-registro-password-7.png).

### MM-6 — Rechazar edad 12

**Prioridad:** alta. **Tipo:** límite / negativo.

| Paso | Acción y datos | Resultado esperado |
|---:|---|---|
| 1 | Completar Ana Pérez, ana.qa.005a@example.com, contraseña y confirmación Abcd1234, Argentina y términos aceptados. | Los demás campos son válidos. |
| 2 | Ingresar edad 12. | Queda preparado el valor inferior al mínimo permitido. |
| 3 | Pulsar Crear cuenta. | Se bloquea el registro y se informa el rango permitido de 13 a 120. |
| 4 | Revisar el estado del formulario. | No aparece confirmación de registro exitoso. |

**Postcondición:** cuenta no creada.

[Evidencia existente MM-6](../Evidencias/qase-MM-6-registro-edad-12.png).

## Cobertura complementaria automatizada

Estas referencias son locales de Playwright; no son nuevos IDs asignados por Qase. Se ejecuta cada variante desde un contexto limpio.

| Referencia | Pasos y datos | Resultado esperado |
|---|---|---|
| CATALOG-SEARCH | Abrir tienda; buscar Gorrito de Lana Osito; limpiar filtros. | Un producto coincidente; al limpiar regresan los 12 productos de la referencia histórica. |
| CATALOG-NO-STOCK | Abrir tienda; inspeccionar acción del producto 2 y contador del carrito. | Botón Sin stock deshabilitado; contador 0. |
| CART-STOCK | Leer stock actual del producto 3; agregarlo; incrementar hasta ese stock; intentar una unidad adicional. | La cantidad permanece en el stock disponible. Con stock 25 no debe aceptar 26. |
| REGISTER-AGE-121 | Completar registro válido, excepto edad 121; enviar. | Error de rango y sin alta exitosa. |
| REGISTER-VALID-13 / REGISTER-VALID-120 | Completar datos válidos con contraseña QaDemo12; probar por separado edades 13 y 120; aceptar términos; enviar y abrir bandeja. | Ambos límites admitidos; éxito y un mensaje de bienvenida en cada contexto. |
| REGISTER-TERMS | Completar datos válidos y dejar términos sin marcar; enviar. | Casilla inválida y registro bloqueado. |
| LOGIN-REQUIRED | Abrir /registro; enviar el formulario de inicio de sesión sin email ni contraseña. | Mensajes de campos obligatorios; no implica validación de autenticación real. |

La práctica también propuso email de registro inválido ana@, contraseña de 9 caracteres, edades 14, 119 y 13.5 y envío de todo el registro vacío. No se incluyen como ejecuciones confirmadas de los 18 escenarios automatizados. Sus pasos y criterios originales están en [clase-01/practica.md](../../clase-01/practica.md).

## Resultados históricos y registro en Qase

La corrida local documentada del **28 de octubre de 2026**, en Chromium y Google Chrome, contiene **18 escenarios y 36 ejecuciones: 32 aprobadas y 4 fallidas**. Las cuatro fallas corresponden a dos escenarios reproducidos en ambos navegadores:

| Escenario | Esperado | Observado en la verificación histórica |
|---|---|---|
| CHECKOUT-EMPTY | Bloquear la compra sin productos. | Se permitió la confirmación de compra vacía. |
| CART-STOCK | Impedir superar el stock visible. | Se aceptaron 26 unidades con stock de 25. |

Ver [defectos documentados](../../qa-automation/docs/defects.md) y [detalle de verificación](../../qa-automation/docs/verification.md). Estos resultados de Playwright no se publicaron automáticamente en Qase según la documentación existente.

Para registrar una repetición manual:

1. Abrir el caso existente en el proyecto Qase correcto y comprobar su ID.
2. Anotar navegador, fecha, entorno y datos utilizados.
3. Ejecutar cada paso y comparar el resultado real con el esperado.
4. Marcar Passed si coincide, Failed si contradice el criterio, Blocked si falta un requisito para ejecutarlo y Untested si no se ejecutó.
5. Ante un fallo, registrar paso exacto, resultado real y esperado, captura y defecto asociado. No marcar los pasos pendientes como aprobados.
6. Conservar el enlace de la ejecución y actualizar esta guía si cambian los criterios.

## Repetir la suite Playwright

Desde la raíz del repositorio:

```powershell
cd qa-automation
npm ci
npx playwright install chromium
npx playwright test
npx playwright show-report
```

El proyecto chrome requiere Google Chrome instalado. El reporte HTML, las capturas de fallos y las trazas de reintento se generan localmente según la configuración de la suite. Consultar [qa-automation/README.md](../../qa-automation/README.md) para configuración y publicación opcional en Qase.

## Evidencias de esta entrega

Consultar el [índice de evidencias](../Evidencias/README.md) para las capturas de Qase, reportes históricos de bugs y descubrimientos documentados.
