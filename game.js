

var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];

var level=0;
var started=false;

$(document).keydown(function(){
    if(started==false){
        $('#level-title').text('Level '+level);
        nextSequence();
        started=true;
    }
});

$('.btn').click(function(){
    var userChosenColor=$(this).attr('id');
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});



function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        // console.log('Success');
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } else {
        playSound('wrong');
        $('body').addClass('game-over');
        $('#level-title').text('Game-Over! Press any key to restart.')
        setTimeout(function(){
            $('body').removeClass('game-over');
        },200);
        startOver();
    }
}

function nextSequence(){
    userClickedPattern=[];
    level+=1;
    $('#level-title').text('Level '+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);              
    $('#'+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name){
    var sound=new Audio('sounds/'+name+'.mp3');
    sound.play();
}

function animatePress(currentColor){
    $('#'+currentColor).addClass('pressed');
    setTimeout(function(){
        $('#'+currentColor).removeClass('pressed');
    },150);
}

function startOver(){
    level=0;
    started=false;
    gamePattern=[]
}














