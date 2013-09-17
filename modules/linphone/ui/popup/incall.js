/*!
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (c) 2013 Belledonne Communications
 All rights reserved.
 

 Authors:
 - Yann Diorcet <diorcet.yann@gmail.com>
 
 */

/*globals jQuery,linphone*/

linphone.ui.popup.incall = {
	init: function(base) {
		linphone.ui.popup.incall.uiInit(base);
	},
	uiInit: function(base) {
	},
	translate: function(base) {
	},
	
	/* */
	show: function(base, call){
		var list = base.find('> .content .popup');
		var element=linphone.ui.template(base, 'popup.incall', call);

		element.data('incallPopup',call);
		element.find('.actions .callIn').click(linphone.ui.exceptionHandler(base, function(event){
			linphone.ui.popup.incall.accept(base,call);
		}));
		element.find('.actions .callOff').click(linphone.ui.exceptionHandler(base, function(event){
			linphone.ui.popup.incall.decline(base,call);
		}));
		
		list.append(element);
		linphone.ui.popup.show(base,'incall');
		linphone.ui.popup.update(base);
	},
	hide: function(base, call){
		var element =  linphone.ui.popup.incall.getIncallPopup(base, call);
		if(element !== null){
			element.remove();
		}
		linphone.ui.popup.update(base);
	},
	
	/* */
	decline: function(base, call){
		var core = linphone.ui.getCore(base);
		
		core.terminateCall(call);
		linphone.ui.popup.incall.hide(base,call);
	},
	accept: function(base, call){
		var core = linphone.ui.getCore(base);
		var callParams = core.createDefaultCallParameters();
		core.acceptCallWithParams(call,callParams);
		linphone.ui.popup.incall.hide(base,call);
	},
	
	/* */
	getIncallPopup: function(base,call){
		var data = base.find('> .content .popup > .incall').each(function (index, object) {
			var jobject = jQuery(object);
			var callData=jobject.data('incallPopup');
			if(call === callData){
				return jobject;
			}
		});
		return data;
	}
};
