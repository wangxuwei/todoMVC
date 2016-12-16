var app = window.app || {};

app.pref = {
	set : function(key, value) {
		cookie(key, value);
	},
	get : function(key, defaultVal) {
		var val = cookie(key);
		return val ? val : defaultVal;
	}
};

function cookie(name, value, options) {
	if ( typeof value !== 'undefined') {
		options = options || {expires:365};
		if (value === null) {
			value = '';
			options = $.extend({}, options);
			options.expires = -1;
		}
		var expires = '';
		if (options.expires && ( typeof options.expires === 'number' || options.expires.toUTCString)) {
			var date;
			if ( typeof options.expires === 'number') {
				date = new Date();
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString();
		}
		var path = options.path ? '; path=' + (options.path) : '';
		var domain = options.domain ? '; domain=' + (options.domain) : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	} else {
		var cookieValue = null;
		if (document.cookie && document.cookie !== '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = cookies[i].replace(/(^\s*)|(\s*$)/g, "");
				if (cookie.substring(0, name.length + 1) === (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};


module.exports = app;
window.app = Object.assign({}, module.exports);