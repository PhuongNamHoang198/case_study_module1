class Rocket
{
    constructor()
    {
        this.x=250;
        this.width=85;
        this.height=150;
        this.y=650-10-this.height;
        this.image=document.getElementById('player');
    }
    moveLeft()
    {
        this.x-=30;
        if(this.x<=0) this.x+=30;
    }
    moveRight()
    {
        this.x+=30;
        if(this.x>=500-this.width) this.x-=30;
    }
    moveTop()
    {
        this.y-=30;
        if(this.y<=0) this.y+=30;
    }
    moveDown()
    {
        this.y+=30;
        if(this.y>=650-this.height) this.y-=30;
    }
}