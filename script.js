//declared variables
const container = document.querySelector('.container');

const redBtn = document.querySelector('#red-btn');
const greenBtn = document.querySelector('#green-btn');
const blueBtn = document.querySelector('#blue-btn');
const blackBtn = document.querySelector('#black-btn');
const rainbowBtn = document.querySelector('#rainbow-btn');
const eraserBtn = document.querySelector('#eraser-btn');
const darkenBtn = document.querySelector('#darken-btn');
const reset = document.querySelector('.resetBtn');
let boxes = document.querySelectorAll('.etchBox');
let sketchColor = 'black'; //starting colour

onload = drawGrid(24);

function drawGrid(num) {
  for (let i = 0; i < num * num; i++) {
    etchBox = document.createElement('div');
    etchBox.setAttribute('class', 'etchBox');
    container.appendChild(etchBox);
    //600 is the pixel size of the container
    etchBox.style.flexBasis = (500/num) + 'px';
    etchBox.style.height = (500/num) + 'px';
  }
  boxes = document.querySelectorAll('.etchBox');
} 

function drawing() {
  boxes.forEach((box) => {
    box.addEventListener('mouseover', () => {
      let currentColor = window.getComputedStyle(box).getPropertyValue("background-color");
      console.log(currentColor);
      if (currentColor === 'rgb(47, 255, 107)') {
        box.style.backgroundColor = 'rgb(47, 255, 107)';
      }
      if (sketchColor === 'rainbow') {
        box.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      }  
      box.style.backgroundColor = sketchColor;
    });
  });
}   



//sets all boxes as default and calls clear grid and draw a new grid size
function clearBoxes() {
  boxes.forEach((box) => {
    box.style.backgroundColor = 'white';
  });
  let gridSize;
  do {
    gridSize = parseInt(window.prompt('How many squares per side of the grid (max: 100)?', ''));
  } while(isNaN(gridSize) || gridSize > 100 || gridSize < 1);
  removeBoxes();
  drawGrid(gridSize);
}

//clears the previous grid 
function removeBoxes() {
  boxes.forEach((box) => 
    box.remove());
  }

reset.addEventListener('click', clearBoxes);
container.addEventListener('click', drawing);
redBtn.addEventListener('click', () => sketchColor = '#ff3d46');
greenBtn.addEventListener('click', () => sketchColor = '#2fff6b');
blueBtn.addEventListener('click', () => sketchColor = '#289eff');
blackBtn.addEventListener('click', () => sketchColor = 'black');
rainbowBtn.addEventListener('click', () => sketchColor = 'rainbow');
eraserBtn.addEventListener('click', () => sketchColor = '#ebebeb'); // #ebebeb is colour of sketch area
//darkenBtn.addEventListener('click', () => sketchColor = 'darken'); cannot figure out code for this. Come back if I learn more.


  