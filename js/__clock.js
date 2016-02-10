(function() {

	// Constructeur
	this.StudioClock = function(id) {
		var container = document.getElementById(id);
		if(container) {
			var canvasElement = document.createElement('canvas');
			canvasElement.id = 'test';
			canvasElement.width = 500;
			canvasElement.height = 500;
			this.canvas = container.appendChild(canvasElement);

			this.ctx = this.canvas.getContext('2d');

			this.clock();
			setInterval(function() { this.clock()}.bind(this) , 1000);
		}

		this.clock = function() {
			var ccc = new Date();

			console.log(this.ctx);
			// Nettoyer le canvas
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
	};

	/*StudioClock.prototype.clock = function() {
		var ccc = new Date();

		console.log(this.ctx);
		// Nettoyer le canvas
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
/*
		ctx.fillStyle="#c82124";

		ctx.beginPath();
		ctx.arc(centerX + x, centerY + y, 5, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();*/
	/*}*/

	

	function DotClock() {

	}

}());

window.onload = function() {
	new StudioClock('studio-clock');
}

/*

window.onload = function() {

	var canvas = document.getElementById('studio-clock');
	var ctx = canvas.getContext('2d');

	var container = canvas.parentNode;

	var centerX, centerY, radius;

	/**
	 *   1
	 * 4   6
	 *   2
	 * 5   7
	 *   3
	 */
/*	var digitSegment = [
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
	]

	function drawClock() {
		// Nettoyer le canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		centerX = canvas.width / 2;
		centerY = canvas.height / 2;
		radius = canvas.width / 2 - 20;

		console.log('ok');

		digitDotMatrix(1);
	}

	function digitDotMatrix(digit) {
		var color, position = [], rayon = 3;

		if (digit >= 0 && digit <= 9) {
			for (var i = 0; i < 7; i++) {
				switch(i) {
					case 0:
						color = digitSegment[digit][i] ? '#ff0000': '#550000';
						ctx.fillStyle= color;

						position = [
							[0, 0],
							[15, 0],
							[30, 0]
						];
					break;
					default:
						console.log(color);
				}
			}
		}
	}

	setInterval(drawClock, 1000);
};
*/