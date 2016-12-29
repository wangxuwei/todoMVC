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
        "click; .item .name": function(evt){
            var view = this; // this is the view 
            var id = d.closest(evt.target, ".item").getAttribute("data-entity-id");
            d.display("TodoPopup", d.first("body"), {id: id});
        },
        "click; .btn-add": function(evt){
            var view = this; // this is the view 
            d.display("TodoPopup", d.first("body"));
        },
        "click; .btn-delete": function(evt){
            var view = this; // this is the view 
            var targetEl = evt.target;
            var id = d.closest(targetEl, ".item").getAttribute("data-entity-id");
            taskHub.pub("Task", "delete", id);
        },
        "click; .btn-doing": function(evt){
            var view = this; // this is the view 
            var targetEl = evt.target;
            var id = d.closest(targetEl, ".item").getAttribute("data-entity-id");
            var props = {id: id};
            props.status = "Doing";
            taskHub.pub("Task", "update", props);
        },
        "click; .btn-done": function(evt){
            var view = this; // this is the view 
            var targetEl = evt.target;
            var id = d.closest(targetEl, ".item").getAttribute("data-entity-id");
            var props = {id: id};
            props.status = "Done";
            taskHub.pub("Task", "update", props);
        },
        "keyup; .task-name": function(evt){
            var view = this;
            if(evt.keyCode == 13){
                refreshItems.call(view);
            }
        }
    },

    // (optional) subscribe to a hub by hub name, topic(s), and optional label(s) 
    hubEvents: {
        "taskHub": {
            // subscribe on the dataServiceHub on the topic Task and any labels "create" "update" or "delete" 
            "Task; create, delete, update": function(data, info){
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
    var inputEl = d.first(view.el, ".task-name");
    d.empty(conEl);
    taskHub.list(inputEl.value).then(function(data){
        data = data || [];
        for(var i = 0; i < data.length; i++){
            var item = data[i];
            item.status = item.status ? item.status : "Init";
            var html = render("TodoList-items", {item: item});
            conEl.innerHTML = conEl.innerHTML + html;
        }
    });
}
