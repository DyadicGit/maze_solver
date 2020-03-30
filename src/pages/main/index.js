import React, { useEffect } from "react"
import { WeightedGraph } from "../../lib/graph"
import { mazeData } from "./maze-data"
import mazeSample from "../../assets/maze-sample.png"
import "./main.scss"

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

const MainPage = () => {
  useEffect(() => {
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
      return edgeData;
    })
    edges.forEach(edge => {
      if (edge) graph.addEdge(edge.from, edge.to, edge.weight)
    })
    const path = graph.shortestPath(1, 4)
    global.getPath = (from, to) => graph.shortestPath(from, to)
    console.log({ graph, path, maze: mazeData })
  }, [])

  return (
    <main className="maze-page">
      <h1>Maze solver</h1>
      <img alt="maze sample" src={mazeSample} />
      {maze}
    </main>
  )
}

export default MainPage
