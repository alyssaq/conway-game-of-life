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
  this.alive = false;

  me.isStateChanging = function(numLiveNeighbours) {
    return this.alive ?
           (numLiveNeighbours <= 1 || numLiveNeighbours >= 4) :
           numLiveNeighbours === 3
  }

  me.changeState = function() {
    this.alive = !this.alive;
  }

  me.isAlive = function() {
    return this.alive;
  }

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

  checkBoundariesApplyFunc = function(func) {
    return function(x, y) {
      if (x < 0 || y < 0 || 
          x >= len || y >= len) return;
      return func.apply(me, arguments);
    }
  },

  getCellAt = function(x, y) {
    return grid_[(x * len) + y];
  },

  getValidNeighboursAt = function(x, y) {
    var idxes = [[x - 1, y - 1],
           [x - 1, y],
           [x - 1, y + 1],
           [x, y - 1],
           [x, y + 1],
           [x + 1, y - 1],
           [x + 1, y],
           [x + 1, y + 1]];

    return idxes.reduce(function(arr, pair) {
      arr.push(me.getCellAt(pair[0], pair[1]));
      return arr;
    }, []).filter(function(cell) {
      return cell !== undefined;
    });
  };
  
  me.getCellAt = checkBoundariesApplyFunc(getCellAt);

  me.toggleCellStateAt = function(x, y) {
    var cell = me.getCellAt(x, y);
    if (cell) cell.changeState();
  }

  me.numLiveCells = function(cellArray) {
    var arr = cellArray || grid_;
    return arr.reduce(function(counter, cell) {
      return (cell.isAlive()) ? counter + 1 : counter;
    }, 0);
  }

  me.numLiveNeighbourCellsAt = function(x, y) {
    return me.getCellAt(x, y) ? 
           me.numLiveCells(getValidNeighboursAt(x, y)) : 0;
  }

  me.execute = function() {
    var numLiveNeighbours,
      idxes = [], i;
  
    for (i = 0; i < size_; i++) {
      numLiveNeighbours = me.numLiveNeighbourCellsAt(Math.floor(i/len), i%len);
      if (grid_[i].isStateChanging(numLiveNeighbours))
        idxes.push(i);
    }

    for (i = 0; i < idxes.length; i++) {
      grid_[idxes[i]].changeState();
    }
  }

  init();
  return me;
};
