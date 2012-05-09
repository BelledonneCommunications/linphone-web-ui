/*globals jQuery,linphone*/

linphone.ui.video = {
	video_number : 1,
	video_data : [],
	self_view : null,
	video_view : null,
	updateVideoView : function(target) {
		if (linphone.core.data()['enable_video'] === '1') {
			linphone.ui.video.video_view = linphone.ui.video.createVideoView(target, 'video', function(object) {
				linphone.core.log('Load VideoView ' + object.magic);
				object.setBackgroundColor(0, 0, 0);
				linphone.ui.getCore(target).setNativeVideoWindowId(object.window);
				linphone.ui.getCore(target).enableVideo(true);
			}, function(object) {
				linphone.core.data()['enable_video'] = '0';
				linphone.ui.video.updateSelfView(target);
			});
		} else {
			if (linphone.ui.video.video_view !== null) {
				linphone.ui.getCore(target).enableVideo(false);
				linphone.ui.getCore(target).setNativeVideoWindowId(0);
				linphone.ui.video.destroyVideoView(linphone.ui.video.video_view);
				linphone.ui.video.video_view = null;
			}
		}
	},
	updateSelfView : function(target) {
		if (linphone.core.data()['enable_video'] === '1' && linphone.core.data()['enable_video_self'] === '1') {
			linphone.ui.video.self_view = linphone.ui.video.createVideoView(target, 'locale', function(object) {
				linphone.core.log('Load VideoView ' + object.magic);
				object.setBackgroundColor(0, 0, 0);
				linphone.ui.getCore(target).setNativePreviewWindowId(object.window);
				linphone.ui.getCore(target).enableVideoPreview(true);
			}, function(object) {
				linphone.core.data()['enable_video_self'] = '0';
				linphone.ui.video.updateSelfView();
			});
		} else {
			if (linphone.ui.video.self_view != null) {
				linphone.ui.getCore(target).enableVideoPreview(false);
				linphone.ui.getCore(target).setNativePreviewWindowId(0);
				linphone.ui.video.destroyVideoView(linphone.ui.video.self_view);
				linphone.ui.video.self_view = null;
			}
		}
	},
	createVideoView : function(target, title, onOpen, onClose) {
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
		element.parent().appendTo(linphone.ui.getBase(target));
		element.dialog("open");
		var template = jQuery(linphone.ui.getBase(target).find('.templates .Linphone-Video').render({
			magic : linphone.ui.video.video_number
		}));
		var object = template.find('object');
		linphone.core.log('Create VideoView ' + linphone.ui.video.video_number);
		linphone.ui.video.video_data[linphone.ui.video.video_number] = onOpen;
		linphone.ui.video.video_number = linphone.ui.video.video_number + 1;
		element.append(template);
		return element;
	},
	destroyVideoView : function(element) {
		var object = element.find('object').get(0);
		linphone.core.log('Destroy VideoView ' + object.magic);
		linphone.ui.video.video_data.splice(object.magic, 1);
		element.dialog('destroy');
		element.remove();
	}
};

// Click
jQuery('html').click(function(event) {
	var target = jQuery(event.target);
	var base = linphone.ui.getBase(target);

	// Click on video item
	if (target.is('.linphone .window .tools .video > a')) {
		if (linphone.core.data()['enable_video'] === '1') {
			base.find('.window .tools .video-menu .enable a').addClass('ui-state-selected');
			base.find('.window .tools .video-menu .self a').removeClass('ui-state-disabled');
		} else {
			base.find('.window .tools .video-menu .enable a').removeClass('ui-state-selected');
			base.find('.window .tools .video-menu .self a').addClass('ui-state-disabled');
		}
		if (linphone.core.data()['enable_video_self'] === '1') {
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
			linphone.core.data()['enable_video'] = '0';
			linphone.ui.getCore(target).enableVideo(false);
		} else {
			linphone.core.data()['enable_video'] = '1';
			linphone.ui.getCore(target).enableVideo(true);
		}
		linphone.ui.video.updateVideoView(target);
		linphone.ui.video.updateSelfView(target);
		base.find('.window .tools .video-menu').fadeOut('fast');
		base.find('.window .tools .settings-menu').fadeOut('fast');
	}

	// Click on self view video item
	if (target.is('.linphone .window .tools .video-menu .self > a')) {
		if (target.hasClass('ui-state-selected')) {
			linphone.core.data()['enable_video_self'] = '0';
		} else {
			linphone.core.data()['enable_video_self'] = '1';
		}
		linphone.ui.video.updateSelfView(target);
		base.find('.window .tools .video-menu').fadeOut('fast');
		base.find('.window .tools .settings-menu').fadeOut('fast');
	}
});