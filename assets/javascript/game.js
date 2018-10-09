//decalre variables
var player;
var playerSelected;
var needEnemy;
var currentAP;
var enemy;
var droid = { ID: $("#droid") };
var sand = { ID: $("#sand") };
var high = { ID: $("#high") };
var darth = { ID: $("#darth") };
var characterList = [droid, sand, high, darth]
var defeated;
//initalize values
reset();
//reset function will start a new game
//AP=attack power, CAP=Counter attack power
function reset() {
    enemy = player = null;
    playerSelected = false;
    needEnemy = true;
    $("#droid").show();
    $("#sand").show();
    $("#high").show();
    $("#darth").show();
    $("#reset").hide();
    currentAP=defeated= 0;
    droid.HP = 100; droid.AP = 12; droid.CAP = 23; droid.name= "The Droid Attack on the Wookiees";
    sand.HP = 180; sand.AP = 5; sand.CAP = 12; sand.name="Sand";
    high.HP = 150; high.AP = 7; high.CAP = 17; high.name="The High Ground";
    darth.HP = 120; darth.AP = 9; darth.CAP = 19; darth.name= "The Tragedy of Darth Plagueis the Wise";
    for (i in characterList) {
        characterList[i].ID.appendTo("#characters");
    }
    updateText();
}
//onlcick functions
$("#droid").on("click", function () {
    selectCharacter(droid);
})
$("#sand").on("click", function () {
    selectCharacter(sand);
})
$("#high").on("click", function () {
    selectCharacter(high);
})
$("#darth").on("click", function () {
    selectCharacter(darth);
})
$("#attack").click(function(){
    if(!needEnemy){
        combat();
    }
    else{
        alert("You need to chose an enemy!")
    }
})
$("#reset").click(function(){
    reset();
})

//when a character portrait is slected if no PC has
//been chosen make the selction the player and move the character
//to the player area
//borders should change when choice is made
function selectCharacter(choice) {
    if (!playerSelected) {
        playerSelected = true;
        player = choice;
        //need to move all the others to enemies
        for (i in characterList) {
            characterList[i].ID.appendTo("#enemies")
        }
        player.ID.appendTo("#yourcharacter");
    }
    //if the player needs an enemy we move the slected choice in defender
    else if (needEnemy) {
        if (choice != player) {
            choice.ID.appendTo("#defender")
            enemy=choice;
            needEnemy=false;
        }
    }
    else{
        alert("Invalid Selection")
    }
}
//need a function to update all the spans
function updateText() {
    $("#droidhealth").text(droid.HP);
    $("#sandhealth").text(sand.HP);
    $("#highhealth").text(high.HP);
    $("#darthhealth").text(darth.HP);
}
//this function runs combat
function combat(){
    currentAP+=player.AP;
    enemy.HP-=currentAP;
    $("#attackmessage").text("You deal "+currentAP+" damage. Your enemy's health is "+enemy.HP )
    //enemy dies
    if(enemy.HP<=0){
        needEnemy=true
        enemy.ID.hide();
        $("#endmessage").text("You Killed "+enemy.name+". Pick a new enemy.");
        enemy=null
        defeated++;
        if(defeated>2){
            win();
        }
    }
    else{
        player.HP-=enemy.CAP;
        $("#defensemessage").text(enemy.name+" counter attacks for "+enemy.CAP+" damage. Your current health is " +player.HP)

        $()
        //player dies
        if(player.HP<=0){
            lose();
        }
    }
    updateText();
}
function win(){
    $("#defensemessage").text("");
    $("#attackmessage").text("");
    $("#endmessage").text("You Won!");
    $("#reset").show();
}
function lose(){
    $("#defensemessage").text("");
    $("#attackmessage").text("");
    $("#endmessage").text("You Lost!");
    $("#reset").show();
}