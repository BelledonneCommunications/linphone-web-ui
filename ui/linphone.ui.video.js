/*globals getCore,getBase,localData,jQuery,linphone,consoleLog*/

linphone.ui.video = {
	updateVideoView : function(target) {
		if (localData()['enable_video'] === '1') {
			linphone.instance.video_view = linphone.ui.video.createVideoView(target, 'video', function(object) {
				consoleLog('Load VideoView ' + object.magic);
				object.setBackgroundColor(0, 0, 0);
				getCore(target).setNativeVideoWindowId(object.window);
				getCore(target).enableVideo(true);
			}, function(object) {
				localData()['enable_video'] = '0';
				linphone.ui.video.updateSelfView(target);
			});
		} else {
			if (linphone.instance.video_view !== null) {
				getCore(target).enableVideo(false);
				getCore(target).setNativeVideoWindowId(0);
				linphone.ui.video.destroyVideoView(linphone.instance.video_view);
				linphone.instance.video_view = null;
			}
		}
	},
	updateSelfView : function(target) {
		if (localData()['enable_video'] === '1' && localData()['enable_video_self'] === '1') {
			linphone.instance.self_view = linphone.ui.video.createVideoView(target, 'locale', function(object) {
				consoleLog('Load VideoView ' + object.magic);
				object.setBackgroundColor(0, 0, 0);
				getCore(target).setNativePreviewWindowId(object.window);
				getCore(target).enableVideoPreview(true);
			}, function(object) {
				localData()['enable_video_self'] = '0';
				linphone.ui.video.updateSelfView();
			});
		} else {
			if (linphone.self_view != null) {
				getCore(target).enableVideoPreview(false);
				getCore(target).setNativePreviewWindowId(0);
				linphone.ui.video.destroyVideoView(linphone.instance.self_view);
				linphone.instance.self_view = null;
			}
		}
	},
	createVideoView: function (target, title, onOpen, onClose) {
		var element = jQuery(document.createElement('div'));
		element.attr('title', title);
		element.addClass('video');

		element.dialog({
			height : 240,
			width : 320,
			close : function() {
				onClose(jQuery(this).find('object').get(0));
			}
		});
		element.parent().appendTo(getBase(target));
		element.dialog("open");
		var template = jQuery(jQuery('#Linphone-Video').render({
			magic : linphone.instance.video_number
		}));
		var object = template.find('object');
		consoleLog('Create VideoView ' + linphone.instance.video_number);
		linphone.instance.video_data[linphone.instance.video_number] = onOpen;
		linphone.instance.video_number = linphone.instance.video_number + 1;
		element.append(template);
		return element;
	},
	destroyVideoView: function (element) {
		var object = element.find('object').get(0);
		consoleLog('Destroy VideoView ' + object.magic);
		linphone.instance.video_data.splice(object.magic, 1);
		element.dialog('destroy');
		element.remove();
	}
};

// Click
jQuery('html').click(function(event) {
	var target = jQuery(event.target);
	var base = getBase(target);

	// Click on video item
	if (target.is('.linphone .window .tools .video > a')) {
		if (localData()['enable_video'] === '1') {
			base.find('.window .tools .video-menu .enable a').addClass('ui-state-selected');
			base.find('.window .tools .video-menu .self a').removeClass('ui-state-disabled');
		} else {
			base.find('.window .tools .video-menu .enable a').removeClass('ui-state-selected');
			base.find('.window .tools .video-menu .self a').addClass('ui-state-disabled');
		}
		if (localData()['enable_video_self'] === '1') {
			base.find('.window .tools .video-menu .self a').addClass('ui-state-selected');
		} else {
			base.find('.window .tools .video-menu .self a').removeClass('ui-state-selected');
		}
		base.find('.window .tools .video-menu').fadeToggle('fast');
	} else if (target.parents(".linphone .window .tools .video").length === 0) {
		base.find('.window .tools .video-menu').fadeOut('fast');
	} else {
		base.find('.window .tools .video-menu').fadeIn('fast');
	}

	// Click on enable video item
	if (target.is('.linphone .window .tools .video-menu .enable > a')) {
		if (target.hasClass('ui-state-selected')) {
			localData()['enable_video'] = '0';
			getCore(target).enableVideo(false);
		} else {
			localData()['enable_video'] = '1';
			getCore(target).enableVideo(true);
		}
		linphone.ui.video.updateVideoView(target);
		linphone.ui.video.updateSelfView(target);
		base.find('.window .tools .video-menu').fadeOut('fast');
		base.find('.window .tools .settings-menu').fadeOut('fast');
	}

	// Click on self view video item
	if (target.is('.linphone .window .tools .video-menu .self > a')) {
		if (target.hasClass('ui-state-selected')) {
			localData()['enable_video_self'] = '0';
		} else {
			localData()['enable_video_self'] = '1';
		}
		linphone.ui.video.updateSelfView(target);
		base.find('.window .tools .video-menu').fadeOut('fast');
		base.find('.window .tools .settings-menu').fadeOut('fast');
	}
});