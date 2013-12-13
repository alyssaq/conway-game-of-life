var Cell, World, Helper;

/*
Conway's Game of Life

Infinite world representation by
storing the live cells.
*/

Cell = function(pair) {
  var me = {},
    x_ = pair[0],
    y_ = pair[1],
    alive_ = false;

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
    y_ = {}, // y co-ordinates to pointer to liveCells_

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
      y_[yPoint.toString()]= y_[yPoint.toString()] || [];
      y_[yPoint.toString()].push(cell);
    }
  }
  
  me.getCellAt = function() {

  }

  me.toggleCellStateAt = function(x, y) {

  }

  me.numLiveCells = function() {
    return liveCells_.length;
  }

  me.numLiveNeighbourCellsAt = function(x, y) {
    var idxes = [[x - 1, y - 1],
           [x - 1, y],
           [x - 1, y + 1],
           [x, y - 1],
           [x, y + 1],
           [x + 1, y - 1],
           [x + 1, y],
           [x + 1, y + 1]],

    res = idxes.filter(function(pair) {
      var cellArr = x_[pair[0]] || [];
      return Helper.hasPair(cellArr, pair[1]);
     // if (x_[xPoint])
    });

    return res.length;
  }

  me.execute = function() {

  }

  init();
  return me;
};
