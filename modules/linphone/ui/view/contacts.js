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
		
		/* Samples */
		var list = contacts.find('.list');
		list.append(linphone.ui.template(base, 'view.contacts.list.entry', {
			img: 'tmp/marcel.jpg',
			status: 'Disponible',
			number: '+336096894321',
			name: "Test"
		}));
		list.append(linphone.ui.template(base, 'view.contacts.list.entry', {
			img: 'tmp/marcel.jpg',
			status: 'Disponible',
			number: '+336096894321',
			name: "Test2"
		}));
		list.append(linphone.ui.template(base, 'view.contacts.list.entry', {
			img: 'tmp/marcel.jpg',
			status: 'Disponible',
			number: '+336096894321',
			name: "Test3"
		}));
		list.append(linphone.ui.template(base, 'view.contacts.list.entry', {
			img: 'tmp/marcel.jpg',
			status: 'Disponible',
			number: '+336096894321',
			name: "Test4"
		}));
		
		contacts.find('.goContact').click(linphone.ui.exceptionHandler(base, function(){
			linphone.ui.view.show(base, 'contact');
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
		linphone.ui.menu.show(base);
		base.find('> .content .view > .contacts .scroll-pane').each(function(){
			linphone.ui.slider(jQuery(this));
		});
	},
	hide: function(base) {
	}
};
