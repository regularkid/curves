class Input
{
    constructor(canvas)
    {
        this.canvas = canvas;
        this.x = 0;
        this.y = 0;
        this.isisTouchActive = false;
        this.isNewTouch = false;

        canvas.addEventListener("mousedown", e => { this.isTouchActive = true; this.isNewTouch = true; }, true);
        canvas.addEventListener("mouseup", e => { this.isTouchActive = false }, true);
        canvas.addEventListener("mousemove", e => { this.SetInputPos(e); e.preventDefault(); }, true );
        canvas.addEventListener("touchstart", e => { this.SetInputPos(e.touches[0]); this.isTouchActive = true; e.preventDefault(); }, true );
        canvas.addEventListener("touchend", e => { this.isTouchActive = false; e.preventDefault(); }, true );
        canvas.addEventListener("touchcancel", e => { this.isTouchActive = false; e.preventDefault(); }, true );
        canvas.addEventListener("touchmove", e => { this.SetInputPos(e.touches[0]); e.preventDefault(); }, true );
    }

    SetInputPos(event)
    {
        this.x = event.pageX - this.canvas.offsetLeft;
        this.y = event.pageY - this.canvas.offsetTop;
    }

    PostUpdate()
    {
        this.isNewTouch = false;
    }
}