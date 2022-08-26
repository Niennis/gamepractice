class Sprite {
  constructor({
    position,
    image,
    frames = { max: 1, hold: 15 },
    sprites,
    animate = false,
    isEnemy = false
  }) {
    this.position = position
    this.image = image
    this.frames = { ...frames, val: 0, elapsed: 0 }

    this.image.onload = () => {
      this.width = this.image.width / this.frames.max
      this.height = this.image.height
    }
    this.animate = animate
    this.sprites = sprites
    this.opacity = 1
    this.health = 100
    this.isEnemy = isEnemy
  }

  draw() {
    c.save()
    c.globalAlpha = this.opacity
    c.drawImage(
      this.image,
      this.frames.val * this.width,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height,
    );
    c.restore();

    if (!this.animate) return

    if (this.frames.max > 1) {
      this.frames.elapsed++
    }

    if (this.frames.elapsed % this.frames.hold === 0) {
      if (this.frames.val < this.frames.max - 1) this.frames.val++
      else this.frames.val = 0
    }
  }

  attack({ attack, recipient, renderedSprites }) {
    switch (attack.name) {
      case 'Fireball':
        const fireballImg = new Image();
        fireballImg.src = './assets/img/fireball.png';
        const fireball = new Sprite({
          position: {
            x: this.position.x,
            y: this.position.y
          },
          image: fireballImg,
          frames: {
            max: 4,
            hold: 10
          },
          animate: true
        })
        renderedSprites.push(fireball)

        gsap.to(fireball.position, {
          x: recipient.position.x,
          y: recipient.position.y,
          onComplete: () => {
            renderedSprites.pop()
          }
        })

        break;
      case 'Tackle':
        const tl = gsap.timeline()

        this.health -= attack.damage

        let movementDistance = 20;
        if (this.isEnemy) movementDistance = -20

        let healthBar = '#enemyHealthBar';
        if (this.isEnemy) healthBar = '#playerHealthBar'

        tl.to(this.position, {
          x: this.position.x - movementDistance
        }).to(this.position, {
          x: this.position.x + movementDistance * 2,
          duration: 0.1,
          onComplete: () => {
            // enemy actually gets hit

            gsap.to(healthBar, {
              width: this.health + '%'
            })

            gsap.to(recipient.position, {
              x: recipient.position.x + 10,
              yoyo: true,
              repeat: 5,
              duration: 0.08,
            })

            gsap.to(recipient, {
              opacity: 0.2,
              repeat: 5,
              yoyo: true,
              duration: 0.08
            })
          }
        }).to(this.position, {
          x: this.position.x
        })
        break;
    }


  }
}

class Boundary {
  static width = 60;
  static height = 60;
  constructor({ position }) {
    this.position = position;
    this.width = 60
    this.height = 60
  }

  draw() {
    c.fillStyle = 'rgba(255, 0, 0, 0.1)';
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

