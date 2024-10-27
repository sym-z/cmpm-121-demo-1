// Found the toFixed() function on mdn web docs when looking at the Number methods
import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Turtle Rescue 64";
const header = document.createElement("h1");
header.innerHTML = gameName;
document.title = gameName;

interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "squads",
    cost: 10,
    rate: 0.1,
    description:
      "When fighting in a group, the turtles are surprisingly coordinated.",
  },
  {
    name: "classes",
    cost: 100,
    rate: 2,
    description:
      "By expanding strategic options, the turtles can better know their enemy.",
  },
  {
    name: "labs",
    cost: 1000,
    rate: 50,
    description:
      "The skies will no longer be a safe haven for the bird menace!",
  },
  {
    name: "cyborg",
    cost: 50000,
    rate: 200,
    description: "CY-Turtle knows no limit.",
  },
  {
    name: "W.M.S.D.",
    cost: 200000,
    rate: 500,
    description:
      "Weapon of Mass Seagull Destruction, the world collectively shudders.",
  },
];
/**
 * Rescue turtles by incrementing the total count of turtles.
 * @param {number} turtsToRescue - The amount of turtles to add to the total count of turtles.
 */
function rescueTurtle(turtsToRescue: number) {
  totalTurtles += turtsToRescue;
  for (const item of availableItems) {
    const button = btnMap.get(item.name);
    if (totalTurtles < item.cost) {
      // If the player cannot afford an upgrade, disable the button.
      if (button) button.disabled = true;
    } else if (button && button.disabled) {
      button.disabled = false;
    }
  }
  mainAmountLabel.innerHTML = `${totalTurtles.toFixed(PRECISION)} turtles rescued from deadly seagulls.`;
}
// What level of rounding is used when displaying numbers
const PRECISION: number = 2;
// When functions would normally return an undefined, I use this as a way of showing that instead
const ERROR_CODE: number = -1;
// Every time an item is bought, the price for that item will be multiplied by 1.15
const PRICE_INCREASE: number = 1.15;
// The amount of turtles rescued when the main button is clicked
const RESCUE_PER_CLICK: number = 1;
// Sum of all turtles that the player has rescued.
let totalTurtles: number = 0;

// MAIN BUTTON SETUP
// This section sets up the main button's functionality and display.
const mainButton = document.createElement("button");
const MAIN_BUTTON_WIDTH: string = "300px";
const MAIN_BUTTON_HEIGHT: string = "175px";
const MAIN_BUTTON_FONT_SIZE: string = "60px";
mainButton.style.width = MAIN_BUTTON_WIDTH;
mainButton.style.height = MAIN_BUTTON_HEIGHT;
mainButton.style.fontSize = MAIN_BUTTON_FONT_SIZE;

mainButton.onclick = () => {
  rescueTurtle(RESCUE_PER_CLICK);
};
mainButton.innerHTML = "🐢";
const mainAmountLabel = document.createElement("div");
mainAmountLabel.innerHTML = `${totalTurtles.toFixed(PRECISION)} turtles rescued from deadly seagulls.`;

// Auto Click----------------------------------------------------
// This section sets up automatic rescuing of turtles.
/**
 * Each second this function rescues a certain amount of turtles based on the current state of upgrades.
 * @param {number} timestamp - Passed in when requestAnimationFrame() is called
 */
function autoTurtle(timestamp: number) {
  // Convert to seconds
  const timeSec = timestamp / 1000;
  // Floor the value, to identify whether or not the code has
  // auto-turtle'd within the last second since the start of the
  // game.
  if (Math.floor(timeSec) > lastAutoTick) {
    // Store the most recent second that the code auto-turtle'd
    lastAutoTick = Math.floor(timeSec);
    rescueTurtle(rescuePerAuto);
  }
  requestAnimationFrame(autoTurtle);
}
// Time since last auto-turtle
let lastAutoTick: number = 0;
// No auto-click at the start.
let rescuePerAuto: number = 0;
// Start the auto-click
requestAnimationFrame(autoTurtle);

// Upgrade State Trackers------------------------------------------
// This section declares data structures to set up the ability to quickly reference the state of upgrades.
// brace assist on how to declare a map
const btnMap = new Map<string, HTMLButtonElement>();
const countMap = new Map<string, number>();
const costMap = new Map<string, number>();

