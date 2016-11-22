var n = {
	data : {},
	stack : [],
	relations : {},
	model : {
		store : {},
		set : function (model, data) {
			if (data instanceof Array) this.store[model] = data;
			else this.store[model] = [data];
			this.store[model].name = 'model';
			this.store[model].model = model;
			this.render(model);
		},
		get : function (model) {
			if (n.empty(this.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
			else return this.store[model];
		},
		push : function (model, data) {
			if (n.empty(this.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
			else {
				this.store[model].push(data);
				this.render(model);
			}
		},
		pop : function (model) {
			if (n.empty(this.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
			else {
				var ret = this.store[model].pop();
				this.render(model);
				return ret;
			}
		},
		shift : function (model) {
			if (n.empty(this.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
			else {
				var ret = this.store[model].shift();
				this.render(model);
				return ret;
			}
		},
		reverse : function (model) {
			if (n.empty(this.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
			else {
				var ret = this.store[model].reverse();
				this.render(model);
				return ret;
			}
		},
		size : function (model) {
			if (n.empty(this.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
			else return this.store[model].length;
		},
		keys : function (model) {
			if (n.empty(this.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
			else return Object.keys(this.store[model][0]);
		},
		length : function (model) {
			if (n.empty(this.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
			else return this.store[model].length;
		},
		delete : function (model) {
			if (n.empty(this.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
			else delete this.store[model];
		},
		remove : function (model, data) {
			if (n.empty(this.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
			else if (n.empty(data)) throw new Error('Remove in \'' + model + '\' need a object or key.');
			else if (typeof data === 'number' || data instanceof Number) {
				this.store[model].splice(data, 1);
				this.render(model);
			} else if (typeof data === 'object') {
				var keys = Object.keys(data);
				var res =  this.store[model].filter(function (e) {
					var chck = true;
					keys.forEach(function (k) {
						if (typeof e[k] === 'string') {
							if(e[k].indexOf(data[k]) >= 0) chck = false;
						} else {
							if(e[k] === data[k]) chck = false;
						}
					});
					return chck;
				});
				this.store[model] = res;
				this.store[model].name = 'model';
				this.store[model].model = model;
				this.render(model);
			}
		},
		clear : function (model) {
			if (n.empty(this.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
			else {
				this.store[model] = [];
				this.store[model].name = 'model';
				this.store[model].model = model;
				this.render(model);
			}
		},
		index : function (model, index) {
			if (n.empty(this.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
			else if (n.empty(this.store[model][index])) throw new Error('Model \'' + model + '\' not have index: ' + index);
			else return this.store[model][index];
		},
		first : function (model) {
			if (n.empty(this.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
			else return this.store[model][0];
		},
		last : function (model) {
			if (n.empty(this.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
			else return this.store[model][this.store[model].length-1];
		},
		find : function (model, obj) {
			if (n.empty(this.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
			else if (n.empty(obj) && typeof obj !== 'object') throw new Error('Find in \'' + model + '\' need a object.');
			else {
				var keys = Object.keys(obj);
				var data =  this.store[model].filter(function (e) {
					var chck = true;
					keys.forEach(function (k) {
						if(e[k] !== obj[k]) chck = false;
					});
					return chck;
				});
				data.name = 'model';
				data.model = model;
				for(var k in n.relations){
					if(n.relations[k].model ==  model) n.render(n.relations[k].comp, k, data);
				}
			}
		},
		filter : function (model, obj) {
			if (n.empty(this.store[model])) throw new Error('Model \'' + model + '\' does not exists.');
			else if (n.empty(obj) && typeof obj !== 'object') throw new Error('Find in \'' + model + '\' need a object.');
			else {
				var keys = Object.keys(obj);
				var data =  this.store[model].filter(function (e) {
					var chck = true;
					keys.forEach(function (k) {
						if (typeof e[k] === 'string') {
							if(e[k].indexOf(obj[k]) < 0) chck = false;
						} else {
							if(e[k] !== obj[k]) chck = false;
						}
					});
					return chck;
				});
				data.name = 'model';
				data.model = model;
				for(var k in n.relations){
					if(n.relations[k].model ==  model) n.render(n.relations[k].comp, k, data);
				}
			}
		},
		render : function (model) {
			for(var k in n.relations){
				if(n.relations[k].model ==  model) n.render(n.relations[k].comp, k, n.model.get(model));
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
		else if (this.empty(this.data[name])) throw new Error('Component \'' + name + '\' does not exists.');
		else if (this.empty(this.data[name].html)) throw new Error('The component \'' + name + '\' does not have html.');
		else {
			document.getElementById(id).innerHTML = this.data[name].html(this, attr);
			if (!this.empty(attr) && !this.empty(attr.name) && attr.name === 'model') this.relations[id] = { comp : name, model : attr.model };
			else if (!this.empty(this.relations[id])) delete this.relations[id];
			if (typeof this.data[name].action === 'function') this.stack.push({ action : this.data[name].action, attr : [this, attr]});
			this.run();
		}
	},
	on : function (obj, eventHandler, callback) {
		if (n.empty(obj)) throw new Error('Event without objective');
		else if (n.empty(eventHandler)) throw new Error('Event without event handler');
		else if (n.empty(callback)) throw new Error('Event without function');
		else {
			if (Array.isArray(obj)) {
				console.log(obj)
				for (var i = 0; i < obj.length; i++) {
					obj[i].addEventListener(eventHandler, function (event) {
						callback(event);
					});
				}
			} else {
				obj.addEventListener(eventHandler, function (event) {
					callback(event);
				});
			}
		}
	},
	ready : function (callback) {
		document.addEventListener("DOMContentLoaded", function(event) {
			callback(event);
		});
	}
};

if (typeof process === 'object') module.exports = n;
