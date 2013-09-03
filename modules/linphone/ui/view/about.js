/*!
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (c) 2013 Belledonne Communications
 All rights reserved.
 

 Authors:
 - Yann Diorcet <diorcet.yann@gmail.com>
 
 */

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
	
	/* */
	show: function(base) {
		linphone.ui.view.about.update(base);
		linphone.ui.menu.hide(base);
	},
	hide: function(base) {
		linphone.ui.view.hide(base, 'about'); // Do not stack
	},
	
	update: function(base) {
		var about = base.find('> .content .view > .about');
		var core = linphone.ui.getCore(base);
		var configuration = linphone.ui.configuration(base);
		
		if(linphone.core.isValid(core)) {
			about.find('.entry .core').show();
			about.find('.entry .core .version').text(core.version);
			about.find('.entry .webapp').show();
			about.find('.entry .webapp .version').text(configuration.webapp_version);
			about.find('.entry .plugin').show();
			about.find('.entry .plugin .version').text(core.pluginVersion);
		} else {
			about.find('.entry .core').hide();
			about.find('.entry .webapp').hide();
			about.find('.entry .plugin').hide();
		}
		
		// Update link list
		var links = about.find('.links');
		links.empty();
		for(var i in configuration.links) {
			var link = configuration.links[i];
			var elem = linphone.ui.template(base, 'view.about.link', link);
			links.append(elem);
		}
		
		// Update copyright
		about.find('.copyright').text(configuration.copyright);
	}
};