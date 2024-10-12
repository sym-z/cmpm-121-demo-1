// Found the toPrecision() function on mdn web docs when looking at the Number methods
import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Turtle Rescue 64";
const header = document.createElement("h1");
header.innerHTML = gameName;
document.title = gameName;

// What level of rounding is used when displaying numbers
const PRECISION = 2

// MAIN BUTTON SETUP
const MAIN_BUTTON_WIDTH : string = '300px'
const MAIN_BUTTON_HEIGHT : string = '175px'
const MAIN_BUTTON_FONT_SIZE : string = '60px'
const main_button = document.createElement("button");
main_button.style.width = MAIN_BUTTON_WIDTH;
main_button.style.height = MAIN_BUTTON_HEIGHT;
main_button.style.fontSize = MAIN_BUTTON_FONT_SIZE; 
const main_text = "🐢";
main_button.innerHTML = main_text;
const main_amount_label = document.createElement("div");
let total_turtles: number = 0;
main_amount_label.innerHTML = `${total_turtles} turtles rescued from deadly seagulls.`;

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
  "Press the turtle button above to rescue baby turtles from the seagull onslaught!";



// Upgrades-------------------------------------------------------- 

// Price Increase
// Every time an item is bought, the price for that item will be multiplied by 1.15
const PRICE_INCREASE : number = 1.15


// Upgrade A (cost 10, profit 0.1 turtles/sec)
let upgrade_A_cost: number = 10;
const upgrade_A_profit: number = 0.1;
const upgrade_A_button = document.createElement("button");
upgrade_A_button.name = "squads"
const upgrade_A_text = `Train baby turtles into rescue squads: (Cost ${upgrade_A_cost}. Growth Rate: ${upgrade_A_profit} turtles/sec)`;
upgrade_A_button.innerHTML = upgrade_A_text;
// Button is disabled at start.
upgrade_A_button.disabled = true;

let upgrade_A_count: number = 0;
//TODO: Round to nearist hundredth
upgrade_A_button.onclick = () => {
  if (total_turtles >= upgrade_A_cost) {
    upgrade_A_count += 1;
    // Cost is assigned to the new price calculated in the upgrade function
    upgrade_A_cost = buy_upgrade(upgrade_A_cost, upgrade_A_profit)
    // Update text after price increase
    upgrade_A_button.innerHTML = `Train baby turtles into rescue squads: (Cost ${upgrade_A_cost.toFixed(PRECISION)}. Growth Rate: ${upgrade_A_profit.toFixed(PRECISION)} turtles/sec)`;
  }
};

// Upgrade B (cost 100, profit 2.0 turtles/sec)
let upgrade_B_cost: number = 100;
const upgrade_B_profit: number = 2.0;
const upgrade_B_button = document.createElement("button");
upgrade_B_button.name = "classes"
const upgrade_B_text = `Train baby turtles in battle tactics, to uncover more about the seagull's strategies: (Cost ${upgrade_B_cost.toFixed(PRECISION)}. Growth Rate: ${upgrade_B_profit.toFixed(PRECISION)} turtles/sec)`;
upgrade_B_button.innerHTML = upgrade_B_text;
// Button is disabled at start.
upgrade_B_button.disabled = true;

let upgrade_B_count: number = 0;
//TODO: Round to nearist hundredth
upgrade_B_button.onclick = () => {
  if (total_turtles >= upgrade_B_cost) {
    upgrade_B_count += 1;
    // Cost is assigned to the new price calculated in the upgrade function
    upgrade_B_cost = buy_upgrade(upgrade_B_cost, upgrade_B_profit)
    // Update text after price increase
    upgrade_B_button.innerHTML = `Train baby turtles in battle tactics, to uncover more about the seagull's strategies: (Cost ${upgrade_B_cost.toFixed(PRECISION)}. Growth Rate: ${upgrade_B_profit.toFixed(PRECISION)} turtles/sec)`;
  }
};
// Upgrade C (cost 1000, profit 50.0 turtles/sec)
let upgrade_C_cost: number = 1000;
const upgrade_C_profit: number = 50.0;
const upgrade_C_button = document.createElement("button");
upgrade_C_button.name = "labs"
const upgrade_C_text = `Research and develop aerial anti-seagull technology: (Cost ${upgrade_C_cost.toFixed(PRECISION)}. Growth Rate: ${upgrade_C_profit.toFixed(PRECISION)} turtles/sec)`;
upgrade_C_button.innerHTML = upgrade_C_text;
// Button is disabled at start.
upgrade_C_button.disabled = true;

let upgrade_C_count: number = 0;
//TODO: Round to nearist hundredth
upgrade_C_button.onclick = () => {
  if (total_turtles >= upgrade_C_cost) {
    upgrade_C_count += 1;
    // Cost is assigned to the new price calculated in the upgrade function
    upgrade_C_cost = buy_upgrade(upgrade_C_cost, upgrade_C_profit)
    // Update text after price increase
    upgrade_C_button.innerHTML = `Research and develop aerial anti-seagull technology: (Cost ${upgrade_C_cost.toFixed(PRECISION)}. Growth Rate: ${upgrade_C_profit.toFixed(PRECISION)} turtles/sec)`;
  }
};

// General function used to buy upgrades, returns the new price of the upgrade
function buy_upgrade(cost : number, profit : number) : number{
    // Rescuing negative turtles "spends" them on an
    // upgrade.
    rescueTurtle(-cost);
    // Upgrade the amount of turtles rescued every second
    rescue_per_auto += profit;

    // Update text for growth and upgrades
    update_upgrade_text();

    // Return new cost after price increase.
    return cost * PRICE_INCREASE
}

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
  main_amount_label.innerHTML = `${total_turtles.toFixed(PRECISION)} turtles rescued from deadly seagulls.`;
}

function update_upgrade_text() {
  growth_rate_text.innerHTML = `Currently rescuing ${rescue_per_auto.toFixed(PRECISION)} turtles per second.`;
  upgrade_list.innerHTML = `Rescue squads: ${upgrade_A_count.toFixed(PRECISION)}, Strategy classes in session: ${upgrade_B_count.toFixed(PRECISION)}, Anti-seagull laboratories built: ${upgrade_C_count.toFixed(PRECISION)}`;
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
