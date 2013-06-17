linphone.ui.view = {
}

jQuery('.linphoneweb > .content .view .plugin').show();

jQuery('.linphoneweb > .content .view .plugin').click(function(){
	jQuery('.linphoneweb > .content .view .plugin').hide();
	jQuery('.linphoneweb > .content .view .login').show();
	jQuery('.linphoneweb > .content .view .login .accountOther').hide();
});	
