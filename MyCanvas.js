var Canvas = {

    capture: function () {
        var parent = document.getElementById("canvas");
        parent.childNodes[0].nodeValue = "";

        var canvasArea = document.createElement("canvas");
        canvasArea.setAttribute("id", "newSignature");
        parent.appendChild(canvasArea);

        Canvas.canvas = document.getElementById("newSignature");
        Canvas.context = Canvas.canvas.getContext("2d");

        if (!Canvas.context) {
            throw new Error("Failed to get canvas' 2d context");
        }

        screenwidth = screen.width;

        if (screenwidth < 480) {
            Canvas.canvas.width = screenwidth - 8;
            Canvas.canvas.height = (screenwidth * 0.63);
        } else {
            Canvas.canvas.width = 464;
            Canvas.canvas.height = 304;
        }

        Canvas.context.fillStyle = "#fff";
        Canvas.context.strokeStyle = "#444";
        Canvas.context.lineWidth = 1.2;
        Canvas.context.lineCap = "round";

        Canvas.context.fillRect(0, 0, Canvas.canvas.width, Canvas.canvas.height);

        Canvas.context.fillStyle = "#3a87ad";
        Canvas.context.strokeStyle = "#3a87ad";
        Canvas.context.lineWidth = 1;
        Canvas.context.moveTo((Canvas.canvas.width * 0.042), (Canvas.canvas.height * 0.7));
        Canvas.context.lineTo((Canvas.canvas.width * 0.958), (Canvas.canvas.height * 0.7));
        Canvas.context.stroke();

        Canvas.context.fillStyle = "#fff";
        Canvas.context.strokeStyle = "#444";

        Canvas.disableSave = true;
        Canvas.pixels = [];
        Canvas.cpixels = [];
        Canvas.xyLast = {};
        Canvas.xyAddLast = {};
        Canvas.calculate = false;


        Canvas.canvas.addEventListener('mousedown', Canvas.on_mousedown, false);
        Canvas.canvas.addEventListener('touchstart', Canvas.on_mousedown, false);

    },


    clear: function () {
        Canvas.empty = true;
        var parent = document.getElementById("canvas");
        var child = document.getElementById("newSignature");
        parent.removeChild(child);
        this.capture();
    },

    get_board_coords: function(e) {
    var x, y;

    if (e.changedTouches && e.changedTouches[0]) {
        Canvas.offsety = Canvas.canvas.offsetTop || 0;
        Canvas.offsetx = Canvas.canvas.offsetLeft || 0;

        x = e.changedTouches[0].pageX - Canvas.offsetx;
        y = e.changedTouches[0].pageY - Canvas.offsety;
    } else if (e.layerX || 0 == e.layerX) {
        x = e.layerX;
        y = e.layerY;
    } else if (e.offsetX || 0 == e.offsetX) {
        x = e.offsetX;
        y = e.offsetY;
    }

    return {
        x: x,
        y: y
    };
    },


    on_mousedown: function(e) {
    e.preventDefault();
    e.stopPropagation();

    Canvas.canvas.addEventListener('mousemove', Canvas.on_mousemove, false);
    Canvas.canvas.addEventListener('mouseup', Canvas.on_mouseup, false);
    Canvas.canvas.addEventListener('touchmove', Canvas.on_mousemove, false);
    Canvas.canvas.addEventListener('touchend', Canvas.on_mouseup, false);

    document.body.addEventListener('mouseup', Canvas.on_mouseup, false);
    document.body.addEventListener('touchend', Canvas.on_mouseup, false);

    Canvas.empty = false;
    Canvas.xy = Canvas.get_board_coords(e);
    Canvas.context.beginPath();
    Canvas.pixels.push('moveStart');
    Canvas.context.moveTo(Canvas.xy.x, Canvas.xy.y);
    Canvas.pixels.push(Canvas.xy.x, Canvas.xy.y);
    Canvas.xyLast = Canvas.xy;
    },
    on_mousemove: function (e, finish) {
        e.preventDefault();
        e.stopPropagation();

        Canvas.xy = Canvas.get_board_coords(e);
        Canvas.xyAdd = {
            x: (Canvas.xyLast.x + Canvas.xy.x) / 2,
            y: (Canvas.xyLast.y + Canvas.xy.y) / 2
        };

        if (Canvas.calculate) {
            var xLast = (Canvas.xyAddLast.x + Canvas.xyLast.x + Canvas.xyAdd.x) / 3;
            var yLast = (Canvas.xyAddLast.y + Canvas.xyLast.y + Canvas.xyAdd.y) / 3;
            Canvas.pixels.push(xLast, yLast);
        } else {
            Canvas.calculate = true;
        }

        Canvas.context.quadraticCurveTo(Canvas.xyLast.x, Canvas.xyLast.y, Canvas.xyAdd.x, Canvas.xyAdd.y);
        Canvas.pixels.push(Canvas.xyAdd.x, Canvas.xyAdd.y);
        Canvas.context.stroke();
        Canvas.context.beginPath();
        Canvas.context.moveTo(Canvas.xyAdd.x, Canvas.xyAdd.y);
        Canvas.xyAddLast = Canvas.xyAdd;
        Canvas.xyLast = Canvas.xy;

    },

    on_mouseup: function (e) {
        Canvas.remove_event_listeners();
        Canvas.disableSave = false;
        Canvas.context.stroke();
        Canvas.pixels.push('e');
        Canvas.calculate = false;
    },

    remove_event_listeners: function () {
        Canvas.canvas.removeEventListener('mousemove', Canvas.on_mousemove, false);
        Canvas.canvas.removeEventListener('mouseup', Canvas.on_mouseup, false);
        Canvas.canvas.removeEventListener('touchmove', Canvas.on_mousemove, false);
        Canvas.canvas.removeEventListener('touchend', Canvas.on_mouseup, false);

        document.body.removeEventListener('mouseup', Canvas.on_mouseup, false);
        document.body.removeEventListener('touchend', Canvas.on_mouseup, false);
    }
};