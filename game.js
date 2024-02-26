// Title: Simon Game
// Author: Jordan Kelsey
// Date: January 20, 2024
// Purpose: Play the simon game, created as a personal project


let userClickedPattern = [];
let gamePattern = [];
let level = 0;

const buttonColors = ["red", "blue", "green", "yellow"];

console.log(userClickedPattern)
console.log(gamePattern)

// Get the next color sequence in the game
function nextSequence() {
    let randomNum =  Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNum];

    console.log(randomChosenColor);

    gamePattern.push(randomChosenColor);
    // Play the sound and highlight color for computer pattern
    for (let i = 0; i < gamePattern.length; i++) {
        setTimeout( function () {
            animatePress(gamePattern[i]);
            playSound(gamePattern[i]);
            }, i * 1000);
    }
    $("h1").text("level " + level);
    level = ++level;
}
 // Play sound and highlight color when mouse click
 $(".btn").click( function () {
     let userChosenColor = $(this).attr("id");
     userClickedPattern.push(userChosenColor);
     playSound(userChosenColor);
     animatePress(userChosenColor);
     checkAnswer(userClickedPattern.length - 1);
 });


// Sound for buttons
function playSound(name) {
    let audio1 = new Audio("sounds/" + name + ".mp3" );
    audio1.play();
}


// Highlight animation
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout( function () {
        $("#" + currentColor).removeClass("pressed");
        }, 100);
}


// Starts the game on initial load
$("html").keyup("keyup", function () {
    nextSequence();
    once: true;
});


// Verify user click pattern is correct
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success");

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout( nextSequence,1000);
            userClickedPattern = [];
        }

    } else {
        console.log("Wrong");
        let wrong = new Audio("sounds/wrong.mp3" );
        wrong.play();
        $("body").addClass("game-over");
        setTimeout( function () {
            $("body").removeClass("game-over");
            }, 100);
        $("h1").text("Game Over, Press Any Key to Restart");
        $("html").keyup( "keyup", function () {
            startOver();
        });
    }

}


// To restart game
let startOver = function () {
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
    nextSequence();
}


