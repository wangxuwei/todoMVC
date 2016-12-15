var app = app || {};

// --------- AJAX Wrapper --------- //
// Very simple AJAX wrapper that allow us to simply normalize request/response, and eventually put some hooks such as
// performance and error reporting. 

app.doGet = function(path, data){
	return ajax(false,path,data);
};

app.doPost = function(path, data){
	return ajax(true,path,data);
};

app.ajax = function(path, data, isPost){
	return ajax(isPost,path,data);
};

function ajax(isPost, path, params, file){
	var method = isPost ? "POST" : "GET";
	return new Promise(function(resolve, reject){
		var xhr = new XMLHttpRequest();
		var uri = encodeURI(path);
		
		if (method === "GET"){
			var hasParams = (params)?true:false;
			if (hasParams){
				uri += "?" + encodeParams(params);
			}
		}

		xhr.open(method, uri);

		if (method === "POST"){
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');	
		}

		xhr.onload = function() {
			if (xhr.status === 200) {
				resolve (JSON.parse(xhr.responseText));
			}
			else if (xhr.status !== 200) {
				reject(new Error("HTTP XHR ERROR - " + xhr.status + " error for [" + uri + "] " ));
			}
		};

		if (method === "POST"){
			xhr.send(encodeParams(params));
		}else{
			xhr.send();	
		}
		
	});
}


function encodeParams(object) {
	var encodedString = '';
	for (var prop in object) {
		if (object.hasOwnProperty(prop)) {
			if (encodedString.length > 0) {
				encodedString += '&';
			}
			encodedString += encodeURI(prop + '=' + object[prop]);
		}
	}
	return encodedString;
}

module.exports = app;
window.app = module.exports;
// --------- /AJAX Wrapper --------- //
