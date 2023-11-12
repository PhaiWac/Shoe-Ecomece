const { exec } = require('child_process');

exec('npx tailwindcss build -o ./public/index.css', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }

  console.log(`Tailwind CSS built successfully:\n${stdout}`);
});
