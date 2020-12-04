// Advent of Code day 3
const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .split('\n');

function part1(down = 1, right = 3) {
    let row = 0;
    let offset = 0;
    let trees = 0;
    while (row < input.length) {
        if (input[row][offset] === '#') {
            trees++; 
        }
        offset += right;
        if (offset >= input[row].length) {
            offset = offset - input[row].length;
        }
        row += down;
    }
    return trees;
}

function part2() {
    const treesSlope1 = part1(1, 1),
        treesSlope2 = part1(1, 3)
        treesSlope3 = part1(1, 5)
        treesSlope4 = part1(1, 7)
        treesSlope5 = part1(2, 1);

    return treesSlope1 * treesSlope2 * treesSlope3 * treesSlope4 * treesSlope5;
}

console.log('The answer to day 3 part 1 is:', part1());
console.log('The answer to day 3 part 2 is:', part2());
