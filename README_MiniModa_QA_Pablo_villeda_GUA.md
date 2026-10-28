# MiniModa — Arquitectura del agente de QA Automation

**Proyecto:** https://minimoda-navy.vercel.app/  
**Repositorio de referencia:** https://github.com/Simonethg/minimoda-test  
**Estudiante:** Pablo villeda GUA  
**Estado:** Arquitectura propuesta; pendiente de implementación y ejecución  
**Objetivo:** Automatizar casos de prueba reproducibles, conservar el código en GitHub y vincular la documentación con Qase.

> **Importante:** Esta guía describe el stack **recomendado**, no certifica que Claude Code, los agentes, MCP, las skills o el pipeline estén instalados, ni que se hayan ejecutado los tests. Verificar compatibilidad y versiones antes de configurar el proyecto.

## 1. Fórmula: modelo + harness = agente

| Componente | Selección propuesta | Función |
|---|---|---|
| **Modelo de IA** | Claude Sonnet (versión compatible y disponible) | Razonar sobre requisitos, escribir y revisar código TypeScript, analizar errores. |
| **App / interfaz** | Claude Code en terminal o VS Code | Permitir al desarrollador dar instrucciones, revisar cambios y trabajar sobre archivos locales. |
| **Harness** | Claude Code + herramientas de terminal/archivos + integración Playwright | Orquestar el trabajo del modelo: leer proyecto, editar archivos, ejecutar comandos, recoger salidas y volver a iterar. |
| **Framework de pruebas** | Playwright Test + TypeScript | Ejecutar pruebas E2E deterministas, aserciones, screenshots, traces y reportes HTML sin llamar al modelo en cada corrida. |
| **MCP (opcional)** | Servidor MCP de Playwright compatible con el cliente | Proporcionar herramientas de exploración/interacción con el navegador al agente durante el desarrollo. |
| **Skills / reglas** | Instrucciones del proyecto (`CLAUDE.md`) y, si están disponibles, skills/agentes de Playwright | Definir estándares de calidad, convenciones de pruebas y límites del agente. |
| **Documentación de casos** | Qase | Mantener pasos, precondiciones, resultados esperados y ejecuciones. |
| **Versionado y CI** | Git, GitHub y GitHub Actions | Registrar cambios y ejecutar pruebas automáticamente en cada pull request o push. |

**Diferencia esencial:** el modelo genera o corrige código; el harness le da herramientas para actuar; Playwright ejecuta las pruebas. MCP no es el harness completo ni es obligatorio para ejecutar la suite.

## 2. Alcance inicial: tres casos críticos

| ID Qase | Nombre | Tipo | Validaciones esenciales |
|---|---|---|---|
| TC-001 | Add Product to Cart | Smoke / Functional | Producto, precio, cantidad y subtotal correctos. |
| TC-002 | Complete Checkout Successfully | E2E / Positive | Datos válidos, pago sandbox aprobado, pedido único y confirmación. |
| TC-003 | Checkout Negative Testing | Negative | Carrito vacío, campos requeridos y pago sandbox rechazado; nunca registrar pedido pagado. |

**Seguridad:** no realizar compras reales ni usar tarjetas reales. Si MiniModa no dispone de sandbox o entorno de pruebas, aislar el checkout mediante mocks o dejar el escenario de pago real bloqueado. Los mocks prueban la lógica del frontend, no prueban una integración real con el procesador de pagos.

## 3. Arquitectura y flujo de trabajo

```text
Qase (casos y resultados esperados)
          |
          v
Claude Code (app + harness) <----> Claude Sonnet (modelo)
          |
          +-- CLAUDE.md / skills (reglas)
          +-- MCP Playwright (opcional: exploración del navegador)
          |
          v
Archivos TypeScript (*.spec.ts, page objects)
          |
          v
Playwright Test (ejecución local y CI sin IA)
          |
          +-- HTML report / traces / screenshots
          |
          v
Git + GitHub ----> GitHub Actions
```

**Flujo recomendado:** (1) revisar criterios de aceptación de Qase, (2) explorar la UI, (3) escribir los tests, (4) ejecutarlos, (5) investigar fallos sin alterar aserciones para ocultarlos, (6) revisar diff, (7) commit y pull request, (8) ejecutar CI y adjuntar evidencias.

## 4. Repositorio sugerido

