/*globals jQuery,linphone*/

linphone.ui.view.contacts = {
	init: function(base) {
		linphone.ui.view.contacts.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .view > .contacts').data('linphoneweb-view', linphone.ui.view.contacts);
		
		/* Samples */
		var list = base.find('> .content .view > .contacts .list');
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
		
		base.find('> .content .view > .contacts .goContact').click(linphone.ui.exceptionHandler(base, function(){
			linphone.ui.view.show(base, 'contact');
		}));
	},
	translate: function(base) {
		
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
