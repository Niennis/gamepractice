const embyImg = new Image();
embyImg.src = './assets/img/embySprite.png'

const draggleImg = new Image();
draggleImg.src = './assets/img/draggleSprite.png'

const monsters = {
  Emby: {
    position: {
      x: 280,
      y: 325
    },
    image: embyImg,
    frames: {
      max: 4,
      hold: 30
    },
    animate: true,
    name: 'Emby',
    attacks: [attacks.Tackle, attacks.Fireball]
  },
  Draggle: {
    position: {
      x: 800,
      y: 100
    },
    image: draggleImg,
    frames: {
      max: 4,
      hold: 30
    },
    animate: true,
    isEnemy: true,
    name: 'Draggle',
    attacks: [attacks.Tackle, attacks.Fireball]
  }
}