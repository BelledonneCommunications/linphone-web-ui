/*globals jQuery,linphone,Handlebars,setSlider */

linphone.ui = {
	debug: false,
	getCore: function(target) {
		var base = linphone.ui.getBase(target);
		return base.find('> .core').get()[0];
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
	template: function(name, context) {
		if(linphone.ui.debug) {
			name = '#linphone.ui.' + name;
			linphone.core.log("Template: " + name);
			name = name.replace(/\./g, '\\.');
			var source = jQuery(name).html();
			var template = Handlebars.compile(source);
			return template(context);
		} else {
			return linphone.ui.templates[name](context);
		}
	},
	slider: function(element) {
		setSlider(element);
	},
	init: function(base) {
		linphone.ui.uiInit(base);
		linphone.ui.header.init(base);
		linphone.ui.menu.init(base);
		linphone.ui.mainbar.init(base);
		linphone.ui.dialer.init(base);
		linphone.ui.view.init(base);
		linphone.ui.popup.init(base);
	},
	uiInit: function(base) {
		base.find('.scroll-pane').each(function(){
			linphone.ui.slider(jQuery(this));
		});
		base.find('> .content .loading').hide();
	}
};

