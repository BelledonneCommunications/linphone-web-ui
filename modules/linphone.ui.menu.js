linphone.ui.menu = {
};

jQuery('.linphoneweb > .content .menu nav li li').mouseover(function(){
	jQuery(this).append('<span class="closeContact"></span>');
});

jQuery('.linphoneweb > .content .menu nav li li').mouseleave(function(){
	jQuery(this).find('.closeContact').remove();
});

jQuery('.linphoneweb > .content .menu .goHistory').click(function(){
	jQuery('.linphoneweb > .content .view .history').show();
	jQuery('.linphoneweb .scroll-pane').each(function(){
		setSlider(jQuery(this));
	});
});

jQuery('.linphoneweb > .content .menu .goChat').click(function(){
	jQuery('.linphoneweb > .content .view .chat').show();
	jQuery('.linphoneweb .scroll-pane').each(function(){
		setSlider(jQuery(this));
	});
});

jQuery('.linphoneweb > .content .menu nav li a').click(function(){
	jQuery('.linphoneweb > .content .view > div').hide();
});

jQuery('.linphoneweb > .content .menu .goContacts').click(function(){
	jQuery('.linphoneweb > .content .view .contacts').show();
	jQuery('.linphoneweb .scroll-pane').each(function(){
		setSlider(jQuery(this));
	});
});