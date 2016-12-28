var utils = require('../utils.js');
var daos = require('../dao/daos.js');
var moment = require('moment');

var run = utils.run;

var count = 0;

var routes = []; 

// This export One Extension that can have multiple routes 
// that will be loaded by App in main.js
module.exports = routes;


routes.push({
	method: 'GET',
	path:'/task/list', 
	handler: function (request, reply) {
		var taskDao = daos.task;
		reply(taskDao.list());
	}	
});

routes.push({
	method: 'GET',
	path:'/task/get', 
	handler: function (request, reply) {
		var taskDao = daos.task;
		var entity = taskDao.get(parseInt(request.url.query.id));
		reply(entity || {});
	}	
});

routes.push({
	method: 'POST',
	path:'/task/create', 
	handler: function (request, reply) {
		var taskDao = daos.task;
		var entity = JSON.parse(request.payload.entity);
		entity = Object.assign({}, entity, {lastUpdate: moment().format("YYYY-MM-DD HH:mm:ss")});
		var entityId = taskDao.create(entity);
		console.log(moment());
		reply({id: entityId});
	}	
});

routes.push({
	method: 'POST',
	path:'/task/update', 
	handler: function (request, reply) {
		var taskDao = daos.task;
		var entity = JSON.parse(request.payload.entity);
		entity = Object.assign({}, entity, {lastUpdate: moment().format("YYYY-MM-DD HH:mm:ss")});
		var entityId = taskDao.update(entity);
		reply(entity);
	}	
});

routes.push({
	method: 'POST',
	path:'/task/delete', 
	handler: function (request, reply) {
		var taskDao = daos.task;
		var entityId = taskDao.delete(request.payload.id);
		reply({id: entityId});
	}	
});
