const assert = require('node:assert/strict');
const test = require('node:test');

const { DEFAULT_CONFIG, getConfig, parsePort } = require('../src/config');

test('getConfig returns safe defaults when no environment is provided', () => {
  assert.deepEqual(getConfig({}), {
    projectName: DEFAULT_CONFIG.projectName,
    appEnv: DEFAULT_CONFIG.appEnv,
    appHost: DEFAULT_CONFIG.appHost,
    appPort: DEFAULT_CONFIG.appPort,
    databaseUrl: '',
    openaiApiKeyConfigured: false,
  });
});

test('getConfig reads placeholder-compatible environment variable names', () => {
  const config = getConfig({
    PROJECT_NAME: 'Example Project',
    APP_ENV: 'test',
    APP_HOST: '0.0.0.0',
    APP_PORT: '8080',
    DATABASE_URL: 'your_database_url_here',
    OPENAI_API_KEY: 'your_api_key_here',
  });

  assert.equal(config.projectName, 'Example Project');
  assert.equal(config.appEnv, 'test');
  assert.equal(config.appHost, '0.0.0.0');
  assert.equal(config.appPort, 8080);
  assert.equal(config.databaseUrl, 'your_database_url_here');
  assert.equal(config.openaiApiKeyConfigured, true);
});

test('parsePort falls back to the default for invalid values', () => {
  assert.equal(parsePort('not-a-port'), DEFAULT_CONFIG.appPort);
  assert.equal(parsePort('0'), DEFAULT_CONFIG.appPort);
  assert.equal(parsePort('70000'), DEFAULT_CONFIG.appPort);
});
