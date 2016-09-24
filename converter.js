var Converter = {
	encode: function (array) {
		if (Array.isArray(array)) {
			var result = '[';
			for (var i = 0; i < array.length; i++) {
				result += wrap(escapeQuotes(array[i]));
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
		if (typeof string === 'string') {
			var result = [];
			for (var i = 1; i < string.length; i++) {
				
			}
			return result;
		} else {
			throw new Error('decode only takes a string argument');
		}
	}
};

function wrap(string) {
	return '"' + string + '"';
}

function escapeQuotes(string) {
	return string.replace(/"/g, '\\"');
}

function unwrap(str) {
	return str.slice(1, -2);
}

function parse(string) {
	var result = [];
	var current = [];
	var currentlyInString = false;
	for (var i = 1; i < string.length - 1; i++) {
		if (string[i] === '"' && !currentlyInString) {
			currentlyInString = true;
		} else {
			if (string[i] === ',' && string[i + 1] === '"') {
				result.push(current.join(''));
				current = [];
				currentlyInString = false;
			} else {
				current.push(string[i]);
			}
		}
		
	}
	return result;
}