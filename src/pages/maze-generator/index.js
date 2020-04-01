import React, { useState } from 'react'
import { MazeGenerator } from './generator'
import '../maze-styles.scss'
import { useMazeGeneratorReducer, TYPES } from './generator-reducer'
import { useGraphReducer } from "./graph-reducer";

const MazeGeneratorPage = () => {
  const [generatedMaze, setGenMaze] = useState()
  const generateMaze = () => {
    const generator = new MazeGenerator(5, 5)
    generator.initialize()
    const dfs = generator.dfs()
    console.log({ dfs })
  }
  const [state, dispatch] = useMazeGeneratorReducer(5, 5)

  const generateMazeReducer = () => {
    console.log(1, {state})
    dispatch({ type: TYPES.INITIALIZE })
    console.log(2, {state})
    // dispatch({ type: TYPES.DFS })
    console.log(3, {state})
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
      <button type="button" title="test" onClick={() => console.log({state, gState})}>
        LOG
      </button>
      {generatedMaze}
    </main>
  )
}

export default MazeGeneratorPage
