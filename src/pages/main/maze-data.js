const getColumn = index => index % mazeData.columns || mazeData.columns
const getRow = index => Math.ceil(index / mazeData.rows)

export class Point {
  constructor(index, name, walls, weight = 1) {
    this.name = name;
    this.walls = walls;
    this.index = index;
    this.weight = weight;
  }
  getRow = () => getRow(this.index)
  getColumn = () => getColumn(this.index)
}

export const mazeData = {
  columns: 5,
  rows: 5,
  points: [
    new Point(1,  1, ['top', '', '', 'left']),
    new Point(2,  2, ['top', '', 'bottom', '']),
    new Point(3,  3, ['top', '', 'bottom', '']),
    new Point(4,  4, ['', 'right', 'bottom', '']),
    new Point(5,  5, ['top', 'right', '', 'left']),
    new Point(6,  6, ['', 'right', '', 'left']),
    new Point(7,  7, ['top', '', '', 'left']),
    new Point(8,  8, ['top', '', 'bottom', '']),
    new Point(9,  9, ['top', '', 'bottom', '']),
    new Point(10, 10, ['', 'right', 'bottom', '']),
    new Point(11, 11, ['', '', '', 'left']),
    new Point(12, 12, ['', '', 'bottom', '']),
    new Point(13, 13, ['top', '', 'bottom', '']),
    new Point(14, 14, ['top', '', '', '']),
    new Point(15, 15, ['top', 'right', 'bottom', '']),
    new Point(16, 16, ['', '', '', 'left']),
    new Point(17, 17, ['top', '', 'bottom', '']),
    new Point(18, 18, ['top', 'right', '', '']),
    new Point(19, 19, ['', '', '', 'left']),
    new Point(20, 20, ['top', 'right', '', '']),
    new Point(21, 21, ['', 'right', 'bottom', 'left']),
    new Point(22, 22, ['top', '', '', 'left']),
    new Point(23, 23, ['', 'right', 'bottom', '']),
    new Point(24, 24, ['', 'right', 'bottom', 'left']),
    new Point(25, 25, ['', 'right', 'bottom', 'left']),
  ]
}
