describe("Cell", function() {
  var cell;

  beforeEach(function() {
    cell = new Cell([2, 3]);
  });

  it("should be initialised with x and y", function() {
    expect(cell.x()).toEqual(2);
    expect(cell.y()).toEqual(3);
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
    world = new World([
      [1, 1], [2, 1], [1, 2]
    ]);
  });

  it("should return the right number of live cells", function() {
    expect(world.numLiveCells()).toEqual(3);
  });

  describe("should execute the 4 rules correctly", function() {
    beforeEach(function() {
      
    });

    it("rule 1 - kill the live cell if there are less than 2 live neighbours", function() {

    });

    it("rule 2 - live cell remains alive if there are 2 or 3 live neighbours", function() {

    });

    it("rule 3 - kill the live cell if there are greater than 3 live neighbours", function() {
 
    });

    it("rule 4 - revive the dead cell if there are 3 live neighbours", function() {

    });
  });

});