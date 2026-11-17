# Clase 5 · MiniModa: contraste del kit con la app · Pablo Villeda

[Issue original #7](https://github.com/Simonethg/minimoda-test/issues/7) · [Seguimiento](cambios-despues-del-feedback.md)

**Autor** · Pablo Villeda  
**Práctica** · Clase 5, exploración de MiniModa · 16 de noviembre de 2026  
**Entorno** · https://minimoda-navy.vercel.app/

Entrega consolidada de la carpeta **pablo villeda**. Incluye 35 afirmaciones contrastadas, evidencia de Playwright, nueve casos documentados y siete hallazgos que requieren una decisión del equipo. Cada discrepancia conserva la fuente, la observación y una hipótesis abierta. **A VERIFICAR** identifica las pruebas pendientes.

Los escenarios con mayor impacto observado fueron la confirmación de una compra simulada sin prendas, el cargo de envío de $3.500 con un subtotal de $84.000 en Argentina y el registro aceptado a los 13 y 17 años frente al mínimo de 18 del Sprint 14.

- [Tabla info vs. app](#tabla)
- [Preguntas abiertas](#preguntas)
- [Casos de prueba](#casos)
- [Hallazgos que requieren una decisión](#hallazgos)
- [Evidencia de Playwright](#evidencia)

<a id="tabla"></a>

<details>
<summary>Tabla info vs. app</summary>

# Clase 5 · Mapa de afirmaciones de MiniModa

**Autor** · Pablo Villeda

Contraste con la demo pública del 16 de noviembre de 2026. La columna Estado compara cada afirmación con la observación obtenida. **A VERIFICAR** indica evidencia pendiente. Las hipótesis quedan abiertas para el equipo. Consulta los [casos reproducibles](#casos), los [borradores de issues](#hallazgos) y las [preguntas abiertas](#preguntas).

`00-empeza-por-aca.pdf`, p. 1, identifica la demo `https://minimoda-navy.vercel.app` y describe el estado de cada fuente. El manual es la versión 0.6 de septiembre de 2026 y está en actualización. Los criterios son de julio de 2026. El README indica agosto de 2026 como última revisión. Las fechas del changelog son aproximadas. La captura del chat muestra el 12 y 13 de octubre, sin año visible.

| Ref. | Tema | Afirmación del kit | Fuente | App actual | Estado | Evidencia | Hipótesis abierta |
| --- | --- | --- | --- | --- | --- | --- | --- |
| DOC-01 | Tienda | El catálogo permite filtrar por edad, color y precio. | README, «Qué hay en el sitio» (ago. 2026) | Edad, Color y Precio máx. visibles. | Coincide en controles | [E02](#e02) | Los controles o resultados observados son compatibles con la afirmación para la muestra revisada. |
| DOC-02 | Tienda | Las opciones del filtro de edad son Bebé, Niña, Niño y Pre-teen. También se puede buscar por nombre. | Manual §1, p. 3 (sep. 2026) | Cuatro grupos de edad; buscar el Gorrito devuelve 1 producto. | Coincide | [E02](#e02) | Los controles o resultados observados son compatibles con la afirmación para la muestra revisada. |
| DOC-03 | Tienda | La tienda ofrece filtros de edad, color y precio, ordenamiento y búsqueda por nombre. | Changelog 0.9.0 (sep. 2026 aprox.) | Edad, Color, Precio, Ordenar y Buscar visibles. | Coincide en controles | [E02](#e02) | Los controles o resultados observados son compatibles con la afirmación para la muestra revisada. |
| DOC-04 | Stock | Los productos agotados quedan fuera del catálogo y su ficha no se puede abrir. | Manual §1, p. 3 (sep. 2026) | Enterito agotado visible y ficha /producto/2 accesible. | Contradice en la prueba | [E02](#e02) | El manual podría describir una política anterior. Confirmar si se deben listar y abrir los agotados. |
| DOC-05 | Stock | Los productos agotados siguen visibles con el botón deshabilitado. | Chat, Lucas, 12 oct. 19:41 | Enterito agotado con botón Sin stock deshabilitado. | Coincide | [E02](#e02) | Lo observado es compatible con el cambio descrito por Lucas para esta muestra. |
| DOC-06 | Promoción | El manual menciona «20% menos» y deja pendiente si aplica a todo el catálogo o solo a destacados. | Manual §1, nota interna, p. 3 (sep. 2026) | 20% menos en destacados observados; el Enterito no lo muestra. Alcance comercial pendiente. | Validación parcial · A VERIFICAR | [E02](#e02) | La promoción podría depender del producto o de que sea destacado. Falta confirmar la regla. |
| DOC-07 | Carrito | Se agrega desde la ficha. Las prendas se conservan al recargar o entrar a `/carrito`. El flujo continúa con «Finalizar compra». | Manual §2, p. 3 (sep. 2026) | La prenda llega al carrito por navegación; el carrito pasa de 15 a 0 al recargar. | Contradice en la prueba | [E03](#e03) | La persistencia podría ser un requisito pendiente o una promesa desactualizada. |
| DOC-08 | Carrito | El carrito se guarda en el navegador. | README, «Qué hay en el sitio» (ago. 2026) | La navegación conserva las prendas y la recarga las pierde. El README no precisa cuándo deben conservarse. | A VERIFICAR | [E03](#e03) | «Se guarda» podría referirse solo a la navegación en la misma sesión. |
| DOC-09 | Carrito | El carrito está en memoria del cliente, fuera de localStorage, y se puede perder al recargar. | Chat, Lucas, 12 oct. 19:41 | Se reproduce la pérdida después de recargar. La implementación de almacenamiento queda pendiente. | Validación parcial · A VERIFICAR | [E03](#e03) | El comportamiento es compatible con estado en memoria. La prueba no identifica por sí sola dónde se guarda. |
| DOC-10 | Checkout | La compra es de práctica, sin backend de pagos real. | README, introducción (ago. 2026). Manual, p. 2 (sep. 2026) | Términos dicen que no se procesan pagos reales; checkout anuncia tarjetas de prueba. Backend sin inspeccionar. | Validación parcial · A VERIFICAR | [E08](#e08) | La UI describe un flujo de práctica; queda abierta la implementación de pagos. |
| DOC-11 | Checkout | Se solicitan nombre, dirección, email con formato válido, país, tarjeta de prueba, vencimiento MM/AA y CVV de 3 o 4 dígitos. | Manual §3, p. 4 (sep. 2026) | Campos y ayudas visibles. Validación completa de formato, fecha y CVV pendiente. | Validación parcial · A VERIFICAR | [E04](#e04) | Los controles visibles son compatibles con el manual. Queda por comprobar qué entradas se rechazan. |
| DOC-12 | Checkout | Una compra requiere al menos una prenda y el email se valida por formato. | Sprint 14, HIST-18, p. 1 (jul. 2026) | Compra confirmada sin prendas; prueba de email inválido pendiente. | Contradice en parte · A VERIFICAR | [E09](#e09) | Podría faltar un bloqueo en el acceso directo a Checkout. La validación de email requiere otra prueba. |
| DOC-13 | Checkout | La confirmación con carrito vacío está bloqueada. | Manual §3, p. 4 (sep. 2026). Changelog 0.9.1 (oct. 2026 aprox.) | Checkout confirma y muestra una orden con resumen vacío. | Contradice en la prueba | [E09](#e09) | Podría faltar un bloqueo en el acceso directo a Checkout. Confirmar qué debe impedir la orden. |
| DOC-14 | Envío | En Argentina el envío es gratis desde $50.000 y por debajo tiene costo. | Manual §3, p. 4 (sep. 2026) | Con $50.400, Argentina cobra $3.500. | Contradice en la prueba | [E05](#e05) | El manual podría conservar un umbral anterior. El resultado a $84.000 también requiere explicar el cobro. |
| DOC-15 | Envío | En Argentina el envío es gratis desde $50.000. El refinamiento dejó el umbral pendiente de revisión. | Sprint 14, HIST-18 y notas, p. 1 (jul. 2026) | Con $50.400, Argentina cobra $3.500. | Contradice en la prueba | [E05](#e05) | El criterio del sprint podría haber cambiado. La regla vigente no se deduce del cargo observado. |
| DOC-16 | Envío | El umbral de envío gratis en Argentina subió a $80.000. | Changelog 0.9.0 (sep. 2026 aprox.) | Con $84.000, Argentina cobra $3.500. | Contradice en la prueba | [E05](#e05) | El cálculo podría aplicar una condición adicional o el umbral anunciado podría estar desactualizado. |
| DOC-17 | Envío | El umbral subió de $50.000 a $80.000 y el manual está pendiente de actualizar. | Chat, Lucas, 12 oct. 19:41 | Con $84.000, Argentina cobra $3.500. | Contradice en la prueba | [E05](#e05) | El cambio descrito por Lucas podría no estar activo para el escenario probado. |
| DOC-18 | Envío | El checkout permite enviar a cualquier país. | README, «Qué hay en el sitio» (ago. 2026) | El texto anuncia cualquier país, pero el selector ofrece 18 destinos. Canadá no figura. | Contradice en la prueba | [E04](#e04) | «Cualquier país» podría ser una descripción general de un catálogo limitado de destinos. |
| DOC-19 | Envío | Las tarifas fuera de Argentina varían por país. El manual remite a la página Envíos y deja pendiente la tabla de costos. Lucas indica que la tabla por país no se subió. | Manual §3, p. 4 (sep. 2026). Chat, Lucas, 12 oct. 19:41 | Argentina $3.500, Chile $9.000, España $28.000; Envíos describe tarifas por zona. | Coincide en la muestra | [E04](#e04) | La muestra es compatible con varias tarifas por zona. Su alcance queda por confirmar. |
| DOC-20 | Cupón | El checkout admite un cupón comercial o de bienvenida. | Sprint 14, HIST-18 (jul. 2026). README, «Qué hay en el sitio» (ago. 2026) | El checkout con una prenda no muestra campo ni acción de cupón. | Contradice en la prueba | [E04](#e04) | El control podría estar retirado, oculto bajo otra condición o pendiente en la demo. |
| DOC-21 | Cupón | El cupón opcional `MINIMODA10` descuenta 10% del subtotal de prendas. | Manual §3, p. 4 (sep. 2026). Changelog 0.9.1 (oct. 2026 aprox.) | No hay control visible donde introducir MINIMODA10; su cálculo queda A VERIFICAR. | Contradice en la prueba | [E04](#e04) | La ausencia de control impide evaluar el descuento. Confirmar si el cupón sigue vigente y dónde se aplica. |
| DOC-22 | Cupón | Lucas indica que el cupón `MINIMODA10` de 10% quedó en checkout. | Chat, Lucas, 12 oct. 19:41 | No se encontró control de cupón en checkout con una prenda. | Contradice en la prueba | [E04](#e04) | El cambio descrito por Lucas podría no estar disponible en esta versión o bajo estas condiciones. |
| DOC-23 | Registro | La contraseña requiere un mínimo de 6 caracteres. El refinamiento dejó pendiente revisar la longitud. | Sprint 14, HIST-12 y notas, p. 1 (jul. 2026) | Rechaza 6 y 7 caracteres; acepta 8 con 18 años. | Contradice en la prueba | [E06](#e06) | El sprint podría describir un mínimo anterior al que aplica el formulario. |
| DOC-24 | Registro | La contraseña requiere un mínimo de 8 caracteres. El manual indica que esa cifra supersede las anteriores. | Manual §4, p. 5 (sep. 2026) | Rechaza 7 y acepta 8, con el resto de los datos válidos. | Coincide | [E06](#e06) | La muestra es compatible con el mínimo de ocho indicado por el manual. |
| DOC-25 | Registro | La edad mínima es 18 años. El país es obligatorio y se deben aceptar los términos. | Sprint 14, HIST-12, p. 1 (jul. 2026) | Acepta 13 y 17 años; el formulario muestra país y términos, pero no se probaron por omisión. | Contradice en parte · A VERIFICAR | [E06](#e06) | El requisito de edad podría haber cambiado después del sprint. País y términos requieren pruebas por separado. |
| DOC-26 | Registro | Se piden nombre, email, contraseña y confirmación, edad entera, país y aceptación de términos. El rango de edad figura en el formulario. | Manual §4, p. 5 (sep. 2026) | Todos los campos visibles. La UI indica 13–120; 12 se rechaza y 13 se acepta. Límite superior y decimales pendientes. | Validación parcial · A VERIFICAR | [E06](#e06) | Los resultados son compatibles con el límite inferior visible. El límite superior y los decimales quedan abiertos. |
| DOC-27 | Registro | Hay validaciones de práctica para nombre, email, contraseña, edad, país y términos. | Changelog 0.8.0 (ago. 2026 aprox.) | Se verificaron validaciones de edad y contraseña. Resto por probar. | Validación parcial · A VERIFICAR | [E06](#e06) | La muestra confirma dos validaciones; las demás pueden seguir reglas distintas. |
| DOC-28 | Login | El ingreso con email y contraseña es simulado. El manual afirma que no hay cuentas reales. | README, «Qué hay en el sitio» (ago. 2026). Manual §4, p. 5 (sep. 2026) | El texto de Ingresar presenta el login como simulado. Inicio de sesión sin ejecutar. | Validación parcial · A VERIFICAR | [E06](#e06) | La pantalla presenta un inicio de sesión de práctica. Su comportamiento aún no se observó. |
| DOC-29 | Créditos | Las fichas anuncian «3 cuotas sin interés». La financiación en la sección Créditos también es sin interés. | Manual §5, p. 6 (sep. 2026) | La ficha dice 3 cuotas sin interés. Créditos aplica $1.000 de interés a $10.000. | Contradice en parte | [E07](#e07) | La ficha y Créditos podrían referirse a modalidades de financiación distintas. |
| DOC-30 | Créditos | Se puede solicitar crédito en cuotas sin interés. | Sprint 14, HIST-21, p. 1 (jul. 2026). README, «Qué hay en el sitio» (ago. 2026) | El crédito se aprueba con 10% de interés; deuda de $11.000. | Contradice en la prueba | [E07](#e07) | Créditos podría aplicar una regla posterior al sprint o distinta de la descrita en el kit. |
| DOC-31 | Créditos | La sección Créditos apareció en la versión 0.9.0. | Changelog 0.9.0 (sep. 2026 aprox.) | La sección existe. Versión de introducción sin verificar. | Validación parcial · A VERIFICAR | [E07](#e07) | La presencia actual de Créditos no permite determinar en qué versión se introdujo. |
| DOC-32 | Ayuda | Ayuda está en el pie y en `/ayuda`. | Manual §6, p. 6 (sep. 2026). README, «Cómo empezar» (ago. 2026). Changelog 0.8.0 (ago. 2026 aprox.) | /ayuda responde HTTP 404. El pie no tiene enlace Ayuda. | Contradice en la prueba | [E08](#e08)  · [E01](#e01) | Ayuda podría seguir pendiente o haberse retirado. Confirmar cuál es el destino previsto. |
| DOC-33 | Ayuda | El pie enlaza a `/ayuda`, pero esa ruta da 404 según Lucas. La página quedó en backlog. | Chat, Lucas, 13 oct. 09:12 | HTTP 404 coincide con Lucas; el enlace anunciado no está en el pie actual. | Contradice en parte | [E08](#e08)  · [E01](#e01) | El 404 es compatible con el chat. El pie podría haber cambiado después de la conversación. |
| DOC-34 | Legales | «Cambios y devoluciones» indica un plazo de 30 días y contacto en `hola@minimoda.test`. | Manual §6, p. 6 (sep. 2026) | La página indica 30 días y hola@minimoda.test. | Coincide | [E08](#e08) | La política visible es compatible con el manual de la demo. |
| DOC-35 | Bandeja | Existe una bandeja de avisos de práctica. El manual indica que el correo de contacto es ficticio y que los avisos salen en la Bandeja. | README, «Qué hay en el sitio» (ago. 2026). Changelog 0.8.0 (ago. 2026 aprox.). Manual §6, p. 6 (sep. 2026) | Bandeja disponible y descrita como simulada; Cambios aclara que el correo de contacto no existe. | Coincide en pantalla | [E08](#e08) | Los textos visibles son compatibles con una bandeja simulada. La entrega de cada aviso requiere otra prueba. |

## Preguntas para orientar el contraste

- **Envío.** ¿Qué umbral aplica en Argentina? Probar subtotales por debajo, en el límite y por encima de los valores documentados, según permitan los precios del catálogo. ¿Qué destinos están disponibles y cuál es la tarifa esperada fuera de Argentina? El kit no trae la tabla de tarifas.
- **Registro.** ¿Qué acepta el formulario con contraseñas sintéticas de 5, 6, 7 y 8 caracteres, manteniendo válidos los demás campos? ¿Cómo responde con 17 y 18 años?
- **Stock.** ¿Un producto agotado se lista, permite abrir su ficha y muestra la acción de agregar deshabilitada? Si durante el recorrido no se encuentra un producto agotado, registrar la condición como pendiente.
- **Carrito.** ¿Se conserva al navegar a `/carrito` y tras recargar en el mismo contexto? Validar ambos comportamientos por separado.
- **Ayuda.** ¿A qué ruta lleva el enlace del pie y qué muestra? Registrar el destino y el resultado visible.
- **Promociones y créditos.** ¿Dónde aparece «20% menos» y a cuáles productos aplica? ¿El checkout tiene un campo de cupón y el descuento coincide con el 10% del subtotal? ¿Qué muestran la ficha y la sección Créditos sobre cuotas e intereses?

</details>

<a id="preguntas"></a>

<details>
<summary>Preguntas abiertas</summary>

# Clase 5 · Preguntas abiertas

**Autor** · Pablo Villeda

## Decisiones del equipo

- C5-09. ¿En qué etapa se debe rechazar la confirmación sin prendas?
- C5-03. ¿Qué umbral y base de cálculo corresponden a Argentina?
- C5-06. ¿Se debe aceptar el registro desde los 13 o desde los 18?
- C5-07. ¿Créditos al 10% y las cuotas sin interés de la ficha son ofertas distintas?
- C5-04. ¿MINIMODA10 sigue vigente y dónde debe ingresarse?
- C5-02. ¿Debe persistir el carrito al recargar o hay que actualizar el manual?
- C5-08. ¿Se prevé habilitar /ayuda o actualizar la documentación con otro destino?
- ¿Se deben listar y permitir abrir las fichas de productos agotados con la acción de agregado deshabilitada?
- ¿Debe la app anunciar «cualquier país» con 18 destinos en el selector? ¿Dónde está la tabla oficial de tarifas?
- ¿El mínimo de 8 caracteres reemplaza formalmente el criterio de 6 del Sprint 14?
- ¿Qué productos califican para «20% menos»?

## A VERIFICAR en la demo

- Envío en los importes exactos de $50.000 y $80.000, si el catálogo permite construir esos subtotales.
- Email inválido, vencimiento y CVV en checkout, y confirmación en Bandeja después de la compra con carrito vacío.
- País o términos omitidos en Registro, edades decimales y límite superior de edad; login simulado.
- Alcance de filtros por separado, tarifas de destinos restantes, alcance total de la promoción y mecanismo interno de persistencia.

</details>

<a id="casos"></a>

<details>
<summary>Casos de prueba</summary>

# Clase 5 · Casos de prueba

**Autor** · Pablo Villeda

Destino previsto: proyecto MINIMODA, suite «Clase 5 · Exploratorio MiniModa». Precondición común: abrir la demo en un contexto nuevo y usar únicamente datos sintéticos. Prioridades propuestas.

## C5-01 · Stock agotado

- **Pasos y datos.** Tienda → Enterito de Algodón Nubes → abrir ficha y revisar botón.
- **Esperado según el kit.** Manual §1 p. 3: un agotado se oculta y su ficha no abre.
- **Observado.** El producto aparece, la ficha /producto/2 abre y el botón Sin stock está deshabilitado. [E02](#e02)
- **Tipo y prioridad.** Funcional · media.

## C5-02 · Persistencia del carrito

- **Pasos y datos.** Agregar Gorrito de Lana Osito desde /producto/3; abrir carrito, subir a 15 unidades y recargar.
- **Esperado según el kit.** Manual §2 p. 3: las prendas se conservan al recargar.
- **Observado.** El contador pasó de 15 a 0 y apareció «Tu carrito está vacío». [E03](#e03)
- **Tipo y prioridad.** Funcional · media.

## C5-03 · Envío gratis en Argentina

- **Pasos y datos.** Con Gorrito de Lana Osito a $5.600, abrir checkout desde el carrito con 9, 14 y 15 unidades. Dejar Argentina y registrar envío. Usar Atrás, sin recargar, para ajustar la cantidad.
- **Esperado según el kit.** Manual §3 y Sprint 14 HIST-18: envío gratis desde $50.000. Changelog 0.9.0 y Lucas: desde $80.000. Ambas reglas implican envío gratis a $84.000.
- **Observado.** Cobró $3.500 con $50.400, $78.400 y $84.000. [E05](#e05)
- **Tipo y prioridad.** Funcional · alta.

## C5-04 · Cupón de bienvenida

- **Pasos y datos.** Agregar un gorrito. Abrir checkout y revisar Datos y envío, Pago, Confirmación y Resumen. Si aparece un control de cupón, introducir MINIMODA10.
- **Esperado según el kit.** Manual §3 y changelog 0.9.1: el cupón descuenta 10% del subtotal de prendas.
- **Observado.** Con $5.600 en prendas no apareció control de cupón. Aplicación y cálculo A VERIFICAR. [E04](#e04)
- **Tipo y prioridad.** Funcional · media.

## C5-05 · Longitud mínima de contraseña

- **Pasos y datos.** Abrir Registro. Usar Persona QA, miniqa@example.test, 18 años, Argentina y aceptar términos. En contextos separados, introducir y confirmar Qa1234, Qa12345 y Qa123456. Enviar.
- **Esperado según el kit.** Sprint 14 HIST-12: mínimo 6 caracteres. Manual §4: mínimo 8.
- **Observado.** 6 y 7 se rechazan con «La contraseña debe tener al menos 8 caracteres». Con 8 hay registro exitoso. [E06](#e06)
- **Tipo y prioridad.** Límites · media.

## C5-06 · Edad mínima de registro

- **Pasos y datos.** Completar Registro con Persona QA, miniqa@example.test, contraseña y confirmación Qa123456, Argentina y términos aceptados. Enviar con 12, 13, 17 y 18 años en contextos separados.
- **Esperado según el kit.** Sprint 14 HIST-12: mínimo 18 años. Manual §4: revisar el rango en el formulario.
- **Observado.** 12 se rechaza con «La edad debe estar entre 13 y 120». Se aceptan 13, 17 y 18. [E06](#e06)
- **Tipo y prioridad.** Límites · alta.

## C5-07 · Interés de Créditos

- **Pasos y datos.** Abrir /creditos con límite inicial disponible. Introducir 10000, seleccionar 3 cuotas y solicitar el crédito. Revisar historial y deuda.
- **Esperado según el kit.** Manual §5 e HIST-21: financiación sin interés.
- **Observado.** Historial de crédito aprobado con $1.000 de interés. Deuda $11.000. [E07](#e07)
- **Tipo y prioridad.** Funcional · alta.

## C5-08 · Acceso a Ayuda

- **Pasos y datos.** Abrir el inicio, revisar los enlaces del pie y navegar directamente a /ayuda. Registrar el estado HTTP.
- **Esperado según el kit.** Manual §6, README y changelog 0.8.0: Ayuda disponible. Lucas afirma que la ruta da 404.
- **Observado.** No hay enlace de Ayuda en el pie. /ayuda devolvió HTTP 404 y «No encontramos esta página». [E08](#e08)
- **Tipo y prioridad.** Funcional · media.

## C5-09 · Confirmación con carrito vacío

- **Pasos y datos.** Abrir /checkout sin prendas. Completar Persona QA, Calle Demo 123, miniqa@example.test, Argentina, tarjeta de aprobación 4111111111111111 de la demo, 12/30 y CVV 123. Pulsar Confirmar compra.
- **Esperado según el kit.** Manual §3, HIST-18 y changelog 0.9.1: se bloquea la compra sin prendas.
- **Observado.** Aparece «Compra confirmada. Orden» mientras el resumen sigue vacío. Mensaje en Bandeja A VERIFICAR. [E09](#e09)
- **Tipo y prioridad.** Negativo · alta.

Para el run de tres casos de la guía, selección propuesta: C5-03, C5-06 y C5-09. Las referencias son locales; los IDs de Qase se asignan al importar.

</details>

<a id="hallazgos"></a>

<details>
<summary>Hallazgos que requieren una decisión</summary>

# Clase 5 · Borradores de issues

**Autor** · Pablo Villeda

Repositorio de destino: Simonethg/minimoda-test. Cada borrador conserva la fuente, los pasos, el resultado y la pregunta de decisión.

## I-01 · Confirmación con carrito vacío

- **Fuente y esperado.** Manual §3, HIST-18 y changelog 0.9.1: se bloquea la compra sin prendas.
- **Reproducción.** Abrir /checkout sin prendas. Completar Persona QA, Calle Demo 123, miniqa@example.test, Argentina, tarjeta de aprobación 4111111111111111 de la demo, 12/30 y CVV 123. Pulsar Confirmar compra.
- **Resultado actual.** Aparece «Compra confirmada. Orden» mientras el resumen sigue vacío. Mensaje en Bandeja A VERIFICAR. [E09](#e09)
- **Hipótesis.** La validación de la ruta directa podría diferir de la del carrito.
- **Pregunta al equipo.** ¿En qué etapa se debe rechazar la confirmación sin prendas?

## I-02 · Envío gratis en Argentina

- **Fuente y esperado.** Manual §3 y Sprint 14 HIST-18: envío gratis desde $50.000. Changelog 0.9.0 y Lucas: desde $80.000. Ambas reglas implican envío gratis a $84.000.
- **Reproducción.** Con Gorrito de Lana Osito a $5.600, abrir checkout desde el carrito con 9, 14 y 15 unidades. Dejar Argentina y registrar envío. Usar Atrás, sin recargar, para ajustar la cantidad.
- **Resultado actual.** Cobró $3.500 con $50.400, $78.400 y $84.000. [E05](#e05)
- **Hipótesis.** Posible regla sin aplicar o anuncio desactualizado.
- **Pregunta al equipo.** ¿Qué umbral y base de cálculo corresponden a Argentina?

## I-03 · Edad mínima de registro

- **Fuente y esperado.** Sprint 14 HIST-12: mínimo 18 años. Manual §4: revisar el rango en el formulario.
- **Reproducción.** Completar Registro con Persona QA, miniqa@example.test, contraseña y confirmación Qa123456, Argentina y términos aceptados. Enviar con 12, 13, 17 y 18 años en contextos separados.
- **Resultado actual.** 12 se rechaza con «La edad debe estar entre 13 y 120». Se aceptan 13, 17 y 18. [E06](#e06)
- **Hipótesis.** El criterio del sprint podría haber cambiado.
- **Pregunta al equipo.** ¿Se debe aceptar el registro desde los 13 o desde los 18?

## I-04 · Interés de Créditos

- **Fuente y esperado.** Manual §5 e HIST-21: financiación sin interés.
- **Reproducción.** Abrir /creditos con límite inicial disponible. Introducir 10000, seleccionar 3 cuotas y solicitar el crédito. Revisar historial y deuda.
- **Resultado actual.** Historial de crédito aprobado con $1.000 de interés. Deuda $11.000. [E07](#e07)
- **Hipótesis.** La promoción podría aplicar a un medio de financiación distinto.
- **Pregunta al equipo.** ¿Créditos al 10% y las cuotas sin interés de la ficha son ofertas distintas?

## I-05 · Cupón de bienvenida

- **Fuente y esperado.** Manual §3 y changelog 0.9.1: el cupón descuenta 10% del subtotal de prendas.
- **Reproducción.** Agregar un gorrito. Abrir checkout y revisar Datos y envío, Pago, Confirmación y Resumen. Si aparece un control de cupón, introducir MINIMODA10.
- **Resultado actual.** Con $5.600 en prendas no apareció control de cupón. Aplicación y cálculo A VERIFICAR. [E04](#e04)
- **Hipótesis.** La función podría requerir otra condición o haber salido de la demo.
- **Pregunta al equipo.** ¿MINIMODA10 sigue vigente y dónde debe ingresarse?

## I-06 · Persistencia del carrito

- **Fuente y esperado.** Manual §2 p. 3: las prendas se conservan al recargar.
- **Reproducción.** Agregar Gorrito de Lana Osito desde /producto/3; abrir carrito, subir a 15 unidades y recargar.
- **Resultado actual.** El contador pasó de 15 a 0 y apareció «Tu carrito está vacío». [E03](#e03)
- **Hipótesis.** Coincide con la pérdida advertida por Lucas.
- **Pregunta al equipo.** ¿Debe persistir el carrito al recargar o hay que actualizar el manual?

## I-07 · Acceso a Ayuda

- **Fuente y esperado.** Manual §6, README y changelog 0.8.0: Ayuda disponible. Lucas afirma que la ruta da 404.
- **Reproducción.** Abrir el inicio, revisar los enlaces del pie y navegar directamente a /ayuda. Registrar el estado HTTP.
- **Resultado actual.** No hay enlace de Ayuda en el pie. /ayuda devolvió HTTP 404 y «No encontramos esta página». [E08](#e08)
- **Hipótesis.** La ruta podría seguir en backlog.
- **Pregunta al equipo.** ¿Se prevé habilitar /ayuda o actualizar la documentación con otro destino?

</details>

<a id="evidencia"></a>

<details>
<summary>Evidencia de Playwright</summary>

# Evidencia de Playwright · MiniModa

**Autor** · Pablo Villeda

16 de noviembre de 2026 · Demo pública. Extractos de las vistas accesibles y respuestas HTTP observadas en Playwright. Los registros y las transacciones de práctica se hicieron con datos sintéticos en contextos aislados. Los casos de prueba incluyen los pasos de reproducción.

<a id="e01"></a>

## E01 · Inicio y pie

```text
Envío gratis desde $80.000 · 3 cuotas sin interés

    - paragraph: $ 10.600 20% menos
    - paragraph: $ 12.300 20% menos
    - paragraph: $ 20.900 20% menos
    - paragraph: $ 30.600 20% menos
  - link "Finalizá tu compra Envíos a cualquier país y pago con tarjeta.":
    - paragraph: Envíos a cualquier país y pago con tarjeta.

Tienda → /tienda
Carrito → /carrito
Checkout → /checkout
Registro → /registro
Envíos → /legal/envios
Cambios y devoluciones → /legal/cambios
Créditos → /creditos
Bandeja → /bandeja
Términos y condiciones → /legal/terminos
Política de privacidad → /legal/privacidad
hola@minimoda.test → mailto:hola@minimoda.test
```

<a id="e02"></a>

## E02 · Tienda y fichas

```text
- main:
  - heading "Tienda" [level=1]
  - paragraph: Elegí por edad, color y precio, y sumá tus prendas al carrito.
  - heading "Filtros" [level=2]
  - text: Buscar
  - searchbox "Buscar"
  - text: Edad
  - combobox "Edad":
    - option "Todas las edades" [selected]
    - option "Bebé (0-2)"
    - option "Niño (3-8)"
    - option "Niña (3-8)"
    - option "Pre-teen (9-12)"
  - text: Color
  - group "Color":
    - button "Todos" [pressed]
    - button "Rojo"
    - button "Azul"
    - button "Verde"
    - button "Rosa"
    - button "Amarillo"
    - button "Gris"
  - text: Precio máx. $ 30.000
  - slider "Precio máx. $ 30.000": "30000"
  - text: Ordenar
  - combobox "Ordenar":
    - option "Relevancia" [selected]
    - 'option "Precio: menor a mayor"'
    - 'option "Precio: mayor a menor"'
    - option "Nombre"
  - button "Limpiar filtros"
  - paragraph: 12 productos
  - article:
    - link "Body Manga Larga Estrellitas":
      - /url: /producto/1
      - img "Body Manga Larga Estrellitas"
    - text: Destacado Bebé (0-2)
    - heading "Body Manga Larga Estrellitas" [level=3]:
      - link "Body Manga Larga Estrellitas":
        - /url: /producto/1
    - text: "Color: Azul · Talla: 6M"
    - paragraph: $ 10.600 20% menos
    - text: $ 8.500
    - paragraph: 3 cuotas sin interés de $ 2.833
    - text: "Stock: 12"
    - button "Agregar al carrito"
  - article:
    - link "Enterito de Algodón Nubes":
      - /url: /producto/2
      - img "Enterito de Algodón Nubes"
    - text: Bebé (0-2)
    - heading "Enterito de Algodón Nubes" [level=3]:
      - link "Enterito de Algodón Nubes":
        - /url: /producto/2
    - text: "Color: Rosa · Talla: 12M $ 12.000"
    - paragraph: 3 cuotas sin interés de $ 4.000
    - text: Sin stock
    - button "Sin stock" [disabled]
  - article:
    - link "Gorrito de Lana Osito":
      - /url: /producto/3
      - img "Gorrito de Lana Osito"
    - text: Bebé (0-2)
    - heading "Gorrito de Lana Osito" [level=3]:
      - link "Gorrito de Lana Osito":

Búsqueda Gorrito de Lana Osito:
  - searchbox "Buscar": Gorrito de Lana Osito
  - paragraph: 1 producto
    - link "Gorrito de Lana Osito":
      - /url: /producto/3
      - img "Gorrito de Lana Osito"
    - heading "Gorrito de Lana Osito" [level=3]:
      - link "Gorrito de Lana Osito":
        - /url: /producto/3

https://minimoda-navy.vercel.app/producto/2
- main:
  - article:
    - navigation "Miga de pan":
      - link "Inicio":
        - /url: /
      - link "Tienda":
        - /url: /tienda
      - text: Enterito de Algodón Nubes
    - img "Enterito de Algodón Nubes"
    - text: Bebé (0-2)
    - heading "Enterito de Algodón Nubes" [level=1]
    - paragraph: "Color: Rosa · Talla: 12M"
    - paragraph: Talle 12M
    - text: $ 12.000
    - paragraph: 3 cuotas sin interés de $ 4.000
    - paragraph: Sin stock
    - paragraph: Talle 12M. Cambios dentro de 30 días, con la prenda sin uso.
    - button "Sin stock" [disabled]
    - paragraph:
      - link "Ver carrito":
        - /url: /carrito
    - region "También te puede gustar":
      - heading "También te puede gustar" [level=2]
      - article:
        - link "Body Manga Larga Estrellitas":
          - /url: /producto/1
          - img "Body Manga Larga Estrellitas"
        - text: Bebé (0-2)
        - heading "Body Manga Larga Estrellitas" [level=3]:
          - link "Body Manga Larga Estrellitas":
            - /url: /producto/1
        - paragraph: $ 10.600 20% menos
        - text: $ 8.500
        - paragraph: 3 cuotas sin interés de $ 2.833
      - article:
        - link "Gorrito de Lana Osito":
          - /url: /producto/3
          - img "Gorrito de Lana Osito"
        - text: Bebé (0-2)
        - heading "Gorrito de Lana Osito" [level=3]:
          - link "Gorrito de Lana Osito":
            - /url: /producto/3
        - text: $ 5.600
        - paragraph: 3 cuotas sin interés de $ 1.867

https://minimoda-navy.vercel.app/producto/3
- main:
  - article:
    - navigation "Miga de pan":
      - link "Inicio":
        - /url: /
      - link "Tienda":
        - /url: /tienda
      - text: Gorrito de Lana Osito
    - img "Gorrito de Lana Osito"
    - text: Bebé (0-2)
    - heading "Gorrito de Lana Osito" [level=1]
    - paragraph: "Color: Amarillo · Talla: Único"
    - paragraph: Talle Único
    - text: $ 5.600
    - paragraph: 3 cuotas sin interés de $ 1.867
    - paragraph: "Stock: 25"
    - paragraph: Talle Único. Cambios dentro de 30 días, con la prenda sin uso.
    - button "Agregar al carrito"
    - paragraph:
      - link "Ver carrito":
        - /url: /carrito
    - region "También te puede gustar":
      - heading "También te puede gustar" [level=2]
      - article:
        - link "Body Manga Larga Estrellitas":
          - /url: /producto/1
          - img "Body Manga Larga Estrellitas"
        - text: Bebé (0-2)
        - heading "Body Manga Larga Estrellitas" [level=3]:
          - link "Body Manga Larga Estrellitas":
            - /url: /producto/1
        - paragraph: $ 10.600 20% menos
        - text: $ 8.500
        - paragraph: 3 cuotas sin interés de $ 2.833
      - article:
        - link "Enterito de Algodón Nubes":
          - /url: /producto/2
          - img "Enterito de Algodón Nubes"
        - text: Bebé (0-2)
        - heading "Enterito de Algodón Nubes" [level=3]:
          - link "Enterito de Algodón Nubes":
            - /url: /producto/2
        - text: $ 12.000
        - paragraph: 3 cuotas sin interés de $ 4.000
```

<a id="e03"></a>

## E03 · Carrito antes y después de recargar

```text
https://minimoda-navy.vercel.app/carrito
Antes:
- main:
  - heading "Carrito" [level=1]
  - paragraph: Revisá las prendas antes de finalizar la compra.
  - complementary "Carrito":
    - heading "Carrito 15" [level=2]
    - list:
      - listitem:
        - text: Gorrito de Lana Osito
        - button "Restar una unidad de Gorrito de Lana Osito": −
        - text: "15"
        - button "Sumar una unidad de Gorrito de Lana Osito": +
        - text: $ 84.000
    - text: Total $ 84.000
    - link "Finalizar compra":
      - /url: /checkout
  - paragraph:
    - link "Seguir mirando":
      - /url: /tienda
Después:
- main:
  - heading "Carrito" [level=1]
  - paragraph: Revisá las prendas antes de finalizar la compra.
  - complementary "Carrito":
    - heading "Carrito 0" [level=2]
    - paragraph: Tu carrito está vacío.
    - text: Total $ 0
    - link "Finalizar compra" [disabled]:
      - /url: /checkout
  - paragraph:
    - link "Seguir mirando":
      - /url: /tienda
```

<a id="e04"></a>

## E04 · Checkout con una prenda y costos por país

```text
- main:
  - heading "Checkout" [level=1]
  - paragraph: Finalizá tu compra en MiniModa. Enviamos a cualquier país. Validá los formatos y usá las tarjetas de prueba para aprobar o rechazar el pago.
  - text: Datos + envío país y dirección Tarjeta de prueba Autorización aprueba/rechaza Orden + email va a la Bandeja
  - group: Tarjetas de prueba (bypass)
  - region "1. Datos y envío":
    - heading "1. Datos y envío" [level=2]
    - text: Nombre
    - textbox "Nombre"
    - text: Dirección
    - textbox "Dirección"
    - text: Email
    - textbox "Email"
    - text: País de envío
    - combobox "País de envío":
      - option "Argentina" [selected]
      - option "Brasil"
      - option "Chile"
      - option "Uruguay"
      - option "Paraguay"
      - option "Bolivia"
      - option "Perú"
      - option "Colombia"
      - option "México"
      - option "Ecuador"
      - option "Venezuela"
      - option "España"
      - option "Estados Unidos"
      - option "Italia"
      - option "Francia"
      - option "Alemania"
      - option "Japón"
      - option "Australia"
    - text: "Costo de envío: $ 3.500"
  - region "2. Pago":
    - heading "2. Pago" [level=2]
    - text: Número de tarjeta
    - textbox "Número de tarjeta":
      - /placeholder: 16 dígitos
    - text: Vencimiento (MM/AA)
    - textbox "Vencimiento (MM/AA)":
      - /placeholder: MM/AA
    - paragraph: Formato MM/AA.
    - text: CVV
    - textbox "CVV":
      - /placeholder: 3 o 4 dígitos
  - region "3. Confirmación":
    - heading "3. Confirmación" [level=2]
    - button "Confirmar compra"
  - complementary "Resumen":
    - heading "Resumen" [level=2]
    - list:
      - listitem: Gorrito de Lana Osito × 1 $ 5.600
    - text: Subtotal de prendas $ 5.600 Envío $ 3.500 Estimado $ 9.100

Argentina
    - text: "Costo de envío: $ 3.500"
    - text: Subtotal de prendas $ 5.600 Envío $ 3.500 Estimado $ 9.100
Chile
    - text: "Costo de envío: $ 9.000"
    - text: Subtotal de prendas $ 5.600 Envío $ 9.000 Estimado $ 14.600
España
    - text: "Costo de envío: $ 28.000"
    - text: Subtotal de prendas $ 5.600 Envío $ 28.000 Estimado $ 33.600
```

<a id="e05"></a>

## E05 · Envío Argentina a distintos subtotales

```text
https://minimoda-navy.vercel.app/checkout · 9 unidades
    - text: "Costo de envío: $ 3.500"
      - listitem: Gorrito de Lana Osito × 9 $ 50.400
    - text: Subtotal de prendas $ 50.400 Envío $ 3.500 Estimado $ 53.900

https://minimoda-navy.vercel.app/checkout · 14 unidades
    - text: "Costo de envío: $ 3.500"
      - listitem: Gorrito de Lana Osito × 14 $ 78.400
    - text: Subtotal de prendas $ 78.400 Envío $ 3.500 Estimado $ 81.900

https://minimoda-navy.vercel.app/checkout · 15 unidades
    - text: "Costo de envío: $ 3.500"
      - listitem: Gorrito de Lana Osito × 15 $ 84.000
    - text: Subtotal de prendas $ 84.000 Envío $ 3.500 Estimado $ 87.500
```

<a id="e06"></a>

## E06 · Registro con contextos nuevos

```text
https://minimoda-navy.vercel.app/registro
- main:
  - complementary:
    - img "Vestido floral rosa, foto de producto sobre fondo blanco"
    - paragraph: Bebé, niña y niño. Talles de 0 a 12.
  - heading "Crear cuenta" [level=1]
  - paragraph: Registrate en MiniModa. Este formulario tiene validaciones para practicar boundary testing y pruebas negativas.
  - text: Nombre
  - textbox "Nombre"
  - text: Email
  - textbox "Email"
  - text: Contraseña
  - textbox "Contraseña"
  - paragraph: Mínimo 8 caracteres.
  - text: Confirmar contraseña
  - textbox "Confirmar contraseña"
  - text: Edad
  - spinbutton "Edad"
  - paragraph: Número entero entre 13 y 120.
  - text: País
  - combobox "País":
    - option "Seleccioná un país" [selected]
    - option "Argentina"
    - option "Chile"
    - option "Uruguay"
    - option "Paraguay"
    - option "Bolivia"
    - option "Perú"
    - option "Colombia"
    - option "México"
    - option "España"
  - checkbox "Acepto los términos y condiciones"
  - text: Acepto los términos y condiciones
  - paragraph:
    - link "Leer términos y condiciones":
      - /url: /legal/terminos
  - button "Crear cuenta"
  - heading "Ingresar" [level=2]
  - paragraph: "Si ya tenés cuenta, entrá con tu email. El ingreso es simulado: no hay cuentas reales."
  - text: Email
  - textbox "Email"
  - text: Contraseña
  - textbox "Contraseña"
  - paragraph: Mínimo 8 caracteres.
  - button "Ingresar"

6 caracteres, 18 años
  - heading "Crear cuenta" [level=1]
  - alert: Revisá los campos marcados.
  - paragraph: Mínimo 8 caracteres.
  - alert: La contraseña debe tener al menos 8 caracteres.
  - text: Edad
  - spinbutton "Edad": "18"
  - paragraph: Número entero entre 13 y 120.
  - button "Crear cuenta"
  - paragraph: "Si ya tenés cuenta, entrá con tu email. El ingreso es simulado: no hay cuentas reales."
  - paragraph: Mínimo 8 caracteres.

7 caracteres, 18 años
  - heading "Crear cuenta" [level=1]
  - alert: Revisá los campos marcados.
  - paragraph: Mínimo 8 caracteres.
  - alert: La contraseña debe tener al menos 8 caracteres.
  - text: Edad
  - spinbutton "Edad": "18"
  - paragraph: Número entero entre 13 y 120.
  - button "Crear cuenta"
  - paragraph: "Si ya tenés cuenta, entrá con tu email. El ingreso es simulado: no hay cuentas reales."
  - paragraph: Mínimo 8 caracteres.

8 caracteres, 12 años
  - heading "Crear cuenta" [level=1]
  - alert: Revisá los campos marcados.
  - paragraph: Mínimo 8 caracteres.
  - text: Edad
  - spinbutton "Edad" [invalid]: "12"
  - paragraph: Número entero entre 13 y 120.
  - alert: La edad debe estar entre 13 y 120.
  - button "Crear cuenta"
  - paragraph: "Si ya tenés cuenta, entrá con tu email. El ingreso es simulado: no hay cuentas reales."
  - paragraph: Mínimo 8 caracteres.

8 caracteres, 13 años
  - heading "Crear cuenta" [level=1]
    - text: ¡Registro exitoso! Bienvenido/a a MiniModa, Persona QA. Te enviamos un email de bienvenida (ver
  - paragraph: Mínimo 8 caracteres.
  - text: Edad
  - spinbutton "Edad": "13"
  - paragraph: Número entero entre 13 y 120.
  - button "Crear cuenta"
  - paragraph: "Si ya tenés cuenta, entrá con tu email. El ingreso es simulado: no hay cuentas reales."
  - paragraph: Mínimo 8 caracteres.

8 caracteres, 17 años
  - heading "Crear cuenta" [level=1]
    - text: ¡Registro exitoso! Bienvenido/a a MiniModa, Persona QA. Te enviamos un email de bienvenida (ver
  - paragraph: Mínimo 8 caracteres.
  - text: Edad
  - spinbutton "Edad": "17"
  - paragraph: Número entero entre 13 y 120.
  - button "Crear cuenta"
  - paragraph: "Si ya tenés cuenta, entrá con tu email. El ingreso es simulado: no hay cuentas reales."
  - paragraph: Mínimo 8 caracteres.

8 caracteres, 18 años
  - heading "Crear cuenta" [level=1]
    - text: ¡Registro exitoso! Bienvenido/a a MiniModa, Persona QA. Te enviamos un email de bienvenida (ver
  - paragraph: Mínimo 8 caracteres.
  - text: Edad
  - spinbutton "Edad": "18"
  - paragraph: Número entero entre 13 y 120.
  - button "Crear cuenta"
  - paragraph: "Si ya tenés cuenta, entrá con tu email. El ingreso es simulado: no hay cuentas reales."
  - paragraph: Mínimo 8 caracteres.
```

<a id="e07"></a>

## E07 · Créditos y ficha

```text
https://minimoda-navy.vercel.app/creditos
- main:
  - heading "Créditos MiniModa" [level=1]
  - paragraph: Financiá tus compras en cuotas con 10% de interés. Tu crédito arranca bajo y aumenta a medida que pagás las cuotas.
  - text: Límite bajo arrancás con poco Solicitás monto + cuotas +10% interés se financia Pagás cuotas bajás la deuda Sube el límite buen comportamiento
  - heading "Solicitar crédito" [level=2]
  - text: "Crédito aprobado: 3 cuotas de $ 3.667. Monto a financiar"
  - spinbutton "Monto a financiar"
  - text: Cuotas
  - combobox "Cuotas":
    - option "3 cuotas" [selected]
    - option "6 cuotas"
    - option "12 cuotas"
  - button "Solicitar crédito"
  - heading "Historial" [level=3]
  - list:
    - listitem: Crédito de $ 10.000 en 3 cuotas de $ 3.667 (interés $ 1.000)
  - complementary:
    - heading "Tu cuenta" [level=2]
    - text: Límite $ 50.000 Deuda $ 11.000 Disponible $ 39.000
    - button "Pagar una cuota"
    - button "Reiniciar"
```

<a id="e08"></a>

## E08 · Ayuda, legales y Bandeja

```text
https://minimoda-navy.vercel.app/ayuda · HTTP 404
- main:
  - paragraph: "404"
  - heading "No encontramos esta página" [level=1]
  - paragraph: El enlace puede estar viejo o la prenda ya no está en el catálogo.
  - link "Ir a la tienda":
    - /url: /tienda

https://minimoda-navy.vercel.app/legal/envios · HTTP 200
- main:
  - article:
    - heading "Envíos" [level=1]
    - paragraph: Los costos de envío son de práctica y cambian según el país que elijas en el checkout.
    - heading "Zonas" [level=2]
    - paragraph: Argentina tiene un costo nacional. Los países limítrofes, el resto de Latinoamérica y el resto del mundo tienen tarifas distintas, siempre ficticias y en pesos.
    - heading "Plazos" [level=2]
    - paragraph: No hay despachos reales. En la historia de la tienda, un envío nacional demoraría entre 3 y 6 días hábiles, y uno internacional entre 10 y 20.
    - paragraph:
      - link "Volver a la tienda":
        - /url: /tienda

https://minimoda-navy.vercel.app/legal/cambios · HTTP 200
- main:
  - article:
    - heading "Cambios y devoluciones" [level=1]
    - paragraph: La política comercial también es ficticia. Sirve para que el sitio se sienta completo.
    - heading "Plazo" [level=2]
    - paragraph: En esta tienda imaginaria podés cambiar una prenda dentro de los 30 días, sin uso y con la etiqueta puesta.
    - heading "Cómo sería" [level=2]
    - paragraph: Escribirías a hola@minimoda.test con el número de orden. Como no hay pedidos reales, ese correo no existe y la Bandeja solo muestra los avisos que genera el propio sitio.
    - paragraph:
      - link "Volver a la tienda":
        - /url: /tienda

https://minimoda-navy.vercel.app/legal/terminos · HTTP 200
- main:
  - article:
    - heading "Términos y condiciones" [level=1]
    - paragraph: Estas condiciones son ficticias y forman parte de la tienda de demostración MiniModa.
    - heading "Quiénes somos" [level=2]
    - paragraph: MiniModa es una tienda imaginaria de ropa para niños. No vende prendas reales ni procesa pagos. Clara, la dueña que figura en el sitio, también es un personaje de ficción.
    - heading "Uso del sitio" [level=2]
    - paragraph: Podés recorrer el catálogo, armar un carrito y completar los formularios para practicar. Los datos que cargues se quedan en tu navegador o en la memoria del servidor de práctica y no se envían a un comercio real.
    - heading "Precios" [level=2]
    - paragraph: Los precios están expresados en pesos argentinos y son inventados. No incluyen una operación comercial verdadera.
    - paragraph:
      - link "Volver a la tienda":
        - /url: /tienda

https://minimoda-navy.vercel.app/bandeja · HTTP 200
- main:
  - heading "Bandeja de entrada" [level=1]
  - paragraph: "Bandeja simulada (no se envían emails reales). Acá llegan los correos que dispara el sitio: bienvenida al registrarte, confirmación de compra y avisos de crédito. Se guardan en tu navegador."
  - button "Refrescar"
  - button "Vaciar bandeja"
  - paragraph: No hay emails todavía. Registrate, comprá o pedí un crédito para recibir uno.
```

<a id="e09"></a>

## E09 · Confirmación con carrito vacío

```text
https://minimoda-navy.vercel.app/checkout
Antes:
    - button "Confirmar compra"
    - paragraph: Todavía no hay prendas en el carrito.
Después de confirmar:
  - text: Datos + envío país y dirección Tarjeta de prueba Autorización aprueba/rechaza Orden + email va a la Bandeja
    - text: ✅ Compra confirmada. Orden
    - text: ". Envío a Argentina: $ 3.500. Te enviamos un email de confirmación (ver"
  - region "3. Confirmación":
    - heading "3. Confirmación" [level=2]
    - button "Confirmar compra"
    - paragraph: Todavía no hay prendas en el carrito.
```

</details>
