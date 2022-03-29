//declared variables
const container = document.querySelector('.container');

const redBtn = document.querySelector('#red-btn');
const greenBtn = document.querySelector('#green-btn');
const blueBtn = document.querySelector('#blue-btn');
const blackBtn = document.querySelector('#black-btn');
const rainbowBtn = document.querySelector('#rainbow-btn');
const eraserBtn = document.querySelector('#eraser-btn');
const darkenBtn = document.querySelector('#darken-btn');
const lightenBtn = document.querySelector('#lighten-btn');
const btns = document.querySelectorAll('button');
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
      if (sketchColor === 'darken') {
        let colorTohsl = rgbToHsl(currentColor);
        let darker = darkenColor(colorTohsl);
        let darkerToRgb = hslToRgb(darker)
        box.style.backgroundColor = darkerToRgb;
      } else if (sketchColor === 'lighten') {
        let colorTohsl = rgbToHsl(currentColor);
        let lighter = lighterColor(colorTohsl);
        let lighterToRgb = hslToRgb(lighter)
        box.style.backgroundColor = lighterToRgb;
        
      } else if (sketchColor === 'rainbow') {
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
  r /= 255;
  g /= 255;
  b /= 255;
  // Find greatest and smallest channel values
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;
  // Calculate hue
  // No difference
  if (delta == 0)
    h = 0;
  // Red is max
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g)
    h = (b - r) / delta + 2;
  // Blue is max
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);
    
  // Make negative hues positive behind 360°
  if (h < 0)
      h += 360;
  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    
  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
  return [h, s, l];
};

function darkenColor(color) {
  let hue = parseInt(color[0]);
  let sat = parseInt(color[1]);
  let light = parseInt(color[2]);
  if (light >= 0.5) {
    light -= .5
  } else if (light < 0.5) {
    light = 0
  }
  return [hue, sat, light];
}

function lighterColor(color) {
  let hue = parseInt(color[0]);
  let sat = parseInt(color[1]);
  let light = parseInt(color[2]);
  if (light <= 95) {
    light += 5
  } else if (light > 95) {
    light = 100
  }
  return [hue, sat, light];
}

function hslToRgb(color) {
  let h = parseInt(color[0]);
  let s = parseInt(color[1]);
  let l = parseInt(color[2]);

  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0,
      b = 0;
if (0 <= h && h < 60) {
  r = c; g = x; b = 0;
} else if (60 <= h && h < 120) {
  r = x; g = c; b = 0;
} else if (120 <= h && h < 180) {
  r = 0; g = c; b = x;
} else if (180 <= h && h < 240) {
  r = 0; g = x; b = c;
} else if (240 <= h && h < 300) {
  r = x; g = 0; b = c;
} else if (300 <= h && h < 360) {
  r = c; g = 0; b = x;
}
r = Math.round((r + m) * 255);
g = Math.round((g + m) * 255);
b = Math.round((b + m) * 255);
return "rgb(" + r + "," + g + "," + b + ")";
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

btns.forEach(button => button.addEventListener('click', button.classList.add('chosen')));

reset.addEventListener('click', clearBoxes);
container.addEventListener('click', drawing);
redBtn.addEventListener('click', () => sketchColor = '#ff3d46');
greenBtn.addEventListener('click', () => sketchColor = '#2fff6b');
blueBtn.addEventListener('click', () => sketchColor = '#289eff');
blackBtn.addEventListener('click', () => sketchColor = 'black');
rainbowBtn.addEventListener('click', () => sketchColor = 'rainbow');
eraserBtn.addEventListener('click', () => sketchColor = '#ebebeb'); // #ebebeb is colour of sketch area
darkenBtn.addEventListener('click', () => sketchColor = 'darken');
lightenBtn.addEventListener('click', () => sketchColor = 'lighten');

//this is function and removeTransition(e) function is required to remove animation from weapon select (the yellow highlight)
btns.forEach(button => button.addEventListener('transitionend', removeTransition));

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('chosen');
}