let nemesises = [
  // Basic
  "Crooked Mask", "Rageborne", "Carapace Queen", "Prince of Gluttons",

  // Return To Gravehold
  "Burrower", "Fortress",

  // The Outer Dark
  "Thrice-Dead Prophet", "Wraithmonger",

  // Shattered Dreams
  "The Wailing", 

  // The Depths
  "Horde-Crone",

  // Southern Village
  "The Burning Kor"
]

let mages = [
  // Basic
  "Brama", "Xaxos", "Mist", "Kadir", "Lash", "Phaedraxa", "Adelheim",
  "Jian",

  // Return To Gravehold
  "Cairna", "Ohat and Ulgimor",

  // The Outer Dark
  "Indira", "Remnant",

  // Shattered Dreams
  "Nook",

  // The Depths
  "Nym", "Reeve", "Z'hana",

  // Southern Village
  "Lucien", "Reth",
  ]

let relics = [
  // Basic
  "Unstable Prism", "Mage's Talisman", "Flexing Dagger",
  "Focusing Orb", "Bottled Vortex", "Blasting Staff",

  // Return To Gravehold
  "Glass-Eyed Oracle",

  // The Outer Dark
  "Astral Cube", "Riddlesphere",

  // Shattered Dreams
  "Reflective Conduit", "Will Weaver",

  // The Depths
  "Transmogrifier", "Vim Dynamo",

  // Southern Village
  "Cat's Eye", "Volt Replicator", "Energized Conduit",
]

let gems = [
  // Basic
  "Sifter's Pearl", "Diamond Cluster", "Clouded Sapphire", "Jade",
  "V'riswood Amber", "Burning Opal", "Searing Ruby",

  // Return To Gravehold (NONE)

  // The Outer Dark
  "Alien Element", "Haunted Berylite", "Pain Stone",

  // Shattered Dreams
  "Cache Glass", "Olivinite",

  // The Depths
  "Banishing Topaz",

  // Southern Village
  "Guickening Qitite", "Jeweled Urup",   
]

let spells = [
  // Basic
  "Phoenix Flame", "Spectral Echo", "Chaos Arc", "Consuming Void",
  "Dark Fire", "Wildfire Whip", "Arcane Nexus", "Lava Tendril",  
  "Esence Theft", "Feral Lightning", "Ignite", "Oblivion Swell",
  "Planar Insight", "Amplify Vision",

  // Return To Gravehold
  "Cleanse", "Memory Break",

  // The Outer Dark
  "Char", "Catalyst", "Feedback Aura", "Nether Conduit", "Pyromancy",
  "Scorch",

  // Shattered Dreams
  "Breach Seeker", "Crecendo Ray", "Embody Flame", "Snap Ritual",
  "Mantra of Strength", "Storm Vapors",

  // The Depths
  "Void Bond", "Combustion", "Devouring Shadow", "Monstrous Inferno",
  "Disintegrating Scythe",

  // Southern Village
  "Gathering Winds", "Cinder Shower", "Erasure of Mind", "Flame Jab",
  "Reaper's Flame", 
]

let stuff = {"Nemesis": nemesises, "Mage": mages, "Gem": gems,
  "Relic": relics, "Spell": spells}

let drawPile = [];
let discardPile = [];

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

// https://stackoverflow.com/questions/11935175/sampling-a-random-subset-from-an-array
function sample(arr, size) {
  var shuffled = arr.slice(0), i = arr.length, temp, index;
  while (i--) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
}

let shuffle = () => { 
  drawPile.push(...discardPile);
  discardPile = [];
  shuffleArray(drawPile);

  while (document.querySelector('#draw').firstChild) {
    document.querySelector('#draw').removeChild(document.querySelector('#draw').lastChild);
  }

  for (let i = 0; i < drawPile.length; i++) {
    let img = document.createElement("img")
    img.src = "Back.svg";
    img.addEventListener("click", next);
    img.classList.add("back");
    let offset = 20*i;
    document.querySelector('#draw').appendChild(img);
    document.querySelector('#draw').lastChild.style.top = offset.toString() + "px";
  }

  while (document.querySelector('#discard').firstChild) {
    document.querySelector('#discard').removeChild(document.querySelector('#discard').lastChild);
  }
};

let reset = () => {
  let nplayers = document.querySelector("#nplayers").value; 
  $( "#dialog" ).dialog( "close" );
  
  if (nplayers == 1) {
    drawPile = ["1", "1", "1", "1", "N", "N"];
  }
  else if (nplayers == 2) {
    drawPile = ["1", "1", "2", "2", "N", "N"];
  }
  else if (nplayers == 3) {
    drawPile = ["1", "2", "3", "W", "N", "N"];
  }
  else {
    drawPile = ["1", "2", "3", "4", "N", "N"];
  }
  discardPile = [];
  shuffle();
}

