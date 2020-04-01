import React from 'react'
import '../maze-styles.scss'
import { TYPES, useMazeGeneratorReducer } from './generator-reducer'

const MazeGeneratorPage = () => {
  const [state, dispatch] = useMazeGeneratorReducer(5, 5)
  const maze = (
    <div className="maze">
      {state.grid.flatMap(row => row.map(point => <div key={point.index} className={point.walls.join(' ')}>{point.name}</div>))}
    </div>
  )

  return (
    <main className="maze-page">
      <h2>Maze generator</h2>
      <button type="button" title="initialize" onClick={() => dispatch({ type: TYPES.INITIALIZE_GRAPH })}>initialize</button>
      <button type="button" title="remove_walls" onClick={() => dispatch({ type: TYPES.REMOVE_WALLS })}>remove walls</button>
      <button type="button" title="log" onClick={() => console.log({state})}>LOG</button>
      <p>DFS: {Array.isArray(state.dfs) ? state.dfs.join(' -> ') : state.dfs}</p>
      {maze}
    </main>
  )
}

export default MazeGeneratorPage
