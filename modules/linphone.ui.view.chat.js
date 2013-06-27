/*globals jQuery,linphone*/

linphone.ui.view.chat = {
	init: function(base) {
		linphone.ui.view.chat.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .view > .chat').data('linphoneweb-view', linphone.ui.view.chat);
		
		/* Samples */
		var list = base.find('> .content .view > .chat .list');
		list.append(linphone.ui.template(base, 'view.chat.list.entry.received', {
			img: 'tmp/marcel-medium.jpg',
			date: "Jeudi 21 Septembre 2012 à 23h33m22s",
			message: 'aa',
			name: "Test"
		}));
		list.append(linphone.ui.template(base, 'view.chat.list.entry.sent', {
			img: 'tmp/marcel-medium.jpg',
			date: "Jeudi 21 Septembre 2012 à 23h34m22s",
			message: 'bb',
			name: "Test2"
		}));
		list.append(linphone.ui.template(base, 'view.chat.list.entry.received', {
			img: 'tmp/marcel-medium.jpg',
			date: "Jeudi 21 Septembre 2012 à 23h37m22s",
			message: 'cc',
			name: "Test3"
		}));
		list.append(linphone.ui.template(base, 'view.chat.list.entry.sent', {
			img: 'tmp/marcel-medium.jpg',
			date: "Jeudi 21 Septembre 2012 à 23h39m22s",
			message: 'dd',
			name: "Test4"
		}));
	},
	translate: function(base) {
		
	},
	
	show: function(base) {
		linphone.ui.menu.show(base);
	},
	hide: function(base) {
	}
};