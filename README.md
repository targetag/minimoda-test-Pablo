# MiniModa QA

**Student: Pablo Villeda GUA**

The Playwright Test + TypeScript framework is in **[qa-automation/](qa-automation/README.md)**. It includes Chromium and Google Chrome projects, Qase mapping documentation, failure screenshots, retry traces, and local HTML reports. Routine execution does not require Codex or MCP.

```powershell
cd qa-automation
npm ci
npx playwright install chromium
npx playwright test
npx playwright show-report
```

The verified baseline is 32 passed and 4 failed across 36 browser executions. The failures reproduce two demo application defects: empty-cart checkout and stock-limit enforcement. See [verification](qa-automation/docs/verification.md) and [defects](qa-automation/docs/defects.md). Qase API publication is optional and off by default.

Existing classroom material and manual evidence are preserved below and in their original locations.

---

# minimoda-test

Repo de práctica de testing para **MiniModa**, una tienda online ficticia de ropa para chicos.

Sitio a probar: https://minimoda-navy.vercel.app/

Acá no está el código de la tienda, solo lo que producís vos como tester.

## Paso a paso (sin terminal)

| # | Paso | Tiempo |
|---|------|--------|
| 1 | **Prepará:** abrí MiniModa https://minimoda-navy.vercel.app/ | 5 min |
| 2 | **Elegí la superficie:** chat o cowork (no CLI) para armar los casos del registro. Anotá por qué. | 5 min |
| 3 | **Preguntale a Gemini:** 3 preguntas sobre la página. Anotá un acierto y un error o invento. | 10 min |
| 4 | **Probá un modo:** en chat o cowork. | 15 min |
| 5 | **Otra superficie:** la misma tarea en otro lugar. Compará los resultados en 3 líneas. | 15 min |
| 6 | **Pasalo a Qase:** cargá tus 3 mejores casos con pasos y resultado esperado, revisados contra la página. | 10 min |
| 7 | **Mapa del harness:** en tu archivo, qué fue modelo, app, harness, MCP y skill o reglas. | 5 min |
| 8 | **Entregá:** subí el archivo y pegá el link del repo en el Telegram. | 5 min |

## Cómo subir tu archivo sin terminal

1. Hacé **Fork** de este repo.
2. En tu fork, abrí `clase-01/practica.md` y tocá el lápiz (**Edit**). Completalo ahí o pegá lo que armaste.
3. Para las capturas: **Add file → Upload files** dentro de `clase-01/evidencias/`. Son capturas de tus casos cargados en Qase (la suite y cada caso), no de la tienda.
4. Al guardar, elegí **Create a new branch** y abrí el **Pull request** dentro de tu fork, o hacé commit directo en tu `main`.

## Checklist de entrega

- [ ] Elegiste la superficie y explicaste por qué.
- [ ] 3 preguntas a Gemini, con un acierto y un error.
- [ ] Comparación de 3 líneas entre dos superficies.
- [ ] 3 casos en Qase con pasos y resultado esperado.
- [ ] Ningún caso inventado: todo se ve en la página.
- [ ] Tabla modelo/app/harness/MCP/skill completa.
- [ ] Capturas sin datos reales, claves ni tokens.

## Dónde se entrega

- **GitHub:** `clase-01/practica.md` en tu fork.
- **Qase:** proyecto MiniModa.
- **Telegram:** el link de tu repo.
