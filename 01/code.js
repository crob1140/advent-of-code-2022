const fs = require('fs');

const read = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  // an integer followed by either a newline or the end of the file
  const itemPattern = new RegExp('\\d+(\\n|$)', 'g');
  // an inventory is just multiple items in a sequence without any line break between them
  const inventoryPattern = new RegExp(`(${itemPattern.source})+`, 'g');

  return {
    "inventories": data.match(inventoryPattern)
      .map(inventory => ({
        "items": inventory.match(itemPattern)
          .map(item => ({
            "calories": parseInt(item)
          }))
      }))
  };
};

const solve = (scenario) => {
  const totalCalories = (inventory) => inventory.items.reduce((acc, item) => acc + item.calories, 0);
  const topN = (sortedArr, amount) => sortedArr.slice(0, amount);
  const sum = (arr) => arr.reduce((a, b) => a + b);

  const inventoryCaloriesInDescOrder = scenario.inventories
    .map(totalCalories)
    .sort((a , b) => b - a);

  return [
    sum(topN(inventoryCaloriesInDescOrder, 1)),
    sum(topN(inventoryCaloriesInDescOrder, 3))
  ];
};

const [ inputFile = `${__dirname}/puzzle-input.txt` ] = process.argv.slice(2);
const scenario = read(inputFile);
console.log(solve(scenario));