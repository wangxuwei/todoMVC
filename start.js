#! /usr/bin/env node

'use strict';

var Hapi = require( 'hapi' );
var Inert = require('inert');
var path = require("path");
var exec = require( 'child_process' ).exec;

var isWin = /^win/.test( process.platform );

var port = process.argv[ 2 ];
if( port === undefined ){
	port = 8888;
}
var server = new Hapi.Server();
server.connection({ port: port, 
					routes: { cors: 
								{origin: ['*'], 
								additionalHeaders: ["Accept-language"]
								}
							}
				});

server.ext({
	type: 'onPostHandler',
	method: function (request, reply) {
		//request.setUrl('/test');
		if (request.response && request.response.header){
			//console.log("set response header");
			request.response.header('access-control-allow-origin', '*');
			request.response.header('access-control-expose-headers', 'WWW-Authenticate,Server-Authorization');
		}
		//console.log(request.response);
		return reply.continue();
	}
});

server.register(Inert, function () {});

var root = process.cwd() + '/';

server.route({
	method: '*',
	path: '/{path*}',
	handler: {
		directory: {
			path: function( request ){
				console.log( ' > ' + new Date().getTime() + ' ' + request.method.toUpperCase() + ' ' + request.path );
				return root;
			},
			listing: true,
			index: [ 'index.html', 'default.html' ]
		}
	}
});

server.start( function(){
	console.log( 'Server address: http://localhost:%d', port );
	console.log( 'Server directory: %s', root );
	if( isWin ){
		exec( 'start http://localhost:' + port, function( error, stdout, stderr ){});
	}else{
		exec( 'open http://localhost:' + port, function( error, stdout, stderr ){});
	}
});