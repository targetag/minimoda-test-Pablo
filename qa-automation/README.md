# MiniModa QA automation

**Student: Pablo Villeda GUA**

This repository now contains a local Playwright Test + TypeScript framework for the [MiniModa demonstration store](https://minimoda-navy.vercel.app/). Codex CLI and Microsoft Playwright MCP were used to inspect the site and develop tests. Saved tests execute directly with Node and Playwright: no Codex session, MCP server, API key or AI tokens are required for routine runs.

The original classroom instructions and existing QA evidence are preserved in the repository root. `../README_MiniModa_QA_Pablo_villeda_GUA.md` is a historical architecture proposal; the executable configuration in this repository and the new `docs/` directory describe the implemented framework.

## Setup on Windows

Prerequisites: Node.js compatible with the locked packages (verified with 24.22.1), npm, Git, and installed Google Chrome when running the `chrome` project.

```powershell
git clone https://github.com/targetag/minimoda-test-Pablo.git
cd minimoda-test-Pablo/qa-automation
npm ci
npx playwright install chromium
Copy-Item .env.example .env
npm run typecheck
```

Use `npm install` only when adding/updating dependencies; use `npm ci` for a reproducible install from the committed lockfile. Existing browsers do not need reinstalling before every test run. Install Google Chrome through its normal installer if it is missing; `channel: 'chrome'` uses that installation with an isolated test profile.

During development, verify optional Codex tooling separately:

```powershell
codex --version
codex mcp list
codex mcp get playwright
# Only if the server is missing:
codex mcp add playwright -- npx @playwright/mcp@latest
```

If npx asks to download the MCP package interactively, add `-y` before the package name in its launch arguments for unattended startup. MCP registration alone does not test browser connectivity; use a harmless navigation/snapshot once during setup. Do not run Codex on every test execution. See [official MCP setup](https://learn.chatgpt.com/docs/extend/mcp).

## Execution without AI

Run from the qa-automation folder in PowerShell:

```powershell
# Both Chromium and Google Chrome; two concurrent workers
npx playwright test
# One browser
npx playwright test --project=chromium
npx playwright test --project=chrome
# A specific test file
npx playwright test tests/checkout/checkout.spec.ts
# Visible browser windows
npx playwright test --headed
# Reports and debugging
npx playwright show-report
npx playwright show-trace path/to/trace.zip
# Fast coverage of cart/catalog
npm run test:smoke
npm run typecheck
```

Chromium and Chrome are separate projects. The runner executes their independent contexts with up to two workers; work may be scheduled in project order rather than one worker permanently assigned to each browser. These are two Chromium-family builds, not independent browser engines.

If running inside a sandbox with a redirected browser cache, set the correct installed cache before executing:

```powershell
$env:PLAYWRIGHT_BROWSERS_PATH = 'C:\Users\dilig\AppData\Local\ms-playwright'
npx playwright test
```

For a normal terminal on another machine, omit that machine-specific path and use `npx playwright install chromium` once in that environment. Project files contain no hard-coded user cache path.

## Framework layout and scenarios

```text
tests/smoke/          cart math, search/reset, sold-out products
tests/checkout/       valid demo purchase, required fields, invalid email,
                     three declined cards, empty-cart prevention
tests/regression/     stock limit, age/password boundaries, terms, login fields
pages/               small reusable shop, checkout and registration objects
fixtures/            isolated Playwright page-object fixtures
utils/               case metadata, fictitious data, run summary/archive reporter
docs/                environment, site inspection, case mapping, defects and results
playwright.config.ts Chromium and installed Google Chrome projects
.env.example         optional configuration; no real credentials
```

There are 18 logical scenarios (36 executions across both projects). Each includes a local case reference/title, preconditions, named steps, expected outcomes, assertions and context cleanup. The framework does not modify application code to hide failures. [Case definitions and Qase mapping](docs/qase-test-cases.md) provide the full scenario list; [inspection notes](docs/site-exploration.md) explain locator choices and scope limits.

## Reports, evidence and defect triage

Every real execution produces:

- `playwright-report/index.html`: interactive HTML report; open with `npx playwright show-report`.
- `test-results/results.json`: full machine-readable Playwright results and assertions.
- `test-results/run-summary.md` and `.json`: counts, wall-clock duration, attempts, failed assertions, Qase mappings and evidence paths.
- `test-results/artifacts/`: screenshots on failure and traces on first retry.
- `qa-runs/<UTC timestamp>/`: local archived copy of reports/results after reporters finish, preserving previous runs. Evidence paths in the summary refer to their original run location; the archived report contains its own relative data.

These generated files are intentionally ignored by Git. Keep useful evidence locally or attach it to the correct Qase run after reviewing it. Screenshots/traces can contain configured test data; use fictitious data and never real card or customer details.

The baseline has **two reproducible demo application defects**: stock can exceed inventory, and empty-cart checkout can confirm an order. Those tests intentionally remain ordinary failing tests, not skipped/expected failures. A full run therefore returns exit code 1 while the defects persist. Read [defect reproduction](docs/defects.md) and [verified execution](docs/verification.md) before treating a red run as an installation failure. Environment failures, locator failures and application defects are reported separately.

## Qase workflow

Qase remains the test-management source. The reporter is installed but publishing is **off by default**. The historical public reports and documented IDs are linked in [Qase test cases](docs/qase-test-cases.md). No API token, live project mapping or new Qase run was available during setup.

Copy `.env.example` to `.env`, verify the actual project/code and case IDs, then populate `QASE_TESTOPS_PROJECT`, `QASE_TESTOPS_API_TOKEN` and relevant `QASE_CASE_*` variables. Set `QASE_MODE=testops` only to publish an authorized run. Select only reviewed mapped tests using a file path or `--grep`; unmapped tests may be created as new cases by the Qase reporter. Normal runs with `QASE_MODE=off` do not publish. The reporter uses native `QaseID` annotations and a Browser parameter. See [official Qase integration](https://developers.qase.io/docs/playwright).

New local automation references are not Qase IDs. The existing evidence mixes MM and MINIMODA prefixes; verify project identity first. Never commit `.env`, tokens, authentication state or traces with real credentials. Offline specifications are ready for manual case entry; a live Qase import/upload has not been performed.

## GitHub review and delivery

Source of truth: [targetag/minimoda-test-Pablo](https://github.com/targetag/minimoda-test-Pablo), branch `main`, folder `qa-automation/`. Development and verification took place on `qa/playwright-framework` based on `origin/main`. Pablo approved this initial publication directly to main. Existing files and history are retained.

Before each future commit, review `git status` and `git diff`, run type checking and the relevant tests, and **ask Pablo for commit approval**. Ask before pushing as well. A GitHub connector login is distinct from local Git HTTPS/SSH credentials. Do not force-push or bypass branch protection. Prefer a feature branch and pull request for future work unless Pablo explicitly approves direct publication. Commit only project sources/configuration/documentation and the dependency lockfile. Verify the actual commit on GitHub; do not claim unpublished local work is remote.

No automatic GitHub Actions workflow is added: local CLI execution is the default to minimize recurring cost. A future CI job should use `npm ci`, install the selected browser, execute these same tests, and retain failure artifacts without invoking Codex.

## Cost and maintenance

Use Codex for initial design, targeted inspection, debugging and maintenance. Reuse these saved tests and page objects for routine execution. Inspect only the failed assertion, screenshot or trace needed to diagnose a change. Avoid repeated full-site MCP exploration and avoid regenerating passing tests. Package scripts and reports support execution and triage entirely outside an AI chat.

Further setup: verify Qase mappings/token, authenticate local Git if using CLI pushes, and fix the two application defects in the separate storefront source repository.
