var Converter = {
	encode: function (array) {
		if (Array.isArray(array)) {
			var index = 0;
			var result = '';
			array.forEach(function (elem) {
				result += (index + '%%' + elem);
				index += 1;
			});
			return result;
		} else {
			throw new Error('encode only takes an array argument');
		}
		
	},
	decode: function (string) {
		if (typeof string === 'string') {
			var result = [];
			for (var i = 0; i < string.length; i++) {
				
			}
			return result;
		} else {
			throw new Error('decode only takes a string argument');
		}
	}
};