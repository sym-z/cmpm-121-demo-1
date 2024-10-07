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

// Changing this later to allow for upgrades.
const rescue_per_click : number = 1;
main_button.onclick = () => {
  rescueTurtle(rescue_per_click);
};

// Start the auto-click
requestAnimationFrame(autoTurtle)

// Append elements
appendToApp();

function rescueTurtle(num_turts : number) {
  main_amount += num_turts;
  main_amount_label.innerHTML = `${main_amount} turtles rescued.`;
}

// Time since last auto-turtle
let last_auto_tick : number = 0;
// Changing this once upgrades are implemented.
const rescue_per_auto : number = 1;
function autoTurtle(timestamp : number)
{
    // Calculates the time in seconds, based off of the time the
    // last frame finished
    const time_sec = timestamp / 1000;
    
    // Floor the value, to identify whether or not the code has
    // auto-turtle'd within the last second since the start of the
    // game.
    if (Math.floor(time_sec) > last_auto_tick)
    {
        // Store the most recent second that the code auto-turtle'd
        last_auto_tick = Math.floor(time_sec)
        
        rescueTurtle(rescue_per_auto)
    }
    requestAnimationFrame(autoTurtle)
}
function appendToApp()
{
    app.append(header);
    app.append(main_button);
    app.append(main_amount_label);
}