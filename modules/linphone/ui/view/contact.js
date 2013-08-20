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
		base.find('> .content .view > .contact .addressList .addAddress').click(linphone.ui.exceptionHandler(base, function(){
			linphone.ui.view.contact.addAddress(base,'');
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
	},
	addAddress: function(base,value){
		var contact = base.find('> .content .view > .contact .entry');
		var addresses = contact.find('.addressContact');
		
		var removeHandler = function(base,element){
			return function(){
				linphone.ui.view.contact.removeAddress(base,element);	
			};
		};
		var list = contact.find('.list');
		var element = linphone.ui.template(base, 'view.contact.list',{
			address : value
		});	
		element.find('.removeAddress').click(linphone.ui.exceptionHandler(base, function(){
			linphone.ui.view.contact.removeAddress(base,removeHandler(base,element));
		}));
		element.find('addressInput').watermark();
		list.append(element);
	},
	removeAddress: function(base,element){
		var jobject = jQuery(element);
		jobject.remove();
	},
	
	addContact: function(base){
		linphone.ui.view.contact.onSaveContact(base,null,null);
	},
	editContact: function(base,id,object){
		linphone.ui.view.contact.onSaveContact(base,id,object);
	},
	onSaveContact: function(base,id,object){
		var contact = base.find('> .content .view > .contact .entry');
		
		linphone.ui.view.contact.clear(base);
		
		//new account
		var list = contact.find('.list');
		list.empty();
		if(id === null){
			linphone.ui.view.contact.addAddress(base,'');
			base.find('> .content .view > .contact .removeContact').hide();
		//edit account
		} else {
			base.find('> .content .view > .contact .removeContact').show();
			contact.find('.firstname').val(object.firstname);
			contact.find('.lastname').val(object.lastname);
			for(var item in object.address){
				linphone.ui.view.contact.addAddress(base,object.address[item]);	
			}
		}
		contact.find('.contactImg').val('style/img/avatar.png');
		contact.data('id',id);
		linphone.ui.view.show(base,'contact');
	},
	save: function(base) {
		var configuration = linphone.ui.configuration(base);
		var contact = base.find('> .content .view > .contact .entry');
		var id = base.find('> .content .view > .contact .entry').data('id');
		var addressList = {};
		contact.find(' .addressInput').each(function (index, object) {
			var jobject = jQuery(object);
			if((jobject.val()).length > 0){
				addressList[index] = jobject.val();
			}	
		});
		var object = {
			id : id,
			lastname: contact.find('.lastname').val(),
			firstname:  contact.find('.firstname').val(),
			address: addressList,
			img : "style/img/avatar.png"
		};

		if(id === null){
			configuration.models.contacts.create(object);
		} else {
			configuration.models.contacts.update(object);
		}
		linphone.ui.view.hide(base, 'contact');
		linphone.ui.view.show(base, 'contacts');
	},
	remove: function(base){
		var configuration = linphone.ui.configuration(base);
		var id = base.find('> .content .view > .contact .entry').data('id');

		configuration.models.contacts.remove(id);
		linphone.ui.view.hide(base, 'contact');
		linphone.ui.view.show(base, 'contacts');
	}
};