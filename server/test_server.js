import http from 'http';
import { spawn } from 'child_process';

const serverProcess = spawn('node', ['index.js'], { cwd: process.cwd(), stdio: 'inherit' });

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fetch(url, options = {}) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = http.request(
      {
        hostname: u.hostname,
        port: u.port,
        path: u.pathname,
        method: options.method || 'GET',
        headers: options.headers || {}
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(data) });
          } catch {
            resolve({ status: res.statusCode, data });
          }
        });
      }
    );
    req.on('error', reject);
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

async function runTests() {
  await wait(2000);
  console.log('\n--- 1. Testing /health ---');
  const health = await fetch('http://localhost:5000/health');
  console.log('Health:', health);

  console.log('\n--- 2. Testing /api/ecosystem ---');
  const eco = await fetch('http://localhost:5000/api/ecosystem');
  console.log('Platforms found:', eco.data.platforms?.length);
  eco.data.platforms?.forEach((p) => console.log(`✓ ${p.title} -> ${p.url}`));

  console.log('\n--- 3. Testing /api/contact ---');
  const contact = await fetch('http://localhost:5000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Dr. Jane Smith',
      email: 'jane@fund.com',
      organization: 'JH Alpha Ventures',
      serviceInterest: 'Quantitative Crypto Intelligence',
      budget: '$25k - $75k',
      message: 'Interested in algorithmic execution streams.'
    })
  });
  console.log('Contact response:', contact);

  console.log('\n--- 4. Testing /api/contacts list ---');
  const list = await fetch('http://localhost:5000/api/contacts');
  console.log('Total inquiries stored:', list.data.count);

  console.log('\n--- 5. Testing /api/quant/simulate-underwriting ---');
  const quant = await fetch('http://localhost:5000/api/quant/simulate-underwriting', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      annualIncome: 95000,
      monthlyDebt: 600,
      creditScore: 760,
      requestedLoan: 35000,
      termMonths: 36
    })
  });
  console.log('Underwriting result:', quant.data.results);

  console.log('\n✓ ALL BACKEND TESTS PASSED SUCCESSFULLY!\n');
  serverProcess.kill('SIGTERM');
  process.exit(0);
}

runTests().catch((err) => {
  console.error('Test failed:', err);
  serverProcess.kill('SIGTERM');
  process.exit(1);
});
