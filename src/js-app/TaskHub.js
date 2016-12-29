var app = window.app || {};
var d = mvdom;

var taskHub = d.hub("taskHub");

// Subcribe to a topic 
// sub(topic,[labels,] handlerFunction, namespace) 
taskHub.sub("Task",function(data, info){
    console.log("topic: ", info.topic, ", label: ", info.label, ", data: ", data);
},{ns:"namespace"});

// or can subscribe only to the create label (here info.label will always be "create") 
taskHub.sub("Task", "create", function(data, info){
	data = data || {};
	return app.doPost("/task/create", {entity: JSON.stringify(data)});
});

// or can subscribe only to the create label (here info.label will always be "create") 
taskHub.sub("Task", "update", function(data, info){
	data = data || {};
	return app.doPost("/task/update", {entity: JSON.stringify(data)});
});

// or can subscribe only to the create label (here info.label will always be "create") 
taskHub.sub("Task", "delete", function(data, info){
	return app.doPost("/task/delete", {id: data});
});

taskHub.list = function(name){
	return app.doGet("/task/list", {name: name});
}

taskHub.get = function(id){
	return app.doGet("/task/get", {id: id});
}

window.taskHub = taskHub;