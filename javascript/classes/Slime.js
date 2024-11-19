class Slime extends Sprite {
  constructor(x, y, src, c, modal, collisionBlocks = [], scale = 1, frameRate = 1, animations) {
    super(x, y, src, c, scale, frameRate, animations);
    this.velocity = {
      x: 0,
      y: 0
    };

    this.gravity = 0.3;
    this.hitBottom = false;

    this.c = c;
    this.modal = modal;
    this.popupTriggered = false;
    this.messageAccessed = false;
    this.doorAccessed = false;

    this.collisionBlocks = collisionBlocks;
  }

  update() {
    // X position update with collisions
    this.position.x += this.velocity.x;
    this.checkHorizontalCollisions();
    
    // Gravity
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;

    // Y position update with collisions
    this.checkVerticalCollision();
  }

  checkHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      if (this.position.x <= collisionBlock.position.x + collisionBlock.width && 
        this.position.x + this.width >= collisionBlock.position.x && 
        this.position.y + this.height >= collisionBlock.position.y &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height) {
        if (collisionBlock.blockType === 238 && !this.messageAccessed) {
          this.modal.style.display = "block";
          this.popupTriggered = true;
          collisionBlock.accessed = true;
        }
        if (collisionBlock.blockType === 239 && !this.doorAccessed) {
          gsap.to(overlay, {
            opacity: 1,
            onComplete: () => {
              this.doorAccessed = true;
              level++;
              levels[level].init();
            }
          });
        }
        if (this.velocity.x < 0) {
          this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01;
          break;
        }
        if (this.velocity.x > 0) {
          this.position.x = collisionBlock.position.x - this.width - 0.01;
          break;
        }
      }
    }
  }

  checkVerticalCollision() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      if (this.position.x <= collisionBlock.position.x + collisionBlock.width && 
        this.position.x + this.width >= collisionBlock.position.x && 
        this.position.y + this.height >= collisionBlock.position.y &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height) {
        if (collisionBlock.blockType === 238 && !this.messageAccessed) {
          this.modal.style.display = "block";
          this.popupTriggered = true;
          this.messageAccessed = true;
        }
        if (collisionBlock.blockType === 239 && !this.doorAccessed) {
          this.doorAccessed = true;
          gsap.to(overlay, {
            opacity: 1,
            onComplete: () => {
              level++;
              levels[level].init();
              gsap.to(overlay, {
                opacity: 0
              });
            }
          });
        }
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01;
          break;
        }
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          this.hitBottom = true;
          this.position.y = collisionBlock.position.y - this.height - 0.01;
          break;
        }
      }
    }
  }

  jump() {
    this.velocity.y = -6;
    this.hitBottom = false;
  }

  moveRight() {
    this.image = this.animations["idleRight"].image;
    this.velocity.x = 4;
  }

  moveLeft() {
    this.image = this.animations["idleLeft"].image;
    this.velocity.x = -4;
  }

  stopX() {
    this.velocity.x = 0;
  }

  move(keys) {    
    if (this.popupTriggered) {
      this.stopX();
      return;
    }
    if (keys.w.pressed) {
      if (this.hitBottom) {
        this.jump();
      }
    }
    if (keys.a.pressed) {
      this.moveLeft();
    }
    if (keys.d.pressed) {
      this.moveRight();
    }
    if (keys.a.after) {
      this.moveLeft();
    }
    if (!keys.a.pressed && !keys.d.pressed) {
      this.stopX();
    }
  }
}