/*!
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (c) 2013 Belledonne Communications
 All rights reserved.
 

 Authors:
 - Yann Diorcet <diorcet.yann@gmail.com>
 
 */

/*globals jQuery,linphone*/

linphone.ui.popup.outcall = {
	init: function(base) {
		linphone.ui.popup.outcall.uiInit(base);
	},
	uiInit: function(base) {
	},
	translate: function(base) {
	},
	
	
	show: function(base, call){
		var list = base.find('> .content .popup');
		var element=linphone.ui.template(base, 'popup.outcall', call);

		element.data('outcallPopup',call);
		element.find('.actions .callOff').click(linphone.ui.exceptionHandler(base, function(event){
			linphone.ui.popup.outcall.decline(base,call);
		}));
		
		list.append(element);
		linphone.ui.popup.show(base,'outcall');
		linphone.ui.popup.update(base);
	},
	hide: function(base, call){
		var element =  linphone.ui.popup.outcall.getOutcallPopup(base, call);
		if(element !== null){
			element.remove();
		}
		linphone.ui.popup.update(base);
	},
	
	/* */
	decline: function(base, call){
		var core = linphone.ui.getCore(base);
		core.terminateCall(call);
		linphone.ui.popup.outcall.hide(base,call);
	},

	/* */
	getOutcallPopup: function(base,call){
		var data = base.find('> .content .popup > .outcall').each(function (index, object) {
			var jobject = jQuery(object);
			var callData=jobject.data('outcallPopup');
			if(call === callData){
				return jobject;
			}
		});
		return data;
	}
};