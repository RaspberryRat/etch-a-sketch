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
boxes.forEach((box) => {
  box.addEventListener('mouseover', () => {
  box.style.backgroundColor = 'blue';
  box.style.color = 'red';
  });
});
