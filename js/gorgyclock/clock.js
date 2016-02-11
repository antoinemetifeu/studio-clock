'use strict';

var GorgyClock = GorgyClock || {};

GorgyClock.Clock = function(self) {
  var canvas        = undefined;
  var context       = undefined;
  var container     = undefined;

  var radius        = undefined;
  var brightenColor = '#ff0000';
  var darkenColor   = '#220000';

  var init = function (id) {

    canvas = document.getElementById(id);
    context = canvas.getContext('2d');
    container = canvas.parentNode;
    radius = canvas.width / 125;

    respondCanvas();
    DrawDigitalClock();

    setInterval(updateClock.bind(this), 500);
  };

  var respondCanvas = function() {
    canvas.size = 
      (container.offsetHeight >= container.offsetWidth) ?
        container.offsetWidth:
        container.offsetHeight;
    canvas.setAttribute('width', canvas.size + 'px' ); //max width
    canvas.setAttribute('height', canvas.size + 'px' ); //max height

    radius = canvas.width / 125;
  };

  var updateClock = function() {
    respondCanvas();
    DrawDigitalClock();
  };

  var DrawDigitalClock = function() {
    var date = new Date();
    var hours   = '' +
          (date.getHours() < 10 ? '0' + date.getHours(): date.getHours()),
        minutes = '' +
          (date.getMinutes() < 10 ? '0' + date.getMinutes(): date.getMinutes()),
        seconds = '' +
          (date.getSeconds() < 10 ? '0' + date.getSeconds(): date.getSeconds());


    context.clearRect(0, 0, canvas.width, canvas.height);

    context.translate((canvas.width/2) - (radius * (87 / 2)), 0);

    DrawDigitSegment(hours.substring(0, 1));

    context.translate(radius * 21, 0);
    DrawDigitSegment(hours.substring(1));
    context.translate(-(radius * 21), 0);

    context.translate(radius * 51, 0);
    DrawDigitSegment(minutes.substring(0, 1));
    context.translate(-(radius * 51), 0);

    context.translate(radius * 72, 0);
    DrawDigitSegment(minutes.substring(1));
    context.translate(-(radius * 72), 0);

    context.translate(-((canvas.width/2) - (radius * (87 / 2))), 0);

    context.translate((canvas.width/2) - (radius * (38 / 2)), 0);

    context.translate(0, radius * 37);
    DrawDigitSegment(seconds.substring(0, 1));
    context.translate(0, -(radius * 37));

    context.translate(radius * 21, radius * 37);
    DrawDigitSegment(seconds.substring(1));
    context.translate(-(radius * 21), radius * 37);

  }

  var DrawDigitSegment = function(digit) {

    /**
     *   1
     * 6   2
     *   7
     * 5   3
     *   4
     */
    var digitSegment = [
      [1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 0, 0, 0, 0],
      [1, 1, 0, 1, 1, 0, 1],
      [1, 1, 1, 1, 0, 0, 1],
      [0, 1, 1, 0, 0, 1, 1],
      [1, 0, 1, 1, 0, 1, 1],
      [1, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 0, 1, 1]
    ];

    for(var i = 0; i < 7; i++) {

      context.translate(radius, radius);

      switch(i) {
        case 0:
          context.translate(radius * 3, 0);
          DrawDotSegment((digitSegment[digit][i] ? true: false));
          context.translate(-(radius * 3), 0);
        break;
        case 1:
          context.translate(radius * 12, radius * 3);
          context.rotate((Math.PI / 180) * 90);
          DrawDotSegment((digitSegment[digit][i] ? true: false));
          context.rotate((Math.PI / 180) * -90);
          context.translate(-(radius * 12), -(radius * 3));
        break;
        case 2:
          context.translate(radius * 12, radius * 15);
          context.rotate((Math.PI / 180) * 90);
          DrawDotSegment((digitSegment[digit][i] ? true: false));
          context.rotate((Math.PI / 180) * -90);
          context.translate(-(radius * 12), -(radius * 15));
        break;
        case 3:
          context.translate(radius * 3, radius * 24);
          DrawDotSegment((digitSegment[digit][i] ? true: false));
          context.translate(-(radius * 3), -(radius * 24));
        break;
        case 4:
          context.translate(0, radius * 15);
          context.rotate((Math.PI / 180) * 90);
          DrawDotSegment((digitSegment[digit][i] ? true: false));
          context.rotate((Math.PI / 180) * -90);
          context.translate(0, -(radius * 15));
        break;
        case 5:
          context.translate(0, radius * 3);
          context.rotate((Math.PI / 180) * 90);
          DrawDotSegment((digitSegment[digit][i] ? true: false));
          context.rotate((Math.PI / 180) * -90);
          context.translate(0, -(radius * 3));
        break;
        case 6:
          context.translate(radius * 3, radius * 12);
          DrawDotSegment((digitSegment[digit][i] ? true: false));
          context.translate(-(radius * 3), -(radius * 12));
        break;
      }

      context.translate(-radius, -radius);

    }

  }

  var DrawDotSegment = function(brighten) {
    context.fillStyle = brighten ? brightenColor: darkenColor;

    context.beginPath();
    context.arc(0, 0, radius, 0, Math.PI * 2);
    context.arc(radius*3, 0, radius, 0, Math.PI * 2);
    context.arc(radius*6, 0, radius, 0, Math.PI * 2);
    context.closePath();
    context.fill();
  }

  return {
    init: init,
    respondCanvas: respondCanvas
  };

}(GorgyClock.Clock || {});