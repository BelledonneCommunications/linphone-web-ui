/*globals jQuery,linphone*/

linphone.ui.codec = {
	dnd : {},
	updateCodecsList : function(target) {
		var audio_table = linphone.ui.getBase(target).find('.window .codecs-options .content .audio tbody');
		var audio_codecs = linphone.ui.getCore(target).getAudioCodecs();
		audio_table.empty();
		for ( var audio_index in audio_codecs) {
			var audio_item = audio_codecs[audio_index];
			var audio_element = jQuery(linphone.ui.getBase(target).find('.templates .Linphone-CodecsList').render(audio_item));
			audio_element.data('data', audio_item);
			audio_table.append(audio_element);
		}

		var video_table = linphone.ui.getBase(target).find('.window .codecs-options .content .video tbody');
		var video_codecs = linphone.ui.getCore(target).getVideoCodecs();
		video_table.empty();
		for ( var video_index in video_codecs) {
			var video_item = video_codecs[video_index];
			var video_element = jQuery(linphone.ui.getBase(target).find('.templates .Linphone-CodecsList').render(video_item));
			video_element.data('data', video_item);
			video_table.append(video_element);
		}
	},
	submitCodecsList : function(table) {
		var data = [];
		table.find('tbody tr').each(function() {
			data.push(jQuery(this).data('data'));
		});
		if (table.is('.linphone .window .codecs-options .content .video')) {
			linphone.ui.getCore(table).setVideoCodecs(data);
		} else if (table.is('.linphone .window .codecs-options .content .audio')) {
			linphone.ui.getCore(table).setAudioCodecs(data);
		}
	}
};

// OnLoad
jQuery(function() {
	jQuery(".linphone .window .codecs-options .content .tabs > ul li a").each(function(index) {
		jQuery(this).attr("href", "#codecs" + index.toString());
	});
	jQuery(".linphone .window .codecs-options .content .tabs > div").each(function(index) {
		jQuery(this).attr("id", "codecs" + index.toString());
	});

	// Tabs
	jQuery('.linphone .window .codecs-options .content .tabs').tabs({});
});

// Click
jQuery('html').click(function(event) {
	var target = jQuery(event.target);

	// Click on codecs item
	if (target.is('.linphone .window .tools .codecs > a')) {
		linphone.ui.getBase(target).find('.window .tools .settings-menu').fadeOut('fast');

		linphone.ui.codec.updateCodecsList(target);

		// DnD
		linphone.ui.getBase(target).find('.window .codecs-options .content tbody tr').disableSelection();
		linphone.ui.getBase(target).find('.window .codecs-options .content tbody tr').draggable({
			containment : 'parent',
			helper : function(event) {
				var original_tr = jQuery(event.target).parent();
				var original_table = original_tr.parents('table');
				return original_tr.clone().css({
					'height' : original_tr.outerHeight(),
					'width' : original_tr.outerWidth(),
					'position' : 'absolute'
				});
			},
			start : function(event, ui) {
				linphone.ui.codec.dnd.tr = this;
				linphone.ui.codec.dnd.helper = ui.helper;
			}
		});
		linphone.ui.getBase(target).find('.window .codecs-options .content tbody tr').droppable({
			drop : function(event, ui) {
				jQuery(linphone.ui.codec.dnd.tr).detach().insertBefore(jQuery(this));
				jQuery(linphone.ui.codec.dnd.helper).remove();
				linphone.ui.codec.submitCodecsList(jQuery(this).parents('table'));
			}
		});
		linphone.ui.getBase(target).find('.window .codecs-options').fadeIn('fast');
	}

	// Click on media item
	if (target.is('.linphone .window .codecs-options input')) {
		var data = target.parents('tr').data('data');
		data.enabled = !data.enabled;
	}
});