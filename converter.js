var Converter = {
	encode: function (array) {
		if (Array.isArray(array)) {
			var result = '[';
			for (var i = 0; i < array.length; i++) {
				if (typeof array[i] === 'string') {
					result += wrap(escapeQuotes(array[i]));
				} else if (typeof array[i] === 'number') {
					result += array[i];
				}
				if (i < array.length - 1) {
					result += ',';
				}
			}
			result += ']';
			return result;
		} else {
			throw new Error('encode only takes an array argument');
		}
		
	},
	decode: function (string) {
		var result = [];
		var current = '';
		var currentlyInString = false;
		for (var i = 1; i < string.length - 1; i++) {
			if (string[i] === '"') {
				if (string[i - 1] === '\\') {
					current += string[i];
				} else {
					currentlyInString = !currentlyInString;
					if (!currentlyInString) {
						result.push(current);
						current = '';
						i += 1;
					}
				}
			} else {
				if (currentlyInString) {
					if (string[i] !== '\\') {
						current += string[i];
					}
				} else {
					if (Number(string[i])) {
						var processNumberArray = processNumber(string, i);
						result.push(processNumberArray[0]);
						i = processNumberArray[1];
					}
				}
				
			}
		}
		return result;
	}
};

function wrap(string) {
	return '"' + string + '"';
}

function escapeQuotes(string) {
	return string.replace(/"/g, '\\"');
}

function processNumber(string, start) {
	var number = '';
	var endIndex;
	for (var i = start; i < string.length; i++) {
		if (Number(string[i])) {
			number += string[i];
		} else {
			endIndex = i;
			break;
		}
	}
	return [Number(number), endIndex];
}

