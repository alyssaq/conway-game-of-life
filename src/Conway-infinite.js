var Cell, World, Helper;

/*
Conway's Game of Life

Infinite world representation by
storing the live cells.
*/

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

  return me;
};

Helper = {
  hasPair: function(cellArr, yPoint) {
    cellArr = cellArr || [];
    return cellArr.some(function(cell) {
      return cell.y() === yPoint;
    });
  }
};
//World is given an array of [x, y] 
// co-ordinates of live cells
// E.g. [ [1, 2], [2, 4] ]
World = function(arr) {
  var me = {}, 
    liveCells_ = [], //world represented by live cells
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
  };

  me.numLiveCells = function() {
    return liveCells_.length;
  }

  me.numLiveNeighbourCellsAt = function(x, y) {
    var idxes = getNeighbourIndexesAt(x, y),
      res = idxes.filter(function(pair) {
        return Helper.hasPair(x_[pair[0]], pair[1]);
      });

    return res.length;
  }

  var numLiveNeighbourCells = function(cell) {
    return me.numLiveNeighbourCellsAt(cell.x(), cell.y());
  }

  me.isCellAliveAt = function(x, y) {
    return Helper.hasPair(x_[x], y);
  }

  me.execute = function() {
    var potentialLiveCells = [];
    liveCells_ = liveCells_.filter(function(cell, i) {
      var neighbourCells = getNeighbourCells(cell),
        numLiveNeighbours = 0;

      //Process the neighbours of this live cell
      neighbourCells.forEach(function(neighbourCell) {
        var cellArr = x_[neighbourCell.x()] || [];
        if (Helper.hasPair(cellArr, neighbourCell.y())) {
          //this neighbour is a live cell
          numLiveNeighbours++;
        } else {
          //this neighbour is a dead cell
          neighbourCell.changeState();
          potentialLiveCells.push(neighbourCell);
        }
      });

      if (cell.isStateChanging(numLiveNeighbours)) {
        liveCells_[i].length = 0; //clear the liveCell xy
        if (x_[cell.x()].length <= 1) {
          delete x_[cell.x()];
        }
        return false;
      }
      return true;
    });

    //TODO: Rule 4.
    liveCells_.concat(potentialLiveCells.filter(function(cell) {
      return cell.isStateChanging(numLiveNeighbourCells(cell));
    }));
  }

  init();
  return me;
};
