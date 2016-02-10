(function() {

	// Constructeur
	this.StudioClock = function(id) {
		this.canvas = document.getElementById(id);
		this.context = this.canvas.getContext('2d');

		this.container = this.canvas.parentNode;

		respondCanvas.call(this);
		setInterval(respondCanvas.bind(this), 1000);

		window.addEventListener('resize', respondCanvas.bind(this), false);
	}

	// Methode public
	StudioClock.prototype.draw = function() {
		console.log('draw : ' + this.test);
	}

	// Methode privée
	function respondCanvas(){
		this.canvas.size = (this.container.offsetHeight >= this.container.offsetWidth) ? this.container.offsetWidth: this.container.offsetHeight;
		this.canvas.setAttribute('width', this.canvas.size + 'px' ); //max width
		this.canvas.setAttribute('height', this.canvas.size + 'px' ); //max height
		
		drawClock.call(this);
	}

	function drawClock() {
		var date = new Date();
		var hours = date.getHours(), minutes = date.getMinutes(), seconds = date.getSeconds();

		this.date = {};

		this.date.hoursDecade = Math.floor((hours / 10) % 10);
		this.date.hoursUnit = hours % 10;

		this.date.minutesDecade = Math.floor((minutes / 10) % 10);
		this.date.minutesUnit = minutes % 10;

		this.date.secondsDecade = Math.floor((seconds / 10) % 10);
		this.date.secondsUnit = seconds % 10;

		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.context.fillStyle = '#ff0000';

		this.context.save();
		this.context.translate(this.canvas.size / 2, this.canvas.size / 2);

		drawDotCircle.call(this);

		this.context.restore();

		this.context.rotate((Math.PI/180) * 0.5);
		// Matrix de chiffres
		this.context.save();
		this.context.translate(this.canvas.size / 4.45, this.canvas.size / 2.4);
		drawDotMatrixDigit.call(this, this.date.hoursDecade);
		this.context.restore();
		this.context.save();
		this.context.translate(this.canvas.size / 2.75, this.canvas.size / 2.4);
		drawDotMatrixDigit.call(this, this.date.hoursUnit);
		this.context.restore();
		this.context.save();
		this.context.translate(this.canvas.size / 1.75, this.canvas.size / 2.4);
		drawDotMatrixDigit.call(this, this.date.minutesDecade);
		this.context.restore();
		this.context.save();
		this.context.translate(this.canvas.size / 1.45, this.canvas.size / 2.4);
		drawDotMatrixDigit.call(this, this.date.minutesUnit);
		this.context.restore();
		this.context.save();
		this.context.translate(this.canvas.size / 2.5, this.canvas.size / 1.55);
		drawDotMatrixDigit.call(this, this.date.secondsDecade);
		this.context.restore();
		this.context.save();
		this.context.translate(this.canvas.size / 1.85, this.canvas.size / 1.55);
		drawDotMatrixDigit.call(this, this.date.secondsUnit);

		this.context.restore();
	}

	function drawDotCircle() {

		var minutes = parseInt(this.date.minutesDecade + '' + this.date.minutesUnit) + 1;
		var hours = parseInt(this.date.hoursDecade + '' + this.date.hoursUnit) + 1;
		var hours12 = ((hours + 11) % 12 + 1);

		for (var i = 0; i < 60; i++) {
			var theta = (i - 15) * (Math.PI * 2) / 60;
			var x = (this.canvas.width / 2) * 0.85 * Math.cos(theta);
			var y = (this.canvas.width / 2) * 0.85 * Math.sin(theta);

			if (i == minutes)
				this.context.fillStyle = '#220000';

			this.context.beginPath();
			this.context.arc(x , y, (this.canvas.width / 100), 0, Math.PI * 2);
			this.context.closePath();
			this.context.fill();
		}
		this.context.fillStyle = '#FF0000';

		for (var i = 0; i < 12; i++) {
			var theta = (i - 3) * (Math.PI * 2) / 12;
			var x = (this.canvas.width / 2) * 0.93 * Math.cos(theta);
			var y = (this.canvas.width / 2) * 0.93 * Math.sin(theta);

		//	if (i == hours12)
		//		this.context.fillStyle = '#550000';

			this.context.beginPath();
			this.context.arc(x , y, (this.canvas.width / 100) * 2, 0, Math.PI * 2);
			this.context.closePath();
			this.context.fill();
		}
		//this.context.restore();
	}

	function drawDotMatrixDigit(digit) {
		/**
		 *   0
		 * 3   5
		 *   1
		 * 4   6
		 *   2
		 */
		var digitSegment = [
			[1, 0, 1, 1, 1, 1, 1],
			[0, 0, 0, 0, 0, 1, 1],
			[1, 1, 1, 0, 1, 1, 0],
			[1, 1, 1, 0, 0, 1, 1],
			[0, 1, 0, 1, 0, 1, 1],
			[1, 1, 1, 1, 0, 0, 1],
			[1, 1, 1, 1, 1, 0, 1],
			[1, 0, 0, 0, 0, 1, 1],
			[1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 0, 1, 1]
		];
		
		if(digit >= 0 && digit <= 9) {
			var color, position = [], brighten = true;

			for(var i = 0; i < 7; i++) {
				switch(i) {
					case 0:
						position = [[(this.canvas.width / 100) * 1.6, 0], [(this.canvas.width / 100) * 4, 0], [(this.canvas.width / 100) * 6.4, 0]];
						brighten = digitSegment[digit][i] ? true: false;
						break;
					case 1:
						position = [[(this.canvas.width / 100) * 1.6, (this.canvas.width / 100) * 8], [(this.canvas.width / 100) * 4, (this.canvas.width / 100) * 8], [(this.canvas.width / 100) * 6.4, (this.canvas.width / 100) * 8]];
						brighten = digitSegment[digit][i] ? true: false;
						break;
					case 2:
						position = [[(this.canvas.width / 100) * 1.6, (this.canvas.width / 100) * 16], [(this.canvas.width / 100) * 4, (this.canvas.width / 100) * 16], [(this.canvas.width / 100) * 6.4, (this.canvas.width / 100) * 16]];
						brighten = digitSegment[digit][i] ? true: false;
						break;
					case 3:
						position = [[0, (this.canvas.width / 100) * 2], [0, (this.canvas.width / 100) * 4.2], [0, (this.canvas.width / 100) * 6.4]];
						brighten = digitSegment[digit][i] ? true: false;
						break;
					case 4:
						position = [[0, (this.canvas.width / 100) * 10], [0, (this.canvas.width / 100) * 12.2], [0, (this.canvas.width / 100) * 14.4]];
						brighten = digitSegment[digit][i] ? true: false;
						break;
					case 5:
						position = [[(this.canvas.width / 100) * 8, (this.canvas.width / 100) * 2], [(this.canvas.width / 100) * 8, (this.canvas.width / 100) * 4.2], [(this.canvas.width / 100) * 8, (this.canvas.width / 100) * 6.4]];
						brighten = digitSegment[digit][i] ? true: false;
						break;
					case 6:
						position = [[(this.canvas.width / 100) * 8, (this.canvas.width / 100) * 10], [(this.canvas.width / 100) * 8, (this.canvas.width / 100) * 12.2], [(this.canvas.width / 100) * 8, (this.canvas.width / 100) * 14.4]];
						brighten = digitSegment[digit][i] ? true: false;
						break;
				}
				this.context.fillStyle= brighten ? '#ff0000': '#220000';

				this.context.beginPath();
				this.context.arc(position[0][0], position[0][1], (this.canvas.width / 100), 0, Math.PI * 2);
				this.context.fill();
				this.context.closePath();
				this.context.beginPath();
				this.context.arc(position[1][0], position[1][1], (this.canvas.width / 100), 0, Math.PI * 2);
				this.context.fill();
				this.context.closePath();
				this.context.beginPath();
				this.context.arc(position[2][0], position[2][1], (this.canvas.width / 100), 0, Math.PI * 2);
				this.context.fill();
				this.context.closePath();
			}
		}
	}

}());
window.onload = function() {
	var studioClock = new StudioClock('studio-clock');

//studioClock.drawClock;

//console.log('test ' + studioClock.test);
}
