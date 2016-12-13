var d = mvdom;

d.register("MainView",{
    // Returns a HTML String or a HTML Element
    // Must be one parent element
    create: function(data, config){
        return render("MainView");
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
        // some non UI layout related, or actions that need to be performed after the component is displayed. 
        d.display("TodoList", d.first(".MainView"));
    }

});