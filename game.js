// alert("hello simon");

buttonColours = ["red", "blue", "green", "yellow"];

var gamePattren = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Levle" + level);
    nextSequence();
    started = true;
  }
});

function startOver() {
  level = 0;
  gamePattren = [];
  started = false;
}

function checkAnswer(currentLevel) {
  if (gamePattren[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success !!");

    if (userClickedPattern.length === gamePattren.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong !!");

    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, press any key to restart");

    startOver();
  }
}

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  //console.log(userClickedPattern);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattren.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(200)
    .fadeOut(200)
    .fadeIn(200);

  playSound(randomChosenColour);

  level++;
  $("#level-title").text("Level: " + level);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
