var n = {
	store : new Map(),
	data : {},
	stack : [],
	empty : function(val) {
		return val === undefined || val === null || val === '';
	},
	id : function (id) {
		if (this.empty(id)) throw 'Error: id without value';
		else return document.getElementById(id);
	},
	class : function (id) {
		if (this.empty(id)) throw 'Error: class without value';
		else return document.getElementsByClassName(id);
	},
	run : function () {
		for (var i = 0; i < this.stack.length; i++) this.stack[i].action(this.stack[i].attr[0], this.stack[i].attr[1]);
		this.stack = [];
	},
	get : function (name, attr) {
		if (this.empty(name)) throw 'Error: get without name';
		else {
			if (typeof this.data[name].action === 'function') this.stack.push({ action : this.data[name].action, attr : [this, attr]});
			return this.data[name].html(this, attr);
		}
	},
	set : function (name, html, action) {
		if (this.empty(name)) throw 'Error: set component without name';
		else if (this.empty(html)) throw 'Error: set component without html';
		else {
			this.data[name] = {};
			this.data[name].html = html;
			if (typeof action === 'function') this.data[name].action = action;
		}
	},
	destroy : function (name) {
		if (this.empty(name)) throw 'Error: destroy without objective';
		else document.getElementById(name).innerHTML = "";
	},
	render : function (name, id, attr) {
		if (this.empty(name)) throw 'Error: render without name';
		else if (this.empty(id)) throw 'Error: render without objective';
		else {
			document.getElementById(id).innerHTML = this.data[name].html(this, attr);
			if (typeof this.data[name].action === 'function') this.stack.push({ action : this.data[name].action, attr : [this, attr]});
			this.run();
		}
	},
	on : function (obj, eventHandler, callback) {
		if (sb.empty(obj)) throw 'Error: event without objective';
		else if (sb.empty(eventHandler)) 'Error: event without event handler';
		else if (sb.empty(callback)) 'Error: event without function';
		else {
			obj.addEventListener(eventHandler, function (event) {
				callback(event);
			});
		}
	},
	ready : function (callback) {
		document.addEventListener("DOMContentLoaded", function(event) {
			callback(event)
		})
	}
}

if (typeof process === 'object') module.exports = n