import { useReducer } from 'react'
import { generateGrid } from './generator'
import { TYPES as GTYPES, useGraphReducer } from './graph-reducer'

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
  return [state, dispatch]
}
export const TYPES = {
  INITIALIZE: 'initialize',
  DFS: 'dfs'
}

function reducer(state, action) {
  switch (action.type) {
    case TYPES.INITIALIZE:
      state.grid.flat().forEach(vertex => state.graph.dispatch({ type: GTYPES.ADD_VERTEX, payload: vertex.index }))

      state.grid.forEach((row, rIndex) => {
        row.forEach((column, cIndex) => {
          const nextColumn = cIndex + 1 < state.width && state.grid[rIndex][cIndex + 1],
            nextRow = rIndex + 1 < state.height && state.grid[rIndex + 1][cIndex]

          if (nextColumn) state.graph.dispatch({ type: GTYPES.ADD_EDGE, payload: { vertex1: column.index, vertex2: nextColumn.index, weight: column.weight } })
          if (nextRow) state.graph.dispatch({ type: GTYPES.ADD_EDGE, payload: { vertex1: column.index, vertex2: nextRow.index, weight: column.weight } })
        })
      })

      return state
    case TYPES.DFS:
      function dfs(start = state.grid[0][0].index) {
        const stack = [start]
        const result = []
        const visited = {}
        let currentVertex

        visited[start] = true
        while (stack.length) {
          currentVertex = stack.pop()
          result.push(currentVertex)

          state.graph.state[currentVertex].forEach(neighbor => {
            if (!visited[neighbor.node]) {
              visited[neighbor.node] = true
              stack.push(neighbor.node)
            }
          })
        }
        return result
      }
      return {...state, dfs: dfs()}
    default:
      throw new Error()
  }
}