```text
minimoda-qa-automation/
├── .github/workflows/playwright.yml
├── docs/
│   ├── README_MiniModa_QA_Architecture.md
│   └── MiniModa_Qase_3_Test_Cases.csv
├── pages/
│   ├── ShopPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/
│   ├── TC-001-add-to-cart.spec.ts
│   ├── TC-002-checkout-success.spec.ts
│   └── TC-003-checkout-negative.spec.ts
├── test-data/
│   └── checkout-data.ts
├── CLAUDE.md
├── .gitignore
├── playwright.config.ts
├── package.json
├── package-lock.json
└── README.md
```

Los nombres de los archivos son una **estructura objetivo**; este documento no crea los tests ni el workflow automáticamente.

## 5. Instalación local (Windows / VS Code)

**Requisitos:** Node.js LTS, Git, VS Code, acceso a GitHub y Claude Code configurado con la autenticación apropiada.

```powershell
mkdir minimoda-qa-automation
cd minimoda-qa-automation
npm init playwright@latest
npx playwright install
```

Instalar y autenticar **Claude Code** siguiendo su documentación oficial vigente: https://docs.anthropic.com/en/docs/claude-code/overview

Consultar las instrucciones actuales de Playwright Test: https://playwright.dev/docs/intro

### MCP (opcional)

Si se requiere exploración del navegador desde el agente, instalar y registrar el **Playwright MCP server** según la documentación oficial de su repositorio: https://github.com/microsoft/playwright-mcp . La sintaxis de registro depende de la versión de Claude Code; verificarla en la documentación antes de ejecutarla. **No hace falta MCP** para ejecutar `npx playwright test`.

### Skills / agentes especializados (opcionales)

Se pueden usar skills o agentes de planificación, generación y reparación de Playwright **solo si están disponibles y correctamente instalados**. No asumir que `planner`, `generator` o `healer` vienen incluidos en todas las versiones. Mantener siempre revisión humana de cambios.

## 6. Reglas propuestas para `CLAUDE.md`

Copiar las siguientes reglas a un archivo `CLAUDE.md` en la raíz del repositorio:

```markdown
# MiniModa QA Agent Rules
- Actúa como Senior QA Automation Engineer.
- Usa Playwright Test + TypeScript y Page Object Model cuando reduzca duplicación.
- Vincula cada prueba con su ID de Qase: TC-001, TC-002, TC-003.
- Explora la UI real antes de elegir selectores. Prefiere getByRole, getByLabel y getByTestId.
- Nunca inventes selectores, respuestas de API, ejecuciones o resultados.
- Usa expect() con verificaciones de negocio; evita esperas fijas innecesarias.
- No modifiques un resultado esperado solo para hacer pasar un test.
- Distingue bug de producto, bug de automatización y problema de entorno.
- No ejecutes pagos reales. Usa sandbox o mocks claramente identificados.
- No incluyas credenciales, tokens, tarjetas, .env ni datos personales en commits.
- Usa datos de prueba aislados y repetibles; limpia el estado entre tests.
- Antes de terminar: ejecuta los tests pertinentes y reporta Passed/Failed/Blocked.
- Adjunta evidencia útil: trace, screenshot, reporte HTML y logs depurados.
- Propón cambios mediante commits y pull requests revisables.
```

## 7. Ejecución y evidencias

```powershell
# Ejecutar suite
npx playwright test

# Ejecutar un caso por nombre de archivo
npx playwright test tests/TC-001-add-to-cart.spec.ts

# Ver reporte HTML
npx playwright show-report

# Ejecutar con navegador visible
npx playwright test --headed
```

Configurar `playwright.config.ts` para generar `html` reporter, screenshots y traces en fallo. En CI subir `playwright-report/` y `test-results/` como **artifacts**, con retención apropiada. No versionar reportes voluminosos ni archivos con datos sensibles.

`.gitignore` sugerido:

```gitignore
node_modules/
playwright-report/
test-results/
.env
.env.*
!.env.example
```

## 8. Ejemplo de GitHub Actions

Crear `.github/workflows/playwright.yml`:

```yaml
name: MiniModa Playwright QA
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  e2e:
    runs-on: ubuntu-latest
    timeout-minutes: 30
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: npm
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-evidence
          path: |
            playwright-report/
            test-results/
          retention-days: 14
```

**Nota:** ajustar la versión de Node a la versión LTS soportada por el proyecto; fijar las acciones a SHA en entornos con políticas estrictas. CI no debe disparar compras reales contra producción.

## 9. Subir el código a GitHub

1. Crear un repositorio vacío llamado `minimoda-qa-automation` en GitHub.
2. Revisar `.gitignore`, archivos y ausencia de secretos.
3. Ejecutar:

