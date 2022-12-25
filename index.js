const Players = function (name, symbol, ref) {
  const playerName = name;
  const playerSymbol = symbol;
  const reference = document.querySelector(ref);
  return {
    playerName,
    playerSymbol,
    reference,
  };
};

const Gameboard = (function (doc) {
  let gameBoard = [];
  const main = doc.querySelector("main");

  function addSymbol(e) {
    const location = e.target.getAttribute("data-index");
    const currentPlayer = Game.getCurrentPlayer();
    gameBoard[location] = currentPlayer.playerSymbol;
    DisplayController.render(gameBoard);
    const ans = checkWinAndTie();
    console.log(ans);
    if (ans === "Tie") {
      DisplayController.displayTie();
      Game.restartGame();
    } else if (ans) {
      DisplayController.displayWinner(currentPlayer);
      Game.restartGame();
    } else {
      Game.setCurrentPlayer();
    }
  }

  function setGameBoard(prop) {
    gameBoard = prop;
    console.log(gameBoard);

    DisplayController.render(gameBoard);
  }

  function checkWinAndTie() {
    // Check rows

    if (
      (gameBoard[0] === "X" && gameBoard[1] === "X" && gameBoard[2] === "X") ||
      (gameBoard[0] === "O" && gameBoard[1] === "O" && gameBoard[2] === "O")
    ) {
      console.log("true");
      main.style.pointerEvents = "none";
      return true;
    }
    if (
      (gameBoard[3] === "X" && gameBoard[4] === "X" && gameBoard[5] === "X") ||
      (gameBoard[3] === "O" && gameBoard[4] === "O" && gameBoard[5] === "O")
    ) {
      console.log("true");
      main.style.pointerEvents = "none";

      return true;
    }

    if (
      (gameBoard[6] === "X" && gameBoard[7] === "X" && gameBoard[8] === "X") ||
      (gameBoard[6] === "O" && gameBoard[7] === "O" && gameBoard[8] === "O")
    ) {
      console.log("true");
      main.style.pointerEvents = "none";

      return true;
    }

    // Check Columns
    if (
      (gameBoard[0] === "X" && gameBoard[3] === "X" && gameBoard[6] === "X") ||
      (gameBoard[0] === "O" && gameBoard[3] === "O" && gameBoard[6] === "O")
    ) {
      console.log("true");
      main.style.pointerEvents = "none";

      return true;
    }

    if (
      (gameBoard[1] === "X" && gameBoard[4] === "X" && gameBoard[7] === "X") ||
      (gameBoard[1] === "O" && gameBoard[4] === "O" && gameBoard[7] === "O")
    ) {
      console.log("true");
      main.style.pointerEvents = "none";

      return true;
    }

    if (
      (gameBoard[2] === "X" && gameBoard[5] === "X" && gameBoard[8] === "X") ||
      (gameBoard[2] === "O" && gameBoard[5] === "O" && gameBoard[8] === "O")
    ) {
      console.log("true");
      main.style.pointerEvents = "none";

      return true;
    }

    // Check Diagonals

    if (
      (gameBoard[0] === "X" && gameBoard[4] === "X" && gameBoard[8] === "X") ||
      (gameBoard[0] === "O" && gameBoard[4] === "O" && gameBoard[8] === "O")
    ) {
      console.log("true");
      main.style.pointerEvents = "none";

      return true;
    }

    if (
      (gameBoard[2] === "X" && gameBoard[4] === "X" && gameBoard[6] === "X") ||
      (gameBoard[2] === "O" && gameBoard[4] === "O" && gameBoard[6] === "O")
    ) {
      console.log("true");
      main.style.pointerEvents = "none";

      return true;
    }

    const temp = gameBoard.filter((ele) => ele);
    console.log(temp);
    if (temp.length === 9) {
      return "Tie";
    }
    return false;
  }

  return {
    addSymbol,
    setGameBoard,
  };
})(document);

const Game = (function (doc) {
  const firstPlayer = Players("Player 1", "X", ".first");
  let opponentPlayer = Players("Player 2", "O", ".second");
  let currentPlayer = firstPlayer;
  const cells = doc.querySelectorAll(".cell");

  cells.forEach((cell) => {
    cell.addEventListener("click", Gameboard.addSymbol);
  });

  function getCurrentPlayer() {
    return currentPlayer;
  }

  function setCurrentPlayer() {
    if (currentPlayer === firstPlayer) {
      currentPlayer = opponentPlayer;
    } else {
      currentPlayer = firstPlayer;
    }
  }

  function createOpponentPlayer(name, symbol) {
    opponentPlayer = Players(name, symbol);
  }

  function restartGame() {
    Gameboard.setGameBoard([]);
  }

  return {
    getCurrentPlayer,
    setCurrentPlayer,
    restartGame,
    cells,
  };
})(document);

const DisplayController = (function (document) {
  const popUp = document.querySelector(".popUp");
  const msg = document.querySelector(".msg");
  const main = document.querySelector("main");

  function render(array) {
    for (let i = 0; i < array.length; i += 1) {
      Game.cells[i].textContent = array[i];
      if (Game.cells[i].textContent) {
        console.log(Game.cells[i]);
        Game.cells[i].style.pointerEvents = "none";
      }
    }
    if (array.length === 0) {
      setTimeout(() => {
        main.classList.toggle("blur");
        popUp.classList.toggle("show");
        Game.cells.forEach((cell) => {
          cell.textContent = "";
          cell.style.pointerEvents = "all";
          console.log(cell.textContent);
        });
      }, 3500);
    }

    const firstPlayer = document.querySelector(".first");
    const secondPlayer = document.querySelector(".second");
    document.querySelector(".msg");
    firstPlayer.classList.toggle("active");
    secondPlayer.classList.toggle("active");
  }

  function displayWinner(winner) {
    console.log(main);
    setTimeout(() => {
      main.classList.toggle("blur");
      console.log(`${winner.playerName} has won the Game`);
      popUp.classList.toggle("show");
      msg.textContent = `${winner.playerName} has won the Game`;
    }, 1000);
  }

  function displayTie() {
    setTimeout(() => {
      main.classList.toggle("blur");
      popUp.classList.toggle("show");
      msg.textContent = "It's A Tie! Try Again";
    }, 1000);
    console.log("It's A Tie! Try Again");
  }

  return {
    render,
    displayWinner,
    displayTie,
  };
})(document);
