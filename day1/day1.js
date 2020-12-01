// Advent of Code day 1
const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .split('\n')
    .map(Number);

function part1() {
    let result = 0;
    for (const expense of input) {
        for (const expense2 of input) {
            if (expense + expense2 === 2020) {
                result = expense * expense2;
                break;
            }
        }
    }
    return result;
}

function part2() {
    let result = 0;
    for (const expense of input) {
        for (const expense2 of input) {
            for (const expense3 of input) {
                if (expense + expense2 + expense3 === 2020) {
                    result = expense * expense2 * expense3;
                    break;
                }
            }
        }
    }
    return result;
}

console.log('The answer to day 1 part 1 is:', part1());
console.log('The answer to day 1 part 2 is:', part2());