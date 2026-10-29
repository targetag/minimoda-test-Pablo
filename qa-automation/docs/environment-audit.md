# Environment audit — October 28, 2026 (America/Guatemala)

Student: Pablo Villeda GUA

| Component | Observed status |
|---|---|
| Windows | Windows 10-compatible Win64 browser environment |
| Node | v24.22.1 |
| npm / npx | 10.2.0 |
| Git | 2.45.2.windows.1 |
| Codex CLI | 0.165.0-alpha.1.2 |
| Playwright Test | 1.64.1; pinned in package.json and package-lock.json |
| Chromium | 156.0.8078.4; browser build 1248 installed |
| Google Chrome | 156.0.8078.74; existing system installation |
| Microsoft Playwright MCP | Enabled stdio server; `npx @playwright/mcp@latest`; 25 tools exposed in the development chat |
| MCP live connectivity | Successful navigation, snapshots, field entry, demo purchase and validation inspection |
| Cached MCP package at audit | @playwright/mcp 0.0.83; Node engine requirement >=18 |
| GitHub connector | Authenticated as targetag; repository permission admin |
| Local Git HTTPS authentication | No credential returned by noninteractive credential lookup; connector authorization does not authenticate local Git |
| Repository | Cloned targetag/minimoda-test-Pablo; origin/main synchronized at ee685a4 |
| Working branch | qa/playwright-framework; no commits or pushes authorized yet |
| Qase | No connector available; no API token or live project verified; publishing disabled |

Existing root documentation, classroom files, screenshots and Git history were preserved. The old architecture document is a proposal using Claude tooling, not proof of installed automation; this new implementation uses Codex during development and Playwright alone during execution.

The Codex shell sandbox can redirect LOCALAPPDATA into an isolated cache. During verification, `PLAYWRIGHT_BROWSERS_PATH` was set explicitly to `C:\Users\dilig\AppData\Local\ms-playwright`. In a regular Windows terminal, Playwright uses the normal user cache automatically. If a sandbox reports a missing browser, install Chromium in that environment or set the browser-cache path explicitly; do not disable the sandbox just to resolve a cache path.

Git emitted `error: daemon terminated` when a system-wide filesystem-monitor option was active. Read-only Git checks use `git -c core.fsmonitor=false ...` as a command-local workaround. No global Git settings were changed.

Codex CLI also reported denied temporary-directory cleanup/PATH-alias writes in this restricted chat. MCP tool calls and actual Playwright browser tests work despite those CLI startup warnings. They are distinct from application defects.
