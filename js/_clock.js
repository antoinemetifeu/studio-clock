window.onload = function() {
	var canvas = document.getElementById('studio-clock');
	var ctx = canvas.getContext('2d');

	var container = canvas.parentNode;
	
	var centerX = canvas.width / 2;
	var centerY = canvas.height / 2;
	var radius = canvas.width / 2 - 20;

	/**
	 *   1
	 * 4   6
	 *   2
	 * 5   7
	 *   3
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
	]

	

	function respondCanvas(){ 
		canvas.setAttribute('width', container.offsetWidth + 'px' ); //max width
		canvas.setAttribute('height', container.offsetHeight + 'px' ); //max height
		
		draw();
	}

	window.addEventListener('resize', respondCanvas, false);

	function draw() {
		centerX = canvas.width / 2;
		centerY = canvas.height / 2;
		radius = canvas.width / 2 - 20;

		var center = centerX > centerY ? centerY: centerX;

		// Nettoyer le canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		//canvas.style.backgroundColor = "red";
		
		/*ctx.strokeStyle ="#c82124";
		// Dessiner l'horloge
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
		ctx.lineWidth=10;
		ctx.stroke();
		ctx.closePath();*/

		for (var i = 0; i < 60; i++) {
			ctx.beginPath(); // La bouche, un arc de cercle
			//ctx.arc(75 + i * 60, 75 + i * 60, 10, 0, Math.PI * 2); // Ici aussi
			/*document.body.innerHTML = 2 / Math.PI;
			ctx.arc(centerX + i * 60, 20 + i * 60, 10, 0, Math.PI * 2);
			ctx.lineWidth=10;
			ctx.stroke();
			ctx.fill();*/

			var theta = (i - 15) * (Math.PI * 2) / 60;
		//	console.log('theta ' + theta);
			var x = center * 0.9 * Math.cos(theta);
			var y = center * 0.9 * Math.sin(theta);
		//	console.log('x: ' + x + ' y: ' + y);

			ctx.fillStyle="#c82124";
			ctx.beginPath();
			ctx.arc(centerX + x, centerY + y, 5, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fill();
			if(i<12) {
			var theta = (i - 3) * (Math.PI * 2) / 12;
		//	console.log('theta ' + theta);
			var x = center * 0.8 * Math.cos(theta);
			var y = center * 0.8 * Math.sin(theta);
		//	console.log('x: ' + x + ' y: ' + y);
			
			ctx.beginPath();
			ctx.arc(centerX + x, centerY + y, 10, 0, Math.PI * 2);
			ctx.fill();
			}


			/*radius = 100;
			var angle = 0;
			var step = (2*Math.PI) / 60;
			var x = Math.round(ctx.canvas.width/2 + radius * Math.cos(angle) - ctx.canvas.width/2),
        	y = Math.round(ctx.canvas.height/2 + radius * Math.sin(angle) - ctx.canvas.height/2);
        	console.log(x + ' - ' + y);
        	console.log(angle);
        	ctx.arc(x, y, 5, 0, Math.PI * 2);
        	angle += step;*/

			/*var pos = lineToAngle(ctx.canvas.width * 0.5, ctx.canvas.height * 0.5, ctx.canvas.width * 0.5 * 0.9, i);
			console.log(pos.x + ' - ' + pos.y);
			ctx.beginPath();
			ctx.arc(pos.x, pos.y, 5, 0, Math.PI * 2);
			ctx.fill();
			ctx.lineWidth=10;
			ctx.stroke();*/
		}
        /*        ctx.fillStyle="ivory";
                ctx.fill();
                ctx.fillStyle="black";
                ctx.fillText("12",145,115);*/

                var date = new Date();
                var dizaines = (Math.floor((date.getSeconds()/10)%10));
                var unites = (date.getSeconds()%10);
                //alert(dizaines + ' - ' + unites);
				ctx.save();
				ctx.translate(-60, -60);
				drawDigit(dizaines);
				ctx.restore();
				//drawDigit(unites);
				//ctx.save();
				//ctx.translate(centerX, centerY - 60);
				digitDotMatrix(unites, 0);
				//ctx.restore();
	}

	setInterval(draw, 1000);

	function digitDotMatrix(digit, size) {
		//alert('ok');
	}

	function _digitDotMatrix(digit, size) {
		alert(digit);
		if(digit >= 0 && digit <= 9) {
			//var color, position = [], rayon;
			//alert('ok');
			for(var i = 0; i < 7; i++) {
				//position = [];
			/*	switch(i) {
					case 0:
						color = digitSegment[digit][i] ? '#ff0000': '#550000';
						ctx.fillStyle= color;

						position = [
							[0, 0],
							[15, 0],
							[30, 0]
						];
					break;
					case 1:
						color = digitSegment[digit][i] ? '#ff0000': '#550000';
						ctx.fillStyle= color;

						position = [
							[0, 50],
							[15, 50],
							[30, 50]
						];
					break;
					case 2:
						color = digitSegment[digit][i] ? '#ff0000': '#550000';
						ctx.fillStyle= color;

						position = [
							[0, 100],
							[15, 100],
							[30, 100]
						];
					break;
					case 3:
						color = digitSegment[digit][i] ? '#ff0000': '#550000';
						ctx.fillStyle= color;

						position = [
							[-10, 10],
							[-10, 25],
							[-10, 40]
						];
					break;
					case 4:
						color = digitSegment[digit][i] ? '#ff0000': '#550000';
						ctx.fillStyle= color;

						position = [
							[-10, 60],
							[-10, 75],
							[-10, 90]
						];
					break;
					case 5:
						color = digitSegment[digit][i] ? '#ff0000': '#550000';
						ctx.fillStyle= color;

						position = [
							[40, 10],
							[40, 25],
							[40, 40]
						];
					break;
					case 6:
						color = digitSegment[digit][i] ? '#ff0000': '#550000';
						ctx.fillStyle= color;

						position = [
							[40, 60],
							[40, 75],
							[40, 90]
						];
					break;
					default:
						ctx.beginPath();
						ctx.arc(position[0][0], position[0][1], 3, 0, Math.PI * 2);
						ctx.fill();
						ctx.closePath();
						ctx.beginPath();
						ctx.arc(position[1][0], position[1][1], 3, 0, Math.PI * 2);
						ctx.fill();
						ctx.closePath();
						ctx.beginPath();
						ctx.arc(position[2][0], position[2][1], 3, 0, Math.PI * 2);
						ctx.fill();
						ctx.closePath();
				}*/
			}
		}
	}

	function drawDigit(digit) {
		//ctx.save();
		//ctx.translate(0, - ((centerY / 2) - 50));
		//ctx.rotate((Math.PI / 180) * 1); // Math.PI / 180
		//ctx.rotate((Math.PI / 180) * 0);
		var color;
		if(digit >= 0 && digit <= 9) {
			var i = 0;
			while (i < 7) {
				switch(i) {
					case 0:
						color = digitSegment[digit][i] ? '#ff0000': '#550000';
						ctx.fillStyle= color;

						ctx.beginPath();
						ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
						ctx.fill();
						ctx.beginPath();
						ctx.arc(centerX + 15, centerY, 3, 0, Math.PI * 2);
						ctx.fill();
						ctx.beginPath();
						ctx.arc(centerX + 30, centerY, 3, 0, Math.PI * 2);
						ctx.fill();
					break;
					case 1:
						color = digitSegment[digit][i] ? '#ff0000': '#550000';
						ctx.fillStyle= color;

						ctx.beginPath();
						ctx.arc(centerX, centerY + 50, 3, 0, Math.PI * 2);
						ctx.fill();
						ctx.beginPath();
						ctx.arc(centerX + 15, centerY + 50, 3, 0, Math.PI * 2);
						ctx.fill();
						ctx.beginPath();
						ctx.arc(centerX + 30, centerY + 50, 3, 0, Math.PI * 2);
						ctx.fill();
					break;
					case 2:
						color = digitSegment[digit][i] ? '#ff0000': '#550000';
						ctx.fillStyle= color;

						ctx.beginPath();
						ctx.arc(centerX, centerY + 100, 3, 0, Math.PI * 2);
						ctx.fill();
						ctx.beginPath();
						ctx.arc(centerX + 15, centerY + 100, 3, 0, Math.PI * 2);
						ctx.fill();
						ctx.beginPath();
						ctx.arc(centerX + 30, centerY + 100, 3, 0, Math.PI * 2);
						ctx.fill();
					break;
					case 3:
						color = digitSegment[digit][i] ? '#ff0000': '#550000';
						ctx.fillStyle= color;

						ctx.beginPath();
						ctx.arc(centerX - 10, centerY + 10, 3, 0, Math.PI * 2);
						ctx.fill();
						ctx.beginPath();
						ctx.arc(centerX - 10, centerY + 25, 3, 0, Math.PI * 2);
						ctx.fill();
						ctx.beginPath();
						ctx.arc(centerX - 10, centerY + 40, 3, 0, Math.PI * 2);
						ctx.fill();
					break;
					case 4:
						color = digitSegment[digit][i] ? '#ff0000': '#550000';
						ctx.fillStyle= color;

						ctx.beginPath();
						ctx.arc(centerX - 10, centerY + 60, 3, 0, Math.PI * 2);
						ctx.fill();
						ctx.beginPath();
						ctx.arc(centerX - 10, centerY + 75, 3, 0, Math.PI * 2);
						ctx.fill();
						ctx.beginPath();
						ctx.arc(centerX - 10, centerY + 90, 3, 0, Math.PI * 2);
						ctx.fill();
					break;
					case 5:
						color = digitSegment[digit][i] ? '#ff0000': '#550000';
						ctx.fillStyle= color;

						ctx.beginPath();
						ctx.arc(centerX + 40, centerY + 10, 3, 0, Math.PI * 2);
						ctx.fill();
						ctx.beginPath();
						ctx.arc(centerX + 40, centerY + 25, 3, 0, Math.PI * 2);
						ctx.fill();
						ctx.beginPath();
						ctx.arc(centerX + 40, centerY + 40, 3, 0, Math.PI * 2);
						ctx.fill();
					break;
					case 6:
						color = digitSegment[digit][i] ? '#ff0000': '#550000';
						ctx.fillStyle= color;

						ctx.beginPath();
						ctx.arc(centerX + 40, centerY + 60, 3, 0, Math.PI * 2);
						ctx.fill();
						ctx.beginPath();
						ctx.arc(centerX + 40, centerY + 75, 3, 0, Math.PI * 2);
						ctx.fill();
						ctx.beginPath();
						ctx.arc(centerX + 40, centerY + 90, 3, 0, Math.PI * 2);
						ctx.fill();
					break;
				}

				i++;
			}
		}

		ctx.restore();
	}

	function lineToAngle(x, y, length, angle) {
		return {
			x: x + length * Math.cos(angle),
			y: y + length * Math.sin(angle)
		}
	}

	//                                                                                                                                                                document.addEventListener('load', draw(), false);
	respondCanvas();
};