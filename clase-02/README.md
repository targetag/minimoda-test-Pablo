# Clase 02 — Capacidades del agente MCP que se usó

**Autor:** Pablo Villeda GUA  
**Proyecto:** [MiniModa](https://minimoda-navy.vercel.app/)

Esta práctica combinó Codex, Microsoft Playwright MCP, Playwright Test y Qase para explorar la tienda, preparar casos reproducibles, automatizar la regresión y contrastar los bugs manualmente.

- [Casos de prueba](Casos/README.md).
- [Evidencias y reportes históricos](Evidencias/README.md).

## Qué hizo Playwright MCP y cómo lo usamos con Codex, Playwright y Qase

MCP permitió que Codex utilizara herramientas de navegador durante la preparación de las pruebas. El servidor Microsoft Playwright MCP estaba habilitado mediante `npx @playwright/mcp@latest`; la auditoría de aquella sesión registró 25 herramientas disponibles.

Lo usamos para navegar por MiniModa, inspeccionar la estructura de las páginas mediante snapshots, identificar campos y botones, completar formularios, hacer clic y observar validaciones, confirmaciones y mensajes de la bandeja simulada. Esto permitió trabajar con controles y resultados visibles de la aplicación.

| Componente | Papel en la práctica |
|---|---|
| Codex | Coordinó la exploración, analizó lo observado y preparó casos, código TypeScript y documentación. |
| Playwright MCP | Dio a Codex acceso al navegador para explorar MiniModa y comprobar interacciones durante el desarrollo. |
| Playwright Test | Ejecutó la suite de regresión automatizada en Chromium y Google Chrome, con aserciones, reportes, capturas de fallos y trazas de reintento. |
| Qase | Conservó casos y test runs manuales para revisar los resultados y contrastar la reproducción de bugs. |

El flujo fue: **Codex → Playwright MCP → navegador de MiniModa**, seguido de **casos documentados → código Playwright Test → reporte de regresión → contraste manual en Qase**.

La relación con Qase se hizo mediante los casos, las evidencias y la revisión manual. No quedó acreditada una conexión directa de Playwright MCP con la API de Qase ni una publicación automática de resultados. Se dejó preparado el reporter opcional `playwright-qase-reporter`, pero su publicación permaneció desactivada al no verificarse token, proyecto e IDs reales.

Una vez escrita la suite, Playwright Test puede ejecutarla sin una sesión de Codex ni llamadas MCP dentro de las pruebas. MCP se usó para explorar y apoyar el desarrollo; el ejecutor de la regresión fue Playwright Test.

## Cómo usamos MCP para crear los casos de prueba

1. **Exploramos los flujos:** catálogo, producto, carrito, checkout, registro y bandeja de mensajes.
2. **Identificamos reglas y datos:** precio y stock visibles, campos obligatorios, contraseña mínima de 8 caracteres, edades de 13 a 120 y tarjetas públicas de simulación.
3. **Probamos interacciones:** agregar productos, cambiar cantidades, enviar formularios vacíos o inválidos y comprobar aprobación o rechazo del pago demo.
4. **Redactamos los casos:** objetivo, precondiciones, datos concretos, acciones y resultado esperado por paso, tomando como referencia los casos ya documentados para Qase.
5. **Automatizamos y revisamos:** convertimos los escenarios en pruebas TypeScript con selectores observados en la página y aserciones de negocio; separamos fallos de producto de errores de automatización.

Así se prepararon **18 escenarios automatizados**, ejecutados en dos navegadores: **36 ejecuciones**. La corrida histórica registró **32 aprobadas y 4 fallidas**. Las fallas reprodujeron dos bugs en ambos navegadores: compra con carrito vacío y aceptación de 26 unidades cuando el stock visible era 25.

Los nombres locales como CHECKOUT-EMPTY y CART-STOCK permiten relacionar código, casos y resultados. No sustituyen los IDs que Qase asigna.

## Tiempo utilizado y ahorro al repetir la regresión

La [verificación histórica](../qa-automation/docs/verification.md) registra **80,8 segundos**, aproximadamente **1 minuto y 21 segundos**, para la corrida completa: 18 escenarios en dos navegadores, con reintento de las cuatro ejecuciones fallidas. Hubo 40 intentos en total contando esos reintentos.

No se registró el tiempo total invertido en explorar, configurar el entorno, crear y corregir la suite, atender aprobaciones o revisar los resultados. Tampoco se cronometró una ejecución manual completa equivalente. Por eso el ahorro siguiente es una **estimación para repetir la regresión con la suite ya preparada**, no una medición del ahorro total del proyecto.

| Modalidad | Base de comparación | Tiempo |
|---|---|---:|
| Automatizada, medido | Corrida completa en Chromium y Chrome, incluidos los reintentos registrados | 80,8 s |
| Manual, estimación mínima | 36 ejecuciones × 2 minutos para preparar datos, actuar y registrar cada resultado | 72 min |
| Manual, estimación superior | 36 ejecuciones × 5 minutos | 180 min |
| Ahorro estimado por repetición | Tiempo manual estimado menos 80,8 s | Entre 70 min 39 s y 178 min 39 s |

Con esos supuestos, la reducción del tiempo de ejecución sería de aproximadamente **98,1 % a 99,3 %**. La comparación manual no añade reintentos ni investigación de defectos; la duración real dependerá de cada caso y de la profundidad de las evidencias.

La ventaja práctica es repetir rápidamente los mismos pasos en ambos navegadores. El tiempo de desarrollo y mantenimiento de la suite, así como la revisión humana de los fallos, debe contabilizarse aparte.

## Limites Encontrados

### Aprobaciones y acciones en Windows

Según la experiencia de Pablo en esta práctica, las intervenciones manuales de soporte fueron hacer clic en los botones **Approve** para autorizar las acciones solicitadas y realizar los clics necesarios cuando las restricciones de Windows impedían completar alguna interacción desde las herramientas. Estas acciones permitieron continuar el trabajo; no fueron pasos automatizados de los casos de negocio.

No se conservó un registro detallado de cada clic o de su duración, por lo que no se atribuye un número exacto de intervenciones ni un tiempo a esas acciones.

La [auditoría del entorno](../qa-automation/docs/environment-audit.md) también documentó restricciones técnicas concretas: caché del navegador en una ruta aislada, advertencias de permisos en carpetas temporales/PATH y problemas del monitor de archivos de Git. Se aplicaron ajustes puntuales, como indicar la ruta de navegadores de Playwright. Estos problemas del entorno se distinguieron de los bugs de MiniModa.

### Verificación manual de Pablo en Qase

Además de las acciones de soporte, **Pablo verificó manualmente los test cases mediante test runs manuales en Qase**, para corroborar los bugs encontrados y comprobar si también podían replicarse siguiendo los pasos a mano. Esta participación y su propósito fueron confirmados por Pablo al preparar este documento.

La documentación conserva referencias a [carrito/stock](https://app.qase.io/public/report/8fb05302a903294142a80b6d32855d4e357b47a1) y a [checkout negativo](https://app.qase.io/public/report/d1aa9f984a4c83377bc85943524577957b18649b/0dc2be4037771c5b2172123a14d590c88c06428c). El reporte de checkout registra el paso de confirmar con carrito vacío como fallido y los nueve pasos siguientes sin probar. Esa evidencia permite contrastar el hallazgo sin considerar aprobados los pasos pendientes.

La comprobación manual complementó la regresión automática y ayudó a distinguir un defecto reproducible de un posible problema del script. Los reportes históricos no establecen una secuencia temporal completa de todas las comprobaciones manuales y automatizadas.

### Alcance de la aplicación y de la integración

- MiniModa es una demo: sus pagos y correos son simulados. Los resultados no prueban cobros reales, seguridad de autenticación ni integridad de pedidos en un backend.
- La publicación automática en Qase quedó preparada como opción, pero no se verificó ni ejecutó una integración activa por API.
- Los prefijos MM y MINIMODA y sus IDs deben verificarse en Qase antes de vincular resultados automáticamente.
- No están disponibles en esta entrega las capturas locales y trazas originales de los dos bugs. En [Evidencias](Evidencias/README.md) se conservan los reportes disponibles y las capturas existentes de los casos de registro.
- La pérdida del carrito al recargar completamente la página quedó como observación pendiente de requisitos de persistencia, no como un tercer bug confirmado.
