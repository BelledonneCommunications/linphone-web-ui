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

		element.data('videoPopup',call);
		element.find('.actions .videoIn').click(linphone.ui.exceptionHandler(base, function(event){
			linphone.ui.popup.video.accept(base,call);
		}));
		element.find('.actions .videoOff').click(linphone.ui.exceptionHandler(base, function(event){
			linphone.ui.popup.video.decline(base,call);
		}));
		
		list.append(element);
		linphone.ui.popup.show(base,'video');
		linphone.ui.popup.update(base);
	},
	hide: function(base, call, accept){
		var element =  linphone.ui.popup.video.getVideoPopup(base, call);
		if(element !== null && element.length !== 0){
			linphone.ui.utils.acceptUpdate(base, call, accept);
			element.remove();
		}
		linphone.ui.popup.update(base);
	},
	
	/* */
	decline: function(base, call){
		linphone.ui.popup.video.hide(base,call,false);
		linphone.ui.view.call.updateVideoButton(base,false);
	},
	accept: function(base, call){
		linphone.ui.popup.video.hide(base,call,true);
		linphone.ui.view.call.updateVideoButton(base,true);
	},
	
	getVideoPopup: function(base,call){
		var element = base.find('> .content .popup > .video');
		var data = null;
		data = element.each(function (index, object) {
			var jobject = jQuery(object);
			var callData = jobject.data('videoPopup');
			if(call === callData){
				return jobject;
			} else {
				return null;
			}
		});
		return data;
	}
};
