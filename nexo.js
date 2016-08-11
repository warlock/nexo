var n = {
	data : {},
	stack : [],
	relations : {},
	model : {
		store : {},
		set : function (key, data) {
			if (data instanceof Array) this.store[key] = data;
			else this.store[key] = [data];
			this.store[key].name = 'model';
			this.store[key].model = key;
			this.render(key);
		},
		get : function (key) {
			return this.store[key];
		},
		push : function (key, data) {
			this.store[key].push(data);
			this.render(key);
		},
		pop : function (key) {
			var ret = this.store[key].pop();
			this.render(key);
			return ret;
		},
		shift : function (key) {
			var ret = this.store[key].shift();
			this.render(key);
			return ret;
		},
		reverse : function (key) {
			var ret = this.store[key].reverse();
			this.render(key);
			return ret;
		},
		size : function (key) {
			return this.store[key].length;
		},
		length : function (key) {
			return this.store[key].length;
		},
		render : function (key) {
			for(var k in n.relations){
				if(n.relations[k].model ==  key) n.render(n.relations[k].comp, k, n.model.get(key));
			}
		}
	},
	empty : function (val) {
		return val === undefined || val === null || val === '';
	},
	id : function (id) {
		if (this.empty(id)) throw new Error('Id without value');
		else return document.getElementById(id);
	},
	class : function (id) {
		if (this.empty(id)) throw new Error('Class without value');
		else return document.getElementsByClassName(id);
	},
	run : function () {
		for (var i = 0; i < this.stack.length; i++) this.stack[i].action(this.stack[i].attr[0], this.stack[i].attr[1]);
		this.stack = [];
	},
	get : function (name, attr) {
		if (this.empty(name)) throw new Error('Get without name');
		else {
			if (typeof this.data[name].action === 'function') this.stack.push({ action : this.data[name].action, attr : [this, attr]});
			return this.data[name].html(this, attr);
		}
	},
	set : function (name, html, action) {
		if (this.empty(name)) throw new Error('Component without name.');
		else if (this.empty(html)) throw new Error('Component \'' + name + '\' without html.');
		else if (this.data[name] === 'undefined') throw new Error('Component \'' + name + '\' does not exists.');
		else if (this.empty(this.data[name].html)) throw new Error('The component \'' + name + '\' does not have html.');
		else {
			this.data[name] = {};
			this.data[name].html = html;
			if (typeof action === 'function') this.data[name].action = action;
		}
	},
	destroy : function (name) {
		if (this.empty(name)) throw new Error('Destroy without objective');
		else document.getElementById(name).innerHTML = "";
	},
	render : function (name, id, attr) {
		if (this.empty(name)) throw new Error('Render without name');
		else if (this.empty(id)) throw new Error('Render without objective');
		else {
			document.getElementById(id).innerHTML = this.data[name].html(this, attr);
			if (!this.empty(attr) && !this.empty(attr.name) && attr.name === 'model') this.relations[id] = { comp : name, model : attr.model };
			else if (!this.empty(this.relations[id])) delete this.relations[id];
			if (typeof this.data[name].action === 'function') this.stack.push({ action : this.data[name].action, attr : [this, attr]});
			this.run();
		}
	},
	on : function (obj, eventHandler, callback) {
		if (sb.empty(obj)) throw new Error('Event without objective');
		else if (sb.empty(eventHandler)) throw new Error('Event without event handler');
		else if (sb.empty(callback)) throw new Error('Event without function');
		else {
			obj.addEventListener(eventHandler, function (event) {
				callback(event);
			});
		}
	},
	ready : function (callback) {
		document.addEventListener("DOMContentLoaded", function(event) {
			callback(event);
		});
	}
};

if (typeof process === 'object') module.exports = n;