```bash
git init
git add .
git commit -m "docs: define MiniModa QA agent architecture"
git branch -M main
git remote add origin https://github.com/USUARIO/minimoda-qa-automation.git
git push -u origin main
```

Reemplazar `USUARIO` por el propietario real. Para cambios futuros, trabajar en una rama, abrir un pull request y exigir revisión de los resultados de CI antes del merge.

### Política de trazabilidad

- Incluir `TC-001`, `TC-002` o `TC-003` en el título de cada test (`test('TC-001 ...')`).
- Mantener el CSV de Qase bajo `docs/` y actualizarlo cuando cambien criterios de aceptación.
- Registrar en pull requests qué casos se modificaron y por qué.
- Guardar la evidencia de cada ejecución como artifacts de CI.
- Si se usa integración Qase API, guardar su token como **GitHub Actions Secret**, nunca en el repositorio.
- Documentar versiones de Node, Playwright y dependencias mediante `package-lock.json`.

## 10. Definición de terminado (Definition of Done)

- [ ] Casos Qase aprobados y actualizados.
- [ ] Código Playwright versionado y revisado.
- [ ] Tests ejecutados en entorno permitido, con resultado registrado.
- [ ] Bugs reales reportados con pasos y evidencia.
- [ ] CI ejecuta pruebas sin intervención del agente ni consumo de tokens del modelo.
- [ ] Secrets protegidos; sin pagos reales.
- [ ] Reportes accesibles como artifacts de GitHub Actions.

## 11. Referencias

- Playwright Test: https://playwright.dev/docs/intro
- Playwright CI: https://playwright.dev/docs/ci
- Playwright MCP: https://github.com/microsoft/playwright-mcp
- Claude Code: https://docs.anthropic.com/en/docs/claude-code/overview
- GitHub Actions: https://docs.github.com/en/actions
- Qase: https://docs.qase.io/

---

**Responsabilidad:** el agente acelera la creación de código, pero los criterios de aceptación, la seguridad de los datos de prueba y la aprobación final de los resultados corresponden al equipo de QA.

---

## Anexo A. Casos de prueba completos (fuente: Qase CSV)

Este anexo reproduce los campos y los pasos del archivo `MiniModa_Qase_3_Test_Cases.csv` para mantener una referencia legible y versionada en GitHub. **Los resultados son esperados, no ejecuciones confirmadas.**

### TC-001 - Verify User Can Add a Product to the Shopping Cart

**Descripción:** Verify an available product can be added with correct name, quantity, price and subtotal.

**Prioridad:** high · **Severidad:** critical · **Tipo:** functional · **Comportamiento:** positive · **Automatización:** to-be-automated · **Estado:** draft

**Pre-conditions**

1. Application is accessible.
2. An in-stock product exists.
3. Cart is empty.
4. Browser has internet access.

**Pasos y resultados esperados**

| Paso | Acción | Resultado esperado |
|---:|---|---|
| 1 | Navigate to the MiniModa homepage. | Homepage loads without errors. |
| 2 | Open the product catalog. | Available products display names, images and prices. |
| 3 | Select an in-stock product. | Selected product information displays correctly. |
| 4 | Click Add to Cart. | Product is added and user receives appropriate feedback. |
| 5 | Open the shopping cart. | Selected product appears in the cart. |
| 6 | Verify product name and unit price. | Both match the product catalog. |
| 7 | Verify product quantity. | Quantity is 1 when default quantity was selected. |
| 8 | Verify the subtotal. | Subtotal equals unit price multiplied by quantity. |

**Post-conditions**

1. Product remains in cart.
2. Subtotal reflects unit price times quantity.
3. No duplicate or unexpected charges.

**Cómo detectar un error:** Si el resultado observado en cualquier paso no coincide con su resultado esperado, registrar el paso como fallido, adjuntar evidencia (captura, trace, logs) y crear/vincular el defecto en Qase. Si no se puede ejecutar por falta de sandbox o acceso, marcar **Blocked**, no **Passed**.

**Trazabilidad:** Mantener el ID TC en el título del test Playwright y en el registro Qase.

### TC-002 - Verify User Can Successfully Complete Checkout

**Descripción:** Verify a valid checkout in a sandbox creates exactly one confirmed order. Do not use real payment details.

**Prioridad:** high · **Severidad:** critical · **Tipo:** functional · **Comportamiento:** positive · **Automatización:** to-be-automated · **Estado:** draft

**Pre-conditions**

1. QA or staging checkout is accessible.
2. At least one in-stock item is in cart.
3. Valid test shipping data exists.
4. Approved sandbox payment method is configured.
5. Order service is operational.

