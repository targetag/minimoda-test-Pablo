# Verified execution and delivery status

Student: Pablo Villeda GUA

## Final full local run

- Started: October 28, 2026, 20:37:44 (America/Guatemala); UTC 2026-10-29T02:37:44.676Z.
- Duration: 80.8 seconds wall clock.
- Logical scenarios: 18; executions across projects: 36.
- Passed: 32; failed: 4; flaky: 0; skipped: 0.
- Four failed executions each reproduced on their first retry: 40 total attempts.
- Exit code: 1, because the tests expose application defects.

| Project | Passed | Failed | Confirmed failure scenarios |
|---|---|---|---|
| chromium | 16 | 2 | CHECKOUT-EMPTY; CART-STOCK |
| chrome | 16 | 2 | CHECKOUT-EMPTY; CART-STOCK |

The failures are reproducible demo application behavior, not missing browsers or tool-connection errors. See [defects](defects.md) for steps, expected/actual results, evidence limitations and historical Qase references.

## Checks actually performed

| Check | Evidence/result |
|---|---|
| Node/npm/Git/Codex CLI versions | Captured in environment-audit.md |
| Repo access and structure | Cloned specified repository; origin/main ee685a49cbff029bcef8927f8fad5c2a42431fc1; original files preserved |
| GitHub authentication/permission | Connector user targetag; permission admin; main reported protected=false |
| Local Git credentials | Noninteractive HTTPS lookup did not return credentials; GitHub connector identity is separate |
| MCP config | `codex mcp get playwright` reports enabled stdio `npx @playwright/mcp@latest`, auto-approval preserved |
| MCP execution | Real MiniModa navigation, snapshots, input, required validation, approval/decline and inbox inspection succeeded |
| Browser installation | Existing Chromium build 1248 verified; system Chrome detected |
| Dependency installation | Only missing repository dependencies installed; lockfile produced |
| TypeScript | `npm run typecheck` passes on final code |
| Dependency audit | `npm audit --omit=optional --audit-level=high` reported zero vulnerabilities |
| Browser tests | Actual local Playwright Test run, both projects, results above; no Codex/MCP dependency in execution code |
| Reports | HTML/JSON/Markdown generated; screenshots on failures; retry traces present; local archives created |
| HTML viewer | `npx playwright show-report --host 127.0.0.1 --port 9323` served the report; browser inspection confirmed All 36 / Passed 32 / Failed 4 / Flaky 0 / Skipped 0 |
| Git hygiene | .env, node_modules, reports, archives and authentication state ignored; .env.example remains trackable |
| Commit/push | Initial local audit did not publish; Pablo subsequently approved direct publication to main in qa-automation/ |
| Qase publication | Not performed; no verified live project/token; offline case specifications and opt-in reporter prepared |

The source uses direct Playwright fixtures and locally installed Node packages. No AI call or MCP call exists in a test body. The audit used Codex to invoke the shell, but the actual runner/browser processes operate independently and the same commands can be invoked from PowerShell without opening Codex.

## Commands used and reusable commands

From `minimoda-test-Pablo/qa-automation` (the framework was relocated into this folder before publication):

```powershell
npm run typecheck
# This explicit cache path was needed only for this Codex sandbox's redirected LOCALAPPDATA.
$env:PLAYWRIGHT_BROWSERS_PATH = 'C:\Users\dilig\AppData\Local\ms-playwright'
npx playwright test
npx playwright show-report --host 127.0.0.1 --port 9323
```

Regular local execution (after `npm ci` and one `npx playwright install chromium` if needed):

```powershell
npx playwright test
npx playwright test --project=chromium
npx playwright test --project=chrome
npx playwright test tests/checkout/checkout.spec.ts
npx playwright test --headed
npx playwright show-report
```

## Files added or updated

Updated: repository-root `README.md` with a link and commands (original classroom material preserved). Framework-specific files below are in `qa-automation/`, including its `.gitignore` and `README.md`.

Added: `package.json`, `package-lock.json`, `playwright.config.ts`, `tsconfig.json`, `.env.example`; shop/checkout/registration page objects; reusable fixture; case metadata/data/summary utilities; four TypeScript spec files under smoke, checkout and regression; environment, exploration, Qase mapping, defect and verification documents.

Existing architecture notes and manual evidence were not rewritten. Generated report/evidence files are local deliverables and are excluded from the proposed Git commit.

## Remaining actions requiring user input

1. Pablo has approved the initial commit and publication directly to `main`, with the framework under `qa-automation/`. Future commits and pushes still require a fresh approval.
2. If using local Git CLI, configure Git author identity and GitHub HTTPS/SSH authentication. Neither was invented here. The connected GitHub account is authorized, but has not been used to create a remote commit.
3. Verify Qase project/code and numeric case mappings, then configure the token locally if API publishing is wanted. Existing reports contain both MM and MINIMODA references; verify before mapping.
4. Fix the storefront defects in its separate source repository. Until then, a full QA run should remain red for these regressions.

Earlier diagnostic runs are archived locally. One exposed a transient catalog locator ambiguity; two iterations exposed early-navigation/hydration guards that could skip the empty-cart action. Those guards were removed or replaced with explicit readiness assertions. Only the final run above is the release-verification baseline.
