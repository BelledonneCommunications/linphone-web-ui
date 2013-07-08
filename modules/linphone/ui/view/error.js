/*globals jQuery,linphone*/

linphone.ui.view.error = {
	init: function(base) {
		linphone.ui.view.error.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .view > .error').data('linphoneweb-view', linphone.ui.view.error);
		
		base.find('> .content .view > .error .reload').click(linphone.ui.exceptionHandler(base, function(){
			linphone.ui.core.reload(base);
		}));
	},
	translate: function(base) {
	},
	
	/**/
	show: function(base, error_id, error) {
		if((typeof error_id === 'undefined' || error_id === null) && (typeof error === 'undefined' || error === null)) {
			return;
		}
		
		// Create error message
		var content;
		if(typeof error_id === 'undefined' || error_id === null) {
			content = jQuery("<div />").text(error).html();
		} else {
			content = jQuery.i18n.get(error_id);
		}
		
		base.find('> .content .view > .error .message').empty();
		base.find('> .content .view > .error .message').append(content);
		linphone.ui.view.show(base, 'error');
	}
};