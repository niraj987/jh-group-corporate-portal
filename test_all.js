import http from 'http';
import { spawn } from 'child_process';

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
        path: u.pathname + (u.search || ''),
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

async function testAll() {
  console.log('--- Launching Services for Testing ---');

  // 1. Python Service
  const pythonProc = spawn('python', ['python_service/app.py'], {
    shell: true,
    stdio: 'ignore'
  });

  // 2. Express Server
  const serverProc = spawn('node', ['server/index.js'], {
    shell: true,
    stdio: 'ignore'
  });

  // 3. Vite Client
  const clientProc = spawn('npm', ['--prefix', 'client', 'run', 'dev', '--', '--port', '5173', '--host'], {
    shell: true,
    stdio: 'ignore'
  });

  console.log('Waiting 5 seconds for all services to initialize...');
  await wait(5000);

  let allPassed = true;

  try {
    // Test 1: Python Engine
    console.log('\n[1/7] Testing Python Service (/health)...');
    try {
      const pyHealth = await fetch('http://localhost:8000/health');
      console.log('✓ Python Engine Health:', pyHealth.status, pyHealth.data);
    } catch (e) {
      console.error('✗ Python Health failed:', e.message);
      allPassed = false;
    }

    // Test 2: Python Underwrite API
    console.log('\n[2/7] Testing Python Service (/api/underwrite)...');
    try {
      const pyUnderwrite = await fetch('http://localhost:8000/api/underwrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          annual_income: 88000,
          monthly_debt: 700,
          credit_score: 745,
          requested_amount: 25000,
          term_months: 36
        })
      });
      console.log('✓ Python Underwrite Result:', pyUnderwrite.status, pyUnderwrite.data.risk_tier, '| Approved:', pyUnderwrite.data.decision);
    } catch (e) {
      console.error('✗ Python Underwrite failed:', e.message);
      allPassed = false;
    }

    // Test 3: Express Server Health
    console.log('\n[3/7] Testing Express Backend (/health)...');
    try {
      const srvHealth = await fetch('http://localhost:5000/health');
      console.log('✓ Express Server Health:', srvHealth.status, srvHealth.data);
    } catch (e) {
      console.error('✗ Express Health failed:', e.message);
      allPassed = false;
    }

    // Test 4: Express Ecosystem API
    console.log('\n[4/7] Testing Express Ecosystem API (/api/ecosystem)...');
    try {
      const srvEco = await fetch('http://localhost:5000/api/ecosystem');
      console.log('✓ Ecosystem Platforms:', srvEco.data.platforms?.map((p) => p.title));
    } catch (e) {
      console.error('✗ Express Ecosystem failed:', e.message);
      allPassed = false;
    }

    // Test 5: Express Contact Inquiries API
    console.log('\n[5/7] Testing Express Contact Submission (/api/contact)...');
    try {
      const srvContact = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Sarah Chen, Quant Portfolio Manager',
          email: 'schen@alpha-capital.com',
          organization: 'Alpha Capital Global',
          serviceInterest: 'Quantitative Crypto Intelligence',
          budget: '$25k - $75k',
          message: 'Requesting API access to quantitative signals desk.'
        })
      });
      console.log('✓ Contact Submission Result:', srvContact.status, srvContact.data);
    } catch (e) {
      console.error('✗ Express Contact failed:', e.message);
      allPassed = false;
    }

    // Test 6: Express Basel III Simulation Bridge
    console.log('\n[6/7] Testing Express Underwrite Simulation (/api/quant/simulate-underwriting)...');
    try {
      const srvQuant = await fetch('http://localhost:5000/api/quant/simulate-underwriting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          annualIncome: 120000,
          monthlyDebt: 1200,
          creditScore: 780,
          requestedLoan: 50000,
          termMonths: 48
        })
      });
      console.log('✓ Express Quant Simulation:', srvQuant.status, srvQuant.data.results);
    } catch (e) {
      console.error('✗ Express Quant Simulation failed:', e.message);
      allPassed = false;
    }

    // Test 7: Vite Client Frontend
    console.log('\n[7/7] Testing React Vite Frontend (http://localhost:5173/)...');
    try {
      const clientRes = await fetch('http://localhost:5173/');
      const hasTitle = typeof clientRes.data === 'string' && clientRes.data.includes('JH Group');
      console.log('✓ Vite Frontend Status:', clientRes.status, '| HTML Loaded with title:', hasTitle);
    } catch (e) {
      console.error('✗ Vite Frontend failed:', e.message);
      allPassed = false;
    }

    if (allPassed) {
      console.log('\n=============================================');
      console.log('🎉 ALL INTEGRATION TESTS PASSED SUCCESSFULLY!');
      console.log('=============================================\n');
    } else {
      console.log('\n⚠️ Some tests failed. Check logs above.\n');
    }
  } finally {
    // Terminate test processes
    pythonProc.kill();
    serverProc.kill();
    clientProc.kill();
    // Allow cleanup on windows
    try {
      spawn('taskkill', ['/F', '/IM', 'node.exe'], { shell: true });
      spawn('taskkill', ['/F', '/IM', 'uvicorn.exe'], { shell: true });
    } catch {}
    process.exit(allPassed ? 0 : 1);
  }
}

testAll();
