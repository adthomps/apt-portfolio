const { execSync, spawn } = require('child_process');
const readline = require('readline');

const PORT = 8080;

function getProcessOnPort(port) {
  try {
    const result = execSync(`powershell -Command "Get-Process -Id (Get-NetTCPConnection -LocalPort ${port}).OwningProcess | Select-Object -Property Id,ProcessName"`, { encoding: 'utf8' });
    const match = result.match(/Id\s+:\s+(\d+)\s+ProcessName\s+:\s+(\w+)/);
    if (match) {
      return { id: match[1], name: match[2] };
    }
  } catch (e) {}
  return null;
}

function prompt(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(question, answer => { rl.close(); resolve(answer); }));
}

(async () => {
  const proc = getProcessOnPort(PORT);
  if (proc) {
    console.log(`Port ${PORT} is in use by process ${proc.name} (PID: ${proc.id}).`);
    const answer = await prompt('Do you want to force stop this process and start Vite? (y/N): ');
    if (answer.toLowerCase() === 'y') {
      try {
        execSync(`powershell -Command "Stop-Process -Id ${proc.id}"`);
        console.log(`Process ${proc.id} stopped.`);
        spawn('pnpm', ['dev'], { stdio: 'inherit', shell: true });
      } catch (e) {
        console.error('Failed to stop process:', e.message);
      }
    } else {
      console.log('Aborted. Port is still in use.');
      process.exit(1);
    }
  } else {
    spawn('pnpm', ['dev'], { stdio: 'inherit', shell: true });
  }
})();
