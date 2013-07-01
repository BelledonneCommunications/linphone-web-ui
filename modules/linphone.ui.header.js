/*globals jQuery,linphone*/

linphone.ui.header = {
	status: {
		online: {
			cls: 'imageStatusOnline',
			i18n: 'online'
		},
		busy: {
			cls: 'imageStatusBusy',
			i18n: 'busy'
		},
		away: {
			cls: 'imageStatusAway',
			i18n: 'away'
		}
	},
	/* */
	init: function(base) {
		linphone.ui.header.uiInit(base);
	},
	uiInit: function(base) {
		var header = base.find('> .header');
		header.find('.navigation').visible();
		
		header.find('.profile .open').mouseover(function(event){
			linphone.ui.header.menu.open(base);
			header.find('.profile').mouseleave(function(){
				linphone.ui.header.menu.close(base);
			});
		});
		
		/* Sample */
		linphone.ui.header.profile.update(base, linphone.ui.header.status.online);
		
		header.find('.profile .menu .list').empty();
		for(var i in linphone.ui.header.status) {
			var status = linphone.ui.header.status[i];
			var elem = jQuery('<li/>').html(linphone.ui.template(base, 'header.profile.status', status));
			// Wrap the function in orther function in order to detach status from the status variable
			elem.click(linphone.ui.exceptionHandler(base, function(status) {
				return function(event) {
					linphone.ui.header.profile.update(base, status);
					linphone.ui.header.menu.close(base);
				}
			}(status)));
			header.find('.profile .menu .list').append(elem);
		}
		/* End Sample */
		
		header.find('.profile .menu .logout').click(linphone.ui.exceptionHandler(base, function(event){
			linphone.ui.header.menu.close(base);
			linphone.ui.logout(base);
		}));
		
		header.find('.navigation .settings').click(linphone.ui.exceptionHandler(base, function(event){
			if(jQuery(this).hasClass('disabled')) {
				return;
			}
			linphone.ui.view.show(base, 'settings');
		}));
		
		header.find('.navigation .help').click(linphone.ui.exceptionHandler(base, function(event){
			linphone.ui.view.show(base, 'help');
		}));

		header.find('.navigation .about').click(linphone.ui.exceptionHandler(base, function(event){
			linphone.ui.view.show(base, 'about');
		}));
		
		header.find('.language .list').click(linphone.ui.exceptionHandler(base, function(event) {
			var target = jQuery(event.target ? event.target : event.srcElement);
			if (target.isOrParent('.linphoneweb > .header .language .list > li')) {
				var locale = target.data('data');
				linphone.ui.locale.change(base, locale);
			}
		}));
	},
	translate: function(base) {
		linphone.ui.header.reloadLanguageList(base);
	},
	
	/* */
	reloadLanguageList: function(base) {
		var list = base.find('> .header .language .list');
		list.empty();
		var locales = linphone.ui.configuration(base).locales;
		for(var i = 0; i < locales.length; ++i) {
			var locale = locales[i];
			var element = jQuery(linphone.ui.template(base, 'header.language.list.entry', {
				lang: locale.name,
				cls: (locale.locale === jQuery.i18n.locale) ? 'selected': ''
			}));
			element.data('data', locale);
			list.append(element);
		}
	},
	
	/* */
	menu: {
		open: function(base) {
			base.find('> .header .profile').addClass('highlight');
			base.find('> .header .profile').addClass('highlight');
			base.find('> .header .menu').show();
		},
		close: function(base) {
			base.find('> .header .menu').hide();
			base.find('> .header .profile').removeClass('highlight'); 
		}
	},
	
	/* */
	profile: {
		update: function(base, status) {
			base.find('> .header .profile .status').html(linphone.ui.template(base, 'header.profile.status', status));
		}
	}
};
