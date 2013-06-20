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
	},
	uiInit: function(base) {
		base.find('> .content .view > .plugin').show();
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
	}
};