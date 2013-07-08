/*globals jQuery,linphone*/

linphone.ui.view.call = {
	init: function(base) {
		linphone.ui.view.call.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .view > .call').data('linphoneweb-view', linphone.ui.view.call);	
	},
	translate: function(base) {
	},
	
	/* */
	show: function(base,call) {
		var core = linphone.ui.getCore(base);
		var callView = base.find('> .content .view > .call');
		var list = callView.find(' .actions');
		
		linphone.ui.menu.show(base);
		list.empty();
		list.append(linphone.ui.template(base, 'view.call.actions', core));
		linphone.ui.view.call.updateMuteButton(base, core.isMicMuted);
		linphone.ui.view.call.updateVideoButton(base, call.cameraEnabled);
		
		/* */
		base.find('> .content .view > .call .actions .muteEnabled .on').click(linphone.ui.exceptionHandler(base, function(){
			linphone.ui.view.call.onMuteButton(base,false);
		}));
		base.find('> .content .view > .call .actions .muteEnabled .off').click(linphone.ui.exceptionHandler(base, function(){
			linphone.ui.view.call.onMuteButton(base,true);
		}));
		base.find('> .content .view > .call .actions .videoEnabled .on').click(linphone.ui.exceptionHandler(base, function(){
			linphone.ui.view.call.onVideoButton(base,call,true);
		}));
		base.find('> .content .view > .call .actions .videoEnabled .off').click(linphone.ui.exceptionHandler(base, function(){
			linphone.ui.view.call.onVideoButton(base,call,false);
		}));
		base.find('> .content .view > .call .actions .conference').click(linphone.ui.exceptionHandler(base, function(){
			linphone.ui.view.show(base, 'conference');
		}));
		base.find('> .content .view > .call .actions .pause').click(linphone.ui.exceptionHandler(base, function(){
			linphone.ui.view.call.onPauseButton(base,call);
		}));
	},
	update: function(base) {
		
	},
	hide: function(base) {
	},
	
	/* */
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
		
		if(call.state === linphone.core.enums.callState.Paused ||
			call.state === linphone.core.enums.callState.PausedByRemote){
			core.resumeCall(call);
		} else {
			core.pauseCall(call);
		}
	},
	
	/* */
	terminateCall: function(base, call){
		var core = linphone.ui.getCore(base);
		
		core.muteMic = false;
	}
};
