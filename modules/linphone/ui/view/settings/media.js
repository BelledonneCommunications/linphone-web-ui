/*globals jQuery,linphone*/

linphone.ui.view.settings.media = {
	init: function(base) {
		linphone.ui.view.settings.media.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .view > .settings > .media .actions .save').click(linphone.ui.exceptionHandler(base, function() {
			linphone.ui.view.settings.media.save(base);
			linphone.ui.view.hide(base, 'settings');
		}));
		base.find('> .content .view > .settings > .media .actions .cancel').click(linphone.ui.exceptionHandler(base, function() {
			linphone.ui.view.hide(base, 'settings');	
		}));
	},
	translate: function(base) {
		
	},
	
	/* UI Events */
	show: function(base) {
		linphone.ui.view.settings.media.updateList(base);
		base.find('> .content .view > .settings > .media').show();
	},
	
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
	updateList : function(base) {
		var media = base.find('> .content .view > .settings > .media');
		var core = linphone.ui.getCore(base);
		
		// Clear
		media.find('.devices .play select').empty();
		media.find('.devices .ring select').empty();
		media.find('.devices .record select').empty();
		media.find('.devices .video select').empty();

		
		// Sound
		var sound_devices = core.soundDevices;
		for ( var sound_index in sound_devices) {
			var sound_device = sound_devices[sound_index];
			var sound_option = '<option value="' + sound_device + '">' + sound_device + '</option>';
			if (core.soundDeviceCanCapture(sound_device)) {
				media.find('.devices .record select').append(sound_option);
			}
			if (core.soundDeviceCanPlayback(sound_device)) {
				media.find('.devices .play select').append(sound_option);
				media.find('.devices .ring select').append(sound_option);
			}
		}

		var selected_ringer_device = core.ringerDevice;
		var selected_playback_device = core.playbackDevice;
		var selected_capture_device = core.captureDevice;
		
		// Log
		linphone.ui.logger.log(base, 'Ringer device: ' + selected_ringer_device);
		linphone.ui.logger.log(base, 'Playback device: ' + selected_playback_device);
		linphone.ui.logger.log(base, 'Capture device: ' + selected_capture_device);
		
		media.find('.devices .ring select').val(selected_ringer_device);
		media.find('.devices .play select').val(selected_playback_device);
		media.find('.devices .record select').val(selected_capture_device);

		// Video
		var video_devices = linphone.ui.view.settings.media.unique(core.videoDevices);
		for ( var video_index in video_devices) {
			var video_device = video_devices[video_index];
			var video_option = '<option value="' + video_device + '">' + video_device + '</option>';
			media.find('.devices .video select').append(video_option);
		}
		
		var selected_video_device = core.videoDevice;
		
		// Log
		linphone.ui.logger.log(base, 'Video device: ' + selected_video_device);
		
		media.find('.devices .video select').val(selected_video_device);
		

		/*
		// Event handling
		media.find('.devices .ring select').unbind('change');
		media.find('.devices .play select').unbind('change');
		media.find('.devices .record select').unbind('change');
		media.find('.devices .video select').unbind('change');
		media.find('.devices .ring select').change(linphone.ui.view.settings.media.changeEvent);
		media.find('.devices .play select').change(linphone.ui.view.settings.media.changeEvent);
		media.find('.devices .record select').change(linphone.ui.view.settings.media.changeEvent);
		media.find('.devices .video select').change(linphone.ui.view.settings.media.changeEvent);
		*/
	},
	/*
	changeEvent: function(event) {
		var target = jQuery(event.target ? event.target : event.srcElement);
		var core = linphone.ui.getCore(target);
		if(target.is('.linphoneweb > .content .view > .settings > .media .devices .ring select')) {
			core.ringerDevice = target.val();
		}
		
		if(target.is('.linphoneweb > .content .view > .settings > .media .devices .play select')) {
			core.playbackDevice = target.val();
		}
		
		if(target.is('.linphoneweb > .content .view > .settings > .media .devices .record select')) {
			core.captureDevice = target.val();
		}
		
		if(target.is('.linphoneweb > .content .view > .settings > .media .devices .video select')) {
			core.videoDevice = target.val();
		}
	},*/
	save: function(base) {
		var core = linphone.ui.getCore(base);
		var media = base.find('> .content .view > .settings > .media');
		core.ringerDevice = media.find('.devices .ring select').val();
		core.playbackDevice = media.find('.devices .play select').val();
		core.captureDevice = media.find('.devices .record select').val();
		core.videoDevice = media.find('.devices .video select').val();
	}
};