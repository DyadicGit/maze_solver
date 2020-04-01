import { useEffect, useReducer } from 'react'
import { dfs, generateGrid } from './generator'
import { TYPES as GTYPES, useGraphReducer } from './graph-reducer'
import { sortRand } from './maze-generator'
import { getColumn, getRow } from '../maze-solver-example/maze-data'

export const useMazeGeneratorReducer = (width = 5, height = 5) => {
  const [graphState, graphDispatch] = useGraphReducer()
  const initialState = {
    graph: { state: graphState, dispatch: graphDispatch },
    grid: generateGrid(width, height),
    width: width,
    height: height,
    dfs: ''
  }
  const initializer = initState => initState
  const [state, dispatch] = useReducer(reducer, initialState, initializer)

  useEffect(() => {
    dispatch({ type: TYPES.UPDATE_GRAPH, payload: graphState })
    dispatch({ type: TYPES.DFS })
  }, [graphState])

  return [state, dispatch]
}
export const TYPES = {
  INITIALIZE_GRAPH: 'INITIALIZE_GRAPH',
  UPDATE_GRAPH: 'UPDATE_GRAPH',
  DFS: 'DFS',
  REMOVE_WALLS: 'REMOVE_WALLS'
}

function reducer(state, action) {
  switch (action.type) {
    case TYPES.INITIALIZE_GRAPH:
      state.grid.flat().forEach(vertex => state.graph.dispatch({ type: GTYPES.ADD_VERTEX, payload: vertex.index }))

      state.grid.forEach((row, rIndex) => {
        row.forEach((point, cIndex) => {
          const nextColumn = cIndex + 1 < state.width && state.grid[rIndex][cIndex + 1],
            nextRow = rIndex + 1 < state.height && state.grid[rIndex + 1][cIndex]

          if (nextColumn) state.graph.dispatch({ type: GTYPES.ADD_EDGE, payload: { vertex1: point, vertex2: nextColumn, weight: point.weight } })
          if (nextRow) state.graph.dispatch({ type: GTYPES.ADD_EDGE, payload: { vertex1: point, vertex2: nextRow, weight: point.weight } })
        })
      })

      return state
    case TYPES.DFS:
      return { ...state, dfs: Object.getOwnPropertyNames(state.graph.state).length ? dfs(state.grid[0][0].index, state.graph.state) : 'not yet' }
    case TYPES.UPDATE_GRAPH:
      return { ...state, graph: { ...state.graph, state: action.payload } }
    case TYPES.REMOVE_WALLS:
      const dfsGenerator = (start, adjacencyList) => {
        const stack = [start]
        const path = []
        const visited = {}
        const newPoints = {}
        let currentVertex

        visited[start] = true
        while (stack.length) {
          currentVertex = stack.pop()
          path.push(currentVertex)

          const neighbors = adjacencyList[currentVertex]
          sortRand(neighbors).forEach(neighbor => {
            if (!visited[neighbor.index]) {
              visited[neighbor.index] = true
              const wallToRemove = whereAreYouFrom(currentVertex, neighbor.index)
              const newWalls = neighbor.point.walls.filter(s => s !== wallToRemove)
              const oldWalls = state.grid[getRow(currentVertex) -1][getColumn(currentVertex) - 1].walls.filter(s => s !== oppositeWall[wallToRemove])
              newPoints[currentVertex] = new ModifiedPoint(currentVertex, oldWalls)
              newPoints[neighbor.index] = new ModifiedPoint(neighbor.index, newWalls)

              stack.push(neighbor.index)
            }
          })
        }
        return { newPath: path, newPoints }
      }
      const result = dfsGenerator(state.grid[0][0].index, state.graph.state)
      return { ...state, ...result }
    default:
      throw new Error()
  }
}
const whereAreYouFrom = (previousIdx, currentIdx) => {
  const pRow = getRow(previousIdx), cRow = getRow(currentIdx),
    pColumn = getColumn(previousIdx), cColumn = getColumn(currentIdx)
  if (pColumn < cColumn) return 'left'
  if (pColumn > cColumn) return 'right'
  if (pRow < cRow) return 'top'
  if (pRow > cRow) return 'bottom'
}
const oppositeWall = {
  left: 'right',
  right: 'left',
  top: 'bottom',
  bottom: 'top'
}
class ModifiedPoint {
  constructor(index, walls) {
    this.index = index
    this.walls = walls
  }
}
