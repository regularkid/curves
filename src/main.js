var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d", { alpha: false });
var input = new Input(canvas);

var points = new Array();
var movePoint = undefined;
var maxPointTouchDistSq = 50*50;

var lerpValue = 1.0;
document.getElementById("lerpSlider").oninput = () => { lerpValue = parseFloat(document.getElementById("lerpSlider").value); }

function Init()
{
    InitRender();
    InitBezierQuad();
    window.requestAnimationFrame(GameLoop);
}

function InitBezierQuad()
{
    points = new Array();
    points.push(new ControlPoint(50, 50));
    points.push(new ControlPoint(750, 50));
    points.push(new ControlPoint(750, 550));
    movePoint = undefined;
}

function InitBezierCubic()
{
    points = new Array();
    points.push(new ControlPoint(50, 50));
    points.push(new ControlPoint(550, 50));
    points.push(new ControlPoint(750, 200));
    points.push(new ControlPoint(750, 550));
    movePoint = undefined;
}

function GameLoop()
{
    Update();
    Render();

    input.PostUpdate();
    window.requestAnimationFrame(GameLoop);
}

function Update()
{
    if (input.isNewTouch)
    {
        let closestPointIdx = GetClosestPointIdx(input, points, maxPointTouchDistSq);
        if (closestPointIdx !== -1)
        {
            movePoint = points[closestPointIdx];
        }
    }
    
    if (input.isTouchActive && movePoint !== undefined)
    {
        movePoint.x = input.x;
        movePoint.y = input.y;
    }
    else
    {
        movePoint = undefined;
    }
}

function Render()
{
    ctx.fillStyle = "#888";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    points.length === 4 ? RenderSceneBezierCubic() : RenderSceneBezierQuad();
}

Init();