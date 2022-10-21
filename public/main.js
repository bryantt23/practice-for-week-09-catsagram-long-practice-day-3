import { resetScore } from './score.js';
import { resetComments } from './comments.js';

export const createMainContent = () => {
  // Create h1
  const h1 = document.createElement('h1');
  h1.innerText = 'Catstagram';

  // Create img
  const img = document.createElement('img');
  img.style.margin = '20px';
  img.style.maxWidth = '750px';

  const newKittenBtn = createNewKittenBtn();

  const container = document.querySelector('.container');
  container.appendChild(h1);
  container.append(newKittenBtn);
  container.appendChild(img);

  fetchImage(false);
};

const fetchImage = async (replacePrevious = true) => {
  // Fetch image from API and set img url
  try {
    const url = localStorage.getItem('imageUrl');
    let kittenImgUrl;
    if (!url || replacePrevious) {
      const kittenResponse = await fetch(
        'https://api.thecatapi.com/v1/images/search?size=small'
      );
      // Converts to JSON
      const kittenData = await kittenResponse.json();
      // console.log(kittenData);
      kittenImgUrl = kittenData[0].url;
      localStorage.setItem('imageUrl', kittenImgUrl);
    } else {
      kittenImgUrl = url;
    }
    const kittenImg = document.querySelector('img');
    kittenImg.src = kittenImgUrl;

    // After the image is finished loading, reset the score and comments
    kittenImg.addEventListener('load', () => {
      resetScore(replacePrevious);
      resetComments(replacePrevious);
    });
  } catch (e) {
    console.log('Failed to fetch image', e);
  }
};

const createNewKittenBtn = () => {
  // Create "New Kitten" button
  const newKittenBtn = document.createElement('button');
  newKittenBtn.id = 'new-kitten';
  newKittenBtn.innerText = 'New Kitten';
  newKittenBtn.addEventListener('click', () => fetchImage(true));
  return newKittenBtn;
};
