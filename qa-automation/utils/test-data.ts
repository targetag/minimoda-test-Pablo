export const customer = {
  name: process.env.QA_NAME || 'QA Automation',
  email: process.env.QA_EMAIL || 'qa.automation@example.test',
  address: process.env.QA_ADDRESS || '123 Demo Street',
  password: process.env.QA_PASSWORD || 'DemoOnly123!',
};

// Public bypass numbers explicitly listed by the inspected MiniModa demo UI.
export const demoCards = {
  approved: '4111111111111111',
  declined: '4000000000000002',
  insufficientFunds: '4000000000009995',
  expired: '4000000000000069',
};

export function futureExpiry() {
  return `12/${String(new Date().getFullYear() + 3).slice(-2)}`;
}
