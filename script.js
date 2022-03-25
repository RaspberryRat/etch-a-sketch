const container = document.querySelector('.container');


//draws original grid
for (let i = 0; i < 16 * 16; i++) {
  let etchBox = document.createElement('div');
  etchBox.setAttribute('class', 'etchBox');
  container.appendChild(etchBox);
  //600 is the pixel size of the container
  etchBox.style.flexBasis = (600/16) + 'px';
  etchBox.style.height = (600/16) + 'px';

  }
  
let boxes = document.querySelectorAll('.etchBox');

//starting colour
let sketchColor = 'black';

container.addEventListener('click', drawing);

function drawing() {
  boxes.forEach((box) => {
    box.addEventListener('mouseover', () => {
      if (sketchColor === 'rainbow') {
        box.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      }
      box.style.backgroundColor = sketchColor;
    });
  });
}
      

const reset = document.querySelector('.resetBtn');

reset.addEventListener('click', clearBoxes);

//sets all boxes as default and calls clear grid and draw a new grid size
function clearBoxes() {
  boxes.forEach((box) => {
    box.style.backgroundColor = 'white';
  });
  let gridSize;
  do {
    gridSize = parseInt(window.prompt('How many squares per side of the grid (max: 100)? (starting grid is 16)', ''));
  } while(isNaN(gridSize) || gridSize > 100 || gridSize < 1);
  removeBoxes();
  drawGrid(gridSize);
}

//clears the previous grid 
function removeBoxes() {
  boxes.forEach((box) => 
    box.remove());
  }

  //creates the gridsize for the drawing area
function drawGrid(num) {
  for (let i = 0; i < num * num; i++) {
    etchBox = document.createElement('div');
    etchBox.setAttribute('class', 'etchBox');
    container.appendChild(etchBox);
    //600 is the pixel size of the container
    etchBox.style.flexBasis = (600/num) + 'px';
    etchBox.style.height = (600/num) + 'px';
  }
  boxes = document.querySelectorAll('.etchBox');
} 

const redBtn = document.querySelector('#red-btn');
const greenBtn = document.querySelector('#green-btn');
const blueBtn = document.querySelector('#blue-btn');
const blackBtn = document.querySelector('#black-btn');
const rainbowBtn = document.querySelector('#rainbow-btn');
const eraserBtn = document.querySelector('#eraser-btn');

redBtn.addEventListener('click', () => sketchColor = '#ff3d46');
greenBtn.addEventListener('click', () => sketchColor = '#2fff6b');
blueBtn.addEventListener('click', () => sketchColor = '#289eff');
blackBtn.addEventListener('click', () => sketchColor = 'black');
rainbowBtn.addEventListener('click', () => sketchColor = 'rainbow');
eraserBtn.addEventListener('click', () => sketchColor = '#ebebeb');


  