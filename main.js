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
  "The Burning Kor",

  // War Eternal
  "Umbra Titan", "Hollow Crown", "Magus of Cloaks", "Gate Witch"
]

let mages = [
  // Basic
  "Brama", "Xaxos", "Mist (Basic)", "Kadir", "Lash", "Phaedraxa",
  "Adelheim", "Jian",

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

  // War Eternal
  "Dezmodia", "Ulgimor", "Quilius", "Mazahaedron", "Yan Magda",
  "Mist (War Eternal)", "Gex", "Garu",
  ]

let relics = [
  // Basic
  "Unstable Prism (3)", "Mage's Talisman (5)", "Flexing Dagger (2)",
  "Focusing Orb (4)", "Bottled Vortex (3)", "Blasting Staff (4)",

  // Return To Gravehold
  "Glass-Eyed Oracle (1)",

  // The Outer Dark
  "Astral Cube (5)", "Riddlesphere (3)",

  // Shattered Dreams
  "Reflective Conduit (3)", "Will Weaver (7)",

  // The Depths
  "Transmogrifier (4)", "Vim Dynamo (4)",

  // Southern Village
  "Cat's Eye (1)", "Volt Replicator (4)", "Energized Conduit (7)",

  // War Eternal
  "Vortex Guantlet (6)", "Primordial Fetish (4)", "Mages Totem (2)",
  "Fiend Catcher (3)", "Conclave Scroll (3)", "Cairn Compass (4)",
]

let gems = [
  // Basic
  "Sifter's Pearl (3)", "Diamond Cluster (4)", "Clouded Sapphire (6)", "Jade (2)",
  "V'riswood Amber (3)", "Burning Opal (5)", "Searing Ruby (4)",

  // Return To Gravehold (NONE)

  // The Outer Dark
  "Alien Element (4)", "Haunted Berylite (3)", "Pain Stone (6)",

  // Shattered Dreams
  "Cache Glass (4)", "Olivinite (3)",

  // The Depths
  "Banishing Topaz (5)",

  // Southern Village
  "Guickening Qitite (3)", "Jeweled Urup (5)",

  // War Eternal
  "Volcanic Glass (3)", "Scoria Slag (4)", "Frozen Magmite (3)",
  "Erratic Ingot (5)", "Dread Diamond (3)", "Breach Ore (4)",
  "Bloodstone Jewel (6)"
]

let spells = [
  // Basic
  "Phoenix Flame (3)", "Spectral Echo (3)", "Chaos Arc (6)", "Consuming Void (7)",
  "Dark Fire (5)s", "Wildfire Whip (6)", "Arcane Nexus (7)", "Lava Tendril (4)",  
  "Esence Theft (5)", "Feral Lightning (5)", "Ignite (4)", "Oblivion Swell (5)",
  "Planar Insight (6)", "Amplify Vision (4)",

  // Return To Gravehold
  "Cleanse (4)", "Memory Break (6)",

  // The Outer Dark
  "Char (8)", "Catalyst (6)", "Feedback Aura (5)", "Nether Conduit (7)", "Pyromancy (7)",
  "Scorch (5)",

  // Shattered Dreams
  "Breach Seeker (5)", "Crecendo Ray (4)", "Embody Flame (7)", "Snap Ritual (6)",
  "Mantra of Strength (3)", "Storm Vapors (4)",

  // The Depths
  "Void Bond (4)", "Combustion (5)", "Devouring Shadow (6)", "Monstrous Inferno (8)",
  "Disintegrating Scythe (7)",

  // Southern Village
  "Gathering Winds (3)", "Cinder Shower (5)", "Erasure of Mind (7)", "Flame Jab (1)",
  "Reaper's Flame (7)", 

  // War Eternal
  "Reduce to Ash (7)", "Pyrotechnic Surge (4)", "Nova Forge (6)",
  "Kindle (4)", "Jagged Lightning (4)", "Fiery Torrent (5)",
  "Equilibrium (7)", "Crystalize (8)", "Convection Field (5)",
  "Celestial Spire (5)", "Conjure the Lost (6)", "Carbonize (4)",
  "Aurora (5)", "Thoughtform Familiar (3)"
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
  document.querySelector("#result").innerHTML = "";
  let selection = document.querySelector('input[name="rand"]:checked').value;
  let n = document.getElementById('n').value;
  n = Math.min(n, stuff[selection].length);
  if (selection === "Gem" || selection === "Relic" || selection === "Spell") {
    let table = document.createElement("table");
    let items = sample(stuff[selection], n);
    let tr = document.createElement("tr");
    let cardHeader = document.createElement("th");
    cardHeader.innerHTML = "Card";
    tr.appendChild(cardHeader);
    let costHeader = document.createElement("th");
    costHeader.innerHTML = "Cost";
    table.appendChild(tr);
    tr.appendChild(costHeader);
    for (let i = 0; i < items.length; i++) {
      let row = document.createElement("tr");
      let card = document.createElement("td");
      card.innerHTML = items[i].split(" (")[0];
      row.appendChild(card);
      let cost = document.createElement("td");
      cost.innerHTML = items[i].split(" (")[1].slice(0, -1);
      row.appendChild(cost);
      table.appendChild(row);
    }
    document.querySelector("#result").appendChild(table);
  }
  else {
    document.querySelector("#result").innerHTML = sample(stuff[selection], n).join("<br>");
  }
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



