import { spawn } from 'child_process';
import path from 'path';

console.log('==================================================');
console.log('    JH GROUP CORPORATE PORTAL - DEV LAUNCHER      ');
console.log('  MERN Stack (React + Express) & Python Engine    ');
console.log('==================================================\n');

// 1. Start Python Microservice
console.log('► Starting Python Quantitative Engine on http://localhost:8000 ...');
const python = spawn('python', ['python_service/app.py'], {
  stdio: 'inherit',
  shell: true
});

// 2. Start Express API Server
console.log('► Starting Express MERN Backend on http://localhost:5000 ...');
const server = spawn('npm', ['--prefix', 'server', 'run', 'start'], {
  stdio: 'inherit',
  shell: true
});

// 3. Start Vite React Frontend
console.log('► Starting Vite React Client on http://localhost:5173 ...');
const client = spawn('npm', ['--prefix', 'client', 'run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

function cleanup() {
  console.log('\nStopping all services...');
  python.kill();
  server.kill();
  client.kill();
  process.exit();
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
