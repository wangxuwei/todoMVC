var d = mvdom;

d.register("MainView",{
    // Returns a HTML String or a HTML Element
    // Must be one parent element
    create: function(data, config){
        return render("MainView");
    }, 

    // (optional) postDisplay() will be called after the component element is added to the dom
    // and in another event (used a setTimeout 0). 
    // Best Practice: This is a good place to add bindings that are not related to UI layout, or need to be done
    // after the component is displayed
    postDisplay: function(data, config){
        var view = this;
        // some non UI layout related, or actions that need to be performed after the component is displayed. 
        var username = app.pref.get("username");
        d.empty(d.first(view.el, ".MainView-content"));
        if(username){
            showMainView.call(view);
        }else{
            showLoginView.call(view);
        }
    },

    events: {
        "click; .log-off": function(){
            var view = this;
            app.doPost("/logoff", {}).then(function(response){
                if (response.success){
                    window.location.reload(true);
                }
            });
        }
    }

});


function showMainView(){
    var view = this;
    d.display("TodoList", d.first(view.el, ".MainView-content"));
    var logOffEl = d.first(".log-off");
    logOffEl.style.display = 'block';
}

function showLoginView(){
    var view = this;
    d.display("LoginView", d.first(view.el, ".MainView-content"));
    var logOffEl = d.first(".log-off");
    logOffEl.style.display = 'none';
}