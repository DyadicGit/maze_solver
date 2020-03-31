function Maze(w, h) {
  const defaultSize = 20;
  this.w = (isNaN(w) || w < 5 || w > 999) ? defaultSize : w
  this.h = (isNaN(h) || h < 5 || h > 999) ? defaultSize : h
  this.map = new Array(h).fill( new Array(w).fill({ n: 0, s: 0, e: 0, w: 0, v: 0 }) )
  this.dirs = ["n", "s", "e", "w"]
  this.modDir = {
    n: { y: -1, x: 0, o: "s" },
    s: { y: 1, x: 0, o: "n" },
    e: { y: 0, x: -1, o: "w" },
    w: { y: 0, x: 1, o: "e" },
  }

  this.build(0, 0)
}
Maze.prototype.toGrid = function() {
  const grid = new Array(this.h * 2 + 1).fill( new Array(this.h * 2 + 1).fill(0) );

  for (let y = 0; y < this.h; ++y) {
    const py = y * 2 + 1;

    for (let x = 0; x < this.w; ++x) {
      const px = x * 2 + 1;

      if (this.map[y][x].v === 1) {
        grid[py][px] = 1
      }

      for (const dir of this.dirs) {
        if (this.map[y][x][dir] === 1) {
          grid[py + this.modDir[dir].y][px + this.modDir[dir].x] = 1
        }
      }
    }
  }
  this.gridMap = grid
  this.gridW = grid.length
  this.gridH = grid[0].length
}
Maze.prototype.build = function(x = 0, y = 0) {
  this.explore(x, y)
  this.toGrid()
}
Maze.prototype.explore = function(ex, ey) {
  this.dirs = sortRand(this.dirs)

  for (const dir of this.dirs) {
    const nx = ex + this.modDir[dir].x;
    const ny = ey + this.modDir[dir].y;

    if (
      nx >= 0 && nx < this.w &&
      ny >= 0 && ny < this.h
      && this.map[ny][nx].v === 0
    ) {
      this.map[ey][ex][dir] = 1
      this.map[ey][ex].v = 1
      this.map[ny][nx][this.modDir[dir].o] = 1

      this.explore(nx, ny)
    }
  }
}

function sortRand(inputArray) {
  const array = [...inputArray]
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

export { Maze }
