require('dotenv').config();
const path = require('path');

module.exports = {
  source: {
    server: process.env.SOURCE_SERVER || 'localhost\\SQLEXPRESS',
    database: process.env.SOURCE_DB || 'master',
    user: process.env.SOURCE_USER || 'sa',
    password: process.env.SOURCE_PASS || '',
    options: { encrypt: false, trustServerCertificate: true }
  },
  outputFolder: process.env.OUTPUT_FOLDER
    ? path.resolve(process.env.OUTPUT_FOLDER)
    : path.resolve(__dirname, '..', 'output')
};
