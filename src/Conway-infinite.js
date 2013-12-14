var Cell, World, Helper;

/*
Conway's Game of Life

Infinite world representation by
storing the live cells.
*/

Helper = {
  cellHash: function(x, y) {
    return x + "," + y;
  },
};

Cell = function(pair) {
  var me = {},
    x_ = pair[0],
    y_ = pair[1];

  me.x = function() {
    return x_;
  }

  me.y = function() {
    return y_;
  }

  me.hash = function() {
    return Helper.cellHash(x_, y_);
  }

  return me;
};


//World is given an array of [x, y] 
// co-ordinates of live cells
// E.g. [ [1, 2], [2, 4] ]
// Store the 
World = function(arr) {
  var me = {}, 
    cellsObj_ = {};

  init = function() {
    //TODO: initialise a random world if arr === 0
    arr.forEach(function(pair) {
      var cell = new Cell(pair);
      cellsObj_[cell.hash()] = cell;
    });
  },
  
  getNeighbourCells = function(cell) {
    var x = cell.x(),
      y = cell.y();

    return idxes = [
      new Cell([x - 1, y - 1]),
          Cell([x - 1, y]),
          Cell([x - 1, y + 1]),
          Cell([x, y - 1]),
          Cell([x, y + 1]),
          Cell([x + 1, y - 1]),
          Cell([x + 1, y]),
          Cell([x + 1, y + 1])];
  },

  containsCell = function(cell) {
    return cellsObj_[cell.hash()] || false;
  },
  
  me.contains = function(x, y) {
    return cellsObj_[Helper.cellHash(x, y)] || false;
  };
  
  me.numLiveCells = function() {
    return Object.keys(cellsObj_).length;
  }

  me.numLiveNeighbourCellsAt = function(x, y) {
    return me.numLiveNeighbourCells(me.getCellAt(x, y));
  }

  me.numLiveNeighbourCells = function(cell) {
    var neighbourCells = getNeighbourCells(cell);
    return neighbourCells.filter(function(neighbour) {
      return containsCell(neighbour);
    }).length;
  }

  me.getCellAt = function(x, y) {
    return cellsObj_[Helper.cellHash(x, y)];
  }

  me.run = function() {
    //go through the live cells obj
    // get the neighbours of the live cell
    // if the neighbour is alive, increment count
    // if it is dead, place it in a deadCellObj
    // return the cells that are not changing state
    var deadCells = {},
      nextGenCells = _.pick(cellsObj_, function(cell) {
      var neighbourCells = getNeighbourCells(cell),
        numLiveNeighbours = 0;

      //Process the neighbours of this live cell
      neighbourCells.forEach(function(neighbourCell) {
        if (containsCell(neighbourCell)) {
          //this neighbour is a live cell
          numLiveNeighbours++;
        } else {
          //this neighbour is a dead cell
          deadCells[neighbourCell.hash()] = neighbourCell;
        }
      });

      return (numLiveNeighbours === 2 || numLiveNeighbours === 3);
    });

    //Process the dead cells for the 4th rule
    var toLive = _.pick(deadCells, function(cell) {
      var numLiveNeighbours = me.numLiveNeighbourCells(cell);
      return numLiveNeighbours === 3;
    });

    cellsObj_ = _.merge(nextGenCells, toLive);
  }
  init();
  return me;
};
