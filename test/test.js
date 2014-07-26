
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Test utilities:
	utils = require( './utils' ),

	// Module to be tested:
	sStream = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'cumulative sum', function tests() {
	'use strict';

	it( 'should export a factory function', function test() {
		expect( sStream ).to.be.a( 'function' );
	});

	it( 'should provide a method to set/get the initial sum', function test() {
		var tStream = sStream();
		expect( tStream.sum ).to.be.a( 'function' );
	});

	it( 'should set the initial sum', function test() {
		var tStream = sStream();
		tStream.sum( 100 );
		assert.strictEqual( tStream.sum(), 100 );
	});

	it( 'should not allow a non-numeric initial sum', function test() {
		var tStream = sStream(),
			values = [
				'5',
				[],
				{},
				null,
				undefined,
				NaN,
				false,
				function(){}
			];
		
		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}

		function badValue( value ) {
			return function() {
				tStream.sum( value );
			};
		}
	});

	it( 'should calculate the cumulative sum of piped data', function test( done ) {
		var data, expected, tStream, SUM = 0;

		// Simulate some data...
		data = [ 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5 ];

		// Expected values is the cumulative sum:
		expected = [ 2, 4, 6, 9, 12, 15, 19, 23, 27, 32, 37, 42 ];

		// Create a new cumulative sum stream:
		tStream = sStream()
			.sum( SUM )
			.stream();

		// Mock reading from the stream:
		utils.readStream( tStream, onRead );

		// Mock piping a data to the stream:
		utils.writeStream( data, tStream );

		return;

		/**
		* FUNCTION: onRead( error, actual )
		*	Read event handler. Checks for errors and compares streamed data to expected data.
		*/
		function onRead( error, actual ) {
			expect( error ).to.not.exist;

			for ( var i = 0; i < expected.length; i++ ) {
				assert.strictEqual(
					actual[ i ],
					expected[ i ]
				);
			}
			done();
		} // end FUNCTION onRead()
	});

	it( 'should calculate the cumulative sum of piped data initialized with an arbitrary sum', function test( done ) {
		var data, expected, tStream, SUM = 100;

		// Simulate some data...
		data = [ 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5 ];

		// Expected values is the cumulative sum:
		expected = [ 102, 104, 106, 109, 112, 115, 119, 123, 127, 132, 137, 142 ];

		// Create a new cumulative sum stream:
		tStream = sStream()
			.sum( SUM )
			.stream();

		// Mock reading from the stream:
		utils.readStream( tStream, onRead );

		// Mock piping a data to the stream:
		utils.writeStream( data, tStream );

		return;

		/**
		* FUNCTION: onRead( error, actual )
		*	Read event handler. Checks for errors and compares streamed data to expected data.
		*/
		function onRead( error, actual ) {
			expect( error ).to.not.exist;

			for ( var i = 0; i < expected.length; i++ ) {
				assert.strictEqual(
					actual[ i ],
					expected[ i ]
				);
			}
			done();
		} // end FUNCTION onRead()
	});

});