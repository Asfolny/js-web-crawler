function printReport(pages) {
  console.log("Printing crawl report");

  // fromEntries turns an array to an Object
  // entries turns an object into an array
  // array sorting is easily achieved based on the number the name has
  // a-b => smallest to highest, b-a highest to lowest
  pages = Object.fromEntries(
    Object.entries(pages).sort(([,a],[,b]) => b-a)
  );

  for (const [page, count] of Object.entries(pages)) {
    console.log(`Found ${count} internal links to ${page}`);
  }
}

export { printReport };
