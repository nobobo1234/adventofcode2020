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
        this.lastEdge = [];
        this.total = 0;
    }

    addNode(name) {
        this.nodes.push(name);
        this.edges.set(name, []);
    }

    addEdge(node1, node2, number) {
        this.edges.get(node2).push([node1, number]);
    }

    traverseUp(node) {
        if (this.edges.get(node).length) {
            for (const parentNode of this.edges.get(node)) {
                this.outerEdges.add(parentNode[0]);
                this.traverseUp(parentNode[0]);
            }
        } else {
            this.outerEdges.add(node);
        }
    }

    traverseUntilGold(node, depth, total) {
        if (node !== 'shiny gold bag') {
            for (const parentNode of this.edges.get(node)) {
                this.traverseUntilGold(parentNode[0], depth + 1, total.set(depth, [node, parentNode[1]]));
            }
        } else {
            const allValues = [...total.values()].reverse();
            console.log(allValues);
            while (allValues.length) {
                if (allValues.length === 1) {
                    this.lastEdge.push(allValues[0]);
                }
                this.total += allValues.reduce((prev, acc) => prev * acc[1], 1);
                allValues.shift();
            }
        }
    }
}

const graph = new Graph();
let containsNoOtherBag = [];

function part1() {
    for (let rule of input) {
        rule[0] = rule[0].endsWith('s') ? rule[0].slice(0, -1) : rule[0];
        if (!graph.edges.has(rule[0])) {
            graph.addNode(rule[0]);
        }
        const contains = rule[1].split(', ')
            .map(e => e.endsWith('s') ? e.slice(0, -1) : e);
        for (const bag of contains) {
            const bagName = bag.slice(2);
            const bagNumber = Number(bag.slice(0, 1));
            if (bagName === ' other bag') {
                containsNoOtherBag.push(rule[0]);
            }
            if (!graph.edges.has(bagName)) {
                graph.addNode(bagName);

            }
            graph.addEdge(rule[0], bagName, bagNumber);
        }
    }
    graph.traverseUp('shiny gold bag');

    return graph.outerEdges.size;
}

function part2() {
    for (const specialBag of containsNoOtherBag) {
        graph.traverseUntilGold(specialBag, 1, new Map())
    }
    return graph.total;
}

console.log('The answer to day 7 part 1 is:', part1());
console.log('The answer to day 7 part 2 is:', part2());
