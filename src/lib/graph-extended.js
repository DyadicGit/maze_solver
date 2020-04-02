import { PriorityQueue } from './queue.js'
import { getColumn, getRow } from '../pages/maze-solver-example/maze-data'

export class Edge {
  constructor(vertex, weight) {
    this.index = vertex.index
    this.weight = weight
    this.vertex = vertex
  }
}
const defaultWalls = ['top', 'right', 'bottom', 'left']

export class Vertex {
  constructor(index, name) {
    this.index = index
    this.name = name
  }
}

export class Cell extends Vertex {
  constructor(index, name, walls = [...defaultWalls]) {
    super(index, name)
    this.walls = walls;
  }
  getRow = (gridSize) => getRow(this.index, gridSize)
  getColumn = (gridSize) => getColumn(this.index, gridSize)
}

class WeightedGraph {
  constructor(adjacencyList = {}) {
    this.adjacencyList = adjacencyList
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex.index]) this.adjacencyList[vertex.index] = []
  }
  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1.index].push(new Edge(vertex2, weight))
    this.adjacencyList[vertex2.index].push(new Edge(vertex1, weight))
  }
  shortestPath(start, finish) {
    const priorityQ = new PriorityQueue()
    const distances = {}
    const road = {}
    let path = [] //to return at end

    //build up initial state
    for (const vertex in this.adjacencyList) {
      if (vertex.index === start) {
        distances[vertex.index] = 0
        priorityQ.enqueue(vertex.index, 0)
      } else {
        distances[vertex.index] = Infinity
        priorityQ.enqueue(vertex.index, Infinity)
      }
      road[vertex.index] = null
    }

    let smallest
    while (priorityQ.values.length) {
      smallest = priorityQ.dequeue().val

      if (smallest === finish) {
        //end of loop
        while (road[smallest]) {
          path.push(smallest)
          smallest = road[smallest]
        }
        break
      }

      // start
      if (smallest || distances[smallest] !== Infinity) {
        for (const { weight: edgeWeight, index: edge } of this.adjacencyList[smallest]) {
          const candidate = distances[smallest] + edgeWeight
          if (candidate < distances[edge]) {
            distances[edge] = candidate
            road[edge] = smallest
            priorityQ.enqueue(edge, candidate)
          }
        }
      }
    }

    return [...path, smallest].reverse().reduce((acc, v) => acc + ' -> ' + v)
  }
}

export { WeightedGraph as ExtendedGraph }
