class Bomb
{
    constructor(x,y)
    {
        this.x=x;
        this.y=y;
        this.width=45;
        this.height=120;
        this.image=document.getElementById('thread');
    }
    moveThread()
    {
        this.y+=2;
        if(this.y==650)
        {
            this.y=-150;
            this.x=Math.random()*555;
        }
    }
    reset()
    {
        this.x=Math.random()*555;
        this.y-=650;
    }
}