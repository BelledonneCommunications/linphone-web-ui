/*globals jQuery,linphone*/

linphone.ui.view.contacts = {
	init: function(base) {
		linphone.ui.view.contacts.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .view .contacts .goContact').click(function(){
			base.find('> .content .view .contacts').hide(); 
			base.find('> .content .view .contact').show();
		});
	}
};
