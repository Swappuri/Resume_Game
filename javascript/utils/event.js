window.addEventListener("keydown", (event) => {
  switch(event.key) {
    case "w":
      keys.w.pressed = true;
      break;
    case "a":
      keys.a.pressed = true;
      if (keys.d.pressed) keys.a.after = true;
      break;
    case "d":
      keys.d.pressed = true;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch(event.key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      keys.a.after = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});