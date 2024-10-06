import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Turtle Rescue 64";
const header = document.createElement("h1");
header.innerHTML = gameName;
document.title = gameName;

const main_button = document.createElement("button");
const main_text = "🐢";
main_button.innerHTML = main_text;

const main_amount_label = document.createElement("div");
let main_amount: number = 0;
main_amount_label.innerHTML = `${main_amount} turtles rescued.`;

main_button.onclick = () => {
    rescueTurtle();
};

const auto_rescue_delay : number = 1000;
setInterval(rescueTurtle, auto_rescue_delay)

app.append(header);
app.append(main_button);
app.append(main_amount_label);


function rescueTurtle()
{
  main_amount++;
  main_amount_label.innerHTML = `${main_amount} turtles rescued.`;

}