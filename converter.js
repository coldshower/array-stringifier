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

