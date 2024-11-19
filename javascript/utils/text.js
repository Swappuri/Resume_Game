let fadeOpacityMessage1 = 1;
let fadeOpacityMessage2 = 0;
const fadeSpeed = 0.007;
let showWorld = false; 

const overlay = {
  opacity: 0
};

function writeText(x, y, str1, str2, color, writeInstructions, c) {
  c.font = "20px 'Poppins'";
  c.fillStyle = "white";
  c.textAlign = "center";

  if (writeInstructions) {
    c.fillText("JUMP", 82, 43);
    c.fillText("MOVE RIGHT", 115, 78);
    c.fillText("MOVE LEFT", 106, 113);
  }

  c.font = "25px 'Poppins'";
  c.fillStyle = color;
  c.textAlign = "center";

  if (!showWorld) {
    if (fadeOpacityMessage1 > 0) {
      c.globalAlpha = fadeOpacityMessage1;
      c.fillText(str1, x, y);
      fadeOpacityMessage1 -= fadeSpeed;
    } else {
      fadeOpacityMessage2 += fadeSpeed;
      c.globalAlpha = fadeOpacityMessage2;
      c.fillText(str2, x, y);
      if (fadeOpacityMessage2 >= 1) showWorld = true;
    }
  } else {
    c.globalAlpha = 1;
    c.fillText(str2, x, y);
  }

  c.globalAlpha = 1;
}