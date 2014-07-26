var eventStream = require( 'event-stream' ),
	sStream = require( './../lib' );

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