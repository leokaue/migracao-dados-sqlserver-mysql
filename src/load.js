const fs = require('fs');
const path = require('path');
const { createObjectCsvWriter } = require('csv-writer');
const { outputFolder } = require('./config');

function ensureFolder(folder) {
  if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
}

async function writeCsv(filename, rows) {
  ensureFolder(outputFolder);
  const filepath = path.join(outputFolder, filename);

  if (!rows || rows.length === 0) {
    fs.writeFileSync(filepath, '');
    return filepath;
  }

  const header = Object.keys(rows[0]).map(h => ({ id: h, title: h }));
  const csvWriter = createObjectCsvWriter({ path: filepath, header });
  await csvWriter.writeRecords(rows);
  return filepath;
}

module.exports = { writeCsv };
