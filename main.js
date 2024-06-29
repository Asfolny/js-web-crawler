import { argv, exit } from 'node:process';
import { crawlPage } from './crawl.js';

async function main() {
  if (argv.length !== 3) {
    console.log("Only 1 argument!");
    exit(1);
  }

  console.log(`BaseURL is ${argv[2]}`);
  await crawlPage(argv[2]);
}

await main();