**Pasos y resultados esperados**

| Paso | Acción | Resultado esperado |
|---:|---|---|
| 1 | Open the shopping cart. | Selected items and subtotal are correct. |
| 2 | Proceed to checkout. | Checkout page loads successfully. |
| 3 | Enter valid customer and shipping details. | Required information is accepted without errors. |
| 4 | Enter approved sandbox payment details. | Payment form accepts test details. |
| 5 | Review product prices, shipping and total. | All amounts match applicable prices and charges. |
| 6 | Click Confirm Purchase once. | Transaction begins processing and duplicate submissions are prevented. |
| 7 | Wait for payment and order result. | Successful confirmation appears only after payment approval and order creation. |
| 8 | Inspect order confirmation. | Order reference and purchase details are accurate if supported. |
| 9 | Check order records when access is available. | Exactly one order exists with correct items, amount and paid status. |

**Post-conditions**

1. Exactly one order is created.
2. Test payment is successful.
3. Confirmation is visible.
4. Cart is cleared or updated according to requirements.

**Cómo detectar un error:** Si el resultado observado en cualquier paso no coincide con su resultado esperado, registrar el paso como fallido, adjuntar evidencia (captura, trace, logs) y crear/vincular el defecto en Qase. Si no se puede ejecutar por falta de sandbox o acceso, marcar **Blocked**, no **Passed**.

**Trazabilidad:** Mantener el ID TC en el título del test Playwright y en el registro Qase.

### TC-003 - Verify Checkout Rejects Invalid Transactions

**Descripción:** Verify empty-cart, invalid form data and declined sandbox payments cannot produce a successful paid order.

**Prioridad:** high · **Severidad:** critical · **Tipo:** functional · **Comportamiento:** negative · **Automatización:** to-be-automated · **Estado:** draft

**Pre-conditions**

1. QA or staging application is accessible.
2. Cart can be reset.
3. In-stock product and valid test customer data exist.
4. Declined sandbox payment method is configured.
5. Order or payment logs are available for backend verification.

**Pasos y resultados esperados**

| Paso | Acción | Resultado esperado |
|---:|---|---|
| 1 | Clear the shopping cart. | Cart has no products and merchandise subtotal is zero. |
| 2 | Navigate directly to checkout. | Checkout redirects to cart or displays a blocked empty-cart state. |
| 3 | Attempt to confirm purchase with empty cart if possible. | Submission is blocked; no order or payment is created. |
| 4 | Add an in-stock product and return to checkout. | Product and order summary display correctly. |
| 5 | Leave all required customer and shipping fields empty. | Required fields remain empty for validation. |
| 6 | Click Confirm Purchase. | Submission is blocked and missing required fields are identified. |
| 7 | Enter invalid-email in email field; fill other required fields validly; validate form. | Invalid email is rejected with a clear error. |
| 8 | Correct email and other required details. | All customer and shipping fields pass validation. |
| 9 | Enter a sandbox card configured for payment decline. | Decline scenario is ready for processing. |
| 10 | Click Confirm Purchase. | Payment is declined with a clear error and no paid order is created. |
| 11 | Review the cart after payment decline. | Products remain available for retry according to requirements. |
| 12 | Inspect order and payment records if accessible. | No successful charge or paid order exists for rejected attempts. |

**Post-conditions**

1. No successful payment for rejected attempts.
2. No invalid order marked paid.
3. User can correct and retry.
4. Cart remains recoverable.

**Cómo detectar un error:** Si el resultado observado en cualquier paso no coincide con su resultado esperado, registrar el paso como fallido, adjuntar evidencia (captura, trace, logs) y crear/vincular el defecto en Qase. Si no se puede ejecutar por falta de sandbox o acceso, marcar **Blocked**, no **Passed**.

**Trazabilidad:** Mantener el ID TC en el título del test Playwright y en el registro Qase.

## Anexo B. Mantenimiento de documentación Qase ↔ GitHub

- **Fuente de importación:** `MiniModa_Qase_3_Test_Cases.csv` (3 casos, 29 pasos).
- **Documento de consulta:** este README contiene la transcripción de los casos.
- Si cambian pasos o resultados esperados, actualizar tanto el CSV como este anexo en el mismo pull request.
- Los resultados de ejecución se registran en Qase y en los reportes de Playwright; no se deben editar los criterios de aceptación para hacer pasar un test.
- Antes de automatizar pagos, verificar que exista un sandbox o mocks controlados y evitar cualquier cargo real.
