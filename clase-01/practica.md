# Práctica clase 01: casos del registro de MiniModa con IA

**Sitio:** https://minimoda-navy.vercel.app/registro

> Así tiene que quedar tu entrega. Reemplazá cada `___tu respuesta aquí___` con lo tuyo.

## 1. Preparación
- Navegador y fecha: Google chrome Noviembre 3 2026

## 2. Superficie elegida
- Elegí (chat o cowork): Chatgpt y Codex
- Por qué: Me dieron un mes de prueba.

## 3. Preguntas a Gemini
| # | Pregunta | Respuesta (resumen) | ¿Acierto o error/invento? |
|---|----------|---------------------|---------------------------|
| 1 | ¿Qué campos pide el formulario de registro de https://minimoda-navy.vercel.app/registro? | El formulario de registro de MiniModa pide:
- Nombre
- Email
- Contraseña: mínimo 8 caracteres.
- Confirmar contraseña
- Edad: número entero entre 13 y 120.
- País: Argentina, Chile, Uruguay, Paraguay, Bolivia, Perú, Colombia, México o España.
- Aceptar los términos y condiciones mediante una casilla.
Al final aparece el botón «Crear cuenta»._ | ___tu respuesta aquí___ |
| 2 | ¿Cuál es el largo mínimo de la contraseña y qué edad se permite? | ___La contraseña debe tener al menos 8 caracteres___ | ___la edad debe ser un número entero entre 13 y 120 años, ambos incluidos.___ |
| 3 | ¿Qué pasa si no acepto los términos? | ___Si no aceptás los términos, **no podés completar el registro**. Al pulsar «Crear cuenta», el formulario muestra: **«Debés aceptar los términos.»**___ |

- Un acierto: ___Encontro un posible error en Check out page pero especifico que___
- Un error o invento: ___tu respuesta aquí___

## 4. Primer modo
- Superficie y modo: ___tu respuesta aquí___
- Prompt de ejemplo:
  ```
  Sos QA. Vamos a probar el registro de https://minimoda-navy.vercel.app/registro
  Campos: nombre, email, contraseña, confirmar contraseña, edad, país y aceptar términos.
  1. Listá las reglas que se ven, los datos válidos e inválidos y los valores límite.
  2. Escribí 6 casos de prueba con: título, precondiciones, pasos con datos concretos,
     resultado esperado, prioridad (high/medium/low) y tipo (functional/negative/boundary).
  No inventes mensajes: si no sabés el texto exacto, marcalo "A VERIFICAR".
  ```
