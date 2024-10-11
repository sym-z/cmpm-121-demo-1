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

// Auto Click----------------------------------------------------
// Time since last auto-turtle
let last_auto_tick: number = 0;
// No auto-click at the start.
let rescue_per_auto: number = 0;
// Start the auto-click
requestAnimationFrame(autoTurtle);

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

// Manual Click----------------------------------------------------
main_button.onclick = () => {
  rescueTurtle(rescue_per_click);
};

// Makes the spacing look correct on the webpage.
const main_auto_button_separator = document.createElement("div");
main_auto_button_separator.innerHTML =
  "Press the turtle button above to rescue turtles!";


// Upgrade A (cost 10, profit 0.1/sec)
const upgrade_A_cost: number = 10;
const upgrade_A_profit: number = 0.1;
const upgrade_A_button = document.createElement("button");
const upgrade_A_text =
  `A: (Cost ${upgrade_A_cost}. Growth Rate: ${upgrade_A_profit}/sec)`;
upgrade_A_button.innerHTML = upgrade_A_text;
// Button is disabled at start.
upgrade_A_button.disabled = true;

let upgrade_A_count : number = 0;
//TODO: Round to nearist hundredth
upgrade_A_button.onclick = () => {
  if (total_turtles >= upgrade_A_cost) {
    // Rescuing negative turtles "spends" them on an
    // upgrade.
    rescueTurtle(-upgrade_A_cost);
    // Upgrade the amount of turtles rescued every second
    rescue_per_auto += upgrade_A_profit;
    // Increment the number of upgrades
    upgrade_A_count += 1;
    // Update text for growth and upgrades
    update_upgrade_text();
  }
};

// Upgrade B (cost 100, profit 2.0/sec)
const upgrade_B_cost: number = 100;
const upgrade_B_profit: number = 2.0;
const upgrade_B_button = document.createElement("button");
const upgrade_B_text =
  `B: (Cost ${upgrade_B_cost}. Growth Rate: ${upgrade_B_profit}/sec)`;
upgrade_B_button.innerHTML = upgrade_B_text;
// Button is disabled at start.
upgrade_B_button.disabled = true;

let upgrade_B_count : number = 0;
//TODO: Round to nearist hundredth
upgrade_B_button.onclick = () => {
  if (total_turtles >= upgrade_B_cost) {
    // Rescuing negative turtles "spends" them on an
    // upgrade.
    rescueTurtle(-upgrade_B_cost);
    // Upgrade the amount of turtles rescued every second
    rescue_per_auto += upgrade_B_profit;
    // Increment the number of upgrades
    upgrade_B_count += 1;
    // Update text for growth and upgrades
    update_upgrade_text();
  }
};

// Upgrade C (cost 1000, profit 50.0/sec)
const upgrade_C_cost: number = 1000;
const upgrade_C_profit: number = 50.0;
const upgrade_C_button = document.createElement("button");
const upgrade_C_text =
  `C: (Cost ${upgrade_C_cost}. Growth Rate: ${upgrade_C_profit}/sec)`;
upgrade_C_button.innerHTML = upgrade_C_text;
// Button is disabled at start.
upgrade_C_button.disabled = true;

let upgrade_C_count : number = 0;
//TODO: Round to nearist hundredth
upgrade_C_button.onclick = () => {
  if (total_turtles >= upgrade_C_cost) {
    // Rescuing negative turtles "spends" them on an
    // upgrade.
    rescueTurtle(-upgrade_C_cost);
    // Upgrade the amount of turtles rescued every second
    rescue_per_auto += upgrade_C_profit;
    // Increment the number of upgrades
    upgrade_C_count += 1;
    // Update text for growth and upgrades
    update_upgrade_text();
  }
};

// TODO: Put upgrade buttons in an array, to disable/enable them.
// OR maybe an event listener?

// What upgrades the player has, needs to be updated when purchases are made.
const upgrade_list = document.createElement("div");

// The growth rate of automatic turtles being rescued. 
const growth_rate_text = document.createElement("div");

// Set the text to be the default values.
update_upgrade_text();

/*
// CHEAT MODE (for development)
total_turtles = 10000
*/

// Append elements
appendToApp();

function rescueTurtle(turts_to_rescue: number) {
  total_turtles += turts_to_rescue;
  //TODO: Make list of buttons to check
  if (total_turtles < upgrade_A_cost) {
    upgrade_A_button.disabled = true;
  } else if (upgrade_A_button.disabled) {
    upgrade_A_button.disabled = false;
  }
  if (total_turtles < upgrade_B_cost) {
    upgrade_B_button.disabled = true;
  } else if (upgrade_B_button.disabled) {
    upgrade_B_button.disabled = false;
  }
  if (total_turtles < upgrade_C_cost) {
    upgrade_C_button.disabled = true;
  } else if (upgrade_C_button.disabled) {
    upgrade_C_button.disabled = false;
  }
  main_amount_label.innerHTML = `${total_turtles} turtles rescued.`;
}




function update_upgrade_text()
{
    growth_rate_text.innerHTML = `Currently rescuing ${rescue_per_auto} turtles per second.`;
    upgrade_list.innerHTML = `A: ${upgrade_A_count}, B: ${upgrade_B_count}, C: ${upgrade_C_count}`; 
}

function appendToApp() {
    //TODO: Put all of this into one array and then append in a loop for cleaner code.
  app.append(header);
  app.append(main_amount_label);
  app.append(main_button);
  app.append(main_auto_button_separator);
  app.append(upgrade_A_button);
  app.append(upgrade_B_button);
  app.append(upgrade_C_button);
  app.append(growth_rate_text);
  app.append(upgrade_list);
}
