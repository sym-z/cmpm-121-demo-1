import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Testing correct Git Account...";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
