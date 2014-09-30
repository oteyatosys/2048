// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {

  var gameManager = new GameManager(
      new KeyboardInputManager,
      new HTMLActuator,
      new LocalStorageManager
  );

  // up: 0, right: 1, down: 2, left: 3

  var turn = 0;
  new Autopilot(200, gameManager, function(grid){
    return turn % 4;
  });

});