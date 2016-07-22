var nexo  = {
	data : {},
	stack : [],
	run : function () {
		for (var i = 0; i < this.stack.length; i++) this.stack[i].action(this.stack[i].attr[0], this.stack[i].attr[1]);
		this.stack = [];
	},
	get : function (name, attr) {
		if (typeof this.data[name].action === 'function') this.stack.push({ action : this.data[name].action, attr : [this, attr]});
		return this.data[name].html(this, attr);
	},
	set : function (name, html, action) {
		this.data[name] = {};
		this.data[name].html = html;
		if (typeof action === 'function') this.data[name].action = action;
	},
	destroy : function (name) {
		document.getElementById(name).innerHTML = "";
	},
	render : function (name, id, attr) {
		document.getElementById(id).innerHTML = this.data[name].html(this, attr);
		if (typeof this.data[name].action === 'function') this.stack.push({ action : this.data[name].action, attr : [this, attr]});
		this.run();
	},
	on : function (obj, eventHandler, callback) {
		obj.addEventListener(eventHandler, function (event) {
			callback(event);
		});
	},
	id : function (id) {
		return document.getElementById(id);
	},
	class : function (id) {
		return document.getElementsByClassName(id);
	}
}

if (typeof process === 'object') module.exports = nexo