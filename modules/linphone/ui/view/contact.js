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
			linphone.ui.view.contact.addInput(base,'');
		}));
	},
	translate: function(base) {
		var login = base.find('> .content .view > .contact');
		login.find('.firstname').watermark(jQuery.i18n.translate('content.view.contact.firstname'), {className: 'watermark', useNative: false});
		login.find('.lastname').watermark(jQuery.i18n.translate('content.view.contact.lastname'), {className: 'watermark', useNative: false});
		login.find('.addressContact').watermark(jQuery.i18n.translate('content.view.contact.addressContact'), {className: 'watermark', useNative: false});
	},
	
	/**/
	show: function(base) {
		linphone.ui.menu.show(base);
	},
	hide: function(base) {
	},
	clear: function(base){
		var contact = base.find('> .content .view > .contact .entry');
		contact.find('.lastname').val('');
		contact.find('.firstname').val('');
		contact.find('.addressFirst').val('');
		contact.find('.addressPlus').remove();
	},
	addInput: function(base,value){
		var contact = base.find('> .content .view > .contact .entry');
  		var adresses = contact.find('.addressList .addressContact');
  		
  		if(adresses.length < 4){
  			var newAddress = $(adresses[0]).clone();
  			newAddress.addClass('addressPlus bigMarginLeft');
  			newAddress.insertAfter(adresses.last());
  			newAddress.val(value);
  			newAddress.watermark(jQuery.i18n.translate('content.view.contact.addressContact'), {className: 'watermark', useNative: false});
  		}
	},
	
	onSaveContact: function(base,id,object){
		var contact = base.find('> .content .view > .contact .entry');
		linphone.ui.view.contact.clear(base);
		if(id === null){
			base.find('> .content .view > .contact .removeContact').hide();
		} else {
			base.find('> .content .view > .contact .removeContact').show();
			contact.find('.firstname').val(object.firstname);
			contact.find('.lastname').val(object.lastname);
			for(var item in object.address){
				if(item === '0'){
					contact.find('.addressFirst').val(object.address[item]);
				} else {
					linphone.ui.view.contact.addInput(base,object.address[item]);
				}	
			}
			contact.find('.contactImg').val('tmp/peter.jpg');
		}
		contact.data('id',id);
		linphone.ui.view.show(base,'contact');
	},
	save: function(base) {
		var configuration = linphone.ui.configuration(base);
		var contact = base.find('> .content .view > .contact .entry');
		var id = base.find('> .content .view > .contact .entry').data('id');
		var addressList = {};
		contact.find(' .addressContact').each(function (index, object) {
			var jobject = jQuery(object);
			addressList[index] = jobject.val();

		});
		console.log(addressList);
		var object = {
			id : id,
			lastname: contact.find('.lastname').val(),
			firstname:  contact.find('.firstname').val(),
			address: addressList,
			img : "tmp/profile-medium.jpg"
		};

		if(id === null){
			configuration.models.contacts.create(object);
		} else {
			configuration.models.contacts.update(id,object);
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