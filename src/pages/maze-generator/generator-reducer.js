import { useEffect, useReducer } from 'react'
import { dfs, generateGrid } from './generator'
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

  useEffect(() => {
    dispatch({ type: 'UPDATE_GRAPH', payload: graphState })
    dispatch({ type: 'dfs' })
  }, [graphState])

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
      return { ...state, dfs: Object.getOwnPropertyNames(state.graph.state).length ? dfs(state.grid[0][0].index, state.graph.state) : 'not yet' }
    case 'UPDATE_GRAPH':
      return { ...state, graph: { ...state.graph, state: action.payload } }
    default:
      throw new Error()
  }
}
