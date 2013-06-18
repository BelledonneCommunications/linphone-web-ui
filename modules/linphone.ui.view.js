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
		base.find('> .content .view .plugin').show();

		base.find('> .content .view .plugin').click(function(){
			base.find('> .content .view .plugin').hide();
			base.find('> .content .view .login').show();
			base.find('> .content .view .login .accountOther').hide();
		});	
	}
};