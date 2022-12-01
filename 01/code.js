const fs = require('fs');

const solve = (inputFile) => {
  const data = fs.readFileSync(inputFilePath, 'utf8');

  // an integer followed by either a newline or the end of the file
  const itemPattern = new RegExp('\\d+(\\n|$)');

  // an inventory is just multiple items in a sequence without any line break between them
  const inventoryPattern = new RegExp(`(${itemPattern.source})+`;

  return data.match(inventoryPattern)
    .map(inventory => inventory
      .match(itemPattern)
      .map(item) => parseInt(item))
      .reduce((a,b) => a + b))
    .reduce((a,b) => Math.max(a,b))
};

const [ inputFile = './problem-input.txt' ] = process.argv.slice(2);
console.log(solve(inputFile));
