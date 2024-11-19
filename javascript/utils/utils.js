Array.prototype.parse = function() {
  const rows = [];
  for (let i = 0; i < this.length; i += 80) {
    rows.push(this.slice(i, i + 80));
  }
  return rows;
}

Array.prototype.getCollisions = function(c) {
  const parsedCollision = this.parse();
  
  const collisionArr = [];
  parsedCollision.forEach((row, y) => {
    row.forEach((element, x) => {
      if (element === 237 || element === 238 || element === 239) {
        collisionArr.push(new CollisionBlock(x * 16, y * 16, element, c));
      }
    })
  });
  return collisionArr;
}