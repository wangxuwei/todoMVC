var d = mvdom;

d.pusher("textarea", function(value){
	this.value = value || "";
});

document.addEventListener("DOMContentLoaded", function(event) {
	d.display("MainView", d.first("body"));
});