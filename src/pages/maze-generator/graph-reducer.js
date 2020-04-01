import { useReducer } from 'react'

export const useGraphReducer = () => {
  const initialState = {}
  const initializer = initState => (initState)
  const [state, dispatch] = useReducer(reducer, initialState, initializer)
  return [state, dispatch]
}
export const TYPES = {
  ADD_VERTEX: 'addVertex',
  ADD_EDGE: 'addEdge'
}

function reducer(state, action) {
  switch (action.type) {
    case TYPES.ADD_VERTEX:
      const vertex = action.payload
      if (!state[vertex]) return { ...state, [vertex]: [] }
      return state
    case TYPES.ADD_EDGE:
      const { vertex1, vertex2, weight = 1 } = action.payload
      return {
        ...state,
        [vertex1.index]: [...state[vertex1.index], new Node(vertex2.index, vertex2, weight)],
        [vertex2.index]: [...state[vertex2.index], new Node(vertex1.index, vertex1, weight)]
      }
    default:
      throw new Error()
  }
}

export class Node {
  constructor(index, point, weight) {
    this.index = index;
    this.point = point;
    this.weight = weight;
  }
}
