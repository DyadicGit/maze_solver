import React, { useState } from 'react'
import '../maze-styles.scss'
import { MazeGenerator } from "./generator";

const MazeGeneratorPage = () => {
  const [generator, setGenerator] = useState();
  const [maze, setMaze] = useState();
  const generateMaze = (grid, size) => (
    <div className={`maze size${size}`}>
      {grid.flatMap(row => row.map(point => <div key={point.index} className={point.walls.join(' ')}>{point.name}</div>))}
    </div>
  )
  const generateData = () => {
    const generator = new MazeGenerator(10, 10)
    generator.initialize()
    generator.dfs()
    setGenerator(generator)
    setMaze(generateMaze(generator.grid, 10))
  }
  const removeWalls = () => {
    generator.removeWalls()
    setGenerator(generator)
    setMaze(generateMaze(generator.grid, 10))
  }
  return (
    <main className="maze-page">
      <h2>Maze generator</h2>
      <button type="button" title="generate Native" onClick={generateData}>generate data</button>
      <button type="button" title="remove walls" onClick={removeWalls}>remove walls</button>
      <button type="button" title="log" onClick={() => console.log(generator)}>LOG</button>
      {maze}
    </main>
  )
}

export default MazeGeneratorPage
