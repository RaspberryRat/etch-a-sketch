//create a div box element
//append to container box
//loop until it is 16 * 16

const container = document.querySelector('.container');



for (let i = 0; i < 16 * 16; i++) {
  let etchBox = document.createElement('div');
  etchBox.setAttribute('class', 'etchBox');
  container.appendChild(etchBox);
  //600 is the pixel size of the container
  etchBox.style.flexBasis = (600/16) + 'px';
  etchBox.style.height = (600/16) + 'px';

  }
  
let boxes = document.querySelectorAll('.etchBox');



container.addEventListener('click', drawing);

function drawing() {
  boxes.forEach((box) => {
    box.addEventListener('mouseover', () => {
    box.style.backgroundColor = 'blue';
    });
  });
}
      

const reset = document.querySelector('.resetBtn');

reset.addEventListener('click', clearBoxes);

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

function removeBoxes() {
  boxes.forEach((box) => 
    box.remove());
  }

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
