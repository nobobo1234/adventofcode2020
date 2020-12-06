// Advent of Code day 6
const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .split('\n\n');

function part1() {
    let totalCount = 0;
    const splittedInput = input.map(e => e.split('').filter(e => e !== '\n'));
    for (const answers of splittedInput) {
        totalCount += (new Set(answers)).size;
    }
    return totalCount;
}

function part2() {
    let totalCount = 0;
    for (const answers of input) { // Loop over groups
        let filteredInput = new Set(answers); // Make set of all the letters
        for (const letter of filteredInput) {
            const letterCount = answers.match(new RegExp(letter, 'g')).length;
            // Amount of newlines + 1 is the same as amount of persons
            const personCount = answers.match(new RegExp('\n', 'g'))?.length + 1 || 1;
            // See if the count of the letter is the same the amount of persons
            // Then all have answered yes
            if (personCount === letterCount) { 
                totalCount++
            }
        }
    }
    return totalCount;
}

console.log('The answer to day 6 part 1 is:', part1());
console.log('The answer to day 6 part 2 is:', part2());