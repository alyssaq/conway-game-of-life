var Cell, Neighbours, World, Helper;

/*
Conway's Game of Life

Infinite world representation by
storing the live cells.
*/

Helper = {
  cellHash: function(x, y) {
    return x + "," + y;
  }
};

/* A Cell stores its x, y
 * @input: pair - [x, y]
 */
Cell = function(pair) {
  var xPoint = pair[0],
    yPoint = pair[1],
    me = {
      x: xPoint,
      y: yPoint,
      numLiveNeighbours: 0,
      id: Helper.cellHash(xPoint, yPoint),
    };

  return me;
};

/* Array of neighbouring cells.
 * A cell can have max 8 neighbour cells
 */
Neighbours = function(cell) {
  var x = cell.x,
      y = cell.y;

  return ([
    Cell([x - 1, y - 1]),
    Cell([x - 1, y]),
    Cell([x - 1, y + 1]),
    Cell([x, y - 1]),
    Cell([x, y + 1]),
    Cell([x + 1, y - 1]),
    Cell([x + 1, y]),
    Cell([x + 1, y + 1])
  ]);
}


/* World is given an array of [x, y] 
 * co-ordinates of live cells
 * E.g. [ [1, 2], [2, 4] ]
 */
World = function(arr) {
  var me = {}, 
    cellsObj_ = {},
    liveCellsObj_ = {},
    deadCellsObj_ = {};

  init = function() {
    //TODO: initialise a random world if arr === 0
    arr.forEach(function(pair) {
      var cell = Cell(pair);
      cellsObj_[cell.id] = cell;
      liveCellsObj_[cell.id] = cell;
    });

    //For each live cell, store the neighbouring dead cells
    _(liveCellsObj_).each(function(cell) {
      var neighbours = Neighbours(cell);
      neighbours.forEach(function(cell) { 
        if (liveCellsObj_[cell.id]) {
          liveCellsObj_[cell.id].numLiveNeighbours += 1;
        } else {
          deadCellsObj_[cell.id] = deadCellsObj_[cell.id] || cell;
          deadCellsObj_[cell.id].numLiveNeighbours += 1;
        }
      });
    });
  };
  
  me.contains = function(x, y) {
    return liveCellsObj_[Helper.cellHash(x, y)] ? true : false;
  };
  
  me.numLiveCells = function() {
    return Object.keys(liveCellsObj_).length;
  }

  me.numLiveNeighbourCellsAt = function(x, y) {
    var cell = me.getCellAt(x, y);
    return cell ? cell.numLiveNeighbours : 0;
  }

  me.getCellAt = function(x, y) {
    return liveCellsObj_[Helper.cellHash(x, y)];
  }

  me.execute = function() {
    var nextGenCells = _.pick(liveCellsObj_, function(cell) {
      return (cell.numLiveNeighbours === 2 || cell.numLiveNeighbours === 3);
    });

    var toLive = _.pick(deadCellsObj_, function(cell) {
      return cell.numLiveNeighbours === 3;
    });
    liveCellsObj_ = _.merge(nextGenCells, toLive);
  }

  init();
  return me;
};
