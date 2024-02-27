import { useState } from "react";
import ReactDOM from "react-dom/client";

const rowStyle = {
  display: "flex",
};

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#ddd",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "black",
};

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid",
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px",
};

const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px",
};

//Possible Winning Lines
const lines = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],

  [
    [0, 2],
    [1, 1],
    [2, 0],
  ],
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
];

function Square({ value, onPlay }) {
  return (
    <div className="square" style={squareStyle} onClick={onPlay}>
      {value}
    </div>
  );
}

function Board() {
  const [nextPlayer, setNextPlayer] = useState("x");
  const [winner, setWinner] = useState(null);
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  function getBoardValue(row, col) {
    return board[row][col];
  }

  function isXNext() {
    return nextPlayer === "x";
  }

  function handleOnPlay(row, col) {
    if (winner) return;
    const newBoard = [...board];
    newBoard[row][col] = isXNext() ? "X" : "O";

    setBoard(newBoard);
    setNextPlayer(isXNext() ? "o" : "x");

    checkForWinner();
  }

  function checkForWinner() {
    lines.some((line) => {
      const [row1, col1] = line[0];
      const [row2, col2] = line[1];
      const [row3, col3] = line[2];

      if (
        getBoardValue(row1, col1) === "" ||
        getBoardValue(row2, col2) === "" ||
        getBoardValue(row3, col3) === ""
      ) {
        return;
      }

      if (
        getBoardValue(row1, col1) === getBoardValue(row2, col2) &&
        getBoardValue(row2, col2) === getBoardValue(row3, col3)
      ) {
        setWinner(getBoardValue(row1, col1) === "X" ? "X" : "O");
        return true;
      }
    });
    return false;
  }

  function handleOnReset() {
    setWinner(null);
    setNextPlayer("x");
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
  }

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>
        Next player: <span>{isXNext() ? "X" : "O"}</span>
      </div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>
        Winner: <span>{winner ? winner : "None"}</span>
      </div>
      <button style={buttonStyle} onClick={handleOnReset}>
        Reset
      </button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square value={board[0][0]} onPlay={() => handleOnPlay(0, 0)} />
          <Square value={board[0][1]} onPlay={() => handleOnPlay(0, 1)} />
          <Square value={board[0][2]} onPlay={() => handleOnPlay(0, 2)} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square value={board[1][0]} onPlay={() => handleOnPlay(1, 0)} />
          <Square value={board[1][1]} onPlay={() => handleOnPlay(1, 1)} />
          <Square value={board[1][2]} onPlay={() => handleOnPlay(1, 2)} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square value={board[2][0]} onPlay={() => handleOnPlay(2, 0)} />
          <Square value={board[2][1]} onPlay={() => handleOnPlay(2, 1)} />
          <Square value={board[2][2]} onPlay={() => handleOnPlay(2, 2)} />
        </div>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<Game />);
