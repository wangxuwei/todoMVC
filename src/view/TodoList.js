var d = mvdom;

d.register("TodoList",{
    // Returns a HTML String or a HTML Element
    // Must be one parent element
    create: function(data, config){
        return render("TodoList");
    }, 

    // (optional) init() will be called after the component element is created
    // but before it is added to the screen (i.e. added to the parent)
    init: function(data, config){
        var view = this; // best practice
        // if return a Promise, the flow will wait until the promise is resolved
    }, 

    // (optional) postDisplay() will be called after the component element is added to the dom
    // and in another event (used a setTimeout 0). 
    // Best Practice: This is a good place to add bindings that are not related to UI layout, or need to be done
    // after the component is displayed
    postDisplay: function(data, config){
        var view = this;
        // some non UI layout related, or actions that need to be performed after the component is displayed. 
        refreshItems.call(view);
    },

    // (optional) bind events to this view (support selector) 
    events: {
        "click; .btn-add": function(evt){
            var view = this; // this is the view 
            var inputEl = d.first(view.el, ".task-name");
            if(inputEl.value){
                taskHub.pub("Task", "create", {name: inputEl.value});
                inputEl.value = "";
            }
        },
        "click; .btn-delete": function(evt){
            var view = this; // this is the view 
            var targetEl = evt.target;
            var id = d.closest(targetEl, ".item").getAttribute("data-entity-id");
            taskHub.pub("Task", "delete", id);
        }
    },

    // (optional) subscribe to a hub by hub name, topic(s), and optional label(s) 
    hubEvents: {
        "taskHub": {
            // subscribe on the dataServiceHub on the topic Task and any labels "create" "update" or "delete" 
            "Task; create, delete": function(data, info){
                var view = this; // the this is this view object 
                console.log("Task has been " + info.label + "d");
                refreshItems.call(view);
            }
        }, 
    }

});


function refreshItems(){
    var view = this;
    var conEl = d.first(view.el, ".items-con");
    var data = taskHub.getData();
    var html = render("TodoList-items", {items: data});
    conEl.innerHTML = html;
}
