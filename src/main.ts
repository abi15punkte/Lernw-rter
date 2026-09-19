import "./style.css";

const gridBackgroundUrl = new URL(
  `Gitter.png`,
  new URL(import.meta.env.BASE_URL, window.location.href)
).href;

document.documentElement.style.setProperty(
  "--grid-background",
  `url("${gridBackgroundUrl}")`
);
