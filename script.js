const imagesContainer = document.getElementById('images');
const resetButton = document.getElementById('reset');
const verifyButton = document.getElementById('verify');
const para = document.getElementById('para');
let selectedImages = [];
let selectedIndexes = [];
let imagesData = [
  { className: 'img1', src: 'https://picsum.photos/id/237/200/300' },
  { className: 'img2', src: 'https://picsum.photos/seed/picsum/200/300' },
  { className: 'img3', src: 'https://picsum.photos/200/300?grayscale' },
  { className: 'img4', src: 'https://picsum.photos/200/300/' },
  { className: 'img5', src: 'https://picsum.photos/200/300.jpg' },
];

function shuffleImages() {
  let randomIndex = Math.floor(Math.random() * 5);
  let randomImage = imagesData[randomIndex];
  let newImages = [...imagesData];

  newImages.push(randomImage); // Add a duplicate of one of the images

  newImages = newImages.sort(() => Math.random() - 0.5); // Shuffle the images

  imagesContainer.innerHTML = '';
  newImages.forEach((image, index) => {
    const img = document.createElement('img');
    img.src = image.src;
    img.className = image.className;
    img.setAttribute('data-index', index);
    img.addEventListener('click', onImageClick);
    imagesContainer.appendChild(img);
  });
}

function onImageClick(e) {
  const clickedImg = e.target;
  const index = clickedImg.getAttribute('data-index');

  if (!selectedIndexes.includes(index)) {
    selectedImages.push(clickedImg);
    selectedIndexes.push(index);
    clickedImg.classList.add('selected');
  }

  if (selectedImages.length === 2) {
    verifyButton.style.display = 'inline-block';
  }

  if (selectedImages.length > 1) {
    resetButton.style.display = 'inline-block';
  }
}

function resetState() {
  selectedImages.forEach((img) => img.classList.remove('selected'));
  selectedImages = [];
  selectedIndexes = [];
  para.textContent = '';
  verifyButton.style.display = 'none';
  resetButton.style.display = 'none';
  shuffleImages();
}

function verify() {
  if (selectedImages[0].src === selectedImages[1].src) {
    para.textContent = 'You are a human. Congratulations!';
  } else {
    para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
  verifyButton.style.display = 'none';
}

resetButton.addEventListener('click', resetState);
verifyButton.addEventListener('click', verify);


shuffleImages();
