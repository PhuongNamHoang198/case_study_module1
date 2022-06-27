let car=new Rocket();
displayCar();
let background_color='midnightblue';
let heartAmount=1;
let myHeart;

/*functions*/
function displayCar()
{
    let ctx=document.getElementById('container').getContext('2d');
    ctx.drawImage(car.image,car.x,car.y);
}
displayCar();
function removeCar()
{
    let ctx=document.getElementById('container').getContext('2d');
    ctx.fillStyle=background_color;
    ctx.fillRect(car.x-1,car.y-1,car.width+2,car.height+2);
}

/*move and stop move*/
let variableForStopMove=true;
function moveCar(event)
{
    if(variableForStopMove==false) return;
    if(event.keyCode==37)
    {
        /*move Left*/
        setTimeout(function(){removeCar();car.moveLeft();displayCar();},10);

    }
    else if(event.keyCode==39)
    {
        /*move right*/
        setTimeout(function(){removeCar();car.moveRight();displayCar();},10);

    }
    else if(event.keyCode==38)
    {
        /*move top*/
        setTimeout(function(){removeCar();car.moveTop();displayCar();},10);

    }
    else if(event.keyCode==40)
    {
        /*move down*/
        setTimeout(function(){removeCar();car.moveDown();displayCar();},10);

    }
}

/*heart*/
let heart=new Heart(Math.random()*520,0);
function displayHeart()
{
    let ctx=document.getElementById('container').getContext('2d');
    ctx.drawImage(heart.image,heart.x,heart.y,80, 80);
}
function removeHeart()
{
    let ctx=document.getElementById('container').getContext('2d');
    ctx.fillStyle=background_color;
    ctx.fillRect(heart.x,heart.y,heart.width,heart.height);
}
function moveHeart()
{
    myHeart = setInterval(function(){removeHeart();heart.moveHeart();displayHeart();if(checkTouch(car,heart)){eatHeart()}},10);
}

/*thread*/
let threadList=[];
let threadAmount=5;
let speed=10;
let myThread;
for(let i=0;i<threadAmount;i++)
{
    let newThread= new Bomb((Math.random()*555),(-150*(i+1)));
    threadList.push(newThread);
}
function displayThread(thread)
{
    let ctx=document.getElementById('container').getContext('2d');
    ctx.drawImage(thread.image,thread.x,thread.y,thread.width,thread.height);
}
function removeThread(thread)
{
    let ctx=document.getElementById('container').getContext('2d');
    ctx.fillStyle=background_color;
    ctx.fillRect(thread.x,thread.y,thread.width,thread.height);
}
function moveThreads()
{
    myThread = setInterval(function(){for(let i=0;i<threadAmount;i++)
    {
        removeThread(threadList[i]);
        threadList[i].moveThread();
        displayThread(threadList[i]);
        if(checkTouch(car,threadList[i])){touchThread(threadList[i]);}
    }},speed);
}

/*check touch*/
function checkPointTouch(point,object01)
{
    if(point[0]>object01.x && point[0]<object01.x+object01.width && point[1]>object01.y && point[1]<object01.y+object01.height)
        return true;
    else return false;
}
function checkTouch(object01,object02)
{
    let A=[object02.x,object02.y];
    let B=[object02.x+object02.width,object02.y+object02.height];
    let C=[object02.x+object02.width,object02.y];
    let D=[object02.x,object02.y+object02.height];

    if(checkPointTouch(A,object01)==true || checkPointTouch(B,object01)==true || checkPointTouch(C,object01)==true || checkPointTouch(D,object01)==true)
        return true;
    return false;
}

/*eat the heart*/
function eatHeart()
{
    removeHeart();
    console.log('Earned a Heart');
    heart.reset();
    /*print heartAmount*/

    let content='';
    heartAmount+=1;
    if(heartAmount>5) heartAmount-=1;
    for(let i=0;i<heartAmount;i++)
    {
        content+='<img style="padding:5px" src="image/heart.png" alt="heart" width="30" height="30">';
    }
    document.getElementById('display-heart').innerHTML=content;

}
function touchThread(thread)
{
    removeThread(thread);
    console.log('Touched Bomb !!!');
    thread.reset();
    /*print heartAmount*/

    let content='';
    heartAmount-=1;
    if(heartAmount==-1)
    {
        /*end game*/
        console.log('You Lose !');
        console.log('Your score : '+score);
        endGame();
    }
    for(let i=0;i<heartAmount;i++)
    {
        content+='<img src="image/heart.png" alt="heart" width="30" height="30">';
    }
    document.getElementById('display-heart').innerHTML=content;
}

/*Score*/
let score=0;
let myScore;
function increaseScore()
{
    myScore= setInterval(function(){score+=1;document.getElementById('display-score').innerHTML='Score : '+score;},1000);
}

/*start the game*/
function startGame()
{
    moveHeart();
    moveThreads();
    document.addEventListener('keydown',moveCar);
    increaseScore();
}
startGame()
/*end game*/
function doNothing(){};
function endGame()
{
    clearInterval(myHeart);
    clearInterval(myThread);
    clearInterval(myScore);
    variableForStopMove=false;

    setTimeout(function(){document.getElementById('game-container').innerHTML+=content;},1000);
}