- Qué devolvió: ___En el [formulario de registro](https://minimoda-navy.vercel.app/registro) se ven estas reglas. También comprobé los mensajes al enviarlo vacío. Los casos siguientes son una propuesta de prueba; no están ejecutados.

### 1. Reglas, datos válidos, inválidos y límites

| Campo | Regla visible o comprobada | Datos válidos de prueba | Datos inválidos de prueba | Valores límite |
|---|---|---|---|---|
| Nombre | Obligatorio. No se indica longitud mínima o máxima. | `Ana Pérez` | Vacío | Vacío; 1 carácter y solo espacios: **A VERIFICAR** |
| Email | Obligatorio. Campo de tipo email; formato exacto aceptado: **A VERIFICAR**. | `ana.qa@example.com` | Vacío, `ana`, `ana@` | No se indica longitud máxima |
| Contraseña | Obligatoria, mínimo 8 caracteres. No se indican requisitos de complejidad ni máximo. | `Abcd1234` | Vacía, `Abcd123` | 7, 8 y 9 caracteres |
| Confirmar contraseña | Obligatorio. Coincidencia con la contraseña: **A VERIFICAR**. | `Abcd1234`, igual a la contraseña | Vacío; `Abcd1235` si la contraseña es `Abcd1234` | Igual / diferente |
| Edad | Obligatoria. Número entero entre 13 y 120, inclusive. | `13`, `25`, `120` | Vacía, `12`, `121`, `13.5` | 12, 13, 14; 119, 120, 121 |
| País | Obligatorio; debe seleccionarse una opción. | `Argentina` | Dejar «Seleccioná un país» | Sin selección / con selección |
| Términos | Deben aceptarse. | Casilla marcada | Casilla desmarcada | Marcada / desmarcada |

Países disponibles: Argentina, Chile, Uruguay, Paraguay, Bolivia, Perú, Colombia, México y España.

### 2. Seis casos de prueba

**CP01 — Registro con datos válidos**

- **Precondiciones:** formulario abierto; utilizar un email de prueba sin registro previo.
- **Pasos:** ingresar nombre `Ana Pérez`, email `ana.qa.001@example.com`, contraseña `Abcd1234`, confirmación `Abcd1234`, edad `25`, país `Argentina`; marcar términos y pulsar «Crear cuenta».
- **Resultado esperado:** el formulario acepta los datos y completa el registro. Mensaje de éxito y comportamiento posterior: **A VERIFICAR**.
- **Prioridad:** high.
- **Tipo:** functional.

**CP02 — Enviar todos los campos vacíos**

- **Precondiciones:** formulario limpio, sin país seleccionado y términos desmarcados.
- **Pasos:** pulsar «Crear cuenta» sin completar ningún campo.
- **Resultado esperado:** se bloquea el registro y aparecen estos mensajes comprobados:
  - Nombre: «El nombre es obligatorio.»
  - Email: «El email es obligatorio.»
  - Contraseña: «La contraseña es obligatoria.»
  - Confirmación: «Confirmá tu contraseña.»
  - Edad: «La edad es obligatoria.»
  - País: «Seleccioná un país.»
  - Términos: «Debés aceptar los términos.»
- **Prioridad:** high.
- **Tipo:** negative.

**CP03 — Rechazar un email sin formato válido**

- **Precondiciones:** formulario abierto.
- **Pasos:** ingresar nombre `Ana Pérez`, email `ana@`, contraseña y confirmación `Abcd1234`, edad `25`, país `Argentina`; marcar términos y pulsar «Crear cuenta».
- **Resultado esperado:** se bloquea el registro y se indica que el email es inválido. Texto exacto: **A VERIFICAR**.
- **Prioridad:** high.
- **Tipo:** negative.

**CP04 — Validar el límite mínimo de contraseña**

- **Precondiciones:** formulario limpio antes de cada ejecución.
- **Pasos:** completar nombre `Ana Pérez`, edad `25`, país `Argentina` y aceptar términos. Ejecutar cada variante con contraseña y confirmación iguales:

  | Email de prueba | Contraseña y confirmación | Longitud |
  |---|---|---:|
  | `ana.qa.004a@example.com` | `Abcd123` | 7 |
  | `ana.qa.004b@example.com` | `Abcd1234` | 8 |
  | `ana.qa.004c@example.com` | `Abcd12345` | 9 |

  Pulsar «Crear cuenta» en cada ejecución.
- **Resultado esperado:** con 7 caracteres se rechaza; con 8 y 9 se acepta la longitud. Mensajes exactos de error o éxito: **A VERIFICAR**.
- **Prioridad:** high.
- **Tipo:** boundary.

**CP05 — Validar los límites y el requisito de edad entera**

- **Precondiciones:** formulario limpio antes de cada ejecución.
- **Pasos:** completar nombre `Ana Pérez`, contraseña y confirmación `Abcd1234`, país `Argentina` y aceptar términos. Ejecutar las siguientes variantes, usando respectivamente los emails `ana.qa.005a@example.com` hasta `ana.qa.005g@example.com`; pulsar «Crear cuenta»:

  | Edad | Resultado esperado para la edad |
  |---:|---|
  | 12 | Rechazada |
  | 13 | Aceptada |
  | 14 | Aceptada |
  | 119 | Aceptada |
  | 120 | Aceptada |
  | 121 | Rechazada |
  | 13.5 | Rechazada por no ser entera |

- **Resultado esperado:** se aplica el rango inclusivo de 13 a 120 y se rechazan decimales. Mensajes exactos: **A VERIFICAR**.
- **Prioridad:** high.
- **Tipo:** boundary.

**CP06 — Intentar registrarse sin aceptar términos**

- **Precondiciones:** formulario abierto; casilla de términos desmarcada.
- **Pasos:** ingresar nombre `Ana Pérez`, email `ana.qa.006@example.com`, contraseña y confirmación `Abcd1234`, edad `25`, país `Argentina`; mantener términos desmarcados y pulsar «Crear cuenta».
- **Resultado esperado:** se bloquea el registro y aparece «Debés aceptar los términos.»
- **Prioridad:** high.
- **Tipo:** negative.___

## 5. Otra superficie: comparación en 3 líneas
1. ___tu respuesta aquí___
2. ___tu respuesta aquí___
3. ___tu respuesta aquí___

## 6. Mis 3 mejores casos (cargados en Qase, proyecto MiniModa)
Formato del título: `Registro: <qué se prueba>`
Captura de la suite en Qase con tus casos: `evidencias/qase-suite-casos.png`

### Caso 1: ___tu respuesta aquí___
- Precondiciones: ___tu respuesta aquí___
- Pasos: ___tu respuesta aquí___
- Resultado esperado: ___tu respuesta aquí___
- Evidencia: `evidencias/qase-MM-4-registro-alta-exitosa.png`

### Caso 2: ___tu respuesta aquí___
- Precondiciones: ___tu respuesta aquí___
- Pasos: ___tu respuesta aquí___
- Resultado esperado: ___tu respuesta aquí___
- Evidencia: `evidencias/qase-MM-5-registro-password-7.png`

### Caso 3: ___tu respuesta aquí___
- Precondiciones: ___tu respuesta aquí___
- Pasos: ___tu respuesta aquí___
- Resultado esperado: ___tu respuesta aquí___
- Evidencia: `evidencias/qase-MM-6-registro-edad-12.png`

## 7. Mapa del harness



| Pieza | En lo que usé |
|-------|---------------|
| Modelo | ___tu respuesta aquí___ |
| App | ___tu respuesta aquí___ |
| Harness | ___tu respuesta aquí___ |
| MCP | ___tu respuesta aquí___ |
| Skill | ___tu respuesta aquí___ |

## 8. Entrega
- Link de tu repo (pegalo también en el Telegram): ___tu respuesta aquí___
