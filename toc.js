document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const status = document.getElementById('status');
    const resetBtn = document.getElementById('resetBtn');
    let currentPlayer = 'X';
    let gameActive = true;
    const boardState = ['', '', '', '', '', '', '', '', ''];
  
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    function checkWinner() {
      for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (
          boardState[a] &&
          boardState[a] === boardState[b] &&
          boardState[a] === boardState[c]
        ) {
          gameActive = false;
          return boardState[a];
        }
      }
      return null;
    }
  
    function handleCellClick(event) {
      const cell = event.target;
      const cellIndex = parseInt(cell.getAttribute('data-index'));
  
      if (boardState[cellIndex] !== '' || !gameActive) {
        return;
      }
  
      boardState[cellIndex] = currentPlayer;
      cell.textContent = currentPlayer;
      cell.classList.add('occupied');
  
      const winner = checkWinner();
      if (winner) {
        status.textContent = `Player ${winner} wins!`;
        gameActive = false;
        return;
      }
  
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      status.textContent = `Player ${currentPlayer}'s turn`;
    }
  
    function startGame() {
      gameBoard.innerHTML = '';
      status.textContent = `Player ${currentPlayer}'s turn`;
      boardState.fill('');
      gameActive = true;
  
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cell);
      }
    }
  
    resetBtn.addEventListener('click', startGame);
  
    startGame();
  });
  