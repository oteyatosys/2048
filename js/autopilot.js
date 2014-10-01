function Autopilot (delay, gameManager, handler){
  this.delay       = delay;
  this.gameManager = gameManager;
  this.handler     = handler;

  this.timeoutId = null;

  var self = this;

  this.gameManager.inputManager.on("start", function () {
    self.gameManager.setRunning(true);
    self.run();
  });

  this.gameManager.inputManager.on("stop", function () {
    self.gameManager.setRunning(false);
  });
}

Autopilot.prototype.serializedGrid = function () {
  var cellState = [], grid = this.gameManager.grid;

  for (var x = 0; x < grid.size; x++) {
    var row = cellState[x] = [];

    for (var y = 0; y < grid.size; y++) {
      row.push(grid.cells[x][y] ? grid.cells[x][y].value : 0);
    }
  }

  return cellState;
};

//var moves = {
//  0: "\u2191",
//  1: "\u2192",
//  2: "\u2193",
//  3: "\u2190"
//};
//
//Autopilot.prototype.displayMove = function (move) {
//  console.log("Move: " + moves[move]);
//};

// Will run handler (this.handler) after a small delay (this.delay)
Autopilot.prototype.run = function () {
  var self = this;

  // Stop timeout if one is currently running
  clearTimeout(this.timeoutId);

  this.timeoutId = setTimeout(function(){

    if( self.gameManager.isGameTerminated() ){
      self.gameManager.setRunning(false);
    }

    // Do not run if game is paused or terminated
    if( ! self.gameManager.running ) return;

    // Ask handler function for the move
    var move = self.handler(self.serializedGrid());
    self.gameManager.inputManager.emit('move', move);

    // Prepare for next turn
    self.run();

  }, this.delay);

};

