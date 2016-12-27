
/**
 * we can use like this {{{incl "tmpl-test" data ...}}}
 */
Handlebars.registerHelper("incl", function(template,data,options) {
	var params = Array.prototype.slice.call(arguments, 1, arguments.length - 1);
	if(params.length == 1){
		params = params[0];
	}
	var html = render(template, params);
	return html;
});


Handlebars.registerHelper('check', function (lvalue, operator, rvalue, options) {

	var operators, result;

	if (arguments.length < 3) {
		throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
	}

	if (options === undefined) {
		options = rvalue;
		rvalue = operator;
		operator = "===";
	}

	operators = {
		'==': function (l, r) { return l == r; },
		'===': function (l, r) { return l === r; },
		'!==': function (l, r) { return l !== r; },
		'<': function (l, r) { return l < r; },
		'>': function (l, r) { return l > r; },
		'<=': function (l, r) { return l <= r; },
		'>=': function (l, r) { return l >= r; },
		'typeof': function (l, r) { return typeof l == r; }
	};

	if (!operators[operator]) {
		throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
	}

	result = operators[operator](lvalue, rvalue);

	if (result) {
		return options.fn(this);
	} else {
		return options.inverse(this);
	}

});