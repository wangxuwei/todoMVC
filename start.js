var app = require("./server/server.js");

app.init().then(function(){
	app.start();
});