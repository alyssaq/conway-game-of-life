var Cell, World;

/*
Conway's Game of Life

The world is representated as an 1d array of Cells:
00 01 02 03 - 0  1  2  3
10 11 12 13 - 4  5  6  7
20 21 22 23 - 8  9  10 11
30 31 32 33 - 12 13 14 15
*/

Cell = function() {
  var me = {};

  me.alive = false;

  return me;
};

World = function(len) {
  var me = {}, 
    grid_ = [], //Finite world representation 
    size_ = len * len;

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
        x >= len || y >= len) {
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

  getNeighboursAt = function(x, y) {
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
        indexes.push(grid_[getGridIdx(pair[0], pair[1])]);
      }
      i++;
    }

    return indexes;
  };
  
  me.getCellAt = checkBoundariesApplyFunc(getCellAt);

  me.toggleCellStateAt = function(x, y) {
    var cell = me.getCellAt(x, y) || {alive: false};
    cell.alive = !cell.alive;
  }

  me.numLiveCells = function(cellArray) {
    var arr = cellArray || grid_;
    return arr.reduce(function(counter, cell) {
      return (cell.alive) ? counter + 1 : counter;
    }, 0);
  }

  me.numLiveNeighbourCellsAt = function(x, y) {
    return me.getCellAt(x, y) ? 
           me.numLiveCells(getNeighboursAt(x, y)) : 0;
  }

  me.execute = function() {
    var cell, numLiveNeighbours,
      idxes = [], i;
  
    for (i = 0; i < size_; i++) {
      cell = grid_[i];
      numLiveNeighbours = me.numLiveNeighbourCellsAt(Math.floor(i/len), i%len);
      if ( (cell.alive && 
           (numLiveNeighbours <= 1 || numLiveNeighbours >= 4)) ||
           (!cell.live && numLiveNeighbours === 3) ) {
        idxes.push(i);
      }
    }

    for (i = 0; i < idxes.length; i++) {
      grid_[idxes[i]].alive = !grid_[idxes[i]].alive;
    }
  }

  init();
  return me;
};
