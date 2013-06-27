/*globals jQuery,linphone,Handlebars,setSlider */

linphone.ui = {
	data: function() {
		try {
			if (typeof window.localStorage !== 'undefined') {
				return localStorage;
			}
		} catch(ex) {
		}
		return {};
	},
	getCore: function(target) {
		var base = linphone.ui.getBase(target);
		var nodes = base.get(0).childNodes;
		
		// jQuery and embedded objects are not friends: use DOM
		for(var i = 0; i < nodes.length; ++i) {
			var node = nodes[i];
			var obj = jQuery(node);
			if(obj.hasClass('core')) {
				return node;
			}
		}
		throw "Can't find Core";
	},
	getBase: function(target) {
		if (typeof target === 'undefined') {
			target = jQuery(this);
		}
		if (target.is('.linphoneweb')) {
			return target;
		} else {
			return target.parents('.linphoneweb');
		}
	},

	/* Configuration Part */ 
	configuration: function(base) {
		return base.data('linphoneConfig');
	},
	configure: function(base, config) {
		base.data('linphoneConfig', config);
	},
	
	/* UI Part */
	template: function(base, name, context, jquery) {
		if(typeof jquery === 'undefined') {
			jquery = true;
		}
		var elem;
		if(linphone.ui.configuration(base).debug) {
			name = '#linphone.ui.' + name;
			name = name.replace(/\./g, '\\.');
			var source = jQuery(name).html();
			var template = Handlebars.compile(source);
			elem = template(context);
		} else {
			elem = linphone.ui.templates[name](context);
		}
		
		if(jquery) {
			elem = jQuery(elem);
			jQuery.i18n.update(elem, true);
		}
		return elem;
	},
	slider: function(element) {
		setSlider(element);
	},
	init: function(base) {
		jQuery.extend({
			getUrlVars: function(){
				var vars = [], hash;
				var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
				for(var i = 0; i < hashes.length; i++) {
					hash = hashes[i].split('=');
					vars.push(hash[0]);
					vars[hash[0]] = hash[1];
				}
				return vars;
			},
			getUrlVar: function(name){
				return jQuery.getUrlVars()[name];
			}
		});
		
		jQuery.fn.visible = function() {
			return this.css('visibility', 'visible');
		};
		jQuery.fn.invisible = function() {
			return this.css('visibility', 'hidden');
		};
		jQuery.fn.isOrParent = function(selector) {
			return this.is(selector) || this.parent(selector).length !== 0;
		};
		jQuery.fn.isOrParents = function(selector) {
			return this.is(selector) || this.parents(selector).length !== 0;
		};
		jQuery.fn.getSelfAndParent = function(selector) {
			return this.parent('*').andSelf().filter(selector);
		};
		jQuery.fn.getSelfAndParents = function(selector) {
			return this.parents('*').andSelf().filter(selector);
		};
		
		linphone.ui.exceptionHandler(base, function() {
			linphone.ui.uiInit(base);
			linphone.ui.core.init(base);
			linphone.ui.video.init(base);
			linphone.ui.locale.init(base);
			linphone.ui.header.init(base);
			linphone.ui.menu.init(base);
			linphone.ui.mainbar.init(base);
			linphone.ui.dialer.init(base);
			linphone.ui.view.init(base);
			linphone.ui.popup.init(base);
			
			// Update locale
			linphone.ui.locale.update(base);
		})();
	},
	uiInit: function(base) {
	},
	translate: function(base) {
		linphone.ui.locale.translate(base);
		linphone.ui.header.translate(base);
		linphone.ui.menu.translate(base);
		linphone.ui.mainbar.translate(base);
		linphone.ui.dialer.translate(base);
		linphone.ui.view.translate(base);
		linphone.ui.popup.translate(base);
	},
	exceptionHandler: function (base, fct) {
		return function(args) {
			if(linphone.ui.configuration(base).debug) {
				fct.apply(this, arguments);
			} else {
				try {
					fct.apply(this, arguments);
				} catch (error) {
					linphone.ui.error(base, 'errors.exception.unhandled');
				}
			}
		};
	},
	error: function (base, error_id, error) {
		linphone.ui.popup.error.show(base, error_id, error);
	}
};
