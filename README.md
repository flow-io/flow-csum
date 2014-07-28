flow-csum
=========

Transform stream factory to calculate the cumulative sum of a numeric data stream.


## Installation

``` bash
$ npm install flow-csum
```

## API

To create a stream factory,

``` javascript
var sumStream = require( 'flow-csum' );

// Create a new factory:
var sStream = sumStream();
```

### sStream.sum( [value] )

This method is a setter/getter. If no `value` is provided, returns the initial sum `value`. To set the initial sum,

``` javascript
sStream.sum( 100 );
```

### sStream.stream()

To create a new sum stream,

``` javascript
var stream = sStream.stream();
```


## Usage

Methods are chainable.

``` javascript
sumStream()
	.sum( 100 )
	.stream()
	.pipe( /* writable stream */ );
```


## Examples

``` javascript
var eventStream = require( 'event-stream' ),
	sStream = require( 'flow-csum' );

// Create some data...
var data = new Array( 1000 );
for ( var i = 0; i < 1000; i++ ) {
	data[ i ] = Math.random();
}

// Create a readable stream:
var readStream = eventStream.readArray( data );

// Create a new sum stream:
var stream = sStream().stream();

// Pipe the data:
readStream.pipe( stream )
	.pipe( eventStream.map( function( d, clbk ) {
		clbk( null, d.toString()+'\n' );
	}))
	.pipe( process.stdout );
```

## Tests

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions.

Assuming you have installed Mocha, execute the following command in the top-level application directory to run the tests:

``` bash
$ mocha
```

All new feature development should have corresponding unit tests to validate correct functionality.


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.

