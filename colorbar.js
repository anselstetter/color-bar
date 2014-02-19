var Color = function(r, g, b) {
	this.r = r;
	this.g = g;
	this.b = b;
};

var ProgressBar = function() {
	var colors = [];
	
	for (var i=0; i<arguments.length; i++)
		colors.push(arguments[i]);
	
	var bucketLength = 100 / (colors.length - 1);
	var currentColor = new Color(0, 0, 0);

	// -----------------------------------------------------------------------------------
	var _update = function(percentage, callback) {
	// -----------------------------------------------------------------------------------
		var index = _findCurrentColorIndex(percentage),
			intIndex = Math.floor(index),
			insideColorPercent = parseInt(index.toFixed(2) % 1 * 100),
			firstColor = colors[intIndex],
			secondColor = (intIndex == colors.length-1) ? colors[intIndex] : colors[intIndex+1];

		_calculateCurrentColor(firstColor, secondColor, insideColorPercent);
		_onUpdate(percentage, callback);										
	};
	// -----------------------------------------------------------------------------------
	var _calculateCurrentColor = function(first, second, percent) {
	// -----------------------------------------------------------------------------------
		// Calculate the current color percent and add the first value,
		// we've substracted earlier.
		// --------------------------------------------------------
		var deltaR = second.r - first.r,
			deltaG = second.g - first.g,
			deltaB = second.b - first.b,

			red = deltaR * percent / 100 + first.r,
			green = deltaG * percent / 100 + first.g,
			blue = deltaB * percent / 100 + first.b;
		
		currentColor.r = parseInt(red);
		currentColor.g = parseInt(green);
		currentColor.b = parseInt(blue);
	};
	// -----------------------------------------------------------------------------------
	var _getCurrentColor = function() {
	// -----------------------------------------------------------------------------------
		return currentColor;
	};
	// -----------------------------------------------------------------------------------
	var _onUpdate = function(percentage, callback) {
	// -----------------------------------------------------------------------------------
		var color = _rgbToHex(currentColor.r, currentColor.g, currentColor.b);
		callback(percentage, color);
	};
	// -----------------------------------------------------------------------------------
	var _findCurrentColorIndex = function(percentage) {
	// -----------------------------------------------------------------------------------
		return percentage / bucketLength;
	};
	// -----------------------------------------------------------------------------------
	var _rgbToHex = function(r, g, b) { // Helper function. Converts RGB to hex
	// -----------------------------------------------------------------------------------
		return _toHex(r)+_toHex(g)+_toHex(b);
	};
	// -----------------------------------------------------------------------------------
	var _toHex = function(n) { // Helper function. Converts an 8bit RGB value to hex
	// -----------------------------------------------------------------------------------
		if (n == null) 
			return "00";
		
		n = parseInt(n); 
		if (n == 0 || isNaN(n)) 
			return "00";
		
		n=Math.max(0, n); 
		n=Math.min(n, 255); 
		n=Math.round(n);
		return "0123456789ABCDEF".charAt((n - n % 16) / 16)
			 + "0123456789ABCDEF".charAt(n % 16);
	};

	return {
		update: _update,
		getCurrentColor: _getCurrentColor
	};
};