describe("Conway", function() {
  var world;

  beforeEach(function() {
    world = new World(5);
  });

  it("should initialise a world of dead cells", function() {
    expect(world.numLiveCells()).toEqual(0);
  });

  describe("should get the correct individual cell state", function() {
    it("is false by default", function() {
      expect(world.getCellAt(0, 0).alive).toBeFalsy();
    });

    it("is undefined outside the world boundaries", function() {
      expect(world.getCellAt(-1, -1)).toBeUndefined();
      expect(world.getCellAt(5, 5)).toBeUndefined();
    });
  });

  describe("should set and count the correct cell state", function() {
    beforeEach(function() {
      world.toggleCellStateAt(0, 0);
      world.toggleCellStateAt(4, 4);
    });

    it("should turn the cell alive", function() {
      expect(world.getCellAt(0, 0).alive).toBeTruthy();
      expect(world.getCellAt(4, 4).alive).toBeTruthy();
      expect(world.numLiveCells()).toEqual(2);
    });

    it("should turn the cell dead", function() {
      world.toggleCellStateAt(0, 0);
      expect(world.getCellAt(0, 0).alive).toBeFalsy();
      world.toggleCellStateAt(4, 4);
      expect(world.getCellAt(4, 4).alive).toBeFalsy();
    });

    it("should do nothing to cells outside the world boundary", function() {
      expect(world.toggleCellStateAt(-2, 0)).toBeUndefined();
      expect(world.toggleCellStateAt(5, 4)).toBeUndefined();
    });
  });

  describe("should get correct number of live neighbour cells", function() {
    it("should have no live neighbours by default", function() {
      expect(world.numLiveNeighbourCells(1, 1)).toEqual(0);
    });

    it("should have correct number of live neighbours", function() {
      world.toggleCellStateAt(0, 0);
      expect(world.numLiveNeighbourCells(1, 1)).toEqual(1);
      world.toggleCellStateAt(0, 1);
      expect(world.numLiveNeighbourCells(1, 1)).toEqual(2);
      world.toggleCellStateAt(0, 2);
      expect(world.numLiveNeighbourCells(1, 1)).toEqual(3);
      world.toggleCellStateAt(1, 0);
      expect(world.numLiveNeighbourCells(1, 1)).toEqual(4);
      world.toggleCellStateAt(1, 2);
      expect(world.numLiveNeighbourCells(1, 1)).toEqual(5);
      world.toggleCellStateAt(2, 0);
      expect(world.numLiveNeighbourCells(1, 1)).toEqual(6);
      world.toggleCellStateAt(2, 1);
      expect(world.numLiveNeighbourCells(1, 1)).toEqual(7);
      world.toggleCellStateAt(2, 2);
      expect(world.numLiveNeighbourCells(1, 1)).toEqual(8);
    });

  });
});