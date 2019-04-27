function InitRender()
{
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
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
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(pa.x, pa.y);

    let numSegs = 100;
    for (let i = 0; i <= numSegs; i++)
    {
        let t = i / numSegs;
        let pd = Lerp(pa, pb, t);
        let pe = Lerp(pb, pc, t);
        let pf = Lerp(pd, pe, t);
        ctx.lineTo(pf.x, pf.y);
    }

    ctx.stroke();
}

function DrawBezierCubic(pa, pb, pc, pd, color)
{
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(pa.x, pa.y);

    let numSegs = 100;
    for (let i = 0; i <= numSegs; i++)
    {
        let t = i / numSegs;
        let pe = Lerp(pa, pb, t);
        let pf = Lerp(pb, pc, t);
        let pg = Lerp(pc, pd, t);
        let ph = Lerp(pe, pf, t);
        let pi = Lerp(pf, pg, t);
        let pj = Lerp(ph, pi, t);
        ctx.lineTo(pj.x, pj.y);
    }

    ctx.stroke();
}

function RenderSceneBezierQuad()
{
    DrawLine(points[0], points[1], "#F00");
    DrawLine(points[1], points[2], "#00F");
    DrawBezierQuad(points[0], points[1], points[2], "#0F0");

    let pd = Lerp(points[0], points[1], lerpValue);
    let pe = Lerp(points[1], points[2], lerpValue);
    DrawLine(pd, pe, "#FF0");

    DrawDot(points[0], "#000");
    DrawDot(points[1], "#000");
    DrawDot(points[2], "#000");
    DrawDot(Lerp(pd, pe, lerpValue), "#FFF");
}

function RenderSceneBezierCubic()
{
    DrawLine(points[0], points[1], "#F00");
    DrawLine(points[1], points[2], "#00F");
    DrawLine(points[2], points[3], "#F0F");
    DrawBezierCubic(points[0], points[1], points[2], points[3], "#0F0");

    let pe = Lerp(points[0], points[1], lerpValue);
    let pf = Lerp(points[1], points[2], lerpValue);
    let pg = Lerp(points[2], points[3], lerpValue);
    let ph = Lerp(pe, pf, lerpValue);
    let pi = Lerp(pf, pg, lerpValue);
    let pj = Lerp(ph, pi, lerpValue);
    DrawLine(pe, pf, "#FF0");
    DrawLine(pf, pg, "#0FF");
    DrawLine(ph, pi, "#F80");

    DrawDot(points[0], "#000");
    DrawDot(points[1], "#000");
    DrawDot(points[2], "#000");
    DrawDot(points[3], "#000");
    DrawDot(pj, "#FFF");
}