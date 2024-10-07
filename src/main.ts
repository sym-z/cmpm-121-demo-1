import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Turtle Rescue 64";
const header = document.createElement("h1");
header.innerHTML = gameName;
document.title = gameName;

// MAIN BUTTON SETUP
const main_button = document.createElement("button");
const main_text = "🐢";
main_button.innerHTML = main_text;
const main_amount_label = document.createElement("div");
let total_turtles: number = 0;
main_amount_label.innerHTML = `${total_turtles} turtles rescued.`;
// Changing this later to allow for upgrades.
const rescue_per_click: number = 1;
main_button.onclick = () => {
  rescueTurtle(rescue_per_click);
};

// Makes the spacing look correct on the webpage.
const main_auto_button_separator = document.createElement("div")
main_auto_button_separator.innerHTML = "Press the turtle button above to rescue turtles!"
// UPGRADE AUTO BUTTON SETUP
const upgrade_auto_button = document.createElement("button");
const upgrade_auto_text =
  "Click me to train turtle rescue squads! (Cost: 10 Turtles)";
upgrade_auto_button.innerHTML = upgrade_auto_text;
// Button is disabled at start.
upgrade_auto_button.disabled = true;

// Will change if I plan to scale
const upgrade_auto_cost: number = 10;
upgrade_auto_button.onclick = () => {
  if (total_turtles >= upgrade_auto_cost) {
    // Rescuing negative turtles "spends" them on an
    // upgrade.
    rescueTurtle(-upgrade_auto_cost);
    // Upgrade the amount of turtles rescued every second
    rescue_per_auto += 1;
  }
};

// Start the auto-click
requestAnimationFrame(autoTurtle);

// Append elements
appendToApp();

function rescueTurtle(turts_to_rescue: number) {
  total_turtles += turts_to_rescue;
  if (total_turtles < upgrade_auto_cost) {
    upgrade_auto_button.disabled = true;
  } else if (upgrade_auto_button.disabled) {
    upgrade_auto_button.disabled = false;
  }
  main_amount_label.innerHTML = `${total_turtles} turtles rescued.`;
}

// Time since last auto-turtle
let last_auto_tick: number = 0;
// No auto-click at the start.
let rescue_per_auto: number = 0;
function autoTurtle(timestamp: number) {
  // Calculates the time in seconds, based off of the time the
  // last frame finished
  const time_sec = timestamp / 1000;

  // Floor the value, to identify whether or not the code has
  // auto-turtle'd within the last second since the start of the
  // game.
  if (Math.floor(time_sec) > last_auto_tick) {
    // Store the most recent second that the code auto-turtle'd
    last_auto_tick = Math.floor(time_sec);

    rescueTurtle(rescue_per_auto);
  }
  requestAnimationFrame(autoTurtle);
}
function appendToApp() {
  app.append(header);
  app.append(main_amount_label);
  app.append(main_button);
  app.append(main_auto_button_separator)
  app.append(upgrade_auto_button);
}
