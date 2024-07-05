// tictactoe.js
(function() {
    const gameBoard = document.querySelector('.gameboard');
    const winnerElement = document.getElementById('winner');
    const player1Input = document.querySelector('#player1');
    const player2Input = document.querySelector('#player2');
    // const startGameButton = document.getElementById('start-game');
    const restartButton = document.getElementById('restart');
    const cells = document.querySelectorAll('.cell');
  
    let gameState = Array(9).fill('');
    let currentPlayer = 'X';
    let player1Name = '';
    let player2Name = '';
    let winner = '';
    let player1Score = 0;
    let player2Score = 0;
  
    // startGameButton.addEventListener('click', startGame);
    player1Input.addEventListener('input', checkInputs);
    player2Input.addEventListener('input', checkInputs);
    
    function checkInputs() {
      if (player1Input.value && player2Input.value) {
        startGame();
      }
    };

    restartButton.addEventListener('click', restartGame);
   
    function startGame() {
        player1Name = player1Input.value;
        player2Name = player2Input.value;
        winnerElement.textContent = '';
        gameState = Array(9).fill('');
        currentPlayer = 'X';
        cells.forEach((cell) => {
          cell.addEventListener('click', handleCellClick);
          });
        };   
        
        function restartGame() {
          // console.log('Game restarted!');
          currentPlayer = 'X';
          winner = '';
          winnerElement.textContent = '';
          gameState = Array(9).fill('');
          cells.forEach((cell) => {
            cell.textContent = '';
            cell.style.backgroundColor = '';
            // cell.removeEventListener('click', handleCellClick); // 
          });
        }
  
    function handleCellClick(event) {
      if (winner) return; 
      const index = event.target.dataset.index;
      if (gameState[index] !== '') return;
      gameState[index] = currentPlayer;
      event.target.textContent = currentPlayer;
      checkWin();
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  
    function checkWin() {
      const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (
          gameState[a] !== '' &&
          gameState[a] === gameState[b] &&
          gameState[b] === gameState[c]
        ) {
          winner = gameState[a];
          announceWinner();
          return;
        }
      }
      if (gameState.every((cell) => cell !== '')) {
        announceDraw();
      }
    }
    
    function announceWinner() {
      winnerElement.classList.add('winner');
      winnerElement.textContent = `${winner === 'X' ? player1Name : player2Name} wins!`;
      winnerElement.style.color = winner === 'X' ? 'yellow' : 'pink';
      cells.forEach((cell, index) => {
        if (gameState[index] === winner) {
          cell.style.backgroundColor = winner === 'X' ? 'yellow' : 'pink';
        }
      });
      if (winner === 'X') {
        player1Score++;
      } else {
        player2Score++;
      }
      updateScores();
    }
    
    function announceDraw() {
      winnerElement.textContent = `It's a draw!`;
      winnerElement.style.color = 'gold';
      updateScores();
    }
    
    function updateScores() {
      document.getElementById('player1-score').textContent = player1Score;
      document.getElementById('player2-score').textContent = player2Score;
    }    

  })();

  function triggerWinnerAnimation() {
    document.getElementById('winner-animation').classList.add('show');
    //  the animation 
  }
  
