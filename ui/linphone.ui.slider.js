/*globals jQuery,linphone*/

linphone.ui.slider = {
};

// Transform hp/mic/bell div to slider
jQuery(function() {
	jQuery(".linphone .window .tools .hp-slider").slider({
		orientation : 'vertical',
		change : function(event, ui) {
			if (linphone.core.data()) {
				linphone.core.data()['play_level'] = ui.value;
			}
			linphone.ui.getCore(jQuery(event.target)).setPlayLevel(ui.value);
		}
	});
	jQuery(".linphone .window .tools .mic-slider").slider({
		orientation : 'vertical',
		change : function(event, ui) {
			if (linphone.core.data()) {
				linphone.core.data()['rec_level'] = ui.value;
			}
			linphone.ui.getCore(jQuery(event.target)).setRecLevel(ui.value);
		}
	});
	jQuery(".linphone .window .tools .bell-slider").slider({
		orientation : 'vertical',
		change : function(event, ui) {
			if (linphone.core.data()) {
				linphone.core.data()['ring_level'] = ui.value;
			}
			linphone.ui.getCore(jQuery(event.target)).setRingLevel(ui.value);
		}
	});
});

// Show/Hide slider
jQuery('html').click(function(event) {
	var target = jQuery(event.target);

	if (!target.is('.linphone .window .tools .hp-icon')) {
		jQuery('.linphone .window .tools .hp-slider').fadeOut('fast');
	} else {
		linphone.ui.getBase(target).find('.window .tools .hp-slider').fadeToggle('fast');
	}
	
	if (!target.is('.linphone .window .tools .mic-icon')) {
		jQuery('.linphone .window .tools .mic-slider').fadeOut('fast');
	} else {
		linphone.ui.getBase(target).find('.window .tools .mic-slider').fadeToggle('fast');
	}
	
	if (!target.is('.linphone .window .tools .bell-icon')) {
		jQuery('.linphone .window .tools .bell-slider').fadeOut('fast');
	} else {
		linphone.ui.getBase(target).find('.window .tools .bell-slider').fadeToggle('fast');
	}
});