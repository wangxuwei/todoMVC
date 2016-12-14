var d = mvdom;

var taskHub = d.hub("taskHub");

// Subcribe to a topic 
// sub(topic,[labels,] handlerFunction, namespace) 
taskHub.sub("Task",function(data, info){
    console.log("topic: ", info.topic, ", label: ", info.label, ", data: ", data);
},{ns:"namespace"});

// or can subscribe only to the create label (here info.label will always be "create") 
taskHub.sub("Task", "create", function(data, info){
	data.id = getSeq();
	var tasks = getTasks();
	tasks.push(data);
	setTasks(tasks);
});

// or can subscribe only to the create label (here info.label will always be "create") 
taskHub.sub("Task", "delete", function(data, info){
	var id = data;
	var tasks = getTasks();
	if(id){
		for(var i = 0; i < tasks.length; i++){
			if(tasks[i].id == id){
				tasks.splice(i, 1);
			}
		}
	}
	setTasks(tasks);
});

taskHub.getData = function(){
	return getTasks();
}

function getSeq(){
	var seq = localStorage.tasks_seq || 1;
	seq = seq * 1;
	localStorage.tasks_seq = (seq + 1) + "";
	return seq;
}

function getTasks(){
	var tasksStr = localStorage.tasks;
	var tasks = [];
	if(tasksStr){
		tasks = JSON.parse(tasksStr);
	}
	return tasks;
}

function setTasks(data){
	localStorage.tasks = JSON.stringify(data);
}

window.taskHub = taskHub;