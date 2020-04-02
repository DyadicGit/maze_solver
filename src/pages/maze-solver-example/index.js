import React, { useEffect, useState } from 'react'
import { WeightedGraph } from '../../lib/graph'
import { mazeData } from './maze-data'
import mazeSample from '../../assets/maze-sample.png'
import '../maze-styles.scss'

const maze = (
  <div className="maze">
    {mazeData.points.map((point) =>
      (
        <div className={point.walls.join(' ')} key={point.index}>
          {point.name}
        </div>
      ))}
  </div>
)

const go = direction =>
  ({
    top: cell => (cell.getRow(mazeData.rows) - 1 > 1 ? cell.index - mazeData.rows : null),
    bottom: cell => (cell.getRow(mazeData.rows) + 1 <= mazeData.rows ? cell.index + mazeData.rows : null),
    right: cell => (cell.getColumn(mazeData.columns) + 1 <= mazeData.columns ? cell.index + 1 : null),
    left: cell => (cell.getColumn(mazeData.columns) - 1 > 1 ? cell.index - 1 : null),
  }[direction])

const whereToGo = walls => {
  const paths = {
    top: true,
    bottom: true,
    right: true,
    left: true,
  }
  walls.forEach(wall => (paths[wall] = false))
  const validKeys = ['top', 'bottom', 'right', 'left']
  return validKeys.filter(path => paths[path])
}

const FromToInput = sendCoordinates => {
  const [from, setFrom] = useState(1)
  const [to, setTo] = useState(1)
  return (
    <div>
      <input type="number" onChange={e => setFrom(e.target.value)} name="from" title="from" />
      <input type="number" onChange={e => setTo(e.target.value)} name="to" title="to" />
      <button type="button" onClick={() => sendCoordinates(from, to)}>
        Go
      </button>
    </div>
  )
}
const populateGraph = () => {
  const graph = new WeightedGraph()
  mazeData.points.flatMap(point => graph.addVertex(point))
  const edges = mazeData.points.flatMap(point => {
    const freePaths = whereToGo(point.walls)
    const edgeData = freePaths.map(path => {
      const goToIndex = go(path)(point) - 1
      const nextPoint = mazeData.points[goToIndex]
      return nextPoint ? { from: point, to: nextPoint } : undefined
    })
    return edgeData
  })
  edges.forEach(edge => {
    if (edge) graph.addEdge(edge.from, edge.to, 1)
  })
  global.graph = graph
  console.log({ graph, maze: mazeData })
}

const MazeSolverExamplePage = () => {
  useEffect(populateGraph, [])

  const [print, setPrint] = useState()
  const getPath = (from, to) => {
    const path = global.graph.shortestPath(from, to)
    setPrint(path)
  }

  return (
    <main className="maze-page">
      <h1>Maze solver</h1>
      <h2>Example</h2>
      <img alt="maze sample" src={mazeSample} />
      {maze}
      {FromToInput(getPath)}
      <pre>{print}</pre>
    </main>
  )
}

export default MazeSolverExamplePage
