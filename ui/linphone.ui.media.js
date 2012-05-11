/*globals jQuery,linphone*/

linphone.ui.media = {
	// Original function by Alien51
	unique : function(arrVal) {
		var uniqueArr = [];
		for ( var i = arrVal.length; i--;) {
			var val = arrVal[i];
			if (jQuery.inArray(val, uniqueArr) === -1) {
				uniqueArr.unshift(val);
			}
		}
		return uniqueArr;
	},
	updateMediaList : function(target) {
		var base = linphone.ui.getBase(target);
		var core = linphone.ui.getCore(target);

		// Remove JQuery UI select style
		base.find('.window .media-options .ring_device').selectmenu('destroy');
		base.find('.window .media-options .playback_device').selectmenu('destroy');
		base.find('.window .media-options .capture_device').selectmenu('destroy');
		base.find('.window .media-options .video_device').selectmenu('destroy');
		
		// Clear
		base.find('.window .media-options .playback_device').empty();
		base.find('.window .media-options .ring_device').empty();
		base.find('.window .media-options .capture_device').empty();
		base.find('.window .media-options .video_device').empty();

		var sound_devices = core.getSoundDevices();
		for ( var sound_index in sound_devices) {
			var sound_device = sound_devices[sound_index];
			var sound_option = '<option value="' + sound_device + '">' + sound_device + '</option>';
			if (core.soundDeviceCanCapture(sound_device)) {
				base.find('.window .media-options .capture_device').append(sound_option);
			}
			if (core.soundDeviceCanPlayback(sound_device)) {
				base.find('.window .media-options .playback_device').append(sound_option);
				base.find('.window .media-options .ring_device').append(sound_option);
			}
		}

		base.find('.window .media-options .ring_device').select(core.getRingerDevice());
		base.find('.window .media-options .playback_device').select(core.getPlaybackDevice());
		base.find('.window .media-options .capture_device').select(core.getCaptureDevice());

		var video_devices = linphone.ui.media.unique(core.getVideoDevices());
		for ( var video_index in video_devices) {
			var video_device = video_devices[video_index];
			var video_option = '<option value="' + video_device + '">' + video_device + '</option>';
			base.find('.window .media-options .video_device').append(video_option);
		}

		base.find('.window .media-options .video_device').select(core.getVideoDevice());

		// Apply JQuery UI select style
		base.find('.window .media-options .ring_device').selectmenu();
		base.find('.window .media-options .playback_device').selectmenu();
		base.find('.window .media-options .capture_device').selectmenu();
		base.find('.window .media-options .video_device').selectmenu();
	}
};

// Click
jQuery('html').click(function(event) {
	var target = jQuery(event.target);
	var base = linphone.ui.getBase(target);

	// Click on media item
	if (target.is('.linphone .window .tools .media > a')) {
		base.find('.window .tools .settings-menu').fadeOut('fast');

		linphone.ui.media.updateMediaList(target);

		base.find('.window .media-options').fadeIn('fast');
	}
});