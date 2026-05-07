const DEFAULT_CONFIG = Object.freeze({
  projectName: 'E-budget project',
  appEnv: 'development',
  appHost: '127.0.0.1',
  appPort: 3000,
});

function parsePort(value) {
  const port = Number.parseInt(value, 10);

  if (Number.isNaN(port) || port <= 0 || port > 65535) {
    return DEFAULT_CONFIG.appPort;
  }

  return port;
}

function getConfig(environment = process.env) {
  return {
    projectName: environment.PROJECT_NAME || DEFAULT_CONFIG.projectName,
    appEnv: environment.APP_ENV || DEFAULT_CONFIG.appEnv,
    appHost: environment.APP_HOST || DEFAULT_CONFIG.appHost,
    appPort: parsePort(environment.APP_PORT || String(DEFAULT_CONFIG.appPort)),
    databaseUrl: environment.DATABASE_URL || '',
    openaiApiKeyConfigured: Boolean(environment.OPENAI_API_KEY),
  };
}

module.exports = {
  DEFAULT_CONFIG,
  getConfig,
  parsePort,
};
