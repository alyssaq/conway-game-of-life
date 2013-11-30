var Cell, World;

Cell = function() {
  var me = {};

  me.alive = false;

  return me;
};

World = function(len) {
  var me = {}, 
    grid_ = [], size_ = len * len;

  init = function() {
    for (var i = 0; i < size_; i++) {
      grid_.push(new Cell());
    }
  },

  getGridIdx = function(x, y) {
    return ((x * len) + y);
  }

  isWithinBoundaries = function(x, y) {
    if (x < 0 || y < 0 || 
        x > len || y > len) {
        return false;
    }
    return true;
  }

  checkBoundariesApplyFunc = function(func) {
    return function(x, y) {
      return isWithinBoundaries(x, y) ? 
        func.apply(me, arguments) : undefined;
    }
  },

  getCellAt = function(x, y) {
    return grid_[getGridIdx(x, y)];
  },

  /*
  00 01 02 03 - 0  1  2  3
  10 11 12 13 - 4  5  6  7
  20 21 22 23 - 8  9  10 11
  30 31 32 33 - 12 13 14 15

  Input: position of a cell. E.g. 10
  Output: Array of neighbour coordinates within bounds
  */
  getNeighbourIndexes = function(x, y) {
    var numIdexes = 8, i = 0, pair,
    indexes = [[x - 1, y - 1],
               [x - 1, y],
               [x - 1, y + 1],
               [x, y - 1],
               [x, y + 1],
               [x + 1, y - 1],
               [x + 1, y],
               [x + 1, y + 1]];
    
    while (i < numIdexes) {
      pair = indexes.shift();  
      if (isWithinBoundaries(pair[0], pair[1])) {
        indexes.push(getGridIdx(pair[0], pair[1]));
      }
      i++;
    }

    return indexes;
  },
  
  applyLiveCellRules = function(numLiveNeighbours, cell) {
   if (numLiveNeighbours <= 1 || numLiveNeighbours >= 4) {
      cell.alive = false; 
    } else {
      cell.alive = true; 
    }
  },

  applyDeadCellRules = function(numLiveNeighbours, cell) {
    if (numLiveNeighbours === 3) {
      cell.alive = true;
    }
  };

  me.getCellAt = checkBoundariesApplyFunc(getCellAt);

  me.toggleCellStateAt = function(x, y) {
    var cell = me.getCellAt(x, y);
    if (cell) cell.alive = !cell.alive;
  }

  me.numLiveCells = function() {
    return grid_.reduce(function(counter, cell) {
      if (cell.alive) counter++;
      return counter;
    }, 0);
  }

  me.numLiveNeighbourCells = function(x, y) {
    var indexes = getNeighbourIndexes(x, y),
      counter = 0;

    for (var i = 0; i < indexes.length; i++) {
      var cell = grid_[indexes[i]];
      if (cell.alive) counter++;
    }
    return counter;
  }

  me.execute = function() {
    var cell, numLiveNeighbours,
      nextGenGrid = grid_;
    for (var i = 0; i < size_; i++) {
      cell = grid_[i],
      nextGenCell = nextGenGrid[i];
      numLiveNeighbours = numLiveNeighbourCells(i);
      cell.alive ? applyLiveCellRules(numLiveNeighbours, cell)
                 : applyDeadCellRules(numLiveNeighbours, cell);
    }
  }

  init();
  return me;
};


