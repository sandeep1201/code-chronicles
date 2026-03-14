#!/usr/bin/env tsx
/**
 * Full IBS scan - runs on ~100 stocks and saves to data/market/ibs-scan.json
 * Usage: npm run ibs-scan
 */

import fs from 'fs';
import path from 'path';
import { runIBSScan, DEFAULT_WATCHLIST } from '../lib/ibs-scanner';

async function main() {
  console.log('Fetching S&P 500 constituents (top 100)...');
  console.log(`Scanning ${DEFAULT_WATCHLIST.length} tickers...\n`);

  const results = await runIBSScan(DEFAULT_WATCHLIST, (scanned, total) => {
    if (scanned % 20 === 0 || scanned === total) {
      console.log(`Scanning ${scanned}/${total}...`);
    }
  });

  const output = {
    timestamp: new Date().toISOString(),
    count: results.length,
    buyCount: results.filter((r) => r.signal === '🚀 BUY').length,
    exitCount: results.filter((r) => r.signal === '🛑 EXIT').length,
    results,
  };

  const dataDir = path.join(process.cwd(), 'data', 'market');
  const outFile = path.join(dataDir, 'ibs-scan.json');

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(outFile, JSON.stringify(output, null, 2));
  console.log(`\n✅ Saved to ${outFile}`);
  console.log(`   BUY: ${output.buyCount} | EXIT: ${output.exitCount} | WAIT: ${output.count - output.buyCount - output.exitCount}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
