// Battle animation
const battleBackgroundImage = new Image();
battleBackgroundImage.src = './assets/img/battleBackground.png';
const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  image: battleBackgroundImage
})

let draggle;
let emby;
let renderedSprites;
let battleAnimationId;
let queue

const initBattle = () => {
  document.querySelector('#userInterface').style.display = 'block';
  document.querySelector('#dialoguesDiv').style.display = 'none';
  document.querySelector('#enemyHealthBar').style.width = '100%';
  document.querySelector('#playerHealthBar').style.width = '100%';
  document.querySelector('#attacksBox').replaceChildren();

  draggle = new Monster(monsters.Draggle);
  emby = new Monster(monsters.Emby);
  renderedSprites = [draggle, emby];
  queue = [];

  emby.attacks.forEach(attack => {
    const button = document.createElement('button');
    button.innerHTML = attack.name
    document.querySelector('#attacksBox').append(button)
  })

  // event listeners for attack buttons
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {
      const selectedAttack = attacks[e.currentTarget.innerHTML]
      emby.attack({
        attack: selectedAttack,
        recipient: draggle,
        renderedSprites
      })

      if (draggle.health <= 0) {
        queue.push(() => {
          draggle.faint()
        })
        queue.push(() => {
          // fade back to black
          gsap.to('#overlappingDiv', {
            opacity: 1,
            onComplete: () => {
              cancelAnimationFrame(battleAnimationId)
              animate()
              document.querySelector('#userInterface').style.display = 'none'
              gsap.to('#overlappingDiv', {
                opacity: 0
              })
              
              battle.initiated = false;
              audio.Map.play()
            }
          })
        })
      }
      // dragggle or enemy attacks
      const randomAttack = draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)]

      queue.push(() => {
        draggle.attack({
          attack: randomAttack,
          recipient: emby,
          renderedSprites
        })

        if (emby.health <= 0) {
          queue.push(() => {
            emby.faint()
          })

          queue.push(() => {
            // fade back to black
            gsap.to('#overlappingDiv', {
              opacity: 1,
              onComplete: () => {
                cancelAnimationFrame(battleAnimationId)
                animate()
                document.querySelector('#userInterface').style.display = 'none'
                gsap.to('#overlappingDiv', {
                  opacity: 0
                })

                battle.initiated = false;
                audio.Map.play();
              }
            })
          })
        }
      })
    })
    button.addEventListener('mouseenter', e => {
      const selectedAttack = attacks[e.currentTarget.innerHTML]
      document.querySelector('#attackTypeText').innerHTML = selectedAttack.type;
      document.querySelector('#attackTypeText').style.color = selectedAttack.color;
    })
  })
}

const animateBattle = () => {
  battleAnimationId = window.requestAnimationFrame(animateBattle)
  battleBackground.draw()
  // draggle.draw()
  // emby.draw()

  renderedSprites.forEach(sprite => {
    sprite.draw()
  })
}

// initBattle()
// animateBattle()
animate()

document.querySelector('#dialoguesDiv').addEventListener('click', e => {
  if (queue.length > 0) {
    queue[0]()
    queue.shift()
  } else {
    e.currentTarget.style.display = 'none'
  }
})