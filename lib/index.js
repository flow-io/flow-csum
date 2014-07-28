/**
*
*	STREAM: cumulative sum
*
*
*	DESCRIPTION:
*		- Transform stream factory to calculate the cumulative sum of a numeric data stream.
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	HISTORY:
*		- 2014/07/26: Created. [AReines].
*
*
*	DEPENDENCIES:
*		[1] through
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. athan@nodeprime.com. 2014.
*
*/

(function() {
	'use strict';

	// MODULES //

	var // Through module:
		through = require( 'through' );


	// FUNCTIONS //

	/**
	* FUNCTION: onData( sum )
	*	Returns a callback which calculates the cumulative sum.
	*
	* @private
	* @param {Number} sum - initial sum value
	* @returns {Function} callback
	*/
	function onData( sum ) {
		/**
		* FUNCTION: onData( newVal )
		*	Data event handler. Calculates a cumulative sum.
		*
		* @private
		* @param {Number} newVal - streamed data value
		*/
		return function onData( newVal ) {
			sum += newVal;
			this.queue( sum );
		}; // end FUNCTION onData()
	} // end FUNCTION onData()


	// STREAM //

	/**
	* FUNCTION: Stream()
	*	Stream constructor.
	*
	* @constructor
	* @returns {Stream} Stream instance
	*/
	function Stream() {
		this._sum = 0;
		return this;
	} // end FUNCTION Stream()

	/**
	* METHOD: sum( value )
	*	Setter and getter for initial sum. If a value is provided, sets the initial sum. If no value is provided, returns the initial sum.
	*
	* @param {Number} value - initial sum
	* @returns {Stream|Number} Stream instance or initial sum
	*/
	Stream.prototype.sum = function( value ) {
		if ( !arguments.length ) {
			return this._sum;
		}
		if ( typeof value !== 'number' || value !== value ) {
			throw new Error( 'sum()::invalid input argument. Initial sum must be numeric.' );
		}
		this._sum = value;
		return this;
	}; // end METHOD sum()

	/**
	* METHOD: stream()
	*	Returns a through stream for calculating the cumulative sum.
	*
	* @returns {object} through stream
	*/
	Stream.prototype.stream = function() {
		return through( onData( this._sum ) );
	}; // end METHOD stream()


	// EXPORTS //

	module.exports = function createStream() {
		return new Stream();
	};

})();