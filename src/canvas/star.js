/**
 * Created by YouHan on 2016/5/31.
 */
(function () {
    var canvas = document.getElementById('star');
    if (!canvas) {
        return;
    }
    var ctx;
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
    }

    var max = 50,
        starP = [],
        width = canvas.width,
        height = canvas.height;

    initStar();
    setInterval(function () {
        clear();
        moveStar();
        drawLines();
    }, 20);

    function drawLines() {
        for (var i = 0; i < (max || 10); i++) {
            for (var j = i + 1; j < (max || 10); j++) {
                var px = starP[i],
                    py = starP[j],
                    xx = px.x - py.x,
                    yy = px.y - py.y,
                    p = Math.sqrt(xx * xx + yy * yy) / 150;
                if (p <= 1) {
                    drawLine(px, py, p);
                }
            }
        }
    }

    function drawLine(origin, dest, p) {
        ctx.lineWidth = (1 - p) * 1.5;
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(dest.x, dest.y);
        ctx.stroke();
        ctx.closePath();
        console.log(origin, dest, p);
    }

    function moveStar() {
        for (var i = 0; i < (max || 10); i++) {
            starP[i] = updateP(starP[i]);
            drawCircle(starP[i]);
        }
    }

    function updateP(position) {
        var x0 = position.dx,
            y0 = position.dy,
            p = (x0 * x0 + y0 * y0) / 0.1;

        if (position.x < 0 || position.x > width || position.y < 0 || position.y > height) {
            return genP();
        } else {
            return {
                x: position.x + x0 / p,
                y: position.y + y0 / p,
                dx: x0,
                dy: y0
            }
        }
    }

    function clear() {
        ctx.clearRect(0, 0, width, height);
    }

    function initStar() {
        starP = [];
        ctx.fillStyle = 'white';
        for (var i = 0; i < (max || 10); i++) {
            var p = genP();
            starP.push(p);
            drawCircle(p);
        }
        drawLines();
    }

    function drawCircle(position) {
        ctx.beginPath();
        ctx.arc(position.x, position.y, 2, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.closePath();
    }

    function genP() {
        return ({
            x: Math.random() * width,
            y: Math.random() * height,
            dx: Math.random() - 0.5,
            dy: Math.random() - 0.5
        });
    }
})();