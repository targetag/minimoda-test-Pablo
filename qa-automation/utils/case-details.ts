/** Local automation references are NOT new Qase IDs. */
export function caseDetails(
  id: string,
  preconditions: string,
  expected: string,
  qaseEnvironmentKey?: string,
) {
  const annotations = [
    { type: 'LocalCase', description: id },
    { type: 'Preconditions', description: preconditions },
    { type: 'Expected', description: expected },
    { type: 'Postconditions', description: 'Playwright closes this test\'s isolated browser context; simulated data is discarded.' },
  ];
  const qaseId = qaseEnvironmentKey ? process.env[qaseEnvironmentKey] : undefined;
  if (qaseId) {
    if (!/^[1-9]\d*$/.test(qaseId)) throw new Error(`${qaseEnvironmentKey} must be a verified positive numeric Qase case ID.`);
    annotations.push({ type: 'QaseID', description: qaseId });
  }
  return { annotation: annotations };
}
