// Advent of Code day 4
const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .split('\n\n');

function part1() {
    const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
    let valid = 0;

    for (const passport of input) {
        valid += +requiredFields
            .every(requiredField => passport.includes(`${requiredField}:`));
    }

    return valid;
}

function part2() {
    let valid = 0;

    class Validator {
        constructor(key, validateFunction) {
            this.key = key;
            this.function = validateFunction;
        }

        valid(passport) {
            const match = (new RegExp(`${this.key}:([^\\s]+)`)).exec(passport);
            if (match) {
                console.log(match[1], this.function(match[1]))
                return this.function(match[1]);
            } else {
                return false;
            }
        }

        static minMax(min, max) {
            return function (num) {
                return +num >= min && +num <= max;
            }
        }
    };

    const requiredFields = [
        new Validator(
            'byr',
            Validator.minMax(1920, 2002)
        ),
        new Validator(
            'iyr',
            Validator.minMax(2010, 2020)
        ),
        new Validator(
            'eyr',
            Validator.minMax(2020, 2030)
        ),
        new Validator(
            'hgt',
            (str) => {
                if (str.includes('cm')) {
                    return Validator.minMax(150, 193)(+str.slice(0, -2));
                } else {
                    return Validator.minMax(59, 76)(+str.slice(0, -2));
                }
            }
        ),
        new Validator(
            'hcl',
            (str) => !!str.match(/^#.{6}$/g)
        ),
        new Validator(
            'ecl',
            (str) => !!str.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/g)
        ),
        new Validator(
            'pid', 
            (str) => !!str.match(/^\d{9}$/g)
        )
    ]

    for (const passport of input) {
        valid += +requiredFields
            .every(requiredField => requiredField.valid(passport));
    }

    return valid;
}

console.log('The answer to day 4 part 1 is:', part1());
console.log('The answer to day 4 part 2 is:', part2());
