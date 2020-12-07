const path = require('path');

const day = process.argv.slice(2)[0];

if (!day) {
    throw new Error('Specify a date number')
}

try {
    require(`../day${day}/day${day}`);
} catch(error) {
    if (error.code == 'MODULE_NOT_FOUND') {
        throw new Error('The specified day is not found')
    }
    throw new Error(`Something happened:\n${error.stack}`);
}
