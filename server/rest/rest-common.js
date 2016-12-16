var utils = require('../utils.js');
var daos = require('../dao/daos.js');

var run = utils.run;

var count = 0;

var routes = []; 

// This export One Extension that can have multiple routes 
// that will be loaded by App in main.js
module.exports = routes;


routes.push({
	method: 'POST',
	path:'/login', 
	handler: function (request, reply) {
		var userDao = daos.user;
		var username = request.payload.username;
		var password = request.payload.password;
		var users = userDao.list();

		var existUser = null;
		for(var i = 0; i < users.length; i++){
			var user = users[i];
			if(user.username == username && user.password == password){
				existUser = user;
				break;
			}
		}

		if(existUser){
			reply({success: true});
		}else{
			reply({success: false, errorMessage: "Incorrect username or passowrd"});
		}
	}
});
