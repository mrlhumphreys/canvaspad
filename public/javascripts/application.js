var Brush = {
  color: 'rgb(255,0,0)',
  active: false,
  eraser: false,
  size: 5,
  px: 0,
  py: 0,
  x: 0,
  y: 0,
  
  setup: function() {
    $('.brush_selector').click(function() {
      Brush.color = $(this).attr('data-color');
      if (Brush.color == 'rgba(0,0,0,0)') {
        CanvasPad.context.globalCompositeOperation = "copy";
        Brush.size = 10;
      } else {
        CanvasPad.context.globalCompositeOperation = "source-over";
        Brush.size = 5;
      }
      return false;
    });
    setInterval("Brush.paint()", 1);
  },
  
  paint: function() {
    if (Brush.active) {
      CanvasPad.context.beginPath();
      CanvasPad.context.moveTo(Brush.px,Brush.py);
      CanvasPad.context.lineTo(Brush.x,Brush.y);
      CanvasPad.context.strokeStyle = Brush.color;
      CanvasPad.context.lineWidth = Brush.size;
      CanvasPad.context.stroke();
      CanvasPad.context.closePath();
    }
  }
};

var CanvasPad = {
  element: '',
  context: '',
  
  setup: function() {
    CanvasPad.element = document.getElementById("canvaspad");
    CanvasPad.context = CanvasPad.element.getContext("2d");
    
    $('#canvaspad').mousedown(function(event) {
      console.log(event);
      Brush.active = true;
    });

    $('#canvaspad').mouseup(function(event) {
      Brush.active = false;
    });

    $('#canvaspad').mousemove(function(event) {
      Brush.px = Brush.x;
      Brush.py = Brush.y;
      if ( typeof event.offsetX == 'undefined' && typeof event.offsetY == 'undefined' ) {
        var offset = $(event.target).offset(false);
        event.offsetX = event.pageX - offset.left;
        event.offsetY = event.pageY - offset.top;
      }
      Brush.x = event.offsetX;
      Brush.y = event.offsetY;
    });
    
    Brush.setup();
  }
};

$(document).ready(function() {
  CanvasPad.setup();
});