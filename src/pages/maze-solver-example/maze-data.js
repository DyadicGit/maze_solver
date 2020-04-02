import { Cell } from "../../lib/graph";

export const mazeData = {
  columns: 5,
  rows: 5,
  points: [
    new Cell(1,  1, ['top', '', '', 'left']),
    new Cell(2,  2, ['top', '', 'bottom', '']),
    new Cell(3,  3, ['top', '', 'bottom', '']),
    new Cell(4,  4, ['', 'right', 'bottom', '']),
    new Cell(5,  5, ['top', 'right', '', 'left']),
    new Cell(6,  6, ['', 'right', '', 'left']),
    new Cell(7,  7, ['top', '', '', 'left']),
    new Cell(8,  8, ['top', '', 'bottom', '']),
    new Cell(9,  9, ['top', '', 'bottom', '']),
    new Cell(10, 10, ['', 'right', 'bottom', '']),
    new Cell(11, 11, ['', '', '', 'left']),
    new Cell(12, 12, ['', '', 'bottom', '']),
    new Cell(13, 13, ['top', '', 'bottom', '']),
    new Cell(14, 14, ['top', '', '', '']),
    new Cell(15, 15, ['top', 'right', 'bottom', '']),
    new Cell(16, 16, ['', '', '', 'left']),
    new Cell(17, 17, ['top', '', 'bottom', '']),
    new Cell(18, 18, ['top', 'right', '', '']),
    new Cell(19, 19, ['', '', '', 'left']),
    new Cell(20, 20, ['top', 'right', '', '']),
    new Cell(21, 21, ['', 'right', 'bottom', 'left']),
    new Cell(22, 22, ['top', '', '', 'left']),
    new Cell(23, 23, ['', 'right', 'bottom', '']),
    new Cell(24, 24, ['', 'right', 'bottom', 'left']),
    new Cell(25, 25, ['', 'right', 'bottom', 'left']),
  ]
}
