var darragh = {name: "darragh", target: ""};
var ian = {name:"ian", target: ""};
var roro = {name:"roro", target: ""};
var jc =  {name: "jc", target: ""};
var sharon = {name: "sharon", target: ""};
var vikash = {name: "vikash", target: ""};


var players = [darragh, ian, jc, roro, sharon, vikash];

function shuffle(assassinTargets){
    for(var j, x, i = assassinTargets.length; i; j = Math.floor(Math.random() * i), x = assassinTargets[--i], assassinTargets[i] = assassinTargets[j], assassinTargets[j] = x);
        
    return assassinTargets;
}

var list = shuffle(players);

list.forEach(function(player, i) {

    if(i < list.length - 1) {
        player.target = list[i + 1].name;    
    } else {
        player.target = list[0].name;
    }
    
});

console.log(list);

// function playerShuffle() {
//     var playerPool = players.length - 1;
//     var targets = [];
//     var assignedPlayers = [];
    
//     players.forEach(function(player) {
//         targets.push(player);
//     });
    
//     function assignTarget(player, playerPosition) {
//         player.target = targets.splice(playerPosition, 1)[0].name;
//         assignedPlayers.push(player);
//     }
    
//     var gotThemself = 0;
//     players.forEach(function(player) {
        
//         var playerPosition = Math.floor(Math.random() * playerPool) + 1;
        
        
//         if(playerPool > 0) {
//             while(player.name === targets[playerPosition].name) {
//                 playerPosition = Math.floor(Math.random() * playerPool) + 1;
//             }
//             assignTarget(player, playerPosition);
//             playerPool -= 1;
//             console.log("targets", player);
//         } 
//         else if (playerPool === 120) {
//             // assignTarget(player, playerPosition);
//             console.log("else if player", player);
//             console.log("else if targets", targets);
//             playerPool -= 1;
            
//         } else {
//             // console.log("targets else", targets);
//             console.log("else player", player);
//         }
//     }) 
// }

// playerShuffle();