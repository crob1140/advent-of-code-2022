const fs = require('fs');

const solve = (inputFile, topN) => {
  const data = fs.readFileSync(inputFile, 'utf8');

  // an integer followed by either a newline or the end of the file
  const itemPattern = new RegExp('\\d+(\\n|$)', 'g');

  // an inventory is just multiple items in a sequence without any line break between them
  const inventoryPattern = new RegExp(`(${itemPattern.source})+`, 'g');

  return data.match(inventoryPattern)
    .map(inventory => inventory
      .match(itemPattern)
      .map(item => parseInt(item))
      .reduce((a,b) => a + b))
    .sort((a,b) => b - a)
    .slice(0, topN)
    .reduce((a,b) => a + b)
};

const [ inputFile = `${__dirname}/puzzle-input.txt` ] = process.argv.slice(2);
console.log(solve(inputFile, 1));
console.log(solve(inputFile, 3));