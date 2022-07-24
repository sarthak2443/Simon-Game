var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern =[];
var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});

$(".begin").click(function () {
    if (!started) {
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
    $(".begin").hide();
    }
});


$(".btn").click(function(){

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        
    if (userClickedPattern.length === gamePattern.length) {
    setTimeout(function(){
        nextSequence();
    },1000);
    }
    } else {
    console.log("wrong");
    playSound("wrong");
    // var audio = new Audio("sounds/Game Over.mp3");
    // audio.play();

    $("body").addClass("game-over");
    setTimeout(function (){
        $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game over,Press start to Play again");
        $(".begin").fadeIn();
    startOver();
}
}


function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level "+level);

    var randomNumber = Math.random();
    randomNumber = Math.floor(randomNumber * 4);
    
    var randomChoosenColor = buttonColours[randomNumber];

    gamePattern.push(randomChoosenColor);

    $("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChoosenColor);

}

function startOver() {
    gamePattern = [];
    started = false;
    level = 0;
}


function playSound(name){

    var audio = new Audio("sounds/" +name+ ".mp3");
    audio.play();
}

function animatePress(currentColor){

    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
    },100);

}
