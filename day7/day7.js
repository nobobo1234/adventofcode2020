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
        this.edgesDown = new Map();
        this.total = 0;
    }

    addNode(name) {
        this.nodes.push(name);
        this.edges.set(name, []);
        this.edgesDown.set(name, []);
    }

    addEdge(node1, node2, number) {
        this.edges.get(node2).push([node1, number]);
        this.edgesDown.get(node1).push([node2, number]);
    }

    traverseUp(node) {
        if (this.edges.get(node[0]).length) {
            for (const parentNode of this.edges.get(node[0])) {
                this.outerEdges.add(parentNode[0]);
                this.traverseUp(parentNode);
            }
        } else {
            this.outerEdges.add(node[0]);
        }
    }

    traverseUntilGold(node) {
        if (this.edgesDown.get(node[0])[0][0] !== ' other bag') {
            this.total += node[1] * this.edgesDown.get(node[0]).reduce((acc, curr) => acc + curr[1], 0);
            for (const childNode of this.edgesDown.get(node[0])) {
                this.traverseUntilGold(childNode);
            }
        }
    }

    getSumofChildren(node, sum = 0) {
        if (this.edgesDown.get(node[0])[0][0] !== ' other bag') {
            for (const childNode of this.edgesDown.get(node[0])) {
                return this.getSumofChildren(childNode, sum + this.edgesDown.get(node[0]).reduce((acc, curr) => acc + curr[1], 0));
            }
        } else {
            return sum;
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
    graph.traverseUp(['shiny gold bag', 1]);

    return graph.outerEdges.size;
}

function part2() {
    const depths = new Map();
    graph.traverseUntilGold(['shiny gold bag', 1])

    return graph.total;
}

console.log('The answer to day 7 part 1 is:', part1());
console.log('The answer to day 7 part 2 is:', part2());
