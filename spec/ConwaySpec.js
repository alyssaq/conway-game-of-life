describe("Cell", function() {
  var cell;

  beforeEach(function() {
    cell = new Cell();
  });

  it("should be a dead cell by default", function() {
    expect(cell.isAlive()).toBeFalsy();
  });

  it("should be revived by changing its state", function() {
    cell.changeState();
    expect(cell.isAlive()).toBeTruthy();
  });

  describe("should correctly check whether a cell state should change", function() {
    it("is true for live cell if live neighbours is less than 2 or greater than 3", function() {
      cell.changeState();
      expect(cell.isStateChanging(0)).toBeTruthy();
      expect(cell.isStateChanging(1)).toBeTruthy();
      expect(cell.isStateChanging(4)).toBeTruthy();
      expect(cell.isStateChanging(8)).toBeTruthy();
    });

    it("is false for live cell if live neighbours is 2 or 3", function() {
      cell.changeState();
      expect(cell.isStateChanging(2)).toBeFalsy();
      expect(cell.isStateChanging(3)).toBeFalsy();
    });

    it("is true for dead cell if live neighbours is exactly 3", function() {
      expect(cell.isStateChanging(3)).toBeTruthy();
    });

    it("is false for dead cell if live neighbours is not 3", function() {
      expect(cell.isStateChanging(0)).toBeFalsy();
      expect(cell.isStateChanging(7)).toBeFalsy();
    });
  });
});

describe("World", function() {
  var world;

  beforeEach(function() {
    world = new World(5);
  });

  it("should initialise a world of dead cells", function() {
    expect(world.numLiveCells()).toEqual(0);
  });

  describe("should get the correct individual cell state", function() {
    it("is false by default", function() {
      expect(world.getCellAt(0, 0).isAlive()).toBeFalsy();
      expect(world.getCellAt(0, 4).isAlive()).toBeFalsy();
      expect(world.getCellAt(4, 0).isAlive()).toBeFalsy();
      expect(world.getCellAt(4, 4).isAlive()).toBeFalsy();
    });

    it("is undefined outside the world boundaries", function() {
      expect(world.getCellAt(-1, -1)).toBeUndefined();
      expect(world.getCellAt(5, 0)).toBeUndefined();
    });
  });

  describe("should set and count the correct cell state", function() {
    beforeEach(function() {
      world.toggleCellStateAt(0, 0);
      world.toggleCellStateAt(4, 4);
    });

    it("should turn the cell alive", function() {
      expect(world.getCellAt(0, 0).isAlive()).toBeTruthy();
      expect(world.getCellAt(4, 4).isAlive()).toBeTruthy();
      expect(world.numLiveCells()).toEqual(2);
    });

    it("should turn the cell dead", function() {
      world.toggleCellStateAt(0, 0);
      expect(world.getCellAt(0, 0).isAlive()).toBeFalsy();
      world.toggleCellStateAt(4, 4);
      expect(world.getCellAt(4, 4).isAlive()).toBeFalsy();
    });

    it("should do nothing to cells outside the world boundary", function() {
      expect(world.toggleCellStateAt(-2, 0)).toBeUndefined();
      expect(world.toggleCellStateAt(5, 4)).toBeUndefined();
    });
  });

  describe("should get correct number of live neighbour cells", function() {
    it("should have no live neighbours by default", function() {
      expect(world.numLiveNeighbourCellsAt(1, 1)).toEqual(0);
    });

    it("should have correct number of live neighbours at corner", function() {
      world.toggleCellStateAt(1, 1);
      world.toggleCellStateAt(-1, 1);
      world.toggleCellStateAt(1, 0);
      world.toggleCellStateAt(0, 0);
      expect(world.numLiveNeighbourCellsAt(0, 0)).toEqual(2);
      expect(world.numLiveNeighbourCellsAt(0, 4)).toEqual(0);
      expect(world.numLiveNeighbourCellsAt(4, 0)).toEqual(0);
      expect(world.numLiveNeighbourCellsAt(4, 4)).toEqual(0);
    });

    it("should have correct number of live neighbours", function() {
      world.toggleCellStateAt(0, 0);
      expect(world.numLiveNeighbourCellsAt(1, 1)).toEqual(1);
      world.toggleCellStateAt(0, 1);
      expect(world.numLiveNeighbourCellsAt(1, 1)).toEqual(2);
      world.toggleCellStateAt(0, 2);
      expect(world.numLiveNeighbourCellsAt(1, 1)).toEqual(3);
      world.toggleCellStateAt(1, 0);
      expect(world.numLiveNeighbourCellsAt(1, 1)).toEqual(4);
      world.toggleCellStateAt(1, 2);
      expect(world.numLiveNeighbourCellsAt(1, 1)).toEqual(5);
      world.toggleCellStateAt(2, 0);
      expect(world.numLiveNeighbourCellsAt(1, 1)).toEqual(6);
      world.toggleCellStateAt(2, 1);
      expect(world.numLiveNeighbourCellsAt(1, 1)).toEqual(7);
      world.toggleCellStateAt(2, 2);
      expect(world.numLiveNeighbourCellsAt(1, 1)).toEqual(8);
    });

    it("should have no live neighbours outside boundaries", function() {
      expect(world.numLiveNeighbourCellsAt(-1, -1)).toEqual(0);
      expect(world.numLiveNeighbourCellsAt(4, 5)).toEqual(0);
    });
  });

  describe("should execute the 4 rules correctly", function() {
    beforeEach(function() {
      world = new World(5);
      world.toggleCellStateAt(0, 0);
      world.toggleCellStateAt(1, 0);
    });

    it("rule 1 - kill the live cell if there are less than 2 live neighbours", function() {
      expect(world.getCellAt(1, 0).isAlive()).toBeTruthy();
      world.execute();
      expect(world.getCellAt(1, 0).isAlive()).toBeFalsy();
    });

    it("rule 2 - live cell remains alive if there are 2 or 3 live neighbours", function() {
      world.toggleCellStateAt(2, 0);
      expect(world.numLiveNeighbourCellsAt(1, 0)).toEqual(2);
      world.execute();
      expect(world.getCellAt(1, 0).isAlive()).toBeTruthy();
    });

    it("rule 3 - kill the live cell if there are greater than 3 live neighbours", function() {
      world.toggleCellStateAt(2, 0);
      world.toggleCellStateAt(2, 1);
      world.toggleCellStateAt(1, 1);
      expect(world.numLiveNeighbourCellsAt(1, 1)).toEqual(4);
      world.execute();
      expect(world.getCellAt(1, 1).isAlive()).toBeFalsy();
    });

    it("rule 4 - revive the dead cell if there are 3 live neighbours", function() {
      world.toggleCellStateAt(2, 0);
      expect(world.numLiveNeighbourCellsAt(1, 1)).toEqual(3);
      expect(world.getCellAt(1, 1).isAlive()).toBeFalsy();
      world.execute();
      expect(world.numLiveNeighbourCellsAt(1, 0)).toEqual(1);
      expect(world.getCellAt(1, 1).isAlive()).toBeTruthy();
    });
  });
});
