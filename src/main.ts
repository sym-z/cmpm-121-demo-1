// Found the toPrecision() function on mdn web docs when looking at the Number methods
import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Turtle Rescue 64";
const header = document.createElement("h1");
header.innerHTML = gameName;
document.title = gameName;

interface Item {
  name: string,
  cost: number,
  rate: number
};

const availableItems : Item[] = [
  {name: "squads", cost: 10, rate: 0.1},
  {name: "classes", cost: 100, rate: 2},
  {name: "labs", cost: 1000, rate: 50},
];

// What level of rounding is used when displaying numbers
const PRECISION : number = 2;
// When functions would normally return an undefined, I use this as a way of showing that instead
const ERR_NO : number = -1;

// Price Increase
// Every time an item is bought, the price for that item will be multiplied by 1.15
const PRICE_INCREASE: number = 1.15;

// Changing this later to allow for upgrades.
const rescue_per_click: number = 1;

// MAIN BUTTON SETUP
const MAIN_BUTTON_WIDTH: string = "300px";
const MAIN_BUTTON_HEIGHT: string = "175px";
const MAIN_BUTTON_FONT_SIZE: string = "60px";
const main_button = document.createElement("button");
// Manual Click----------------------------------------------------
main_button.onclick = () => {
  rescueTurtle(rescue_per_click);
};
main_button.style.width = MAIN_BUTTON_WIDTH;
main_button.style.height = MAIN_BUTTON_HEIGHT;
main_button.style.fontSize = MAIN_BUTTON_FONT_SIZE;
const main_text = "🐢";
main_button.innerHTML = main_text;
const main_amount_label = document.createElement("div");
let total_turtles: number = 0;
main_amount_label.innerHTML = `${total_turtles} turtles rescued from deadly seagulls.`;

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

// Makes the spacing look correct on the webpage.
const main_auto_button_separator = document.createElement("div");
main_auto_button_separator.innerHTML =
  "Press the turtle button above to rescue baby turtles from the seagull onslaught!";

// What upgrades the player has, needs to be updated when purchases are made.
const upgrade_list = document.createElement("div");

// The growth rate of automatic turtles being rescued.
const growth_rate_text = document.createElement("div");

function update_upgrade_text() {
  growth_rate_text.innerHTML = `Currently rescuing ${rescue_per_auto.toFixed(PRECISION)} turtles per second.`;
  upgrade_list.innerHTML = `Rescue squads: ${getCount("squads").toFixed(PRECISION)}, Strategy classes in session: ${getCount("classes").toFixed(PRECISION)}, Anti-seagull laboratories built: ${getCount("labs").toFixed(PRECISION)}`;
}
const elements : HTMLElement[] = [header,main_amount_label,main_button,main_auto_button_separator,growth_rate_text,upgrade_list]
for (const element of elements)
  {
    if (element != undefined)
      {
        app.append(element)
      }
  }
// Upgrades--------------------------------------------------------
// brace assist on how to declare a map
const btn_map = new Map<string, HTMLButtonElement>();
const count_map = new Map<string,number>();
const cost_map = new Map<string,number>();
for(const item of availableItems)
  {
    count_map.set(item.name,0);
    cost_map.set(item.name, item.cost)
    const button = document.createElement("button");
    btn_map.set(item.name, button);
    button.name = item.name;
    button.disabled = true;
    button.onclick = () => 
      {
        if(total_turtles >= item.cost)
          {
            const count = count_map.get(item.name)
            if(count != undefined) count_map.set(item.name, count + 1)
            rescueTurtle(-item.cost);
            rescue_per_auto += item.rate
            update_upgrade_text();
            item.cost *= PRICE_INCREASE
            cost_map.set(item.name, item.cost)
            setButtonText(item.name)
          }
      }
    setButtonText(item.name)
    app.append(button)
  }
function getCount(name : string) : number
{
  const count = count_map.get(name);
  if(count != undefined)
    {
      return count
    }
    else
    {
      return ERR_NO;
    }
}
function getCost(name : string) : number
{
  const cost = cost_map.get(name);
  if(cost != undefined)
    {
      return cost
    }
    else
    {
      return ERR_NO;
    }
}
function setButtonText(name : string)
{
  const button = btn_map.get(name); 
  if(button != undefined)
    {
    if(name == "squads")
    {
       button.innerHTML = `Train rescue squads of turtles! (Cost: ${getCost(name).toFixed(PRECISION)})`
    }
      else if(name == "classes")
      {
         button.innerHTML = `Train classes of turtles to fight the seagull enemy! (Cost: ${getCost(name).toFixed(PRECISION)})`;
      }
      else if (name == "labs")
      {
         button.innerHTML = `Research and develop anti-seagull technology! (Cost: ${getCost(name).toFixed(PRECISION)})`;
      }
    }
}
// Set the text to be the default values.
update_upgrade_text();

function rescueTurtle(turts_to_rescue: number) {
  total_turtles += turts_to_rescue;
  for (const item of availableItems)
    {
      const button = btn_map.get(item.name);
      if(total_turtles < item.cost)
        {
          if(button) button.disabled = true;
        }
        else if(button && button.disabled)
          {
            button.disabled = false;
          }
    }
  main_amount_label.innerHTML = `${total_turtles.toFixed(PRECISION)} turtles rescued from deadly seagulls.`;
}