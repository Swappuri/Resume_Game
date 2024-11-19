class CollisionBlock {
  constructor(x, y, blockType, c) {
    this.position = {
      x: x,
      y: y
    };

    this.width = 16;
    this.height = 16;
    this.blockType = blockType;
    this.c = c;
  }

  draw() {
    this.c.fillStyle = "rgba(0, 0, 0, 0)";
    this.c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}