Usage:

	var	yellow = new Color(249, 237, 0),
		red = new Color(229, 0, 24),
		green = new Color(84, 180, 34);

	var percentage = 40;

	var progressBar = new ProgressBar(green, yellow, red)
		.update(percentage, function(percentage, color) { // Do something });					
				