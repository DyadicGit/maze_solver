import { Cell, getColumn, getRow, WeightedGraph } from '../../lib/graph'

export const generateGrid = (width, height) => {
  return new Array(height).fill(null).map((_, i) =>
    new Array(width).fill(null).map((_, j) => {
      const index = i * width + (j + 1)
      return new Cell(index, index)
    })
  )
}

export class MazeGenerator {
  constructor(width = 5, height = 5) {
    this.graph = new WeightedGraph()
    this.grid = generateGrid(width, height)
    this.width = width
    this.height = height
  }
  initialize() {
    this.grid.flat().forEach(vertex => this.graph.addVertex(vertex))
    this.grid.forEach((row, rIndex) => {
      row.forEach((column, cIndex) => {
        const nextColumn = cIndex + 1 < this.width && this.grid[rIndex][cIndex + 1],
          nextRow = rIndex + 1 < this.height && this.grid[rIndex + 1][cIndex]

        if (nextColumn) this.graph.addEdge(column, nextColumn, 1)
        if (nextRow) this.graph.addEdge(column, nextRow, 1)
      })
    })
  }
  dfs() {
    this.dfsResult = dfs(this.grid[0][0].index, this.graph.adjacencyList)
  }
  removeWalls() {
    const removeWalls = (current, next) => {
      const wallToRemove = whereAreYouFrom(current.index, next.index, this.width)
      delete next.vertex.walls[indexByWall[wallToRemove]]
      if (current.constructor.name === 'Cell' || current.constructor.name === 'Vertex') {
        delete current.walls[indexByWall[oppositeWall[wallToRemove]]]
      }
      if (current.constructor.name === 'Edge') {
        delete current.vertex.walls[indexByWall[oppositeWall[wallToRemove]]]
      }
    }
    const dfsGenerator = start => {
      const stack = [start]
      const path = []
      const visited = {}
      let currentVertex

      visited[start] = true
      while (stack.length) {
        currentVertex = stack.pop()
        path.push(currentVertex.index)

        const edges = this.graph.adjacencyList[currentVertex.index]
        // eslint-disable-next-line no-loop-func
        sortRand(edges).forEach(edge => {
          if (!visited[edge.index]) {
            visited[edge.index] = true
            removeWalls(currentVertex, edge)
            stack.push(edge)
          }
        })
      }
      return path
    }
    this.dfsRandom = dfsGenerator(this.grid[0][0])
  }
}
const indexByWall = {
  top: 0,
  right: 1,
  bottom: 2,
  left: 3
}
export const whereAreYouFrom = (previousIdx, currentIdx, gridSize) => {
  const pRow = getRow(previousIdx, gridSize), cRow = getRow(currentIdx, gridSize),
    pColumn = getColumn(previousIdx, gridSize), cColumn = getColumn(currentIdx, gridSize)
  if (pColumn < cColumn) return 'left'
  if (pColumn > cColumn) return 'right'
  if (pRow < cRow) return 'top'
  if (pRow > cRow) return 'bottom'
}
export const oppositeWall = {
  left: 'right',
  right: 'left',
  top: 'bottom',
  bottom: 'top'
}

export const dfs = (start, adjacencyList) => {
  const stack = [start]
  const result = []
  const visited = {}
  let currentVertex

  visited[start] = true
  while (stack.length) {
    currentVertex = stack.pop()
    result.push(currentVertex)
    adjacencyList[currentVertex].forEach(edge => {
      if (!visited[edge.index]) {
        visited[edge.index] = true
        stack.push(edge.index)
      }
    })
  }
  return result
}

function sortRand(inputArray) {
  const array = [...inputArray]
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (array.length * 1000)) % array.length;
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}
