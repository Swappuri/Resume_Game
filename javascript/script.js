let level;
let levels;

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas");
  canvas.width = 1280;
  canvas.height = 640;
  const c = canvas.getContext("2d");
  
  const w_key = new Sprite(20, 20, "img/keyboard/keyboard_w.svg", c, 0.5);
  const d_key = new Sprite(20, 55, "img/keyboard/keyboard_a.svg", c, 0.5);
  const a_key = new Sprite(20, 90, "img/keyboard/keyboard_d.svg", c, 0.5);
  
  let collisionArr;
  let map;
  let infoModal;
  let closeModal = document.querySelectorAll(".closeModal");
  let slime;
  const slimeAnimations = {
    idleRight: {imgSrc: "img/slime/slime.png"},
    idleLeft: {imgSrc: "img/slime/slimeFlipped.png"}
  };
  level = 1;
  levels = {
    1: {
      init: () => {
        collisionArr = collisionsLV1.getCollisions(c);
        map = new Sprite(0, 0, "img/maps/tileMap.png", c);
        infoModal = document.querySelector(".infoModal1");
        slime = new Slime(120, 460, "img/slime/slime.png", c, infoModal, collisionArr, 1, 4, slimeAnimations);
      }
    },
    2: {
      init: () => {
        collisionArr = collisionsLV2.getCollisions(c);
        map = new Sprite(0, 0, "img/maps/tileMap2.png", c);
        infoModal = document.querySelector(".infoModal2");
        slime = new Slime(125, 170, "img/slime/slime.png", c, infoModal, collisionArr, 1, 4, slimeAnimations);
      }
    },
    3: {
      init: () => {
        collisionArr = collisionsLV3.getCollisions(c);
        map = new Sprite(0, 0, "img/maps/tileMap3.png", c);
        infoModal = document.querySelector(".infoModal3");
        closeModal = document.querySelector(".closeModal3");
        slime = new Slime(1150, 300, "img/slime/slimeFlipped.png", c, infoModal, collisionArr, 1, 4, slimeAnimations);
      }
    },
  };

  closeModal.forEach(modal => {
    modal.addEventListener("click", () => {
      infoModal.style.display = "none";
      slime.popupTriggered = false;
    });
  });

  function animate() {
    window.requestAnimationFrame(animate);
    map.draw();

    writeText(canvas.width / 2, 55, "Welcome to Swapnil's Video Game Resume!", "Journey to the Sign and Door to Learn More!", "black", true, c);
    w_key.draw();
    d_key.draw();
    a_key.draw();

    collisionArr.forEach(block => {
      block.draw();
    })
    slime.move(keys);
    slime.draw();
    slime.update();

    c.save();
    c.globalAlpha = overlay.opacity;
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.restore();

    if (level === 4) {
      writeText(canvas.width / 2, canvas.height / 2, "", "Thank You For Visiting Swapnil's Video Game Resume!", "white", false, c);
    }
  }

  levels[level].init();
  animate();
})

const keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false,
    after: false
  },
  d: {
    pressed: false
  }
};