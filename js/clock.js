(function() {

	// Constructeur
	this.StudioClock = function(id) {
		console.log(id);
		//this.test = 'truc';
		this.canvas = document.getElementById(id);
		//this.canvas = document.getElementsByTagName('canvas');
		console.log(this.canvas);
		this.context = this.canvas.getContext('2d');

		//this.draw();
		//setInterval(function() {this.draw()}.bind(this), 1000);
		drawClock.call(this);
		setInterval(drawClock.bind(this), 1000);
	}

	// Methode public
	StudioClock.prototype.draw = function() {
		console.log('draw : ' + this.test);
	}

	// Methode privée
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

		//console.log(this.date.hoursDecade + ' ' + this.date.hoursUnite + ' - ' + minutesDecade + ' ' + minutesUnite + ' - ' + secondsDecade + ' ' + secondsUnite);
		//console.log('drawclock' + this.test);

		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.context.fillStyle = '#ff0000';
		this.context.save();

		drawDotCircle.call(this);

		drawDotMatrixDigit.call(this);

		/*this.context.fillStyle="#c82124";

		this.context.beginPath();
		this.context.arc(this.canvas.width / 2 , this.canvas.height / 2, this.canvas.width / 2, 0, Math.PI * 2);
		this.context.closePath();
		this.context.fill();*/
	}

	function drawDotCircle() {
		var minutes = parseInt(this.date.minutesDecade + '' + this.date.minutesUnit) + 1;
		var hours = parseInt(this.date.hoursDecade + '' + this.date.hoursUnit) + 1;
		var hours12 = ((hours + 11) % 12 + 1);

		for (var i = 0; i < 60; i++) {
			var theta = (i - 15) * (Math.PI * 2) / 60;
			var x = this.canvas.width / 2 * 0.9 * Math.cos(theta);
			var y = this.canvas.width / 2 * 0.9 * Math.sin(theta);

			if (i == minutes)
				this.context.fillStyle = '#550000';

			this.context.beginPath();
			this.context.arc(this.canvas.width / 2 + x , this.canvas.height / 2 + y, 5, 0, Math.PI * 2);
			this.context.closePath();
			this.context.fill();
		}
		this.context.restore();

		for (var i = 0; i < 12; i++) {
			var theta = (i - 3) * (Math.PI * 2) / 12;
			var x = this.canvas.width / 2 * 0.8 * Math.cos(theta);
			var y = this.canvas.width / 2 * 0.8 * Math.sin(theta);

		//	if (i == hours12)
		//		this.context.fillStyle = '#550000';

			this.context.beginPath();
			this.context.arc(this.canvas.width / 2 + x , this.canvas.height / 2 + y, 10, 0, Math.PI * 2);
			this.context.closePath();
			this.context.fill();
		}
		//this.context.restore();
	}

	function drawDotMatrixDigit() {

	}

}());
window.onload = function() {
	var studioClock = new StudioClock('studio-clock');

//studioClock.drawClock;

//console.log('test ' + studioClock.test);
}
