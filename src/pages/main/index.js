import React, { useEffect, useState } from "react"
import { WeightedGraph } from "../../lib/graph"
import { mazeData } from "./maze-data"
import mazeSample from "../../assets/maze-sample.png"
import "./main.scss"
import { MazeGenerator } from "./generator"

const maze = (
  <div className="maze">
    {mazeData.points.map((point, i) => {
      return (
        <div className={point.walls.join(" ")} key={i + 1}>
          {point.name}
        </div>
      )
    })}
  </div>
)

const go = direction =>
  ({
    top: point =>
      point.getRow() - 1 > 1 ? point.index - mazeData.rows : null,
    bottom: point =>
      point.getRow() + 1 <= mazeData.rows ? point.index + mazeData.rows : null,
    right: point =>
      point.getColumn() + 1 <= mazeData.columns ? point.index + 1 : null,
    left: point =>
      point.getColumn() - 1 > 1 ? point.index - 1 : null,
  }[direction])

const whereToGo = walls => {
  const paths = {
    top: true,
    bottom: true,
    right: true,
    left: true,
  }
  walls.forEach(wall => (paths[wall] = false))
  const validKeys = ["top", "bottom", "right", "left"]
  return validKeys.filter(path => paths[path])
}

const FromToInput = sendCoordinates => {
  const [from, setFrom] = useState(1)
  const [to, setTo] = useState(1)
  return (
    <div>
      <input
        type="number"
        onChange={e => setFrom(e.target.value)}
        name="from"
        title="from"
      />
      <input
        type="number"
        onChange={e => setTo(e.target.value)}
        name="to"
        title="to"
      />
      <button type="button" onClick={() => sendCoordinates(from, to)}>
        Go
      </button>
    </div>
  )
}
const populateGraph = () => {
  const graph = new WeightedGraph()
  mazeData.points.flatMap(point => graph.addVertex(point.name))
  const edges = mazeData.points.flatMap(point => {
    const freePaths = whereToGo(point.walls)
    const edgeData = freePaths.map(path => {
      const goToIndex = go(path)(point) - 1
      const nextPoint = mazeData.points[goToIndex]
      return nextPoint
        ? { from: point.name, to: nextPoint.name, weight: point.weight }
        : undefined
    })
    return edgeData
  })
  edges.forEach(edge => {
    if (edge) graph.addEdge(edge.from, edge.to, edge.weight)
  })
  global.graph = graph
  console.log({ graph, maze: mazeData })
}

const MainPage = () => {
  useEffect(populateGraph, [])

  const [printPath, setPrint] = useState()
  const getPath = (from, to) => {
    const path = global.graph.shortestPath(from, to)
    setPrint(path)
  }
  const [generatedMaze, setGenMaze] = useState()
  const generateMaze = () => {
    const generator = new MazeGenerator(5, 5)
    generator.initialize()
  }
  return (
    <main className="maze-page">
      <h1>Maze solver</h1>
      <h2>Example</h2>
      <img alt="maze sample" src={mazeSample} />
      {maze}
      {FromToInput(getPath)}
      <pre>{printPath}</pre>
      <h2>Maze generator</h2>
      <button type="button" title="test" onClick={() => generateMaze()}>
        generate maze
      </button>
      {generatedMaze}
    </main>
  )
}

export default MainPage
