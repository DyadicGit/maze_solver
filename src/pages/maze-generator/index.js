import React, { useState } from 'react'
import { MazeGenerator } from './generator'
import '../maze-styles.scss'
import { TYPES, useMazeGeneratorReducer } from './generator-reducer'

const MazeGeneratorPage = () => {
  const generateMaze = () => {
    const generator = new MazeGenerator(5, 5)
    generator.initialize()
    const dfs = generator.dfs()
    console.log({ dfs })
  }
  const [state, dispatch] = useMazeGeneratorReducer(5, 5)
  const generateMazeReducer = () => {
    dispatch({ type: TYPES.INITIALIZE })
  }

  return (
    <main className="maze-page">
      <h2>Maze generator</h2>
      <button type="button" title="test" onClick={generateMaze}>
        generate maze
      </button>
      <button type="button" title="test" onClick={generateMazeReducer}>
        generate maze REDUX
      </button>
      <button type="button" title="test" onClick={() => console.log({state})}>
        LOG
      </button>
      <p>DFS: {Array.isArray(state.dfs) ? state.dfs.join(' -> ') : state.dfs}</p>
    </main>
  )
}

export default MazeGeneratorPage
