import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Jack's Temporary Clicky Game Title";
const header = document.createElement("h1");
header.innerHTML = gameName;
document.title = gameName;

const main_button = document.createElement("button")
const main_text = "🐢"
main_button.innerHTML = main_text;

app.append(header);
app.append(main_button)
