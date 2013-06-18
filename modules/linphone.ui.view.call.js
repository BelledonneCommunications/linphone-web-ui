linphone.ui.view.call = {
	init: function(base) {
		linphone.ui.view.call.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .view .call .actions .conference').click(function(){
			base.find('> .content .view > .call').hide();
			base.find('> .content .view > .conference').show();
		});
	}
};
