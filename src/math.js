function GetDistanceSq(p1, p2)
{
    let dx = p1.x - p2.x;
    let dy = p1.y - p2.y;
    return dx*dx + dy*dy;
}

function Lerp(a, b, t)
{
    let s = 1.0 - t;
    return a*s + b*t;
}

function LerpPoints(p1, p2, t)
{
    return {x: Lerp(p1.x, p2.x, t), y: Lerp(p1.y, p2.y, t)};
}

function GetClosestPointIdx(testPoint, points)
{
    let closestIdx = -1;
    let closestDistSq = 0.0;
    points.forEach((p, idx) =>
    {
        let distSq = GetDistanceSq(testPoint, p);
        if (closestIdx === -1 || distSq < closestDistSq)
        {
            closestIdx = idx;
            closestDistSq = distSq;
        }
    });

    return closestIdx;
}