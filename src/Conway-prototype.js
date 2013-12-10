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

World = (function() {
  function World(len) {
    this.grid_ = []; //Finite world representation 
    this.size_ = len * len;
    this.len_ = len;
    that = this;

    function init() {
      for (var i = 0; i < that.size_; i++) {
        that.grid_.push(new Cell());
      }
    }

    init();
  }

  World.prototype.checkBoundariesApplyFunc = function(func) {
    return function(x, y) {
      if (x < 0 || y < 0 || 
          x >= this.len_ || y >= this.len_) return;
      return func.apply(that, arguments);
    }
  };

  World.prototype.getValidNeighboursAt = function(x, y) {
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
    }.bind(this), []).filter(function(cell) {
      return cell !== undefined;
    });
  };

  World.prototype.getCellAt = 
    World.prototype.checkBoundariesApplyFunc(function(x, y) {
      return this.grid_[(x * this.len_) + y];
    });

  World.prototype.toggleCellStateAt = function(x, y) {
    var cell = this.getCellAt(x, y);
    if (cell) cell.changeState();
  }

  World.prototype.numLiveCells = function(cellArray) {
    var arr = cellArray || this.grid_;
    return arr.reduce(function(counter, cell) {
      return (cell.isAlive()) ? counter + 1 : counter;
    }, 0);
  }

  World.prototype.numLiveNeighbourCellsAt = function(x, y) {
    return this.getCellAt(x, y) ? 
           this.numLiveCells(this.getValidNeighboursAt(x, y)) : 0;
  }

  World.prototype.execute = function() {
    this.grid_.filter(function(cell, i) {
      var numLiveNeighbours = this.numLiveNeighbourCellsAt(Math.floor(i/this.len_), i%this.len_);
      return cell.isStateChanging(numLiveNeighbours);
    }.bind(this)).forEach(function(cell) {
      cell.changeState();
    });
  }

  return World; 
})();
