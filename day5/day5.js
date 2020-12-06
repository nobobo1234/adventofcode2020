// Advent of Code day 5
const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .split('\n');

function binarySpacePart() {
    const ids = [];
    for (const seat of input) {
        let minRow = 0;
        let maxRow = 127;
        let minColumn = 0;
        let maxColumn = 7;
        for (let letter of seat) {
            const dRow = (maxRow - minRow) / 2;
            const dColumn = (maxColumn - minColumn) / 2;
            if (letter === 'F') {
                maxRow = Math.floor(maxRow - dRow);
            } else if (letter === 'B') {
                minRow = Math.ceil(minRow + dRow);
            } else if (letter === 'L') {
                maxColumn = Math.floor(maxColumn - dColumn);
            } else if (letter = 'R') {
                minColumn = Math.ceil(minColumn + dColumn);
            }
        }

        ids.push(maxRow * 8 + maxColumn); 
    }
    return ids.sort();
}

function part1() {    
    const seats = binarySpacePart();
    return seats[seats.length - 1];
}

function part2() {
    const ids = binarySpacePart();
    for(let i = 1; i < ids.length; i++) {
        if (ids[i] - ids[i-1] === 2) return ids[i] - 1;
    }
    return "No answer found"
}

console.log('The answer to day 5 part 1 is:', part1());
console.log('The answer to day 5 part 2 is:', part2());