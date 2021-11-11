var y,x;
var cy,cx;
var MY=20, MX=34;
var score;
var snakeQueue = new Array();
var snakeColor = "#ED5B5B",
    tileColor = "#EEEEEE"
    wallColor = "#2E2E2E",
    coinColor = "#4476C6";

init();

function init() {
    drawBoard();
    drawWall();
    y=parseInt(MY/2);
    x=parseInt(MX/2);
    setSnake(y,x);
    setCoin();
    score=0;
}

function drawBoard() {
    var boardTag = "<table border=0>";
    for(var i=0; i<MY; i++) {
        boardTag += "<tr>";
        for(var j=0; j<MX; j++) {
            boardTag += "<td id=\""+String(i)+" "+String(j)+"\"></td>";
        }
        boardTag += "</tr>";
    }
    boardTag += "</table>";
    document.write(boardTag);
}   

function drawWall() {
    var wallCell = new Array(); 
    for(var i=0; i<MY; i++) wallCell.push(new Array(i,0));
    for(var i=0; i<MY; i++) wallCell.push(new Array(i,MX-1));
    for(var i=0; i<MX; i++) wallCell.push(new Array(0,i));
    for(var i=0; i<MX; i++) wallCell.push(new Array(MY-1,i));
    for(var i=0; i<wallCell.length; i++) {
        var wy = wallCell[i][0];
        var wx = wallCell[i][1];
        document.getElementById(String(wy)+" "+String(wx)).style.background = wallColor;
        document.getElementById(String(wy)+" "+String(wx)).style.borderRadius = "1.5px"; //모서리 둥글게
    }
}

function setSnake(y,x) {
    snakeQueue.push(new Array(y,x));
    document.getElementById(String(y)+" "+String(x)).style.background = snakeColor;
}
function removeSnake() {
    var ty = snakeQueue[0][0];
    var tx = snakeQueue[0][1];
    snakeQueue.shift();
    document.getElementById(String(ty)+" "+String(tx)).style.background = tileColor;
}

function isInQueue(y,x) {
    var p = new Array(y,x);
    for(var i = 0; i<snakeQueue.length; i++) {
        if(snakeQueue[i][0]==p[0] && snakeQueue[i][1]==p[1]) {
            return true;
        }
    }
    return false;
}

function setCoin() {
    do{
        var rand = parseInt(Math.random()*((MY-2)*(MX-2)));
        cy=parseInt(rand/(MX-2))+1;
        cx=rand%(MX-2)+1;
    }while(isInQueue(cy,cx))
    document.getElementById(String(cy)+" "+String(cx)).style.background = coinColor;
    document.getElementById(String(cy)+" "+String(cx)).style.borderRadius = "6px";
}