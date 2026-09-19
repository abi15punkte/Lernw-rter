import "./style.css";

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

const keyboard = document.createElement("section");
keyboard.className = "keyboard";
keyboard.setAttribute("aria-label", "Bildschirmtastatur");

rows.forEach((row, rowIndex) => {
  const rowElement = document.createElement("div");
  rowElement.className = `keyboard-row keyboard-row-${rowIndex + 1}`;

  row.forEach((key) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "keyboard-key";
    button.dataset.key = key;
    button.textContent =
      key === "SHIFT"
        ? "⇧"
        : key === "BACKSPACE"
          ? "⌫"
          : key === "SPACE"
            ? "LEERTASTE"
            : key === "ENTER"
              ? "↵"
              : key;
    button.setAttribute("aria-label", labels[key] ?? key);
    rowElement.append(button);
  });

  keyboard.append(rowElement);
});

document.querySelector("#app")?.append(keyboard);
