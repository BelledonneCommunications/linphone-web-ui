linphone.ui.header = {
}

jQuery('.linphoneweb > .header .profile, .linphoneweb > .content .mainbar, .linphoneweb > .content .menu').hide();

jQuery('.linphoneweb > .header .profile .profileOpen').mouseover(function(event){
	jQuery('.linphoneweb > .header .profile').css('background','#2f3338');
	jQuery('.linphoneweb > .header .profileModify').show();
	jQuery('.linphoneweb > .header .profileModify').mouseleave(function(){
		jQuery(this).hide();
		jQuery('.linphoneweb > .header .profile').css('background','#23262a'); 
	});	
});

jQuery('.linphoneweb > .header .navigation .settings').click(function(event){
	if($(this).hasClass('disabled')) return;
	jQuery('.linphoneweb > .content .view > div').hide();
	jQuery('.linphoneweb > .content .menu').hide();
	jQuery('.linphoneweb > .content .view .settings').show();
	jQuery('.linphoneweb > .content .view .settings .button').click(function(){
		jQuery('.linphoneweb > .content .view .settings').hide();
		jQuery('.linphoneweb > .content .menu').show();
	});
});

jQuery('.linphoneweb > .header .navigation .about').click(function(event){
	jQuery('.linphoneweb > .content .view > div').hide();
	jQuery('.linphoneweb > .content .menu').hide();
	jQuery('.linphoneweb > .content .view .about').show();
	jQuery('.linphoneweb > .content .view .about .button').click(function(){
		jQuery('.linphoneweb > .content .view .about').hide();
		jQuery('.linphoneweb > .content .menu').show();
	});
});

