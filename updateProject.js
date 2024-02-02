const util = require('util');
const readline = require('readline');
const exec = util.promisify(require('child_process').exec);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const confirmAction = (question, timeout) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y');
    });

    if (timeout) {
      setTimeout(() => {
        resolve(false); // Auto choose "no" after the specified timeout
      }, timeout);
    }
  });
};

async function runCommand(command, message) {
  console.log(`Step ${message}: ${command}`);
  const { stdout, stderr } = await exec(command);
  console.log(stdout);
  if (stderr) {
    console.error(stderr);
  }
}

(async function () {
  try {
    // Step 1: Pull from git
    await runCommand('git pull origin main', '2 - Pulling from git');

    // Step 2: NPM Install
    const shouldInstall = await confirmAction('Step 3 - Do you want to run "npm install"? (yes/no): ', 10000);

    if (shouldInstall) {
      await runCommand('npm install --force', '3 - Installing node modules');
    } else {
      console.log('npm installation skipped.');
    }

    rl.close();
    rl.removeAllListeners();

    // Step 3: Build Project
    await runCommand('npm run build', '3 - Build Project');

    // Step 4: Copy build to /var/www/html/
    await runCommand('sudo cp -r dist/* /var/www/html/', '4 - Copy build to /var/www/html/');

    console.log('Automation complete!');
  } catch (err) {
    console.error('An error occurred:', err);
    // Stop executing further commands by throwing the error again
    throw err;
  }
})();
