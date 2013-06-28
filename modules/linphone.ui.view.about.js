/*globals jQuery,linphone*/

linphone.ui.view.about = {
	init: function(base) {
		linphone.ui.view.about.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .view > .about').data('linphoneweb-view', linphone.ui.view.about);
		
		base.find('> .content .view > .about .button').click(linphone.ui.exceptionHandler(base, function(){
			linphone.ui.view.hide(base, 'about');
		}));
	},
	translate: function(base) {
		
	},
	
	/**/
	show: function(base) {
		linphone.ui.view.about.update(base);
		linphone.ui.menu.hide(base);
	},
	hide: function(base) {
	},
	
	update: function(base) {
		var about = base.find('> .content .view > .about');
		var core = linphone.ui.getCore(base);
		if(linphone.core.isValid(core)) {
			about.find('.entry .core').show();
			about.find('.entry .core .version').text(core.version);
			about.find('.entry .plugin').show();
			about.find('.entry .plugin .version').text(core.pluginVersion);
		} else {
			about.find('.entry .core').hide();
			about.find('.entry .plugin').hide();
		}
	}
};