export const createScoreContainer = () => {
  // Create score container
  const scoreContainer = document.createElement('div');
  scoreContainer.className = 'score-container';
  scoreContainer.style.display = 'flex';
  scoreContainer.style.flexDirection = 'column';
  scoreContainer.style.alignItems = 'center';

  const scoreDisplay = createScoreDisplay();
  const btnContainer = createBtnContainer();

  scoreContainer.appendChild(scoreDisplay);
  scoreContainer.appendChild(btnContainer);

  const container = document.querySelector('.container');
  container.appendChild(scoreContainer);
};

const createScoreDisplay = () => {
  // Create score display
  const scoreDisplay = document.createElement('div');
  scoreDisplay.className = 'score-display';
  scoreDisplay.style.marginBottom = '10px';

  const scoreTitle = document.createElement('span');
  scoreTitle.innerText = 'Popularity Score: ';

  const score = document.createElement('span');
  score.className = 'score';
  score.innerText = '0';

  scoreDisplay.appendChild(scoreTitle);
  scoreDisplay.appendChild(score);

  return scoreDisplay;
};

const createBtnContainer = () => {
  // Create upvote/downvote buttons
  const btnContainer = document.createElement('div');

  const upvoteBtn = document.createElement('button');
  upvoteBtn.id = 'upvote';
  upvoteBtn.innerText = 'Upvote';

  const downvoteBtn = document.createElement('button');
  downvoteBtn.id = 'downvote';
  downvoteBtn.innerText = 'Downvote';
  downvoteBtn.style.marginLeft = '5px';

  btnContainer.appendChild(upvoteBtn);
  btnContainer.appendChild(downvoteBtn);

  upvoteBtn.addEventListener('click', vote);
  downvoteBtn.addEventListener('click', vote);

  return btnContainer;
};

const vote = e => {
  const score = document.querySelector('.score');
  let newScore = score.innerText;
  if (e.target.id === 'upvote') {
    newScore = parseInt(newScore) + 1;
  } else {
    newScore = parseInt(newScore) - 1;
  }

  // update score
  updateScore(newScore);
  localStorage.setItem('score', newScore);
};

export const resetScore = replacePrevious => {
  // reset score to 0
  const score = localStorage.getItem('score');
  if (replacePrevious || !score) {
    updateScore(0);
  } else {
    updateScore(score);
  }
};

const updateScore = newScore => {
  const score = document.querySelector('.score');
  score.innerText = newScore;
  localStorage.setItem('score', newScore);
};
