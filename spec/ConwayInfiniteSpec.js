describe("Cell", function() {
  var cell;

  beforeEach(function() {
    cell = new Cell([2, 3]);
  });

  it("should be initialised with x and y", function() {
    expect(cell.x).toEqual(2);
    expect(cell.y).toEqual(3);
  });

  it("should have no live neighbours by default", function() {
    expect(cell.numLiveNeighbours).toEqual(0);
  });

  it("should return the correct id hash", function() {
    expect(cell.id).toEqual("2,3");
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

  describe("checking getCellAt", function() {
    it("should get an existing cell", function() {
      expect(world.getCellAt(1, 1).id).toEqual("1,1");
    });

    it("should return undefined for non-existent cell", function() {
      expect(world.getCellAt(3, 3)).toBeUndefined();
    });
  });

  describe("should check whether the world contains a live cell at a point", function() {
    it("should return true for correct live cells co-ordinates", function() {
      expect(world.contains(1, 1)).toBeTruthy();
    });

    it("should return false for incorrect live cells co-ordinates", function() {
      expect(world.getCellAt(3, 3)).toBeFalsy();
    });
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
      expect(world.numLiveNeighbourCellsAt(11, 11)).toEqual(0);
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
      expect(world.contains(4, 4)).toBeFalsy();
    });

    it("rule 2 - live cell remains alive if there are 2 or 3 live neighbours", function() {
      world.execute();
      expect(world.contains(1, 1)).toBeTruthy();
      expect(world.contains(2, 1)).toBeTruthy();
      expect(world.contains(1, 2)).toBeTruthy();
      expect(world.contains(11, 8)).toBeTruthy();
      expect(world.contains(13, 8)).toBeTruthy();
      expect(world.contains(13, 9)).toBeTruthy();     
    });

    it("rule 3 - kill the live cell if there are greater than 3 live neighbours", function() {
      expect(world.numLiveNeighbourCellsAt(12, 8)).toEqual(4);
      expect(world.numLiveNeighbourCellsAt(12, 9)).toEqual(4);
      world.execute();
      expect(world.contains(12, 8)).toBeFalsy();
      expect(world.contains(12, 9)).toBeFalsy();
    });

    it("rule 4 - revive the dead cell if there are 3 live neighbours", function() {
      var deadCell = new Cell([12, 7]);
      expect(world.contains(12, 7)).toBeFalsy();
      expect(world.contains(11, 9)).toBeFalsy();
      world.execute();
      expect(world.contains(12, 7)).toBeTruthy();
      expect(world.contains(11, 9)).toBeTruthy();
    });

  });

});