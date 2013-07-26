/*globals jQuery,linphone*/

linphone.ui.view.call = {
	init: function(base) {
		linphone.ui.view.call.uiInit(base);
	},
	uiInit: function(base) {
		var call = base.find('> .content .view > .call');
		call.data('linphoneweb-view', linphone.ui.view.call);
		
		/* Resizable */
		call.find('.video .profile').mouseenternear(linphone.ui.exceptionHandler(base, function (event) {
			call.find('.video .profile .resize').show();
		}), 40);
		call.find('.video .profile').mouseleavenear(linphone.ui.exceptionHandler(base, function (event) {
			call.find('.video .profile .resize').hide();
		}), 40);
		call.find('.video .profile .resize .collapse').click(linphone.ui.exceptionHandler(base, function(event) {
			linphone.ui.view.call.updateVideoProfile(base, false);
		}));
		call.find('.video .profile .resize .expand').click(linphone.ui.exceptionHandler(base, function(event) {
			linphone.ui.view.call.updateVideoProfile(base, true);
		}));
		
		linphone.ui.view.call.updateVideoProfile(base, true);
		
		// Set video/self view
		linphone.ui.video.addVideoView(base, base.find('> .content .view > .call .video > .content'));
		linphone.ui.video.addSelfView(base, base.find('> .content .view > .call .video .profile > .content'));
		
	},
	translate: function(base) {
	},
	
	/* */
	show: function(base, call) {
		linphone.ui.view.call.update(base,call);
	},
	update: function(base,call) {
		var core = linphone.ui.getCore(base);
		var callView = base.find('> .content .view > .call');
		var list = callView.find(' .actions');
		
		linphone.ui.menu.show(base);
		list.empty();
		list.append(linphone.ui.template(base, 'view.call.actions', core));
		linphone.ui.view.call.updateMuteButton(base, core.isMicMuted);
		linphone.ui.view.call.updateVideoButton(base, call.cameraEnabled);
		var qualityTimer = window.setInterval(function(){
			linphone.ui.view.call.displayCallQuality(base,call);},
			1000);
		linphone.ui.view.call.displayCallQuality(base,call);
		callView.data('qualityTimer',qualityTimer);
		/* */
		callView.find('.actions .muteEnabled .on').click(linphone.ui.exceptionHandler(base, function(){
			linphone.ui.view.call.onMuteButton(base,false);
		}));
		callView.find('.actions .muteEnabled .off').click(linphone.ui.exceptionHandler(base, function(){
			linphone.ui.view.call.onMuteButton(base,true);
		}));
		callView.find('.actions .videoEnabled .on').click(linphone.ui.exceptionHandler(base, function(){
			linphone.ui.view.call.onVideoButton(base,call,true);
		}));
		callView.find('.actions .videoEnabled .off').click(linphone.ui.exceptionHandler(base, function(){
			linphone.ui.view.call.onVideoButton(base,call,false);
		}));
		callView.find('.actions .conference').click(linphone.ui.exceptionHandler(base, function(){
			linphone.ui.view.show(base, 'conference');
		}));
		callView.find('.actions .pause').click(linphone.ui.exceptionHandler(base, function(){
			linphone.ui.view.call.onPauseButton(base, call);
		}));
		callView.find('.actions .hangup').click(linphone.ui.exceptionHandler(base, function(){
			linphone.ui.view.call.onTerminateButton(base, call);
		}));
				
		if(linphone.ui.configuration(base).disableConference) {
			base.find('.actions .conference').hide();
		}
		
	},
	hide: function(base) {
		var data = base.find('> .content .view > .call ').data('qualityTimer');
		window.clearInterval(data);
	},
	
	/* */
	updateVideoProfile: function(base, expanded) {
		var call = base.find('> .content .view > .call');
		if(expanded) {
			call.find('.video .profile .resize .collapse').show();
			call.find('.video .profile .resize .expand').hide();
			call.find('.video .profile').removeClass('collapsed');
		} else {
			call.find('.video .profile .resize .expand').show();
			call.find('.video .profile .resize .collapse').hide();
			call.find('.video .profile').addClass('collapsed');
		}
	},
	updateMuteButton: function(base, isMicMuted) {
		if(isMicMuted === true){
			base.find('> .content .view > .call .actions .muteEnabled .off').addClass('selected');
			base.find('> .content .view > .call .actions .muteEnabled .on').removeClass('selected');
		} else {
			base.find('> .content .view > .call .actions .muteEnabled .on').addClass('selected');
			base.find('> .content .view > .call .actions .muteEnabled .off').removeClass('selected');
		}
	},
	updateVideoButton: function(base, isVideoEnabled) {
		if(isVideoEnabled === true){
			base.find('> .content .view > .call .actions .videoEnabled .on').addClass('selected');
			base.find('> .content .view > .call .actions .videoEnabled .off').removeClass('selected');
		} else {
			base.find('> .content .view > .call .actions .videoEnabled .off').addClass('selected');
			base.find('> .content .view > .call .actions .videoEnabled .on').removeClass('selected');
		}
	},
	onMuteButton: function(base, button) {
		var core = linphone.ui.getCore(base);
		
		core.muteMic = button;
		linphone.ui.view.call.updateMuteButton(base,button);
	},
	onVideoButton: function(base, call, button) {
		var core = linphone.ui.getCore(base);
		
		/*var callParams =  call.currentParams;
		callParams.enabledVideo = button ;
		core.updateCall(call,callParams);*/
		linphone.ui.view.call.updateVideoButton(base,button);
	},
	onPauseButton: function(base, call) {
		var core = linphone.ui.getCore(base);
		if(call.state === linphone.core.enums.callState.Paused){
			core.resumeCall(call);
		} else {
			core.pauseCall(call);
		}
	},
	onTerminateButton: function(base, call) {
		var core = linphone.ui.getCore(base);
		core.terminateCall(call);
	},
	
	/* */
	terminateCall: function(base, call){
		var core = linphone.ui.getCore(base);
		core.muteMic = false;
	},
	displayCallQuality: function(base, call) {
		var quality = call.currentQuality;
		var signal = base.find('> .content .view > .call .actions .callSignal').addClass('selected');
		if(quality >= 0 && quality < 1){
			signal.attr('src','tmp/signal0b.png');
		}
		if(quality >= 1 && quality < 2){
			signal.attr('src','tmp/signal1b.png');
		}
		if(quality >= 2 && quality < 3){
			signal.attr('src','tmp/signal2b.png');
		}
		if(quality >= 3 && quality < 4){
			signal.attr('src','tmp/signal3b.png');
		}
		if(quality >= 4 && quality < 5){
			signal.attr('src','tmp/signal4b.png');
		}
	}
};
