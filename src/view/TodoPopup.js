var d = mvdom;

d.register("TodoPopup",{
    // Returns a HTML String or a HTML Element
    // Must be one parent element
    create: function(data, config){
        return render("TodoPopup");
    }, 

    // (optional) postDisplay() will be called after the component element is added to the dom
    // and in another event (used a setTimeout 0). 
    // Best Practice: This is a good place to add bindings that are not related to UI layout, or need to be done
    // after the component is displayed
    postDisplay: function(data, config){
        var view = this;
        data = data || {};
        view.objId = data.id;
        taskHub.get(view.objId).then(function(result){
            loadTask.call(view, result);
        });
    },

    events: {
        "click; .btn.save": function(){
            var view = this;
            taskHub.pub("Task", "update", getTaskData.call(view));
            d.remove(view.el);
        },
        "click; .btn.cancel": function(){
            var view = this;
            d.remove(view.el);
        }
    }

});


function getTaskData(){
    var view = this;
    var props = d.pull(view.el);
    props.id = view.objId;
    return props;
}

function loadTask(task){
    var view = this;
    task.status = task.status ? task.status : "Init";
    d.push(view.el, task);
}