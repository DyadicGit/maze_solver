import React from 'react'
import { useRoutes, A } from 'hookrouter'
import MazeSolverExamplePage from './pages/maze-solver-example'
import MazeGeneratorPage from './pages/maze-generator'

const page404 = (<main><h1>page not found</h1></main>)

const navBar = (
  <nav>
    <A href="/">Maze generator</A>
    <A href="/example">Example</A>
  </nav>
)

const routes = {
  '/': () => <MazeGeneratorPage />,
  '/example': () => <MazeSolverExamplePage />,
}

const App = () => {
  const page = useRoutes(routes)
  return (
    <>
      {navBar}
      <React.StrictMode>{page || page404}</React.StrictMode>
    </>
  )
}

export default App
