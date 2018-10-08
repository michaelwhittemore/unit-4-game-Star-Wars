//decalre variables
var player;
var playerSelected;

//reset function will start a new game
reset()
function reset(){
    player=null;
    playerSelected=false;
}
$("#droid").on("click",function(){
    selectCharacter($("#droid"));
})
$("#sand").on("click",function(){
    selectCharacter($("#sand"));
})
$("#high").on("click",function(){
    selectCharacter($("#high"));
})
$("#darth").on("click",function(){
    selectCharacter($("#darth"));
})


//when a character portrait is slected if no PC has
//been chosen make the selction the player and move the character
//to the player area
//borders should change when choice is made
function selectCharacter(choice){
    if(!playerSelected){
        playerSelected=true;
        player=choice;
        player.appendTo("#yourcharacter");
    }

}