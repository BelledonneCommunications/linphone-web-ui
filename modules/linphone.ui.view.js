/*globals jQuery,linphone*/

linphone.ui.view = {
	init: function(base) {
		linphone.ui.view.uiInit(base);
		linphone.ui.view.plugin.init(base);
		linphone.ui.view.login.init(base);
		linphone.ui.view.contacts.init(base);
		linphone.ui.view.contact.init(base);
		linphone.ui.view.history.init(base);
		linphone.ui.view.call.init(base);
		linphone.ui.view.conference.init(base);
		linphone.ui.view.chat.init(base);
		linphone.ui.view.settings.init(base);
		linphone.ui.view.about.init(base);
		
		/* Update */
		linphone.ui.view.updateIndex(base);
	},
	uiInit: function(base) {
		linphone.ui.view.show(base, 'plugin');
	},
	translate: function(base) {
		linphone.ui.view.plugin.translate(base);
		linphone.ui.view.login.translate(base);
		linphone.ui.view.contacts.translate(base);
		linphone.ui.view.contact.translate(base);
		linphone.ui.view.history.translate(base);
		linphone.ui.view.call.translate(base);
		linphone.ui.view.conference.translate(base);
		linphone.ui.view.chat.translate(base);
		linphone.ui.view.settings.translate(base);
		linphone.ui.view.about.translate(base);
	},
	
	updateIndex: function(base) {
		var divs = base.find('> .content .view > div');
		divs.sort(function(a, b) {
			return jQuery(a).zIndex() - jQuery(b).zIndex();
		});
		divs.each(function (index, object) {
			var jobject = jQuery(object);
			jobject.zIndex(index);
		});
		return divs;
	},
	update: function(base) {
		var cls;
		var divs = linphone.ui.view.updateIndex(base);
		divs.each(function (index, object) {
			var jobject = jQuery(object);
			if(index == divs.length - 1) {
				if(!jobject.is(':visible')) {
					cls = jobject.data('linphoneweb-view');
					if(cls && cls.show) {
						cls.show(base);
					}
				}
				jobject.show();
			} else {
				if(jobject.is(':visible')) {
					cls = jobject.data('linphoneweb-view');
					if(cls && cls.hide) {
						cls.hide(base);
					}
				}
				jobject.hide();
			}
		});
	},
	top: function(base) {
		return base.find('> .content .view > div:visible');
	},
	show: function(base, viewName) {
		var div = base.find('> .content .view > .' + viewName);
		div.zIndex(100);
		linphone.ui.view.update(base);
	},
	hide: function(base, viewName) {
		var div;
		if(typeof viewName !== 'undefined') {
			div = base.find('> .content .view > .' + viewName);
		} else {
			div = linphone.ui.view.top(base);
		}
		div.zIndex(0);
		linphone.ui.view.update(base);
	}
};