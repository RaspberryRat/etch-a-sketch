//create a div box element
//append to container box
//loop until it is 16 * 16

const container = document.querySelector('.container');
const etchBox = document.createElement('div');
etchBox.setAttribute('class', 'etchBox');

container.appendChild(etchBox);
 
for (let i = 0; i < 16 * 16 -1; i++) {
  let etchBox = document.createElement('div');
  etchBox.setAttribute('class', 'etchBox');
  container.appendChild(etchBox);
}

const boxes = document.querySelectorAll('.etchBox');

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
    gridSize = parseInt(window.prompt('How many squares per side of the grid (max: 100)?', ''));
    gridSize = parseInt(gridSize);
  } while(isNaN(gridSize) || gridSize > 100 || gridSize < 1);
  drawGrid(gridSize);
}

function drawGrid(num) {
  for (let i = 0; i < num * num -1; i++) {
    let etchBox = document.createElement('div');
    etchBox.setAttribute('class', 'etchBox');
    container.appendChild(etchBox);
  }
}

