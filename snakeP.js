var y,x;
var cy,cx;
var MY=20, MX=34;
var score;
var keepMove;
//방향
var direction;
//속도
var speed;
//뱀의 좌표들
var snakeQueue = new Array();
//순서대로 뱀 바탕 벽 코인의 색
var snakeColor = "#ED5B5B",
    tileColor = "#EEEEEE"
    wallColor = "#2E2E2E",
    coinColor = "#4476C6";

//실행
init(); 

//화살표 입력에 따라 방향 전환
document.onkeydown = keyDownEventHandler;
function keyDownEventHandler(e){
    if(e.keyCode==38 && direction!=1) direction = 0; // up
    else if(e.keyCode==40 && direction!=0) direction = 1; // down
    else if(e.keyCode==37 && direction!=3) direction = 2; // left
    else if(e.keyCode==39 && direction!=2) direction = 3; // right
}




function init() {
    //기본 그림 판과 벽
    drawBoard();
    drawWall();
    //뱀 기본 좌표
    y=parseInt(MY/2);
    x=parseInt(MX/2);
    //뱀 생성
    setSnake(y,x);
    //코인 생성
    setCoin();
    //기초 값
    score=0;
    direction=-1;
    speed=75;
    //이동 속도 지정
    keepMove = setInterval("move(direction)",speed);
}



//그림 그릴 판 준비
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
//벽 그리기
function drawWall() {
    //벽 좌표 저장
    var wallCell = new Array(); 
    for(var i=0; i<MY; i++) wallCell.push(new Array(i,0));
    for(var i=0; i<MY; i++) wallCell.push(new Array(i,MX-1));
    for(var i=0; i<MX; i++) wallCell.push(new Array(0,i));
    for(var i=0; i<MX; i++) wallCell.push(new Array(MY-1,i));
    //벽 그리기
    for(var i=0; i<wallCell.length; i++) {
        var wy = wallCell[i][0];
        var wx = wallCell[i][1];
        document.getElementById(String(wy)+" "+String(wx)).style.background = wallColor;
        document.getElementById(String(wy)+" "+String(wx)).style.borderRadius = "1.5px"; //모서리 둥글게
    }
}



//뱀 생성
function setSnake(y,x) {
    snakeQueue.push(new Array(y,x));
    document.getElementById(String(y)+" "+String(x)).style.background = snakeColor;
}
//이동시 맨 뒤에 그려져 있는 뱀 삭제
function removeSnake() {
    var ty = snakeQueue[0][0];
    var tx = snakeQueue[0][1];
    snakeQueue.shift();
    document.getElementById(String(ty)+" "+String(tx)).style.background = tileColor;
}



//뱀 방향 바꾸기
function move(direction) {
    switch(direction) {
        case 0: y-=1; break;
        case 1: y+=1; break;
        case 2: x-=1; break;
        case 3: x+=1; break;
        default: return;
    }
    //함수가 참일 경우 게임 리셋
    if(isInvalidMove(y,x)) gameover();
    setSnake(y,x);
    meetCoin();
    scoring();
}



function meetCoin() {
    //코인을 먹었을 경우
    if(IsCoin()) {
        //뱀 길이 * 100 만큼 점수 추가
        score += 100*(snakeQueue.length-1);
        //코인 재생성
        setCoin();
        showPlus();
        document.getElementById(String(y)+" "+String(x)).style.borderRadius = "3px";
    }
    //코인을 먹지 않았을 경우 맨 뒤에 뱀 삭제 및 뱀길이 만큼에 점수 추가
    else{
        removeSnake(y,x);
        score+=snakeQueue.length;
    }
}
//추가 점수 얻는 것을 화면에 띄움
function showPlus(){
    var plusedScore=100*(snakeQueue.length-1);
    document.getElementById("plus").innerHTML = "     +"+plusedScore;
    //0.5초동안 띄움
    setTimeout("document.getElementById(\"plus\").innerHTML=\"\"",500);
}



//벽에 닿거나 isCollapsed 함수가 참일 경우 True로 돌려 보냄
function isInvalidMove(y,x) {
    return (y==0||y==MY-1||x==0||x==MX-1) || isCollapsed(y,x);
}
//isInQueue 함수가 참일 경우 True 아니면 False
function isCollapsed(y,x) {
    if(isInQueue(y,x)) return true;
    return false;
}
//x y 가 뱀의 몸 좌표와 같다면 True 아니면 False를 돌려 보냄
function isInQueue(y,x) {
    var p = new Array(y,x);
    for(var i = 0; i<snakeQueue.length; i++) {
        if(snakeQueue[i][0]==p[0] && snakeQueue[i][1]==p[1]) {
            return true;
        }
    }
    return false;
}



//코인 생성
function setCoin() {
    //새로 만든 코인의 좌표가 뱀과 겹치지 않을 때까지 좌표 정하기
    do{
        var rand = parseInt(Math.random()*((MY-2)*(MX-2)));
        cy=parseInt(rand/(MX-2))+1;
        cx=rand%(MX-2)+1;
    }while(isInQueue(cy,cx))
    //코인 디자인
    document.getElementById(String(cy)+" "+String(cx)).style.background = coinColor;
    document.getElementById(String(cy)+" "+String(cx)).style.borderRadius = "6px";
}
//코인의 위치와 뱀의 머리 위치가 같다면 참
function IsCoin() {
    return (y==cy && x==cx);
}




function scoring(){
    document.getElementById("score").innerHTML = score;
}

function gameover(){
    //Game Over 및 점수 표시
    alert("[Game Over]\nScore: "+score);
    init();
    location.reload();
}