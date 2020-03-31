import { Point } from "./maze-data"
import { WeightedGraph } from "../../lib/graph";

const generateGrid = (width, height) => {
  return new Array(height)
    .fill(null)
    .map((_, i) =>
      new Array(width).fill(null)
        .map((_, j) => {
          const index = (i*5) + (j+1)
          return new Point(index, index, ['top', 'right', 'bottom', 'left'], 1);
        })
    )
}

export class MazeGenerator {
  constructor(width = 5, height = 5) {
    this.graph = new WeightedGraph();
    this.grid = generateGrid(width,height)
    this.width = width;
    this.height = height;
  }
  initialize(){
    this.grid.flat().forEach(vertex => this.graph.addVertex(vertex.index))
    this.grid.forEach((row, rIndex) => {
      row.forEach((column,cIndex ) => {
        const nextColumn = cIndex+1 < this.width && this.grid[rIndex][cIndex+1],
              nextRow = rIndex+1 < this.height && this.grid[rIndex+1][cIndex];

        if (nextColumn) this.graph.addEdge(column.index, nextColumn.index, column.weight)
        if (nextRow) this.graph.addEdge(column.index, nextRow.index, column.weight)
      })
    })
  }
  initializeDirectly() {
    this.grid.flat().forEach(vertex => this.graph.addVertex(vertex.index))
    this.grid.forEach((row, rIndex) => {
      row.forEach((column,cIndex ) => {
        const nextColumn = cIndex+1 < this.width && this.grid[rIndex][cIndex+1],
          nextRow = rIndex+1 < this.height && this.grid[rIndex+1][cIndex];

        if (nextColumn) this.graph.adjacencyList[column.index].push({node: nextColumn.index, weight: column.weight})
        if (nextRow) this.graph.adjacencyList[column.index].push({node: nextRow.index, weight: column.weight})
      })
    })
  }
  dfs(start = this.grid[0][0].index){
    const stack = [start];
    const result = [];
    const visited = {};
    let currentVertex;

    visited[start] = true;
    while(stack.length){
      currentVertex = stack.pop();
      result.push(currentVertex);

      this.graph.adjacencyList[currentVertex].forEach(neighbor => {
        if(!visited[neighbor.node]){
          visited[neighbor.node] = true;
          stack.push(neighbor.node)
        }
      });
    }
    return result;
  }
}
