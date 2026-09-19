import "./style.css";
import shiftOnIcon from "./assets/Shift_AN.png";
import shiftOffIcon from "./assets/Shift_AUS.png";
import enterIcon from "./assets/Enter.png";
import backspaceIcon from "./assets/Backspace.png";

const rows = [
  ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["SHIFT", "Y", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
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
    } else {
      button.textContent = key === "SPACE" ? "LEERTASTE" : key;
    }

    if (key === "SHIFT") {
      button.addEventListener("click", () => {
        shiftActive = !shiftActive;
        button.setAttribute("aria-pressed", String(shiftActive));
        updateShiftIcon(button);
      });

      button.setAttribute("aria-pressed", "false");
    }

    rowElement.append(button);
  });

  keyboard.append(rowElement);
});

document.querySelector("#app")?.append(keyboard);
