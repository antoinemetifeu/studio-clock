window.onload = function() {
	var canvas = document.getElementById('studio-clock');
	var ctx = canvas.getContext('2d');
	
	var centerX = canvas.width / 2;
	var centerY = canvas.height / 2;
	var radius = canvas.width / 2 - 20;

	function draw() {
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
			console.log('theta ' + theta);
			var x = 250 * 0.9 * Math.cos(theta);
			var y = 250 * 0.9 * Math.sin(theta);
			console.log('x: ' + x + ' y: ' + y);

			ctx.fillStyle="#c82124";
			ctx.beginPath();
			ctx.arc(centerX + x, centerY + y, 5, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fill();
			if(i<12) {
			var theta = (i - 3) * (Math.PI * 2) / 12;
			console.log('theta ' + theta);
			var x = 250 * 0.8 * Math.cos(theta);
			var y = 250 * 0.8 * Math.sin(theta);
			console.log('x: ' + x + ' y: ' + y);
			
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
	}

	function lineToAngle(x, y, length, angle) {
		return {
			x: x + length * Math.cos(angle),
			y: y + length * Math.sin(angle)
		}
	}

	//                                                                                                                                                                document.addEventListener('load', draw(), false);
	draw();
};