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
		
		var configuration = linphone.ui.configuration(base);
		var data = configuration.models.contacts.list();
		var list = contacts.find('.list');
		
		for(var item in data) {
			list.append(data[item]);
			console.log(data[item]);
		}
		
		contacts.find('.addContact').click(linphone.ui.exceptionHandler(base, function(){
			linphone.ui.view.contact.onSaveContact(base,null,null);
		}));
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
		var data = configuration.models.contacts.list();
		var list = contacts.find('.list');
		
		list.empty();
		for(var item in data) {
			var object = data[item];
			var element = linphone.ui.template(base, 'view.contacts.list.entry',{
				object : object,
				address : object.address[0]
				});	
			var f = function(base,object){
				return function(){
					linphone.ui.view.contact.onSaveContact(base,object.id,object);	
				}
			}(base,object);
			var g = function(base,object){
				return function(){
					linphone.ui.view.contacts.onCall(base,object);	
				}
			}(base,object);
			element.find('.entryActions .goContact').click(linphone.ui.exceptionHandler(base,f));	
			element.find('.entryActions .callContact').click(linphone.ui.exceptionHandler(base,g));	
			list.append(element);	
		}
		
		base.find('> .content .view > .contacts .scroll-pane').each(function(){
			linphone.ui.slider(jQuery(this));
		});
	},
	hide: function(base) {
	},
	
	onCall: function(base,object){
		var addressStr = object.address[0];
		var address = linphone.ui.utils.getAddress(base, addressStr);
		if(address) {
			var core = linphone.ui.getCore(base);
			core.inviteAddress_async(address);
			linphone.ui.logger.log(base, "Call: " + address.asString());
		} else {
			linphone.ui.popup.error.show(base, 'global.errors.uri.misformatted');
		}
	}
};
