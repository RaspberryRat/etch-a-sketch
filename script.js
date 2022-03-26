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
      //console.log('hsl = ' + currentColor);
      if (sketchColor === 'rainbow') {
        box.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      }  
      box.style.backgroundColor = sketchColor;
    });
  });
} 

const rgbToHsl = (color) => {
  if (color == 'rgba(0, 0, 0, 0)') {
    color = 'rgb(235, 235, 235)';
  }
  let rgb = color.substring(4, color.length-1)
                  .replace(/ /g, '')
                  .split(',');
  let r = parseInt(rgb[0]);
  let g = parseInt(rgb[1]);
  let b = parseInt(rgb[2]);
  console.log('r = ' + r, 'g = ' + g, 'b = ' + b);
  console.log(typeof(r));
  r /= 255, g /= 255, b /= 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if(max == min){
      h = s = 0; // achromatic
  }else{
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max){
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
  }
  console.log([h, s, l]);
  return [h, s, l];

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


  