const { getConfig } = require('./config');

function main() {
  const config = getConfig();

  console.log(`${config.projectName} starter is ready.`);
  console.log(`Environment: ${config.appEnv}`);
  console.log(`Host: ${config.appHost}`);
  console.log(`Port: ${config.appPort}`);
}

if (require.main === module) {
  main();
}

module.exports = {
  main,
};
