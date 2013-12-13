describe("Cell", function() {
  var cell;

  beforeEach(function() {
    cell = new Cell([2, 3]);
  });

  it("should be initialised with x and y", function() {
    expect(cell.x()).toEqual(2);
    expect(cell.y()).toEqual(3);
  });

  it("should be a live cell by default", function() {
    expect(cell.isAlive()).toBeTruthy();
  });

  it("should be revived by changing its state", function() {
    cell.changeState();
    expect(cell.isAlive()).toBeFalsy();
  });

  describe("should correctly check whether a cell state should change", function() {
    it("is true for live cell if live neighbours is less than 2 or greater than 3", function() {
      expect(cell.isStateChanging(0)).toBeTruthy();
      expect(cell.isStateChanging(1)).toBeTruthy();
      expect(cell.isStateChanging(4)).toBeTruthy();
      expect(cell.isStateChanging(8)).toBeTruthy();
    });

    it("is false for live cell if live neighbours is 2 or 3", function() {
      expect(cell.isStateChanging(2)).toBeFalsy();
      expect(cell.isStateChanging(3)).toBeFalsy();
    });

    it("is true for dead cell if live neighbours is exactly 3", function() {
      cell.changeState();
      expect(cell.isStateChanging(3)).toBeTruthy();
    });

    it("is false for dead cell if live neighbours is not 3", function() {
      cell.changeState();
      expect(cell.isStateChanging(0)).toBeFalsy();
      expect(cell.isStateChanging(7)).toBeFalsy();
    });
  });
});

describe("Helper", function() {
  describe("testing hasPair", function() {
    it("should return whether a y-point exists", function() {
      var cellArr = [new Cell([1, 2]), new Cell([2, 3])];
      expect(Helper.hasPair(cellArr, 2)).toBeTruthy();
      expect(Helper.hasPair(cellArr, 1)).toBeFalsy();
    });
  });
});

describe("World", function() {
  var world;

  beforeEach(function() {
    world = new World([
      [1, 1], [2, 1], [1, 2], [4, 4]
    ]);
  });

  it("should return the right number of live cells", function() {
    expect(world.numLiveCells()).toEqual(4);
  });

  describe("should get correct number of live neighbour cells", function() {
    it("should have live neighbours", function() {
      expect(world.numLiveNeighbourCellsAt(1, 1)).toEqual(2);
      expect(world.numLiveNeighbourCellsAt(2, 1)).toEqual(2);
      expect(world.numLiveNeighbourCellsAt(1, 2)).toEqual(2);
      expect(world.numLiveNeighbourCellsAt(4, 4)).toEqual(0);
    });


    it("should have no live neighbours outside boundaries", function() {
      expect(world.numLiveNeighbourCellsAt(-1, -1)).toEqual(0);
      expect(world.numLiveNeighbourCellsAt(6, 5)).toEqual(0);
    });
  });

  describe("should execute the 4 rules correctly", function() {
    beforeEach(function() {
      world = new World([
        [1, 1], [2, 1], [1, 2], [4, 4],
        [11, 8], [12, 8], [12, 9], [13, 8], [13, 9]
      ]);
    });

    it("rule 1 - kill the live cell if there are less than 2 live neighbours", function() {
      world.execute();
      expect(world.isCellAliveAt(4, 4)).toBeFalsy();
    });

    it("rule 2 - live cell remains alive if there are 2 or 3 live neighbours", function() {
      world.execute();
      expect(world.numLiveCells()).toEqual(6);
      expect(world.isCellAliveAt(1, 1)).toBeTruthy();
      expect(world.isCellAliveAt(2, 1)).toBeTruthy();
      expect(world.isCellAliveAt(1, 2)).toBeTruthy();
      expect(world.isCellAliveAt(11, 8)).toBeTruthy();
      expect(world.isCellAliveAt(13, 8)).toBeTruthy();
      expect(world.isCellAliveAt(13, 9)).toBeTruthy();     
    });

    it("rule 3 - kill the live cell if there are greater than 3 live neighbours", function() {
      expect(world.numLiveNeighbourCellsAt(12, 8)).toEqual(4);
      world.execute();
      expect(world.isCellAliveAt(12, 8)).toBeTruthy();
      expect(world.isCellAliveAt(12, 9)).toBeTruthy();
    });

    it("rule 4 - revive the dead cell if there are 3 live neighbours", function() {
      world.execute();
      expect(world.isCellAliveAt(12, 7)).toBeTruthy();
      expect(world.isCellAliveAt(11, 9)).toBeTruthy();
    });
  });

});