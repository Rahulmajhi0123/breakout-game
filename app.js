var dx = 1, dy = 1 , dt = 1;       /* displacement at every dt */
var level;
var bricksbroken = 0;
var beforestart;
var x, y;         /* ball location */
var score = 0;    /* # of walls you have cleaned */
var tries = 0;    /* # of tries to clean the wall */
var started = false;  /* false means ready to kick the ball */
var ball, court, paddle, brick, msg;
var court_height, court_width, paddle_left;

var bricks = new Array(4);  // rows of bricks
var colors = ["red","blue","yellow","green"];

/* get an element by id */
function id ( s ) { return document.getElementById(s); }

/* convert a string with px to an integer, eg "30px" -> 30 */
function pixels ( pix ) {
    pix = pix.replace("px", "");
    num = Number(pix);
    return num;
}

/* place the ball on top of the paddle */
function readyToKick () {
    x = pixels(paddle.style.left)+paddle.width/2.0-ball.width/2.0;
    y = pixels(paddle.style.top)-2*ball.height+5;
    ball.style.left = x+"px";
    ball.style.top = y+"px";
}

/* paddle follows the mouse movement left-right */
function movePaddle (e) {
    var ox = e.pageX-court.getBoundingClientRect().left;
    paddle.style.left = (ox < 0) ? "0px"
                            : ((ox > court_width-paddle.width)
                               ? court_width-paddle.width+"px"
                               : ox+"px");
    if (!started)
        readyToKick();
}

function initialize () {
    court = id("court");
    ball = id("ball");
    paddle = id("paddle");
    wall = id("wall");
    msg = id("messages");
    brick = id("red");
    level = id("level");
    court_height = pixels(court.style.height);
    court_width = pixels(court.style.width);
    for (i=0; i<4; i++) {
        // each row has 20 bricks
        bricks[i] = new Array(20);
        var b = id(colors[i]);
        for (j=0; j<20; j++) {
            var x = b.cloneNode(true);
            bricks[i][j] = x;
            wall.appendChild(x);
        }
        b.style.visibility = "hidden";
    }
    started = false;
 }

/* true if the ball at (x,y) hits the brick[i][j] */
function hits_a_brick ( x, y, i, j ) {
    var top = i*brick.height - 450;
    var left = j*brick.width;
    return (x >= left && x <= left+brick.width
            && y >= top && y <= top+brick.height);
}

function startGame () {
    if(!started){
beforestart = setInterval(ballmovement,10)
}
}
function resetGame () {
    for(i=0;i<4;i++)
    {
        for(j=0;j<20;j++)
        {
            bricks[i][j].style.visibility = "visible";
        }
    }
    tries = 0;
    var contentHolder = document.getElementById('tries');
    contentHolder.innerHTML = tries;
    bricksbroken = 0;
    started = false;
}
function ballmovement() {
    started = true;
    if(x>785 || x<-5){
        dx = -dx;
    }
    if(y<-court_height + 20){
        dy = -dy
    }
    if(y>pixels(paddle.style.top)-35){
        if(x>pixels(paddle.style.left)-20 && x<pixels(paddle.style.left) + paddle.width){
            dy = -dy
        }
        else{
            clearInterval(beforestart);
            started = false;
            readyToKick();
            tries += 1
            var contentHolder = document.getElementById('tries');
            contentHolder.innerHTML = tries;
        }
    }
    for(i=0;i<4;i++)
    {
        for(j=0;j<20;j++)
        {
            if(hits_a_brick(x,y,i,j) && bricks[i][j].style.visibility != "hidden"){
                bricks[i][j].style.visibility = "hidden";
                dy = -dy
                bricksbroken++;
            }
        }
    }
    if(bricksbroken == 80){
        score++;
        clearInterval(beforestart);
        readyToKick();
        var contentHolder1 = document.getElementById('score');
        contentHolder1.innerHTML = score;
    }

    x = x + dx*dt*level.value;
    y = y - dy*dt*level.value;
    ball.style.left = x+"px";
    ball.style.top = y+"px";
}
