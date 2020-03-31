function Maze2(w, h) {
  this.w =  w
  this.h = h
  this.grid = new Array(h).fill( new Array(w).fill({ n: 0, s: 0, e: 0, w: 0, v: 0 }) )
  this.dirs = ["n", "s", "e", "w"]
  this.modDir = {
    n: { y: -1, x: 0, o: "s" },
    s: { y: 1, x: 0, o: "n" },
    e: { y: 0, x: -1, o: "w" },
    w: { y: 0, x: 1, o: "e" },
  }

  this.build(0, 0)
}
Maze2.prototype.build = function(x = 0, y = 0) {
  this.carvePassage(x, y, this.grid)
}

Maze2.prototype.carvePassage = function(cx, cy, grid) {
  const dirs = sortRand(this.dirs)

  for (const dir of dirs) {
    const nx = cx + this.modDir[dir].x;
    const ny = cy + this.modDir[dir].y;

    if (
      nx >= 0 && nx < this.w &&
      ny >= 0 && ny < this.h
      && grid[ny][nx].v === 0
    ) {
      grid[cx][cx][dir] = 1
      grid[cx][cx].v = 1
      grid[ny][nx][this.modDir[dir].o] = 1

      this.carvePassage(nx, ny, grid)
    }
  }
}

function sortRand(inputArray) {
  const array = [...inputArray]
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (array.length * 1000)) % array.length;
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

export { Maze2 }
