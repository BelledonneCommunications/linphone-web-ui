/*globals jQuery,linphone*/

linphone.ui.dialer = {
	init: function(base) {
		linphone.ui.dialer.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .dialer .invite').click(function(){
			var target = jQuery(event.target);
			var base = linphone.ui.getBase(target);
			base.find('> .content .popup > .outcall').hide();
			linphone.ui.popup.updatePopups(base);
		});
		
		base.find('> .content .dialer .number').mouseover(function(){
			base.find('> .content .dialer table').show();
		});
		
		base.find('> .content .dialer .number').mouseleave(function(){
			base.find('> .content .dialer table').hide();
		});
	}
};