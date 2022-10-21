export const createCommentSection = () => {
  const container = document.querySelector('.container');

  const commentForm = createCommentForm();
  const commentsList = createCommentsList();
  container.appendChild(commentForm);
  container.appendChild(commentsList);

  const comments = localStorage.getItem('comments');

  if (comments) {
    const arr = JSON.parse(comments);
    for (const comment of arr) {
      createComment(comment, true);
    }
  }
};

const createCommentsList = () => {
  // Create comments section
  const comments = document.createElement('div');
  comments.className = 'comments';
  comments.style.border = 'solid grey 1px';
  comments.style.height = '400px';
  comments.style.width = '80%';
  comments.style.margin = '10px';
  comments.style.padding = '5px';
  comments.style.overflow = 'scroll';

  return comments;
};

const createCommentForm = () => {
  // Create form
  const commentForm = document.createElement('form');
  commentForm.className = 'comment-form';
  commentForm.style.margin = '20px';
  commentForm.style.display = 'flex';
  commentForm.style.width = '100%';
  commentForm.style.justifyContent = 'center';
  commentForm.style.alignItems = 'center';

  commentForm.appendChild(createCommentInput());
  commentForm.appendChild(createCommentSubmitBtn());

  return commentForm;
};

const createCommentInput = () => {
  // Create comment input
  const userCommentContainer = document.createElement('div');
  userCommentContainer.className = 'user-comment-container';
  userCommentContainer.style.marginRight = '10px';

  const label = document.createElement('label');
  label.setAttribute('for', 'user-comment');
  label.innerText = 'Comment: ';

  const commentInput = document.createElement('input');
  commentInput.id = 'user-comment';
  commentInput.name = 'user-comment';
  commentInput.placeholder = 'Add a comment... ';
  commentInput.required = true;

  userCommentContainer.appendChild(label);
  userCommentContainer.appendChild(commentInput);

  return userCommentContainer;
};

const createCommentSubmitBtn = () => {
  // Create submit button
  const submitBtn = document.createElement('input');
  submitBtn.id = 'submit-comment';
  submitBtn.type = 'submit';
  submitBtn.value = 'Submit';

  submitBtn.addEventListener('click', submitComment);

  return submitBtn;
};

const submitComment = e => {
  e.preventDefault();
  const commentInput = document.querySelector('#user-comment');
  const commentText = commentInput.value;
  createComment(commentText);
  commentInput.value = '';
};

const createComment = (commentText, fromLocalStorage = false) => {
  if (!fromLocalStorage) {
    let localStorageComments = localStorage.getItem('comments');
    if (localStorageComments) {
      localStorageComments = JSON.parse(localStorageComments);
    } else {
      localStorageComments = [];
    }
    localStorageComments.push(commentText);
    localStorage.setItem('comments', JSON.stringify(localStorageComments));
  }
  const newCommentContainer = document.createElement('div');
  newCommentContainer.style.display = 'flex';
  newCommentContainer.style.margin = '10px';

  const newComment = document.createElement('p');
  newComment.innerText = commentText;

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';
  deleteButton.style.marginLeft = '15px';
  deleteButton.innerText = 'Delete';
  deleteButton.addEventListener('click', e => {
    // Remove comment from HTML DOM
    let localStorageComments = JSON.parse(localStorage.getItem('comments'));
    const index = localStorageComments.indexOf(commentText);
    localStorageComments.splice(index, 1);
    localStorage.setItem('comments', JSON.stringify(localStorageComments));
    newCommentContainer.remove();
  });

  newCommentContainer.appendChild(newComment);
  newCommentContainer.appendChild(deleteButton);
  const comments = document.querySelector('.comments');
  comments.appendChild(newCommentContainer);
};

export const resetComments = replacePrevious => {
  if (replacePrevious) {
    const comments = document.querySelector('.comments');
    Array.from(comments.children).forEach(child => child.remove());
    localStorage.removeItem('comments');
  }
};
