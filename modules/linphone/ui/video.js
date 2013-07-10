/*globals jQuery,linphone*/

linphone.ui.video = {
	instanceCount: 1,
	instances: [],
	
	/* */
	init: function(base) {
	},
	translate: function(base) {
	},
	
	addVideoView: function(base, element) {
		if(!linphone.ui.video.hasView(base, element)) {
			linphone.ui.video.createView(base, element, function(base, video) {
				var core = linphone.ui.getCore(base);
				video.setBackgroundColor(0, 0, 0);
				console.log(video.window);
				core.nativeVideoWindowId = video.window;
				console.log(core.nativeVideoWindowId);
			}, function(base, video) {
				var core = linphone.ui.getCore(base);
				core.nativeVideoWindowId = null;
			});
		}
	},
	
	
	addSelfView: function(base, element) {
		if(!linphone.ui.video.hasView(base, element)) {
			linphone.ui.video.createView(base, element, function(base, video) {
				var core = linphone.ui.getCore(base);
				video.setBackgroundColor(0, 0, 0);
				console.log(video.window);
				core.nativePreviewWindowId = video.window;
				console.log(core.nativeVideoWindowId);
			}, function(base, video) {
				var core = linphone.ui.getCore(base);
				core.nativePreviewWindowId = null;
			});
		}
	},
	
	getView: function(base, element) {
		var video = element.find('object');
		if(video.length > 0) {
			return video.get(0);
		}
		return null;
	},
	hasView: function(base, element) {
		return linphone.ui.video.getView(base, element) !== null;
	},
	removeView: function(base, element) {
		var video = linphone.ui.video.getView(base, element);
		if(video !== null) {
			if(!linphone.core.isValid(video)) {
				linphone.ui.logger.error(base, 'Video removeView fail: \'video\' object is invalid');
				return;
			}
			var object = linphone.ui.video.instances[video.magic];
			object.onClose(base, video);
			element.empty();
		}
	},
	
	createView: function(base, element, onOpen, onClose) {
		var functionName = '__linphone_ui_video_loadHandler' + linphone.ui.video.instanceCount;
		window[functionName] = function (core) {
			linphone.ui.video._loadHandler(core);
			window[functionName] = undefined;
			try{
				delete window[functionName];
			} catch(e) {
			}
		};
		var video = linphone.ui.template(base, 'object.video', {
			fct: functionName,
			magic : linphone.ui.video.instanceCount
		});
		linphone.core.log('Create VideoView ' + linphone.ui.video.instanceCount);
		linphone.ui.video.instances[linphone.ui.video.instanceCount] = {
			base: base,
			onOpen: onOpen,
			onClose: onClose
		};
		linphone.ui.video.instanceCount = linphone.ui.video.instanceCount + 1;
		element.append(video);
	},
	
	_loadHandler: function(video) {
		if(!linphone.core.isValid(video)) {
			linphone.ui.logger.error(null, 'Video _loadHandler fail: \'video\' object is invalid');
			return;
		}
		var object = linphone.ui.video.instances[video.magic];
		var base = object.base;
		if(!linphone.ui.isValid(base)) {
			linphone.ui.logger.error(null, 'Video _loadHandler fail: can\'t retrieve data associated to the \'video\' object');
			return;
		}
		linphone.ui.logger.log(base, 'Video handler');
		object.onOpen(base, video);
	}
};