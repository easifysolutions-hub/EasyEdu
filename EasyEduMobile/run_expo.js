const { spawn } = require('child_process');
const expo = spawn('npx', ['expo', 'start', '--android'], {
    stdio: ['pipe', 'inherit', 'inherit'],
    shell: true
});

setTimeout(() => {
    expo.stdin.write('y\n');
}, 15000); // Wait for the prompt to appear
