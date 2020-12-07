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
        this.outerEdges = new Set();
    }

    addNode(name) {
        this.nodes.push(name);
        this.edges.set(name, []);
    }

    addEdge(node1, node2) {
        this.edges.get(node2).push(node1);
    }

    traverseUp(node) {
        if (this.edges.get(node).length) {
            for (const childNode of this.edges.get(node)) {
                this.traverseUp(childNode);
            }
        } else {
            this.outerEdges.add(node);
        }
    }
}

function part1() {
    const graph = new Graph();
    for (let rule of input) {
        rule[0] = rule[0].endsWith('s') ? rule[0].slice(0, -1) : rule[0];
        if (!graph.edges.has(rule[0])) {
            graph.addNode(rule[0]);
        }
        const contains = rule[1].split(', ')
            .map(e => e.slice(2))
            .map(e => e.endsWith('s') ? e.slice(0, -1) : e);
        for (const bag of contains) {
            if (bag === ' other bag') {
                continue;
            }
            if (!graph.edges.has(bag)) {
                graph.addNode(bag);
            }
            graph.addEdge(rule[0], bag);
        }
    }
    graph.traverseUp('shiny gold bag');

    return graph.outerEdges.size;
}

function part2() {
    return;
}

console.log('The answer to day 7 part 1 is:', part1());
console.log('The answer to day 7 part 2 is:', part2());
