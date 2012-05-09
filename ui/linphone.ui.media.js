/*globals getCore,getBase,localData,jQuery,linphone*/

linphone.ui.media = {

};

//Click
jQuery('html').click(function(event) {
	var target = jQuery(event.target);
	var base = getBase(target);
	
	// Click on media item 
	if (target.is('.linphone .window .tools .media > a')) {
		base.find('.window .tools .settings-menu').fadeOut('fast');
		base.find('.window .media-options').fadeIn('fast');
	}
});