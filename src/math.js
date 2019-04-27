function GetDistanceSq(p1, p2)
{
    let dx = p1.x - p2.x;
    let dy = p1.y - p2.y;
    return dx*dx + dy*dy;
}

function Lerp(p1, p2, t)
{
    let s = 1.0 - t;
    let x = p1.x*s + p2.x*t;
    let y = p1.y*s + p2.y*t;

    return {x: x, y: y};
}

function GetClosestPointIdx(testPoint, points, maxDistSq)
{
    let closestIdx = -1;
    let closestDistSq = 0.0;
    points.forEach((p, idx) =>
    {
        let distSq = GetDistanceSq(testPoint, p);
        if (distSq <= maxDistSq && (closestIdx === -1 || distSq < closestDistSq))
        {
            closestIdx = idx;
            closestDistSq = distSq;
        }
    });

    return closestIdx;
}