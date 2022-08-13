const canvas = document.querySelector('canvas');

// c meaning context
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 600;

c.fillStyle = 'white';
c.fillRect(0, 0, canvas.width, canvas.height)

const image = new Image();
image.src = './assets/PokeGameMap.png';

const playerImg = new Image();
playerImg.src = './assets/img/playerDown.png';

class Sprite {
  constructor({ position, velocity, image }) {
    this.position = position
    this.image = image
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}

const background = new Sprite({ 
  position: {
    x: -1408,
    y: -836
  },
  image: image
})

// animation loop

const keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  s: {
    pressed: false
  },
  d: {
    pressed: false
  }
}

const animate = () => {
  window.requestAnimationFrame(animate)
  // c.drawImage(image, -1408, -836)
  background.draw()
  c.drawImage(
    playerImg, 
    0, 
    0,
    playerImg.width / 4,
    playerImg.height,
    canvas.width / 2 - (playerImg.width / 4) / 2, 
    canvas.height / 2 - playerImg.height / 2,
    playerImg.width / 4,
    playerImg.height,
    );

    if(keys.w.pressed && lastKey === 'w') background.position.y += 3
    else if(keys.a.pressed && lastKey === 'a') background.position.x += 3
    else if(keys.s.pressed && lastKey === 's') background.position.y -= 3
    else if(keys.d.pressed && lastKey === 'd') background.position.x -= 3

}
animate()


// ----------------------------------------------
let lastKey = '';
window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = true;
      lastKey = 'w';
      break;
    case 'a':
      keys.a.pressed = true;
      lastKey = 'a';
      break;
    case 's':
      keys.s.pressed = true;
      lastKey = 's';
      break;
    case 'd':
      keys.d.pressed = true;
      lastKey = 'd';
      break;
  }
})

window.addEventListener('keyup', e => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;
    case 's':
      keys.s.pressed = false;
      break;
    case 'd':
      keys.d.pressed = false;
      break;
  }
})