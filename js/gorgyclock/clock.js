'use strict';

var GorgyClock = GorgyClock || {};

GorgyClock.Clock = function(self) {
  var canvas = undefined;
  var context = undefined;
  var container = undefined;

  var init = function (id) {

    canvas = document.getElementById(id);
    context = canvas.getContext('2d');
    container = canvas.parentNode;

    DrawDigitalClock();
  };

  var DrawDigitalClock = function() {
    var date = new Date();
    var hours   = '' + (date.getHours() < 10 ? '0' + date.getHours(): date.getHours()),
        minutes = '' + (date.getMinutes() < 10 ? '0' + date.getMinutes(): date.getMinutes()),
        seconds = '' + (date.getSeconds() < 10 ? '0' + date.getSeconds(): date.getSeconds());


    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#ff0000';
    context.save();


    DrawDigitSegment(hours.substring(0, 1));
    context.translate(75, 0);
    DrawDigitSegment(hours.substring(1));
    context.translate(105, 0);
    DrawDigitSegment(minutes.substring(0, 1));
    context.translate(75, 0);
    DrawDigitSegment(minutes.substring(1));
    context.translate(-165, 150);
    DrawDigitSegment(seconds.substring(0, 1));
    context.translate(75, 0);
    DrawDigitSegment(seconds.substring(1));

  }

  var DrawDigitSegment = function(digit) { //(positions, radius, brighten) {

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

    var radius = canvas.width / 100; // Radius of Dot Segment

    for(var i = 0; i < 7; i++) {

      switch(i) {
        case 0:
          context.translate(radius * 4, radius);
          DrawDotSegment((digitSegment[digit][i] ? true: false));
          context.translate(-(radius * 4), -radius);
        break;
        case 1:
          context.translate(radius * 13, radius * 4);
          context.rotate((Math.PI / 180) * 90);
          DrawDotSegment((digitSegment[digit][i] ? true: false));
          context.rotate((Math.PI / 180) * -90);
          context.translate(-(radius * 13), -(radius * 4));
        break;
        case 2:
          context.translate(radius * 13, radius * 16);
          context.rotate((Math.PI / 180) * 90);
          DrawDotSegment((digitSegment[digit][i] ? true: false));
          context.rotate((Math.PI / 180) * -90);
          context.translate(-(radius * 13), -(radius * 16));
        break;
        case 3:
          context.translate(radius * 4, radius * 25);
          DrawDotSegment((digitSegment[digit][i] ? true: false));
          context.translate(-(radius * 4), -(radius * 25));
        break;
        case 4:
          context.translate(radius, radius * 16);
          context.rotate((Math.PI / 180) * 90);
          DrawDotSegment((digitSegment[digit][i] ? true: false));
          context.rotate((Math.PI / 180) * -90);
          context.translate(-radius, -(radius * 16));
        break;
        case 5:
          context.translate(radius, radius * 4);
          context.rotate((Math.PI / 180) * 90);
          DrawDotSegment((digitSegment[digit][i] ? true: false));
          context.rotate((Math.PI / 180) * -90);
          context.translate(-radius, -(radius * 4));
        break;
        case 6:
          context.translate(radius * 4, radius * 13);
          DrawDotSegment((digitSegment[digit][i] ? true: false));
          context.translate(-(radius * 4), -(radius * 13));
        break;
      }

    }

  }

  var DrawDotSegment = function(brighten) {
    var radius = canvas.width / 100; // Radius of Dot Segment

    context.fillStyle = brighten ? '#ff0000': '#220000';

    context.beginPath();
    context.arc(0, 0, radius, 0, Math.PI * 2);
    context.arc(radius*3, 0, radius, 0, Math.PI * 2);
    context.arc(radius*6, 0, radius, 0, Math.PI * 2);
    context.closePath();
    context.fill();
  }

  return {
    init: init
  };

}(GorgyClock.Clock || {});