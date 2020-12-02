// Advent of Code day 2
const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .split('\n');

function part1() {
    let validCount = 0;

    for (const passWithPol of input) {
        /**
         * Example line: 1-4 a: asfreuigaa
         * 1 is the least amount
         * 4 is the max amount
         * a is the letter from the policy
         * asfreuigaa is the password
         */
        const pass = passWithPol.split(': ')[1],
            policy = passWithPol.split(': ')[0],
            policyLetter = policy.split(' ')[1],
            numbers = policy.split(' ')[0],
            least = +numbers.split('-')[0],
            max = +numbers.split('-')[1];
        
        const count = (pass.match(new RegExp(policyLetter, 'g')) || []).length;
        if (count >= least && count <= max) {
            validCount++;
        }
    }

    return validCount;
}

function part2() {
    let validCount = 0;

    for (const passWithPol of input) {
        /**
         * Example line: 1-4 a: asfreuigaa
         * 1 is the first index
         * 4 is the second index
         * a is the letter from the policy
         * asfreuigaa is the password
         */
        const pass = passWithPol.split(': ')[1],
            policy = passWithPol.split(': ')[0],
            policyLetter = policy.split(' ')[1],
            numbers = policy.split(' ')[0],
            index1 = +numbers.split('-')[0],
            index2 = +numbers.split('-')[1];
        
        if (pass[index1 - 1] === policyLetter ^ pass[index2 - 1] === policyLetter) {
            validCount++;
        }
    }

    return validCount;
}

console.log('The answer to day 2 part 1 is:', part1());
console.log('The answer to day 2 part 2 is:', part2());