describe ('Converter', function () {
	it('is an object with two methods, "encode" and "decode"', function () {
		expect(typeof Converter).toEqual('object');
	});
});

describe('encode', function () {
	it('takes an array as an argument and returns a string', function () {
		var array = ['hello', 'world'];
		expect(typeof Converter.encode(array)).toEqual('string');
	});

	it('throws an error if not given an array', function () {
		var fakeArray = 5;
		var wrapper = function (fakeArray) {
			Converter.encode(fakeArray);
		};

		expect(wrapper).toThrow();
	});

	it('can deal with empty arrays', function () {
		var empty = [];
		expect(Converter.encode(empty)).toEqual('[]');
	});
});

describe('decode', function () {
	it('takes a string as an argument and returns an array', function () {
		var string = 'hello world';
		expect(typeof Converter.decode(string)).toEqual('object');
		expect(typeof Converter.decode(string).length).toEqual('number');
	});

	it('throws an error if not given a string', function () {
		var fakeString = {fake: 'fake'};
		var wrapper = function (fakeString) {
			Converter.decode(fakeString);
		};

		expect(wrapper).toThrow();
	});

	it('can deal with empty strings', function () {
		var empty = '';
		expect(Converter.decode(empty)).toEqual([]);
	});
});

describe('has stability', function () {

	function deepEqual(arr1, arr2) {
		var arrayToUse = arr1.length > arr2.length? arr1 : arr2;
		for (var i = 0; i < arrayToUse.length; i++) {
			if (arr1[i] !== arr2[i]) {
				return false;
			}
		}
		return true;
	}

	it('for arrays with just strings', function () {
		var array1 = ['hello', 'world'];
		var encodedDecoded = Converter.decode(Converter.encode(array1));
		expect(deepEqual(encodedDecoded, array1)).toBe(true);
	});

	it('for arrays with strings with double quotes', function () {
		var array1 = ['he"ll"o', 'wo"rld'];
		var encodedDecoded = Converter.decode(Converter.encode(array1));
		expect(deepEqual(encodedDecoded, array1)).toBe(true);
	});

	it('for arrays with strings with special characters', function () {
		var array1 = [',', '!<,$^&', 'world'];
		var encodedDecoded = Converter.decode(Converter.encode(array1));
		expect(deepEqual(encodedDecoded, array1)).toBe(true);
	});

	it('for arrays with integers', function () {
		var array1 = ['hello', 'world', 42];
		var encodedDecoded = Converter.decode(Converter.encode(array1));

		expect(deepEqual(encodedDecoded, array1)).toBe(true);
	});

	xit('for arrays with other arrays', function () {
		var array1 = ['hello', 'world', ['hello']];
		var encodedDecoded = Converter.decode(Converter.encode(array1));
		expect(deepEqual(encodedDecoded, array1)).toBe(true);
	});
});