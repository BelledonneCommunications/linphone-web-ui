/*!
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (c) 2013 Belledonne Communications
 All rights reserved.
 

 Authors:
 - Yann Diorcet <diorcet.yann@gmail.com>
 
 */

/*globals jQuery,linphone*/

linphone.ui.view.contact = {
	init: function(base) {
		linphone.ui.view.contact.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .view > .contact').data('linphoneweb-view', linphone.ui.view.contact);
		base.find('> .content .view > .contact .cancelContact').click(linphone.ui.exceptionHandler(base, function() {
			linphone.ui.view.hide(base,'contact');
		}));
		base.find('> .content .view > .contact .removeContact').click(linphone.ui.exceptionHandler(base, function(){
			linphone.ui.view.contact.remove(base);
		}));
		base.find('> .content .view > .contact .saveContact').click(linphone.ui.exceptionHandler(base, function(){
			linphone.ui.view.contact.save(base);
		}));
		base.find('> .content .view > .contact .uploadPhoto').hide();	
	},
	translate: function(base) {
		var contact = base.find('> .content .view > .contact');
		contact.find('.firstname').watermark(jQuery.i18n.translate('content.view.contact.firstname'), {className: 'watermark', useNative: false});
		contact.find('.lastname').watermark(jQuery.i18n.translate('content.view.contact.lastname'), {className: 'watermark', useNative: false});
		contact.find('.addressInput').watermark(jQuery.i18n.translate('content.view.contact.addressContact'), {className: 'watermark', useNative: false});
	},
	
	/**/
	show: function(base) {
		linphone.ui.menu.show(base);
		var contact = base.find('> .content .view > .contact');
	},
	hide: function(base) {
	},
	clear: function(base){
		var contact = base.find('> .content .view > .contact .entry');
		contact.find('.lastname').val('');
		contact.find('.firstname').val('');
		contact.find('.addressInput').val('');
	},
	
	addContact: function(base){
		linphone.ui.view.contact.onSaveContact(base,null,null);
	},
	editContact: function(base,id,object){
		linphone.ui.view.contact.onSaveContact(base,id,object);
	},
	onSaveContact: function(base,id,friend){
		var contact = base.find('> .content .view > .contact .entry');
		
		linphone.ui.view.contact.clear(base);
		
		var list = contact.find('.list');
		list.empty();
		
		//new account
		if(friend === null){
			base.find('> .content .view > .contact .removeContact').hide();
			
		//edit account
		} else {
			base.find('> .content .view > .contact .removeContact').show();
			contact.find('.firstname').val(friend.name);
			contact.find('.addressInput').val(friend.address.asStringUriOnly());
		}
		contact.find('.contactImg').val('style/img/avatar.jpg');
		linphone.ui.view.show(base,'contact');
	},
	save: function(base) {
		var contact = base.find('> .content .view > .contact .entry');
		var configuration = linphone.ui.configuration(base);
        var core = linphone.ui.getCore(base);
		var addressVal = contact.find('.addressInput').val();

		// Create Linphone Friend
		var address = linphone.ui.utils.formatAddress(base,addressVal);
		if(typeof address !== 'undefined') {
			var friend = core.getFriendByAddress(address.asString());
		
			if (friend !== null){
			//Edit contact
				friend.edit();	
			} else {
			//Create contact
				friend = core.newFriend(address.asString());
				friend.name =  contact.find('.firstname').val();
				friend.subscribesEnabled = false;
				friend.incSubscribePolicy = linphone.core.enums.subscribePolicy.Deny;
				configuration.models.contacts.create(friend);	
			}   
		}
		linphone.ui.view.hide(base, 'contact');
		linphone.ui.view.show(base, 'contacts');
	},
	remove: function(base){
        var contact = base.find('> .content .view > .contact .entry');
		var configuration = linphone.ui.configuration(base);
        var core = linphone.ui.getCore(base);
        var addressVal = contact.find('.addressInput').val();
        
        var address = linphone.ui.utils.formatAddress(base,addressVal);
		if(typeof address !== 'undefined') {
			var friend = core.getFriendByAddress(address.asString());
			configuration.models.contacts.remove(friend);	
		}
		linphone.ui.view.hide(base, 'contact');
		linphone.ui.view.show(base, 'contacts');
	}
};