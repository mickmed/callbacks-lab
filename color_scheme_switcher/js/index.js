let getGray = document.querySelector('#grayButton');
let getWhite = document.querySelector('#whiteButton');





function changeBackgroundToWhite() {
  document.body.style.backgroundColor = 'gray';
  document.querySelector('p').innerHTML = "pendejo";
}

function changeBackgroundToGray() {
  document.body.style.backgroundColor = 'white';
}


getGray.addEventListener('click', changeBackgroundToWhite);
getWhite.addEventListener('click', changeBackgroundToGray);
console.log(getGray);

