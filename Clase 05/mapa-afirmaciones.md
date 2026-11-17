# Clase 5 · Mapa de afirmaciones

**Autor** · Pablo Villeda

Inventario de las fuentes del kit. El estado, la observación, la evidencia y la hipótesis de cada referencia figuran en la [tabla info vs. app](tabla-info-vs-app.md).

| Ref. | Tema | Afirmación del kit | Fuente |
| --- | --- | --- | --- |
| DOC-01 | Tienda | El catálogo permite filtrar por edad, color y precio. | README, «Qué hay en el sitio» (ago. 2026) |
| DOC-02 | Tienda | Las opciones del filtro de edad son Bebé, Niña, Niño y Pre-teen. También se puede buscar por nombre. | Manual §1, p. 3 (sep. 2026) |
| DOC-03 | Tienda | La tienda ofrece filtros de edad, color y precio, ordenamiento y búsqueda por nombre. | Changelog 0.9.0 (sep. 2026 aprox.) |
| DOC-04 | Stock | Los productos agotados quedan fuera del catálogo y su ficha no se puede abrir. | Manual §1, p. 3 (sep. 2026) |
| DOC-05 | Stock | Los productos agotados siguen visibles con el botón deshabilitado. | Chat, Lucas, 12 oct. 19:41 |
| DOC-06 | Promoción | El manual menciona «20% menos» y deja pendiente si aplica a todo el catálogo o solo a destacados. | Manual §1, nota interna, p. 3 (sep. 2026) |
| DOC-07 | Carrito | Se agrega desde la ficha. Las prendas se conservan al recargar o entrar a `/carrito`. El flujo continúa con «Finalizar compra». | Manual §2, p. 3 (sep. 2026) |
| DOC-08 | Carrito | El carrito se guarda en el navegador. | README, «Qué hay en el sitio» (ago. 2026) |
| DOC-09 | Carrito | El carrito está en memoria del cliente, fuera de localStorage, y se puede perder al recargar. | Chat, Lucas, 12 oct. 19:41 |
| DOC-10 | Checkout | La compra es de práctica, sin backend de pagos real. | README, introducción (ago. 2026). Manual, p. 2 (sep. 2026) |
| DOC-11 | Checkout | Se solicitan nombre, dirección, email con formato válido, país, tarjeta de prueba, vencimiento MM/AA y CVV de 3 o 4 dígitos. | Manual §3, p. 4 (sep. 2026) |
| DOC-12 | Checkout | Una compra requiere al menos una prenda y el email se valida por formato. | Sprint 14, HIST-18, p. 1 (jul. 2026) |
| DOC-13 | Checkout | La confirmación con carrito vacío está bloqueada. | Manual §3, p. 4 (sep. 2026). Changelog 0.9.1 (oct. 2026 aprox.) |
| DOC-14 | Envío | En Argentina el envío es gratis desde $50.000 y por debajo tiene costo. | Manual §3, p. 4 (sep. 2026) |
| DOC-15 | Envío | En Argentina el envío es gratis desde $50.000. El refinamiento dejó el umbral pendiente de revisión. | Sprint 14, HIST-18 y notas, p. 1 (jul. 2026) |
| DOC-16 | Envío | El umbral de envío gratis en Argentina subió a $80.000. | Changelog 0.9.0 (sep. 2026 aprox.) |
| DOC-17 | Envío | El umbral subió de $50.000 a $80.000 y el manual está pendiente de actualizar. | Chat, Lucas, 12 oct. 19:41 |
| DOC-18 | Envío | El checkout permite enviar a cualquier país. | README, «Qué hay en el sitio» (ago. 2026) |
| DOC-19 | Envío | Las tarifas fuera de Argentina varían por país. El manual remite a la página Envíos y deja pendiente la tabla de costos. Lucas indica que la tabla por país no se subió. | Manual §3, p. 4 (sep. 2026). Chat, Lucas, 12 oct. 19:41 |
| DOC-20 | Cupón | El checkout admite un cupón comercial o de bienvenida. | Sprint 14, HIST-18 (jul. 2026). README, «Qué hay en el sitio» (ago. 2026) |
| DOC-21 | Cupón | El cupón opcional `MINIMODA10` descuenta 10% del subtotal de prendas. | Manual §3, p. 4 (sep. 2026). Changelog 0.9.1 (oct. 2026 aprox.) |
| DOC-22 | Cupón | Lucas indica que el cupón `MINIMODA10` de 10% quedó en checkout. | Chat, Lucas, 12 oct. 19:41 |
| DOC-23 | Registro | La contraseña requiere un mínimo de 6 caracteres. El refinamiento dejó pendiente revisar la longitud. | Sprint 14, HIST-12 y notas, p. 1 (jul. 2026) |
| DOC-24 | Registro | La contraseña requiere un mínimo de 8 caracteres. El manual indica que esa cifra supersede las anteriores. | Manual §4, p. 5 (sep. 2026) |
| DOC-25 | Registro | La edad mínima es 18 años. El país es obligatorio y se deben aceptar los términos. | Sprint 14, HIST-12, p. 1 (jul. 2026) |
| DOC-26 | Registro | Se piden nombre, email, contraseña y confirmación, edad entera, país y aceptación de términos. El rango de edad figura en el formulario. | Manual §4, p. 5 (sep. 2026) |
| DOC-27 | Registro | Hay validaciones de práctica para nombre, email, contraseña, edad, país y términos. | Changelog 0.8.0 (ago. 2026 aprox.) |
| DOC-28 | Login | El ingreso con email y contraseña es simulado. El manual afirma que no hay cuentas reales. | README, «Qué hay en el sitio» (ago. 2026). Manual §4, p. 5 (sep. 2026) |
| DOC-29 | Créditos | Las fichas anuncian «3 cuotas sin interés». La financiación en la sección Créditos también es sin interés. | Manual §5, p. 6 (sep. 2026) |
| DOC-30 | Créditos | Se puede solicitar crédito en cuotas sin interés. | Sprint 14, HIST-21, p. 1 (jul. 2026). README, «Qué hay en el sitio» (ago. 2026) |
| DOC-31 | Créditos | La sección Créditos apareció en la versión 0.9.0. | Changelog 0.9.0 (sep. 2026 aprox.) |
| DOC-32 | Ayuda | Ayuda está en el pie y en `/ayuda`. | Manual §6, p. 6 (sep. 2026). README, «Cómo empezar» (ago. 2026). Changelog 0.8.0 (ago. 2026 aprox.) |
| DOC-33 | Ayuda | El pie enlaza a `/ayuda`, pero esa ruta da 404 según Lucas. La página quedó en backlog. | Chat, Lucas, 13 oct. 09:12 |
| DOC-34 | Legales | «Cambios y devoluciones» indica un plazo de 30 días y contacto en `hola@minimoda.test`. | Manual §6, p. 6 (sep. 2026) |
| DOC-35 | Bandeja | Existe una bandeja de avisos de práctica. El manual indica que el correo de contacto es ficticio y que los avisos salen en la Bandeja. | README, «Qué hay en el sitio» (ago. 2026). Changelog 0.8.0 (ago. 2026 aprox.). Manual §6, p. 6 (sep. 2026) |
