/*globals core, localData, jQuery */

jQuery(function() {
	jQuery(".linphone .window .tools .hp-slider").slider({
		orientation : 'vertical',
		change : function(event, ui) {
			if (localData()) {
				localData()['play_level'] = ui.value;
			}
			core().setPlayLevel(ui.value);
		}
	});
	jQuery(".linphone .window .tools .mic-slider").slider({
		orientation : 'vertical',
		change : function(event, ui) {
			if (localData()) {
				localData()['rec_level'] = ui.value;
			}
			core().setRecLevel(ui.value);
		}
	});
	jQuery(".linphone .window .tools .bell-slider").slider({
		orientation : 'vertical',
		change : function(event, ui) {
			if (localData()) {
				localData()['ring_level'] = ui.value;
			}
			core().setRingLevel(ui.value);
		}
	});
});