var Cell, World;

/*
Conway's Game of Life

Infinite world representation by
storing the live cells in a grid.

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
      
      x_.xPoint = x_.xPoint || [];
      x_.xPoint.push(cell);
      y_.yPoint = y_.yPoint || [];
      y_.yPoint.push(cell);
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
    
  }

  me.execute = function() {

  }

  init();
  return me;
};
