/*globals jQuery,linphone*/

linphone.ui.mainbar = {
	init: function(base) {
		linphone.ui.mainbar.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .mainbar .ringtone .switch .off').click(linphone.ui.exceptionHandler(base, function(event){
			linphone.ui.mainbar.update(base, 0);
		}));
		base.find('> .content .mainbar .ringtone .switch .on').click(linphone.ui.exceptionHandler(base, function(event){
			linphone.ui.mainbar.update(base, 100);
		}));
		
		// Hide until it works
		base.find('> .content .mainbar .ringtone').hide();
	},
	translate: function(base) {
	},
	
	/**/
	show: function(base) {
		linphone.ui.mainbar.update(base);
		base.find('> .content .mainbar').show();
	},
	hide: function(base) {
		base.find('> .content .mainbar').hide();
	},
	
	/**/
	update: function(base, level) {
		var core = linphone.ui.getCore(base);
		var old_level = core.ringLevel;
		var new_level;
		if(typeof level !== 'undefined') {
			new_level = level;
		} else {
			new_level = old_level;
		}
		
		if(new_level > 0 && new_level < 100) {
			new_level = 100;	
		}
		if(new_level !== old_level) {
			core.ringLevel = new_level;
		}
		
		// Update UI
		if(new_level === 100) {
			base.find('> .content .mainbar .ringtone .switch .off').removeClass('selected');
			base.find('> .content .mainbar .ringtone .switch .on').addClass('selected');
		} else {
			base.find('> .content .mainbar .ringtone .switch .off').addClass('selected');
			base.find('> .content .mainbar .ringtone .switch .on').removeClass('selected');
		}
	}
};