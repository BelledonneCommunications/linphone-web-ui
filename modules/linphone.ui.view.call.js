linphone.ui.call = {
};

jQuery('.linphoneweb > .content .view .call .actions .conference').click(function(){
	jQuery('.linphoneweb > .content .view > .call').hide();
	jQuery('.linphoneweb > .content .view > .conference').show();
});