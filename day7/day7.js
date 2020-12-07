// Advent of Code day 7
const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .split('\n')
    .map(e => {
        return e.replace('.', '').split(' contain ')
    })
    .filter(e => !e.includes(''));


class Graph {
    constructor() {
        this.edges = new Map();
        this.nodes = [];
    }

    addNode(name) {
        this.nodes.push(name);
        this.edges.set(name, []);
    }

    addEdge(node1, node2) {
        this.edges.get(node2).push(node1);
    }

    dfs(node) {

    }
}

function part1() {
    const graph = new Graph();
    for (const rule of input) {
        graph.addNode(rule[0]);
        const contains = rule[1].split(', ').map(e => e.slice(2))
        for (const bag of contains) {
            graph.addNode(bag);
            graph.addEdge(rule[0], bag);
        }
    }

    return;
}

function part2() {
    return;
}

console.log('The answer to day 7 part 1 is:', part1());
console.log('The answer to day 7 part 2 is:', part2());
