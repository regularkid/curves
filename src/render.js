function InitRender()
{
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
}

function DrawLines(points, color)
{
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++)
    {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
}

function DrawLine(p1, p2, color)
{
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}

function DrawDot(p, color)
{
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 9, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.fill();
}

function DrawBezierQuad(pa, pb, pc, color)
{
    let numSegs = 100;
    let points = new Array();
    for (let i = 0; i <= numSegs; i++)
    {
        let t = i / numSegs;
        let pd = LerpPoints(pa, pb, t);
        let pe = LerpPoints(pb, pc, t);
        let pf = LerpPoints(pd, pe, t);
        points.push({x: pf.x, y: pf.y});
    }
    DrawLines(points, color);
}

function DrawBezierCubic(pa, pb, pc, pd, color)
{
    let numSegs = 100;
    let points = new Array();
    for (let i = 0; i <= numSegs; i++)
    {
        let t = i / numSegs;
        let pe = LerpPoints(pa, pb, t);
        let pf = LerpPoints(pb, pc, t);
        let pg = LerpPoints(pc, pd, t);
        let ph = LerpPoints(pe, pf, t);
        let pi = LerpPoints(pf, pg, t);
        let pj = LerpPoints(ph, pi, t);
        points.push({x: pj.x, y: pj.y});
    }
    DrawLines(points, color);
}

function RenderSceneBezierQuad()
{
    DrawLine(points[0], points[1], "#F00");
    DrawLine(points[1], points[2], "#00F");
    DrawBezierQuad(points[0], points[1], points[2], "#0F0");

    let pd = LerpPoints(points[0], points[1], lerpValue);
    let pe = LerpPoints(points[1], points[2], lerpValue);
    DrawLine(pd, pe, "#FF0");

    DrawDot(points[0], "#000");
    DrawDot(points[1], "#000");
    DrawDot(points[2], "#000");
    DrawDot(LerpPoints(pd, pe, lerpValue), "#FFF");
}

function RenderSceneBezierCubic()
{
    DrawLine(points[0], points[1], "#F00");
    DrawLine(points[1], points[2], "#00F");
    DrawLine(points[2], points[3], "#F0F");
    DrawBezierCubic(points[0], points[1], points[2], points[3], "#0F0");

    let pe = LerpPoints(points[0], points[1], lerpValue);
    let pf = LerpPoints(points[1], points[2], lerpValue);
    let pg = LerpPoints(points[2], points[3], lerpValue);
    let ph = LerpPoints(pe, pf, lerpValue);
    let pi = LerpPoints(pf, pg, lerpValue);
    let pj = LerpPoints(ph, pi, lerpValue);
    DrawLine(pe, pf, "#FF0");
    DrawLine(pf, pg, "#0FF");
    DrawLine(ph, pi, "#F80");

    DrawDot(points[0], "#000");
    DrawDot(points[1], "#000");
    DrawDot(points[2], "#000");
    DrawDot(points[3], "#000");
    DrawDot(pj, "#FFF");
}