const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'task-manager-frontend',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

