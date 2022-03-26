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
      //console.log(currentColor);
      rgbToHsl(currentColor);
      //console.log(currentColor);
      if (sketchColor === 'rainbow') {
        box.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      }  
      box.style.backgroundColor = sketchColor;
    });
  });
} 

const rgbToHsl = (color) => {
  let rgb = color.substring(4, color.length-1)
                  .replace(/ /g, '')
                  .split(',');
  console.log(rgb);
  let r = rgb[0];
  let g = rgb[1];
  let b = rgb[2];
  console.log('r = ' + r, 'g = ' + g, 'b = ' + b);
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];

};




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


  