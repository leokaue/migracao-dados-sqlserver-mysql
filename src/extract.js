const sql = require('mssql');
const { source } = require('./config');

async function extractRows(table, columns) {
  const pool = await sql.connect({
    server: source.server,
    database: source.database,
    user: source.user,
    password: source.password,
    options: source.options
  });

  const cols = columns.join(', ');
  const q = `SELECT ${cols} FROM ${table}`;
  const res = await pool.request().query(q);
  return res.recordset;
}

module.exports = { extractRows };
