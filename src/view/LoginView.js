var d = mvdom;

d.register("LoginView",{
    // Returns a HTML String or a HTML Element
    // Must be one parent element
    create: function(data, config){
        return render("LoginView");
    }, 
    // (optional) postDisplay() will be called after the component element is added to the dom
    // and in another event (used a setTimeout 0). 
    // Best Practice: This is a good place to add bindings that are not related to UI layout, or need to be done
    // after the component is displayed
    postDisplay: function(data, config){
    },

    events: {
        "keyup; input.form-control": function(evt){
            var view = this;
            if(evt.keyCode == 13){
                var data = getData.call(view);
                login.call(view, data);
            }
        },
        "click; .login-label": function(){
            var view = this;
            var data = getData.call(view);
            login.call(view, data);
        }
    }

});

function getData(){
    var view = this;
    var data = {};
    data.username = d.first("input[name='username']").value;
    data.password = d.first("input[name='pwd']").value;
    return data;
}

function login(data){
    var view = this;
    var msgEl = d.first(view.el, "#error-msg");
    msgEl.innerHTML = "";
    console.log(data);
    var message = checkLogin.call(view, data);
    if(!message){
        app.doPost("/login", data).then(function(response){
            if (response.success){
                app.pref.set("username", data.username);
                window.location.reload(true);
            }else{
                message = response.errorMessage;
                if(message){
                    msgEl.innerHTML = message;
                }
            }
        });
    }else{
        msgEl.innerHTML = message;
    }

}

function checkLogin(data){
    var view = this;
    var msg = null;

    if(!data.username){
        msg = "Username required";
        return msg;
    }

    if(!data.password){
        msg = "Password required";
    }
    return msg;
}
