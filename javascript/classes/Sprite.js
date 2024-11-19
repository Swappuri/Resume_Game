class Sprite {
  constructor(x, y, src, c, scale = 1, frameRate = 1, animations) {
    this.position = {
      x: x,
      y: y
    };

    this.image = new Image();
    this.image.onload = () => {
      this.loaded = true;
      this.height = this.image.height * scale;
      this.width = (this.image.width / this.frameRate) * scale;
    }
    this.image.src = src;

    this.c = c;
    this.loaded = false;
    this.frameRate = frameRate;
    this.currentFrame = 0;
    this.elapsedFrames = 0;
    this.frameBuffer = 8;
    this.scale = scale;

    this.animations = animations;
    if (this.animations) {
      for (let key in animations) {
        const image = new Image();
        image.src = this.animations[key].imgSrc;
        this.animations[key].image = image;
      }
    }
  }

  draw() {
    if (!this.loaded) return;
    const cropbox = {
      position: {
        x: this.width / this.scale * this.currentFrame,
        y: 0
      },
      width: this.width / this.scale,
      height: this.height / this.scale
    };
    this.c.drawImage(this.image, cropbox.position.x, cropbox.position.y, cropbox.width, cropbox.height, this.position.x, this.position.y, this.width, this.height);

    this.updateFrames();
  }

  updateFrames() {
    this.elapsedFrames++;
    if (this.elapsedFrames % this.frameBuffer === 0) {
      if (this.currentFrame < this.frameRate - 1) this.currentFrame++;
      else this.currentFrame = 0;
    }
  }
}