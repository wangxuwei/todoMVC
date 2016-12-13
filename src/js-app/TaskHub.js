var d = mvdom;

var taskHub = d.hub("taskHub");
var _tasks = [];
var _id = 1;

// Subcribe to a topic 
// sub(topic,[labels,] handlerFunction, namespace) 
taskHub.sub("Task",function(data, info){
    console.log("topic: ", info.topic, ", label: ", info.label, ", data: ", data);
},{ns:"namespace"});

// or can subscribe only to the create label (here info.label will always be "create") 
taskHub.sub("Task", "create", function(data, info){
	data.id = getSeq();
	_tasks.push(data);
});

// or can subscribe only to the create label (here info.label will always be "create") 
taskHub.sub("Task", "delete", function(data, info){
	var id = data;
	if(id){
		for(var i = 0; i < _tasks.length; i++){
			if(_tasks[i].id == id){
				_tasks.splice(i, 1);
			}
		}
	}
});

taskHub.getData = function(){
	return _tasks;
}

function getSeq(){
	return _id++;
}


window.taskHub = taskHub;