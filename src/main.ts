import "./style.css";
import shiftOnIcon from "./assets/Shift_AN.png";
import shiftOffIcon from "./assets/Shift_AUS.png";
import enterIcon from "./assets/Enter.png";
import backspaceIcon from "./assets/Backspace.png";

const rows = [
  ["q", "w", "e", "r", "t", "z", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["SHIFT", "y", "x", "c", "v", "b", "n", "m", "BACKSPACE"],
  ["SPACE", "ENTER"],
];

const labels: Record<string, string> = {
  SHIFT: "Umschalttaste",
  BACKSPACE: "Rücktaste",
  SPACE: "Leertaste",
  ENTER: "Enter",
};

const iconPaths: Record<string, string> = {
  SHIFT: shiftOffIcon,
  BACKSPACE: backspaceIcon,
  ENTER: enterIcon,
};

const keyboard = document.createElement("section");
keyboard.className = "keyboard";
keyboard.setAttribute("aria-label", "Bildschirmtastatur");

let shiftActive = false;
const letterButtons: Array<{ button: HTMLButtonElement; letter: string }> = [];

function updateShiftIcon(button: HTMLButtonElement) {
  const image = button.querySelector<HTMLImageElement>(".keyboard-icon");
  if (!image) {
    return;
  }

  image.src = shiftActive ? shiftOnIcon : shiftOffIcon;
  image.alt = shiftActive
    ? "Großbuchstaben aktiviert"
    : "Großbuchstaben deaktiviert";
}

function updateLetterCase() {
  for (const { button, letter } of letterButtons) {
    const displayedLetter = shiftActive
      ? letter.toUpperCase()
      : letter.toLowerCase();

    button.textContent = displayedLetter;
    button.setAttribute("aria-label", displayedLetter);
  }
}

function animateKeyPress(button: HTMLButtonElement) {
  button.classList.remove("is-pressed");
  void button.offsetWidth;
  button.classList.add("is-pressed");

  window.setTimeout(() => {
    button.classList.remove("is-pressed");
  }, 150);
}

rows.forEach((row, rowIndex) => {
  const rowElement = document.createElement("div");
  rowElement.className = `keyboard-row keyboard-row-${rowIndex + 1}`;

  row.forEach((key) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "keyboard-key";
    button.dataset.key = key;
    button.setAttribute("aria-label", labels[key] ?? key);

    if (iconPaths[key]) {
      const image = document.createElement("img");
      image.className = "keyboard-icon";
      image.src = iconPaths[key];
      image.alt = labels[key] ?? key;
      image.draggable = false;
      button.append(image);
    } else if (/^[a-z]$/i.test(key)) {
      letterButtons.push({ button, letter: key });
      button.textContent = shiftActive
        ? key.toUpperCase()
        : key.toLowerCase();
    } else {
      button.textContent = key === "SPACE" ? "LEERTASTE" : key;
    }

    button.addEventListener("pointerdown", () => {
      animateKeyPress(button);
    });

    if (key === "SHIFT") {
      button.addEventListener("click", () => {
        shiftActive = !shiftActive;
        button.setAttribute("aria-pressed", String(shiftActive));
        updateShiftIcon(button);
        updateLetterCase();
      });

      button.setAttribute("aria-pressed", "false");
    }

    rowElement.append(button);
  });

  keyboard.append(rowElement);
});

document.querySelector("#app")?.append(keyboard);
