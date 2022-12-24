// const Gameboard = (function () {
//   const gameBoard = [[], [], []];
//   let currentPlayer = "X";

//   function addSymbol(e) {
//     let position = e.target.getAttribute("data-index");
//     position = position.split("-");
//     const row = position[0];
//     const column = position[1];
//     console.log({ row, column });
//     gameBoard[row][column] = currentPlayer;
//     console.log(gameBoard);
//     e.target.textContent = currentPlayer;
//     let winner = checkWinAndTie();
//     if (winner) {
//       console.log(`${currentPlayer} is the winner of this game`);
//     } else {
//       currentPlayer = currentPlayer === "X" ? "O" : "X";
//       e.target.style.pointerEvents = "none";
//     }
//   }

//   function checkWinAndTie() {
//     // Check rows

//     if (
//       (gameBoard[0][0] === "X" &&
//         gameBoard[0][1] === "X" &&
//         gameBoard[0][2] === "X") ||
//       (gameBoard[0][0] === "O" &&
//         gameBoard[0][1] === "O" &&
//         gameBoard[0][2] === "O")
//     ) {
//       console.log("true");
//       return true;
//     }

//     if (
//       (gameBoard[1][0] === "X" &&
//         gameBoard[1][1] === "X" &&
//         gameBoard[1][2] === "X") ||
//       (gameBoard[1][0] === "O" &&
//         gameBoard[1][1] === "O" &&
//         gameBoard[1][2] === "O")
//     ) {
//       console.log("true");
//       return true;
//     }

//     if (
//       (gameBoard[2][0] === "X" &&
//         gameBoard[2][1] === "X" &&
//         gameBoard[2][2] === "X") ||
//       (gameBoard[2][0] === "O" &&
//         gameBoard[2][1] === "O" &&
//         gameBoard[2][2] === "O")
//     ) {
//       console.log("true");
//       return true;
//     }

//     // Check Columns
//     if (
//       (gameBoard[0][0] === "X" &&
//         gameBoard[1][0] === "X" &&
//         gameBoard[2][0] === "X") ||
//       (gameBoard[0][0] === "O" &&
//         gameBoard[1][0] === "O" &&
//         gameBoard[2][0] === "O")
//     ) {
//       console.log("true");
//       return true;
//     }

//     if (
//       (gameBoard[0][1] === "X" &&
//         gameBoard[1][1] === "X" &&
//         gameBoard[2][1] === "X") ||
//       (gameBoard[0][1] === "O" &&
//         gameBoard[1][1] === "O" &&
//         gameBoard[2][1] === "O")
//     ) {
//       console.log("true");
//       return true;
//     }

//     if (
//       (gameBoard[0][2] === "X" &&
//         gameBoard[1][2] === "X" &&
//         gameBoard[2][2] === "X") ||
//       (gameBoard[0][2] === "O" &&
//         gameBoard[1][2] === "O" &&
//         gameBoard[2][2] === "O")
//     ) {
//       console.log("true");
//       return true;
//     }
//     return false;
//   }

//   return {
//     addSymbol,
//   };
// })();

// const cells = document.querySelectorAll(".cell");

// cells.forEach((cell) => {
//   cell.addEventListener("click", Gameboard.addSymbol);
// });

const Players = function (name, symbol, ref) {
  let playerName = name;
  let playerSymbol = symbol;
  let reference = document.querySelector(ref);
  return {
    playerName,
    playerSymbol,
    reference,
  };
};

const Gameboard = (function () {
  const gameBoard = [];

  function addSymbol(e) {
    let location = e.target.getAttribute("data-index");
    let currentPlayer = Game.getCurrentPlayer();
    gameBoard[location] = currentPlayer.playerSymbol;
    DisplayController.render(gameBoard);
    Game.setCurrentPlayer();
  }

  function checkTieOrWin() {}

  return {
    addSymbol,
  };
})();

const Game = (function (doc) {
  let firstPlayer = Players("Player 1", "X", ".first");
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

  function restartGame() {}

  return {
    getCurrentPlayer,
    setCurrentPlayer,
    cells,
  };
})(document);

const DisplayController = (function (document) {
  function render(array) {
    for (let i = 0; i < array.length; i++) {
      Game.cells[i].textContent = array[i];
      if (Game.cells[i].textContent) {
        console.log(Game.cells[i]);
        Game.cells[i].style.pointerEvents = "none";
      }
    }

    const secondPlayer = document.querySelector(".second");
    const firstPlayer = document.querySelector(".first");

    secondPlayer.classList.toggle("active");
    firstPlayer.classList.toggle("active");
  }

  // function displayWinner() {}

  // function displayTie() {}

  return {
    render,
  };
})(document);
