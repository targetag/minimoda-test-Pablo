# Evidencia de Playwright · MiniModa

**Autor** · Pablo Villeda

16 de noviembre de 2026 · Demo pública. Extractos de las vistas accesibles y respuestas HTTP observadas en Playwright. Los registros y las transacciones de práctica se hicieron con datos sintéticos en contextos aislados. Los casos de prueba incluyen los pasos de reproducción.

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

## Capturas de la reproducción

- [C5-03 · Envío de $3.500 con subtotal de $84.000](evidencias/c5-03-envio.png)
- [C5-06 · Registro exitoso a los 13 años](evidencias/c5-06-registro.png)
- [C5-09 · Confirmación de compra con carrito vacío](evidencias/c5-09-carrito-vacio.png)
