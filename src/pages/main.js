import React from "react"
import mazeSample from "../assets/maze-sample.png"
import "./main.scss"

const MainPage = () => {
  return (
    <main className="maze-page">
      <h1>Maze solver</h1>
      <img alt="maze sample" src={mazeSample} />
    </main>
  )
}

export default MainPage
