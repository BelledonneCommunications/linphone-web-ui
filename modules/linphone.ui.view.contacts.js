/*globals jQuery,linphone*/

linphone.ui.view.contacts = {
	init: function(base) {
		linphone.ui.view.contacts.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .view .contacts .goContact').click(function(){
			base.find('> .content .view .contacts').hide(); 
			base.find('> .content .view .contact').show();
		});
		var list = base.find('> .content .view .contacts .list');
		
		/* Samples */
		list.append(linphone.ui.template('view.contacts.contact', {
			img: 'tmp/marcel.jpg',
			status: 'Disponible',
			number: '+336096894321',
			name: "Test"
		}));
		list.append(linphone.ui.template('view.contacts.contact', {
			img: 'tmp/marcel.jpg',
			status: 'Disponible',
			number: '+336096894321',
			name: "Test2"
		}));
		list.append(linphone.ui.template('view.contacts.contact', {
			img: 'tmp/marcel.jpg',
			status: 'Disponible',
			number: '+336096894321',
			name: "Test3"
		}));
		list.append(linphone.ui.template('view.contacts.contact', {
			img: 'tmp/marcel.jpg',
			status: 'Disponible',
			number: '+336096894321',
			name: "Test4"
		}));
	}
};
