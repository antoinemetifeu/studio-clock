'use strict';

var GorgyClock = GorgyClock || {};

GorgyClock.Clock = (function() {
  'use strict';

  var canvas        = undefined;
  var ctx           = undefined;
  var container     = undefined;

  var brightenColor = '#ff0000';
  var darkenColor   = '#110000';

  var radius        = undefined;


  function init(id, brightenColor, darkenColor) {
    console.log('init()');

    canvas        = document.getElementById(id);
    ctx           = canvas.getContext('2d');
    container     = canvas.parentNode;

    brightenColor = brightenColor;
    darkenColor   = darkenColor;

    radius        = canvas.width / 125;

    _start();
  }

  /**
   * Start the clock
   */
  function _start() {
    console.log('_start()');

    _respondCanvas();
    window.addEventListener('resize', _respondCanvas, false);

    _drawClocks();
    window.setInterval(_drawClocks, 1000);
  }

  /**
   * Re-size the canvas, set new radius size & update clock
   */
  function _respondCanvas() {
    console.log('_respondCanvas()');

    canvas.size = 
      (container.offsetHeight >= container.offsetWidth) ?
        container.offsetWidth:
        container.offsetHeight;
    canvas.setAttribute('width', canvas.size + 'px' ); //max width
    canvas.setAttribute('height', canvas.size + 'px' ); //max height

    radius = canvas.width / 125;

    _drawClocks();
  }

  /**
   * Draw clocks
   */
  function _drawClocks() {
    console.log('_drawClocks()');

    var date = new Date();
    var hours   = '' +
          (date.getHours() < 10 ? '0' + date.getHours(): date.getHours()),
        minutes = '' +
          (date.getMinutes() < 10 ? '0' + date.getMinutes(): date.getMinutes()),
        seconds = '' +
          (date.getSeconds() < 10 ? '0' + date.getSeconds(): date.getSeconds());

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    _drawAnalogClock(hours, minutes)

    _drawDigitalClock(hours, minutes, seconds);

  }

  /**
   * Draw 'Analog' Clock
   */
  function _drawAnalogClock(hours, minutes) {
    console.log('_drawAnalogClock()');

    var hours12 = ((parseInt(hours) + 11) % 12 + 1);

    ctx.fillStyle = brightenColor;

    ctx.translate(canvas.size / 2, canvas.size / 2);

    // each minutes
    for (var i = 0; i < 60; i++) {
      var theta = (i - 15) * (Math.PI * 2) / 60;
      var x = (canvas.width / 2) * 0.85 * Math.cos(theta);
      var y = (canvas.width / 2) * 0.85 * Math.sin(theta);

      if (i > minutes)
        ctx.fillStyle = darkenColor;

      ctx.beginPath();
      ctx.arc(x , y, radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }

    ctx.fillStyle = brightenColor;

    // each hours
    for (var i = 0; i < 12; i++) {
      var theta = (i - 3) * (Math.PI * 2) / 12;
      var x = (canvas.width / 2) * 0.93 * Math.cos(theta);
      var y = (canvas.width / 2) * 0.93 * Math.sin(theta);

      if (i > hours12)
        ctx.fillStyle = darkenColor;

      ctx.beginPath();
      ctx.arc(x , y, (canvas.width / 100) * 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }

    ctx.translate(-(canvas.size / 2), -(canvas.size / 2));
  }

  /**
   * Draw Digital Clock
   */
  function _drawDigitalClock(hours, minutes, seconds) {
    console.log('_drawDigitalClock()');

    // center hours & minutes
    var translateX  = canvas.width/2 - radius*(87/2) + radius;
    var translateY  = canvas.width/2 - radius*(27/2) + radius;

    ctx.translate(translateX, translateY);

    _drawDigitSegment(hours.substring(0, 1)); // hours tens

    ctx.translate(radius * 21, 0);
    _drawDigitSegment(hours.substring(1)); // hours ones
    ctx.translate(-(radius * 21), 0);

    ctx.translate(radius * 51, 0);
    _drawDigitSegment(minutes.substring(0, 1)); // minutes tens
    ctx.translate(-(radius * 51), 0);

    ctx.translate(radius * 72, 0);
    _drawDigitSegment(minutes.substring(1)); // minutes ones
    ctx.translate(-(radius * 72), 0);

    // reset center hours & minutes
    ctx.translate(-translateX, -translateY);

    // center & top position seconds
    translateX = canvas.width/2 - radius*(36/2) + radius;
    translateY = canvas.width/2 - radius*(27/2) + radius*33;

    ctx.translate(translateX, translateY);

    //ctx.save();
    //ctx.scale(0.8, 0.8);

    _drawDigitSegment(seconds.substring(0, 1)); // seconds tens

    ctx.translate(radius * 21, 0);
    _drawDigitSegment(seconds.substring(1)); // seconds ones
    ctx.translate(-(radius * 21), 0);

    //ctx.scale(0, 0);
    //ctx.restore();

    // reset center & top position seconds
    ctx.translate(-translateX, -translateY);

  }

  /**
   * Draw Digit Segment
   */
  function _drawDigitSegment(digit) {
    console.log('drawDigitSegment()');

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
      ctx.translate(radius, radius);

      switch (i) {
        case 0:
          ctx.translate(radius * 3, 0);
          _drawDotSegment(digitSegment[digit][i]);
          ctx.translate(-(radius * 3), 0);
        break;
        case 1:
          ctx.translate(radius * 12, radius * 3);
          ctx.rotate((Math.PI / 180) * 90);
          _drawDotSegment(digitSegment[digit][i]);
          ctx.rotate((Math.PI / 180) * -90);
          ctx.translate(-(radius * 12), -(radius * 3));
        break;
        case 2:
          ctx.translate(radius * 12, radius * 15);
          ctx.rotate((Math.PI / 180) * 90);
          _drawDotSegment(digitSegment[digit][i]);
          ctx.rotate((Math.PI / 180) * -90);
          ctx.translate(-(radius * 12), -(radius * 15));
        break;
        case 3:
          ctx.translate(radius * 3, radius * 24);
          _drawDotSegment(digitSegment[digit][i]);
          ctx.translate(-(radius * 3), -(radius * 24));
        break;
        case 4:
          ctx.translate(0, radius * 15);
          ctx.rotate((Math.PI / 180) * 90);
          _drawDotSegment(digitSegment[digit][i]);
          ctx.rotate((Math.PI / 180) * -90);
          ctx.translate(0, -(radius * 15));
        break;
        case 5:
          ctx.translate(0, radius * 3);
          ctx.rotate((Math.PI / 180) * 90);
          _drawDotSegment(digitSegment[digit][i]);
          ctx.rotate((Math.PI / 180) * -90);
          ctx.translate(0, -(radius * 3));
        break;
        case 6:
          ctx.translate(radius * 3, radius * 12);
          _drawDotSegment(digitSegment[digit][i]);
          ctx.translate(-(radius * 3), -(radius * 12));
        break;
      }

      ctx.translate(-radius, -radius);
    }
  }

  /**
   * Draw Dot Segment
   */
  function _drawDotSegment(brighten) {
    ctx.fillStyle = brighten ? brightenColor: darkenColor;

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.arc(radius*3, 0, radius, 0, Math.PI * 2);
    ctx.arc(radius*6, 0, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  // public methods
  return {
    init: init
  };

})();
