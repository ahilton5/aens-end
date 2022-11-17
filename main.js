let nemesises = ["Wraithmonger", "The Wailing", "Fortress",
  "Burrower", "Crooked Mask", "Rageborne", "Carapace Queen",
  "Horde-Crone", "Prince of Gluttons", "Thrice-Dead Prophet"]

let mages = ["Z'hana", "Brama", "Nym", "Nook", "Indira",
  "Xaxos", "Mist", "Kadir", "Lash", "Phaedraxa", "Cairna",
  "Reeve", "Ohat and Ulgimor", "Remnant", "Adelheim",
  "Jian"]

let relics = ["Transmogrifier", "Untable Prism", "Mage's Talisman",
  "Flexing Dagger", "Focusing Orb", "Glass-Eyed Oracle",
  "Riddlesphere", "Bottled Vortex", "Reflective Conduit",
  "Will Weaver", "Astral Cube", "Vim Dynamo", "Blasting Staff"]

let gems = ["Pain Stone", "Sifter's Pearl", "Banishing Topaz",
  "Clouded Sapphire", "Burning Opal", "Alien Element",
  "Haunted Berylite", "Cache Glass", "V'riswood Amber", "Jade",
  "Olivinite", "Diamond Cluster", "Searing Ruby"]

let spells = ["Phoenix Flame", "Spectral Echo", "Catalyst",
  "Cleanse", "Pyromancy", "Scorch", "Ignite", "Chaos Arc",
  "Wildfire Whip", "Arcane Nexus", "Disintegrating Scythe",
  "Lava Tendril", "Embody Flame", "Dark Fire", "Esence Theft",
  "Monstrous Inferno", "Devouring Shadow", "Feral Lightning",
  "Oblivion Swell", "Memory Break", "Combustion", "Planar Insight",
  "Consuming Void", "Void Bond", "Amplify Vision", "Breach Seeker",
  "Mantra of Strength", "Crecendo Ray", "Snap Ritual", 
  "Storm Vapors", "Char", "Feedback Aura", "Nether Conduit"]

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
  console.log(sample(stuff[selection], n));
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