let listDiscard = () => {
  let output = ""
  for (let i = 0; i < discardPile.length; i++) {
    if (discardPile[i] == "W") {
      output += "Wild";
    }
    else if (discardPile[i] == "N") {
      output += "Nemesis";
    }
    else {
      output += discardPile[i]
    }
    if (i+1 < discardPile.length) {
      output += ", "
    }
  }
  return output;
}

let next = () => { 
  if (drawPile.length == 0) {
    shuffle();
  }
  document.querySelector('#draw').removeChild(document.querySelector('#draw').lastChild);
  let nextCard = drawPile.pop();
  discardPile.push(nextCard);

  let cards = document.querySelector('#discard').children;
  let img = document.createElement("img")
  img.src = nextCard + ".svg";
  let offset = 20*cards.length;
  document.querySelector('#discard').appendChild(img);
  document.querySelector('#discard').lastChild.style.top = offset.toString() + "px";
  document.querySelector('#discard').lastChild.title = listDiscard();
};

let reveal = () => { 
  if (drawPile.length == 0) {
    shuffle();
  }
  let topCard = document.querySelector('#draw').lastChild;
  if (topCard.src.endsWith("Back.svg")) {
    topCard.src = drawPile.at(-1) + ".svg";
  }
  else {
    topCard.src = "Back.svg";
  }
};

let reorder = () => {
  let cardOrder = document.querySelector("#sortlist").children;
  drawPile = [];
  for (let i = cardOrder.length-1; i >= 0; i--) {
    let fname = cardOrder[i].firstChild.src;
    let card = fname.substring(fname.length - 5)[0];
    drawPile.push(card);
  }
  $( "#reorder" ).dialog( "close" );
  document.querySelector('#draw').lastChild.src = "Back.svg";
}

let openReorder = () => {
  $("#reorder").dialog("open");
  let cardOrder = document.querySelector("#sortlist");
  while (cardOrder.firstChild) {
    cardOrder.removeChild(cardOrder.lastChild);
  }
  for (let i = drawPile.length-1; i >= 0; i--) {
    let li = document.createElement("li");
    let img = document.createElement("img");
    img.src = drawPile[i] + ".svg";
    img.classList.add("miniCard");
    li.appendChild(img);
    cardOrder.appendChild(li);
  }
  slist(document.getElementById("sortlist"));
}

let openRand = () => {
  $("#rand").dialog("open");
}

let showSample = () => {
  let selection = document.querySelector('input[name="rand"]:checked').value;
  let n = document.getElementById('n').value;
  n = Math.min(n, stuff[selection].length);
  document.querySelector("#result").innerHTML = sample(stuff[selection], n).join("<br>");
}

let moveToDraw = () => {
  let returnCard = document.querySelector("#returnselect").value; 
  $( "#return" ).dialog( "close" );
  let index = discardPile.indexOf(returnCard);
  discardPile.splice(index, 1);
  drawPile.push(returnCard);
  shuffleArray(drawPile);

  let img = document.createElement("img");
  img.src = "Back.svg";
  img.addEventListener("click", next);
  img.classList.add("back");
  let offset = 20*(drawPile.length-1);
  document.querySelector('#draw').appendChild(img);
  document.querySelector('#draw').lastChild.style.top = offset.toString() + "px";
  while (document.querySelector('#discard').firstChild) {
    document.querySelector('#discard').removeChild(document.querySelector('#discard').lastChild);
  }
  for (let i = 0; i < discardPile.length; i++) {
    let img = document.createElement("img")
    img.src = discardPile[i] + ".svg";
    let offset = 20*i;
    document.querySelector('#discard').appendChild(img);
    document.querySelector('#discard').lastChild.style.top = offset.toString() + "px";
  }
  document.querySelector('#discard').lastChild.title = listDiscard();
}
  

let openReturn = () => {
  $("#return").dialog("open");
  let select = document.querySelector("#returnselect");
  while (select.firstChild) {
    select.removeChild(select.lastChild);
  }
  for (let i = 0; i < discardPile.length; i++) {
    let option = document.createElement("option");
    option.value = discardPile[i];
    option.text = discardPile[i];
    select.appendChild(option);
  }
}


// window.addEventListener("DOMContentLoaded", () => {
//   document.getElementById("draw").addEventListener("click", next);
// });



