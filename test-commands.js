#!/usr/bin/env node

const { exec } = require('child_process');
const util = require('util');

const execAsync = util.promisify(exec);

async function testCommand(command, description) {
  console.log(`\n=== Testing: ${description} ===`);
  console.log(`Command: ${command}`);
  
  try {
    const { stdout, stderr } = await execAsync(command);
    
    if (stdout) {
      console.log('Output:');
      console.log(stdout.trim());
    }
    
    if (stderr) {
      console.log('Stderr:');
      console.log(stderr.trim());
    }
    
    console.log('✅ Command executed successfully');
    
  } catch (error) {
    console.log('❌ Command failed');
    console.log('Error code:', error.code);
    console.log('Error message:', error.message);
    
    if (error.stdout) {
      console.log('Stdout:', error.stdout.trim());
    }
    
    if (error.stderr) {
      console.log('Stderr:', error.stderr.trim());
    }
  }
}

async function runTests() {
  console.log('Testing various commands...\n');
  
  const commands = [
    { cmd: 'curl https://api.example.com/data', desc: 'curl API request' },
    { cmd: 'node -v', desc: 'Node.js version' },
    { cmd: 'npm -v', desc: 'npm version' },
    { cmd: 'pnpm -v', desc: 'pnpm version' }
  ];
  
  for (const { cmd, desc } of commands) {
    await testCommand(cmd, desc);
  }
  
  console.log('\n=== Test Summary Complete ===');
}

// Run the tests
runTests().catch(console.error);
