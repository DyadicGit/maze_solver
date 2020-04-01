import React, { useState } from 'react'
import { MazeGenerator } from './generator'
import '../maze-styles.scss'

const MazeGeneratorPage = () => {
  const [generatedMaze, setGenMaze] = useState()
  const generateMaze = () => {
    const generator = new MazeGenerator(5, 5)
    generator.initialize()
    const dfs = generator.dfs()
    console.log({ dfs })
  }

  return (
    <main className="maze-page">
      <h2>Maze generator</h2>
      <button type="button" title="test" onClick={generateMaze}>
        generate maze
      </button>
      {generatedMaze}
    </main>
  )
}

export default MazeGeneratorPage
