var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d", { alpha: false });

///////////////////////
// INPUT
///////////////////////
var input = { x: 0, y: 0, touchActive: false}
canvas.addEventListener("mousedown", e => { input.touchActive = true }, false);
canvas.addEventListener("mouseup", e => { input.touchActive = false }, false);
canvas.addEventListener("mousemove", e => { SetInputPos(e); e.preventDefault(); }, false );
canvas.addEventListener("touchstart", e => { SetInputPos(e.touches[0]); input.touchActive = true; e.preventDefault(); }, false );
canvas.addEventListener("touchend", e => { input.touchActive = false; e.preventDefault(); }, false );
canvas.addEventListener("touchcancel", e => { input.touchActive = false; e.preventDefault(); }, false );
canvas.addEventListener("touchmove", e => { SetInputPos(e.touches[0]); e.preventDefault(); }, false );

function SetInputPos(event)
{
    input.x = event.pageX - canvas.offsetLeft;
    input.y = event.pageY - canvas.offsetTop;
}

//document.getElementById("heightSlider").oninput = () => { heightMult = 2.0 - parseFloat(document.getElementById("heightSlider").value); }
//document.getElementById("windSlider").oninput = () => { windMult = parseFloat(document.getElementById("windSlider").value); }

var va = {x: 50, y: 50};
var vb = {x: 750, y: 50};
var vc = {x: 750, y: 550};

function Init()
{
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#FFFFFF";
}

function GameLoop()
{
    if (input !== undefined && input.touchActive)
    {
        vb.x = input.x;
        vb.y = input.y;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#FF0000";
    ctx.beginPath();
    ctx.moveTo(va.x, va.y);
    ctx.lineTo(vb.x, vb.y);
    ctx.stroke();

    ctx.strokeStyle = "#0000FF";
    ctx.beginPath();
    ctx.moveTo(vb.x, vb.y);
    ctx.lineTo(vc.x, vc.y);
    ctx.stroke();

    ctx.strokeStyle = "#00FF00"
    ctx.beginPath();
    ctx.moveTo(va.x, va.y);

    let numSegs = 1000;
    for (let i = 0; i <= numSegs; i++)
    {
        let t = i / numSegs;
        let pab = GetLerpPoint(va, vb, t);
        let pbc = GetLerpPoint(vb, vc, t);
        let p = GetLerpPoint(pab, pbc, t);
        ctx.lineTo(p.x, p.y);
    }

    ctx.stroke();

    window.requestAnimationFrame(GameLoop);
}

function GetLerpPoint(v1, v2, t)
{
    t = Math.max(Math.min(t, 1.0), 0.0);
    let s = 1.0 - t;
    return {x: v1.x*s + v2.x*t, y: v1.y*s + v2.y*t}
}

Init();
window.requestAnimationFrame(GameLoop);