/*globals jQuery,linphone*/

linphone.ui.view.history = {
	init: function(base) {
		linphone.ui.view.history.uiInit(base);
	},
	uiInit: function(base) {
		var history = base.find('> .content .view > .history');
		history.data('linphoneweb-view', linphone.ui.view.history);
		
		history.find('.actions .all').click(linphone.ui.exceptionHandler(base, function() {
			linphone.ui.view.history.filter.update(base, linphone.ui.view.history.filter.all);
		}));
		
		history.find('.actions .incoming').click(linphone.ui.exceptionHandler(base, function() {
			linphone.ui.view.history.filter.update(base, linphone.ui.view.history.filter.incoming);
		}));
		
		history.find('.actions .outgoing').click(linphone.ui.exceptionHandler(base, function() {
			linphone.ui.view.history.filter.update(base, linphone.ui.view.history.filter.outgoing);
		}));
		
		history.find('.actions .miss').click(linphone.ui.exceptionHandler(base, function() {
			linphone.ui.view.history.filter.update(base, linphone.ui.view.history.filter.miss);
		}));
		
		linphone.ui.view.history.filter.update(base, linphone.ui.view.history.filter.all);
		
		/* Samples */
		var list = history.find('.list');
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
	
	/* */
	filter : {
		all: 0,
		incoming: 1,
		outgoing: 2,
		miss: 3,
		update: function(base, state) {
			var history = base.find('> .content .view > .history');
			history.find('.actions .all').removeClass('selected');
			history.find('.actions .incoming').removeClass('selected');
			history.find('.actions .outgoing').removeClass('selected');
			history.find('.actions .miss').removeClass('selected');
			switch(state) {
				case linphone.ui.view.history.filter.all:
					history.find('.actions .all').addClass('selected');
				break;
				case linphone.ui.view.history.filter.incoming:
					history.find('.actions .incoming').addClass('selected');
				break;
				case linphone.ui.view.history.filter.outgoing:
					history.find('.actions .outgoing').addClass('selected');
				break;
				case linphone.ui.view.history.filter.miss:
					history.find('.actions .miss').addClass('selected');
				break;
				default:
				linphone.ui.logger.error(base, 'Invalid linphone.ui.view.history.filter state');
			}
		}
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