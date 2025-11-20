const mapping = require('./mapping.json');
const { extractRows } = require('./extract');
const { transformRows } = require('./transform');
const { writeCsv } = require('./load');

async function run() {
  console.log('Iniciando ETL...');
  for (const map of mapping.tables) {
    const sourceTable = map.source.table;
    const cols = map.source.columns;
    const targetFile = map.target.file;
    console.log(`\nProcessando ${sourceTable} -> ${targetFile}`);

    try {
      const rows = await extractRows(sourceTable, cols);
      console.log(`  Linhas extraídas: ${rows.length}`);
      const transformed = transformRows(map, rows);
      const outPath = await writeCsv(targetFile, transformed);
      console.log(`  Gravado: ${outPath} (linhas: ${transformed.length})`);
    } catch (err) {
      console.error(`  Erro ao processar ${sourceTable}:`, err.message || err);
    }
  }
  console.log('\nETL finalizado.');
}

run().catch(err => console.error('Erro fatal:', err));