/**
 * Returns the amount of times a particular Item has been upgraded.
 * @param {string} name - The 'name' field of the Item whose count is being requested.
 * @returns {number} - Either the count of upgrades of the requested Item, or the ERROR_CODE if the name was invalid.
 */
function getCount(name: string): number {
  const count = countMap.get(name);
  if (count != undefined) {
    return count;
  } else {
    return ERROR_CODE;
  }
}
/**
 * Returns the current cost of a particular Item.
 * @param {string} name - The 'name' field of the Item whose cost is being requested.
 * @returns {number} - Either the current cost of the requested Item, or the ERROR_CODE if the name was invalid.
 */
function getCost(name: string): number {
  const cost = costMap.get(name);
  if (cost != undefined) {
    return cost;
  } else {
    return ERROR_CODE;
  }
}
/**
 * Refreshes a button's text to match its current price after an upgrade has been purchased.
 * @param {string} name - The name of the Item whose button's text we are trying to alter. 
 */
function setButtonText(name: string) {
  const button = btnMap.get(name);
  if (button != undefined) {
    if (name == "squads") {
      button.innerHTML = `Train rescue squads of turtles! (Cost: ${getCost(name).toFixed(PRECISION)})`;
    } else if (name == "classes") {
      button.innerHTML = `Train classes of turtles to fight the seagull enemy! (Cost: ${getCost(name).toFixed(PRECISION)})`;
    } else if (name == "labs") {
      button.innerHTML = `Research and develop anti-seagull technology! (Cost: ${getCost(name).toFixed(PRECISION)})`;
    } else if (name == "cyborg") {
      button.innerHTML = `Build a Robot Turtle to annihilate the seagull forces! (Cost: ${getCost(name).toFixed(PRECISION)})`;
    } else if (name == "W.M.S.D.") {
      button.innerHTML = `Research nuclear weapon development. (Cost: ${getCost(name).toFixed(PRECISION)})`;
    }
  }
}
/**
 * Refreshes the display of upgrades after an upgrade has been purchased to reflect the current state.
 */
function updateUpgradeText() {
  growthRateText.innerHTML = `Currently rescuing ${rescuePerAuto.toFixed(PRECISION)} turtles per second.`;
  upgradeList.innerHTML = `
  Rescue squads: ${getCount("squads").toFixed(PRECISION)}, 
  Strategy classes in session: ${getCount("classes").toFixed(PRECISION)}, 
  Anti-seagull laboratories built: ${getCount("labs").toFixed(PRECISION)},
  Cyborg Turtles Active: ${getCount("cyborg").toFixed(PRECISION)}, 
  Nuclear Options Taken: ${getCount("W.M.S.D.").toFixed(PRECISION)}`;
}

// Finalize Layouts---------------------------------------------------
// This section adds all of the elements to the page, and finalizes the display.
// Makes the spacing look correct on the webpage.
const mainAutoButtonSeparator = document.createElement("div");
mainAutoButtonSeparator.innerHTML =
  "Press the turtle button above to rescue baby turtles from the seagull onslaught!";
// What upgrades the player has, needs to be updated when purchases are made.
const upgradeList = document.createElement("div");
// The growth rate of automatic turtles being rescued.
const growthRateText = document.createElement("div");
const elements: HTMLElement[] = [
  header,
  mainAmountLabel,
  mainButton,
  mainAutoButtonSeparator,
  growthRateText,
  upgradeList,
];
for (const element of elements) {
  if (element != undefined) {
    app.append(element);
  }
}

// Upgrade Layout--------------------------------------------------------
// This section initializes all of the upgrade's behavior and adds their buttons to the page.
for (const item of availableItems) {
  countMap.set(item.name, 0);
  costMap.set(item.name, item.cost);
  const button = document.createElement("button");
  btnMap.set(item.name, button);
  // brace helped with the "title" property
  button.title = item.description;
  button.name = item.name;
  button.disabled = true;
  button.onclick = () => {
    if (totalTurtles >= item.cost) {
      const count = countMap.get(item.name);
      if (count != undefined) countMap.set(item.name, count + 1);
      rescueTurtle(-item.cost);
      rescuePerAuto += item.rate;
      updateUpgradeText();
      item.cost *= PRICE_INCREASE;
      costMap.set(item.name, item.cost);
      setButtonText(item.name);
    }
  };
  setButtonText(item.name);
  app.append(button);
}
// Set the text to be the default values.
updateUpgradeText();
