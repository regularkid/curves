var getElem = document.getElementById.bind(document);
var canvas = getElem("canvas");
var ctx = canvas.getContext("2d", { alpha: false });
var input = new Input(canvas);

var points = new Array();
var movePoint = undefined;

var lerpValue = 1.0;
getElem("lerpSlider").oninput = () => { lerpValue = parseFloat(getElem("lerpSlider").value); SetAnimMode(AnimModes.None); }

var AnimModes = { None: 0, Loop: 1, Ping: 2 };
var animMode = AnimModes.Loop;
var animPingForward = true;
SetAnimMode = (mode) => { animMode = mode % Object.keys(AnimModes).length; getElem("animButton").innerHTML = `Anim Mode: ${Object.keys(AnimModes)[animMode]}`; }
ToggleAnimMode = () => { SetAnimMode(animMode + 1); }

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
    if (input.isTouchActive)
    {
        movePoint = movePoint || points[GetClosestPointIdx(input, points)];
        movePoint.x = input.x;
        movePoint.y = input.y;
    }
    else
    {
        movePoint = undefined;
    }

    if (animMode === AnimModes.Loop)
    {
        lerpValue = (lerpValue + 0.005) % 1.0;
    }
    else if (animMode === AnimModes.Ping)
    {
        lerpValue = lerpValue + 0.005 * (animPingForward ? 1.0 : -1.0);
        if (lerpValue > 1.0) { lerpValue = 1.0; animPingForward = false; }
        if (lerpValue < 0.0) { lerpValue = 0.0; animPingForward = true; }
    }
    getElem("lerpSlider").value = lerpValue.toString();
    getElem("lerpSliderLabel").innerHTML = `Lerp Amount (t = ${Math.round(lerpValue.toString() * 100.0) / 100.0})`;
}

function Render()
{
    ctx.fillStyle = "#888";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    points.length === 4 ? RenderSceneBezierCubic() : RenderSceneBezierQuad();
}

Init();