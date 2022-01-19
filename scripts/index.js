// Variables
const sixSidedDices = [
    "fas fa-dice-one",
    "fas fa-dice-two",
    "fas fa-dice-three",
    "fas fa-dice-four",
    "fas fa-dice-five",
    "fas fa-dice-six",
];
const otherDices = ["4", "8", "10", "12", "20", "48", "100"];
let nextDiceNum = 1;
let stuntRolls = [];
let totalRoll = 0;

// Functions
function rollNumber(n) {
  let newRoll = 0;
  newRoll = Math.floor(Math.random() * n);
  if (n !== 6) {
    totalRoll += newRoll + 1;
  } else {
    totalRoll += newRoll + 1;
    if (stuntRolls.length < 3) {
      stuntRolls.push(newRoll+1);
    }
  }
  return newRoll;
}

function checkStunt() {
  if ($(".dice").length === 3 && stuntRolls.length === 3) {
    if (stuntRolls[0] === stuntRolls[1] || stuntRolls[1] === stuntRolls[2] || stuntRolls[0] === stuntRolls[2]) {
      let stunt = stuntRolls[2];
      $("#stunt").text(`Stunt: ${stunt}`);
      $("#stunt").removeClass("hidden");
      $("#stunt-btn").removeClass("hidden");
    } else {
      $("#stunt, #stunt-btn").addClass("hidden");
    }
  } else {
    $("#stunt, #stunt-btn").addClass("hidden");
  }
}

function rollOtherDices() {
  for (let i of otherDices) {
    $(`.d${i} `).text(function() {
      return rollNumber(i)+1;
    });
  }
}

function rollSixSidedDices() {
  for (let i of sixSidedDices) {
    $(".d6").removeClass(i);
  }
  $(".d6").addClass(function() {
    return sixSidedDices[rollNumber(6)];
  });
}

function rollDices() {
  stuntRolls = [];
  totalRoll = 0;
  rollSixSidedDices();
  rollOtherDices();
  $("#total").text(`Total: ${totalRoll}`);
  checkStunt();
}

function createDice(type, colour) {
  let newDice = "";
  if (type === "d6") {
    newDice = `<div id="d-num-${nextDiceNum}" class="dice d6 ${colour} fas fa-dice-one" data-bs-toggle="tooltip" style="display: none;" title="Remove"></div>\n`;
  } else {
    newDice = `<div id="d-num-${nextDiceNum}" class="dice ${type}" data-bs-toggle="tooltip" style="display: none; background-image: url('images/dices/${type}-${colour}.png');" title="Remove">1</div>\n`;
  }
  return newDice;
}

function addDice(type, colour) {
  $("#dices").append(createDice(type, colour));
  $(`#d-num-${nextDiceNum}`).fadeIn(300);
  $(`#d-num-${nextDiceNum}`).click(function() {
    $(this).fadeOut(300, function() {
      $(this).remove();
    });
  });
  nextDiceNum ++;
}

// Add Dice Button
$("#add-btn").on("click", function() {
  let chosenDice = $("#chosen-dice option:selected").text();
  let chosenColour = $("#chosen-colour option:selected").text();
  addDice(chosenDice, chosenColour);
});

// Roll Dices Button
$("#refresh-btn").on("click", function() {
  rollDices();
});

// Button Animation On Click (for phones mainly)
$(".my-btn").on("touchstart", function() {
  $(this).animate({opacity: "0.5"}, "fast", function () {
    $(this).animate({opacity: "1"}, "fast");
  });
});

// On Initiate
addDice("d6", "green");
addDice("d6", "green");
addDice("d6", "red");
rollDices();
