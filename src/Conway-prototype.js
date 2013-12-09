var Cell, World;

/*
Conway's Game of Life

The world is an infinite space.
*/

Cell = (function() {
  function Cell() {
    this.alive = false;
  }

  Cell.prototype.isStateChanging = function(numLiveNeighbours) {
    return this.alive ?
           (numLiveNeighbours <= 1 || numLiveNeighbours >= 4) :
           numLiveNeighbours === 3
  }

  Cell.prototype.changeState = function() {
    this.alive = !this.alive;
  }

  Cell.prototype.isAlive = function() {
    return this.alive;
  }

  return Cell;
})();

World = (function(len) {
  function World() {
    this.grid_ = [], //Finite world representation 
    this.size_ = len * len;
  }

  var init = function() {
    for (var i = 0; i < size_; i++) {
      this.grid_.push(new Cell());
    }
  },

  checkBoundariesApplyFunc = function(func) {
    return function(x, y) {
      if (x < 0 || y < 0 || 
          x >= len || y >= len) return;
      return func.apply(this, arguments);
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
      arr.push(this.getCellAt(pair[0], pair[1]));
      return arr;
    }, []).filter(function(cell) {
      return cell !== undefined;
    });
  };
  
  World.prototype.getCellAt = checkBoundariesApplyFunc(getCellAt);

  World.prototype.toggleCellStateAt = function(x, y) {
    var cell = this.getCellAt(x, y);
    if (cell) cell.changeState();
  }

  World.prototype.numLiveCells = function(cellArray) {
    var arr = cellArray || grid_;
    return arr.reduce(function(counter, cell) {
      return (cell.isAlive()) ? counter + 1 : counter;
    }, 0);
  }

  World.prototype.numLiveNeighbourCellsAt = function(x, y) {
    return this.getCellAt(x, y) ? 
           this.numLiveCells(getValidNeighboursAt(x, y)) : 0;
  }

  World.prototype.execute = function() {
    grid_.filter(function(cell, i) {
      var numLiveNeighbours = this.numLiveNeighbourCellsAt(Math.floor(i/len), i%len);
      return cell.isStateChanging(numLiveNeighbours);
    }).forEach(function(cell) {
      cell.changeState();
    });
  }

  init();
})();
