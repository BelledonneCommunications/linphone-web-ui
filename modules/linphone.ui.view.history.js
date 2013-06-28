/*globals jQuery,linphone*/

linphone.ui.view.history = {
	init: function(base) {
		linphone.ui.view.history.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .view > .history').data('linphoneweb-view', linphone.ui.view.history);
		
		base.find('> .content .view > .history .actions .all').addClass('selected');
		
		/* Samples */
		var list = base.find('> .content .view > .history .list');
		list.append(linphone.ui.template(base, 'view.history.list.entry', {
			img: 'tmp/marcel.jpg',
			status: 'Disponible',
			number: '+336096894321',
			name: "Test",
			date: "Jeudi 21 Septembre 2013 à 23h33m22s",
			duration: "10:01",
			type:"Sortant"
		}));
		list.append(linphone.ui.template(base, 'view.history.list.entry', {
			img: 'tmp/marcel.jpg',
			status: 'Disponible',
			number: '+336096894321',
			name: "Test2",
			date: "Jeudi 21 Septembre 2012 à 23h33m22s",
			duration: "0:01",
			type:"Entrant"
		}));
		list.append(linphone.ui.template(base, 'view.history.list.entry', {
			img: 'tmp/marcel.jpg',
			status: 'Disponible',
			number: '+336096894321',
			name: "Test3",
			date: "Jeudi 21 Septembre 2012 à 23h33m22s",
			duration: "0:01",
			type:"Sortant"
		}));
		list.append(linphone.ui.template(base, 'view.history.list.entry', {
			img: 'tmp/marcel.jpg',
			status: 'Disponible',
			number: '+336096894321',
			name: "Test4",
			date: "Jeudi 21 Septembre 2012 à 23h33m22s",
			duration: "0:01",
			type:"Sortant"
		}));
	},
	translate: function(base) {
		
	},
	
	/**/
	show: function(base) {
		linphone.ui.menu.show(base);
		base.find('> .content .view > .history .scroll-pane').each(function(){
			linphone.ui.slider(jQuery(this));
		});
	},
	hide: function(base) {
	}
};