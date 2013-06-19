/*globals jQuery,linphone*/

linphone.ui.view.history = {
	init: function(base) {
		linphone.ui.view.history.uiInit(base);
	},
	uiInit: function(base) {
		
		/* Samples */
		var list = base.find('> .content .view > .history .list');
		list.append(linphone.ui.template('view.history.list.entry', {
			img: 'tmp/marcel.jpg',
			status: 'Disponible',
			number: '+336096894321',
			name: "Test",
			date: "Jeudi 21 Septembre 2013 à 23h33m22s",
			duration: "10:01",
			type:"Sortant"
		}));
		list.append(linphone.ui.template('view.history.list.entry', {
			img: 'tmp/marcel.jpg',
			status: 'Disponible',
			number: '+336096894321',
			name: "Test2",
			date: "Jeudi 21 Septembre 2012 à 23h33m22s",
			duration: "0:01",
			type:"Entrant"
		}));
		list.append(linphone.ui.template('view.history.list.entry', {
			img: 'tmp/marcel.jpg',
			status: 'Disponible',
			number: '+336096894321',
			name: "Test3",
			date: "Jeudi 21 Septembre 2012 à 23h33m22s",
			duration: "0:01",
			type:"Sortant"
		}));
		list.append(linphone.ui.template('view.history.list.entry', {
			img: 'tmp/marcel.jpg',
			status: 'Disponible',
			number: '+336096894321',
			name: "Test4",
			date: "Jeudi 21 Septembre 2012 à 23h33m22s",
			duration: "0:01",
			type:"Sortant"
		}));
	}
};