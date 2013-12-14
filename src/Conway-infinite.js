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

  hasPair: function(cellArr, yPoint) {
    cellArr = cellArr || [];
    return cellArr.some(function(cell) {
      return cell.y() === yPoint;
    });
  }
};

Cell = function(pair) {
  var me = {xx: pair[0], yy: pair[1]},
    x_ = pair[0],
    y_ = pair[1],
    alive_ = true;

  me.isStateChanging = function(numLiveNeighbours) {
    return alive_ ?
           (numLiveNeighbours <= 1 || numLiveNeighbours >= 4) :
           numLiveNeighbours === 3
  }

  me.changeState = function() {
    alive_ = !alive_;
  }

  me.isAlive = function() {
    return alive_;
  }

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
    liveCells_ = [], //world represented by live cells
    cellsObj_ = {},
    x_ = {}, // x co-ordinates to pointer to liveCells_

  init = function() {
    //initialise a random world if arr === 0
    var i, xPoint, yPoint, pair, cell;

    for (i = 0; i < arr.length; i++) {
      pair = arr[i];
      xPoint = pair[0];
      yPoint = pair[1];
      cell = new Cell(pair);
      liveCells_.push(cell);
      
      x_[xPoint.toString()] = x_[xPoint.toString()] || [];
      x_[xPoint.toString()].push(cell);
      cellsObj_[cell.hash()] = cell;
    }
  },

  getNeighbourIndexesAt = function(x, y) {
    return idxes = [[x - 1, y - 1],
           [x - 1, y],
           [x - 1, y + 1],
           [x, y - 1],
           [x, y + 1],
           [x + 1, y - 1],
           [x + 1, y],
           [x + 1, y + 1]];
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
  containsXY = function(x, y) {
    return cellsObj_[Helper.cellHash(x, y)] || false;
  };
  
  me.numLiveCells = function() {
    return Object.keys(cellsObj_).length;
  }

  me.numLiveNeighbourCellsAt = function(x, y) {
    //if (!containsXY(x, y)) return 0;
    return me.numLiveNeighbourCells(me.getCellAt(x, y));
  }

  me.numLiveNeighbourCells = function(cell) {
    //if (!containsCell(cell)) return 0;
    var neighbourCells = getNeighbourCells(cell);
    return neighbourCells.filter(function(neighbour) {
      return containsCell(neighbour);
    }).length;
  }


  me.getCellAt = function(x, y) {
    return cellsObj_[Helper.cellHash(x, y)];
  }

  me.isCellAliveAt = function(x, y) {
    var cell = cellsObj_[Helper.cellHash(x, y)];
    return cell ? cell.isAlive() : false;
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

      return !cell.isStateChanging(numLiveNeighbours);
    });

    //Process the dead cells for the 4th rule
    var toLive = _.pick(deadCells, function(cell) {
      var numLiveNeighbours = me.numLiveNeighbourCells(cell);
      return !cell.isStateChanging(numLiveNeighbours);
    });

    cellsObj_ = _.merge(nextGenCells, toLive);
  }
  init();
  return me;
};
