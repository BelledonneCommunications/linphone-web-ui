/*!
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (c) 2013 Belledonne Communications
 All rights reserved.
 

 Authors:
 - Yann Diorcet <diorcet.yann@gmail.com>
 
 */

/*globals jQuery,linphone*/

linphone.ui.view.contacts = {
	init: function(base) {
		linphone.ui.view.contacts.uiInit(base);
	},
	uiInit: function(base) {
		var contacts = base.find('> .content .view > .contacts');
		contacts.data('linphoneweb-view', linphone.ui.view.contacts);
		
		contacts.find('.actions .all').click(linphone.ui.exceptionHandler(base, function() {
			linphone.ui.view.contacts.filter.update(base, linphone.ui.view.contacts.filter.all);
		}));
		
		contacts.find('.actions .online').click(linphone.ui.exceptionHandler(base, function() {
			linphone.ui.view.contacts.filter.update(base, linphone.ui.view.contacts.filter.online);
		}));
		
		linphone.ui.view.contacts.filter.update(base, linphone.ui.view.contacts.filter.all);
		
		contacts.find('> .actions .addContact').click(linphone.ui.exceptionHandler(base, function(){
			linphone.ui.view.contact.addContact(base,null,null);
		}));
		
		contacts.find('.actions .filters').hide();
	},
	translate: function(base) {
		
	},
	
	/* */
	filter : {
		all: 0,
		online: 1,
		update: function(base, state) {
			var contacts = base.find('> .content .view > .contacts');
			contacts.find('.actions .all').removeClass('selected');
			contacts.find('.actions .online').removeClass('selected');
			switch(state) {
				case linphone.ui.view.contacts.filter.all:
					contacts.find('.actions .all').addClass('selected');
				break;
				case linphone.ui.view.contacts.filter.online:
					contacts.find('.actions .online').addClass('selected');
				break;
				default:
				linphone.ui.logger.error(base, 'Invalid linphone.ui.view.contacts.filter state');
			}
		}
	},
	
	/**/
	show: function(base) {
		var contacts = base.find('> .content .view > .contacts');
		linphone.ui.menu.show(base);
		
		var configuration = linphone.ui.configuration(base);
		configuration.models.contacts.list(null, function(error, data) {
			//TODO Check error
			var list = contacts.find('.list');
	
			var editHandler = function(base,object) {
				return function(){
					linphone.ui.view.contact.editContact(base,object.id,object);	
				};
			};
			
			var callHandler = function(base,object) {
				return function(){
					linphone.ui.view.contacts.onCall(base,object);	
				};
			};
			
			var addressHandler = function (index, object) {
				var jobject = jQuery(object);
				var address = jobject.find(".number").text();
				jobject.find(".callContact").click(linphone.ui.exceptionHandler(base,callHandler(base,address)));
			};
			
			list.empty();
			for(var item in data) {
				var object = data[item];
				var element = linphone.ui.template(base, 'view.contacts.list.entry',{
					object : object,
					addressList : object.address
				});	
				element.find(' .goContact').click(linphone.ui.exceptionHandler(base, editHandler(base,object)));	
				list.append(element);
				
				element.find(".address").each(addressHandler);	
			}
			
			if(configuration.disableChat) {
				base.find('.entry .chatContact').hide();
			}
			if(configuration.disablePresence) {
				list.find('.entry .presence').hide();
			}
			
			base.find('> .content .view > .contacts .scroll-pane').each(function(){
				linphone.ui.slider(jQuery(this));
			});
		});
	},
	hide: function(base) {
	},

	onCall: function(base,address){
		linphone.ui.utils.call(base, address, function() {
		}, function() {
			linphone.ui.popup.error.show(base, 'global.errors.uri.misformatted');
		});
	}
};
