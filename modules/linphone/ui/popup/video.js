/*!
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (c) 2013 Belledonne Communications
 All rights reserved.
 

 Authors:
 - Yann Diorcet <diorcet.yann@gmail.com>
 
 */

/*globals jQuery,linphone*/

linphone.ui.popup.video = {
	init: function(base) {
		linphone.ui.popup.video.uiInit(base);
	},
	uiInit: function(base) {
	},
	translate: function(base) {
	},
	
	/* */
	show: function(base, call){
		var list = base.find('> .content .popup');
		var element=linphone.ui.template(base, 'popup.video', call);

		element.find('.actions .videoIn').click(linphone.ui.exceptionHandler(base, function(event){
			linphone.ui.popup.video.accept(base,call,element);
		}));
		element.find('.actions .videoOff').click(linphone.ui.exceptionHandler(base, function(event){
			linphone.ui.popup.video.decline(base,call,element);
		}));
		
		list.append(element);
		linphone.ui.popup.show(base,'video');
		linphone.ui.popup.update(base);
	},
	hide: function(base, element){
		element.remove();
		linphone.ui.popup.update(base);
	},
	
	/* */
	decline: function(base, call, element){
		var core = linphone.ui.getCore(base);
		var params = call.currentParams;
		
		linphone.ui.popup.video.hide(base,element);
	},
	accept: function(base, call, element){
		var core = linphone.ui.getCore(base);
		

		linphone.ui.popup.video.hide(base,element);
		linphone.ui.view.call.updateVideoButton(base,true);
		linphone.ui.view.call.enableVideo(base,call,true);
		var params = call.currentParams;
		core.acceptCallUpdate(call,params);
	}
};
