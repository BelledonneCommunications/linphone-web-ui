/*!
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (c) 2013 Belledonne Communications
 All rights reserved.
 

 Authors:
 - Yann Diorcet <diorcet.yann@gmail.com>
 
 */

/*globals jQuery,linphone*/

linphone.ui.view.call = {
	init: function(base) {
		linphone.ui.view.call.uiInit(base);
	},
	uiInit: function(base) {
		var call = base.find('> .content .view > .call');
		call.data('linphoneweb-view', linphone.ui.view.call);
		
		// Do not add video views now because of a bug with IE.
		// They will be added later when starting a call.
	},
	translate: function(base) {
	},
	
	/* */
	show: function(base, call) {
		var core = linphone.ui.getCore(base);
		var callView= base.find('> .content .view > .call');
		/* Resizable */
		/*callView.find('.video .profile').mouseenternear(linphone.ui.exceptionHandler(base, function (event) {
			callView.find('.video .profile .resize').show();
		}), 40);
		callView.find('.video .profile').mouseleavenear(linphone.ui.exceptionHandler(base, function (event) {
			callView.find('.video .profile .resize').hide();
		}), 40);
		callView.find('.video .profile .resize .collapse').click(linphone.ui.exceptionHandler(base, function(event) {
			linphone.ui.view.call.updateVideoProfile(base, false);
		}));
		callView.find('.video .profile .resize .expand').click(linphone.ui.exceptionHandler(base, function(event) {
			linphone.ui.view.call.updateVideoProfile(base, true);
		}));
		linphone.ui.video.addSelfView(base, base.find('> .content .view > .call .video .profile > .content'));
		linphone.ui.view.call.updateVideoProfile(base, true);*/
		linphone.ui.view.call.update(base,call);
	},
	update: function(base,call) {
		var core = linphone.ui.getCore(base);
		var callView = base.find('> .content .view > .call');
		var list = callView.find(' .actions');
		var contact = callView.find(' .contactView');
		var data = base.find('> .content .view > .call ').data('currentCall');
		
		if(typeof call === 'undefined'){
			if(typeof data !== 'undefined'){
				call = data;
			} else {
				linphone.ui.view.hide(base,call);
				linphone.ui.view.show(base, 'main');
			}	
		}
		callView.data('currentCall',call);
		linphone.ui.menu.show(base);
		list.empty();
		contact.empty();
		contact.append(linphone.ui.template(base, 'view.call.contact', call));
		list.append(linphone.ui.template(base, 'view.call.actions', core));
		linphone.ui.view.call.updateMuteButton(base, core.micEnabled);
		linphone.ui.view.call.updateVideoButton(base,false);
		//linphone.ui.view.call.stopTimer(base,call);
		//linphone.ui.view.call.startTimer(base,call);
		
		/* */
		linphone.ui.view.call.activateVideoButton(base,call,true);
		callView.find('.actions .muteEnabled .on').click(linphone.ui.exceptionHandler(base, function(){
			linphone.ui.view.call.onMuteButton(base,false);
		}));
		callView.find('.actions .muteEnabled .off').click(linphone.ui.exceptionHandler(base, function(){
			linphone.ui.view.call.onMuteButton(base,true);
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
		//linphone.ui.view.call.stopTimer(base,call);
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
	updateMuteButton: function(base, isMicEnabled) {
		if(isMicEnabled === true){
			base.find('> .content .view > .call .actions .muteEnabled .on').addClass('selected');
			base.find('> .content .view > .call .actions .muteEnabled .off').removeClass('selected');
		} else {
			base.find('> .content .view > .call .actions .muteEnabled .off').addClass('selected');
			base.find('> .content .view > .call .actions .muteEnabled .on').removeClass('selected');
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
	
	/* */
	onMuteButton: function(base, button) {
		var core = linphone.ui.getCore(base);
		
		core.micEnabled = !button;
		linphone.ui.view.call.updateMuteButton(base,!button);
	},
	onVideoButton: function(base, call, button) {
		if(button){
			linphone.ui.view.call.activateVideoButton(base,call,false);
		}
		linphone.ui.view.call.enableVideo(base,call,button);
	},
	onPauseButton: function(base, call) {
		var core = linphone.ui.getCore(base);
		if(call.state === linphone.CallState.Paused){
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
	enableVideo: function(base,call,isEnabled){
		var core = linphone.ui.getCore(base);
		var callParams = call.currentParams;

		callParams.videoEnabled = isEnabled;
		core.updateCall(call,callParams);
		
		if(isEnabled === false){
			linphone.ui.view.call.removeVideo(base,call);
			linphone.ui.view.call.updateVideoButton(base,isEnabled);
		}
	},
	addVideo: function(base,call){
		linphone.ui.video.addVideoView(base, base.find('> .content .view > .call .video > .content'));
	},
	removeVideo: function(base,call){
		linphone.ui.video.removeView(base, base.find('> .content .view > .call .video > .content'));
	},
	
	activateVideoButton: function(base,call,isActivated){
		var callView= base.find('> .content .view > .call');
		if(isActivated){
			callView.find('.actions .videoEnabled .on').click(linphone.ui.exceptionHandler(base, function(){
				linphone.ui.view.call.onVideoButton(base,call,true);
			}));
			callView.find('.actions .videoEnabled .off').click(linphone.ui.exceptionHandler(base, function(){
				linphone.ui.view.call.onVideoButton(base,call,false);
			}));	
		} else {
			base.find('> .content .view > .call .actions .videoEnabled .on').unbind("click");
			base.find('> .content .view > .call .actions .videoEnabled .off').unbind("click");
		}
	},
	
	/* */
	startTimer: function(base,call){
		var callView = base.find('> .content .view > .call');
		var qualityTimer = window.setInterval(function(){
			linphone.ui.view.call.displayCallQuality(base,call);},
			1000);
		callView.data('qualityTimer',qualityTimer);
	},
	stopTimer: function(base,call){
		var data = base.find('> .content .view > .call ').data('qualityTimer');
		window.clearInterval(data);
	},
	
	terminateCall: function(base, call){
		var core = linphone.ui.getCore(base);
		core.micMute = false;
		
	},
	displayCallQuality: function(base, call) {
		var quality = call.currentQuality;
		var signal = base.find('> .content .view > .call .actions .callSignal');
		//console.log(quality);
		if(quality >= 0 && quality < 1){
			signal.css({'background-image': 'url("style/img/signal0b.png")'});
		}
		if(quality >= 1 && quality < 2){
			signal.css({'background-image': 'url("style/img/signal1b.png")'});
		}
		if(quality >= 2 && quality < 3){
			signal.css({'background-image': 'url("style/img/signal2b.png")'});
		}
		if(quality >= 3 && quality < 4){
			signal.css({'background-image': 'url("style/img/signal3b.png")'});
		}
		if(quality >= 4 && quality < 5){
			signal.css({'background-image': 'url("style/img/signal4b.png")'});
		}
	}
};
