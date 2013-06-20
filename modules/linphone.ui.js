/*globals jQuery,linphone,Handlebars,setSlider */

linphone.ui = {
	debug: false,
	locales: [ {
		name : 'US',
		locale : 'en_US'
	}, {
		name : 'FR',
		locale : 'fr_FR'
	}, {
		name : 'DE',
		locale : 'de_DE'
	}, {
		name : 'IT',
		locale : 'it_IT'
	} ],
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
		
		linphone.ui.uiInit(base);
		linphone.ui.locale.init(base);
		linphone.ui.header.init(base);
		linphone.ui.menu.init(base);
		linphone.ui.mainbar.init(base);
		linphone.ui.dialer.init(base);
		linphone.ui.view.init(base);
		linphone.ui.popup.init(base);
		
		// Update locale
		linphone.ui.locale.update(base);
		base.find('.scroll-pane').each(function(){
			linphone.ui.slider(jQuery(this));
		});
		base.find('> .content .loading').hide();
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
	}
};

