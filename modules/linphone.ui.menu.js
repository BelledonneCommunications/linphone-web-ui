jQuery('.linphoneweb .menu nav li li').mouseover(function(){
	jQuery(this).append('<span class="closeContact"></span>');
});

jQuery('.linphoneweb .menu nav li li').mouseleave(function(){
	jQuery('.linphoneweb .closeContact',this).remove();
});

jQuery('.linphoneweb .menu .goHistory').click(function(){
	jQuery('.linphoneweb .view .history').css('display','block');
	jQuery('.linphoneweb .scroll-pane').each(function(){
		setSlider(jQuery(this));
	});
});

jQuery('.linphoneweb .menu .goChat').click(function(){
	jQuery('.linphoneweb .view .chat').css('display','block');
	jQuery('.linphoneweb .scroll-pane').each(function(){
		setSlider(jQuery(this));
	});
});

jQuery('.linphoneweb .menu nav li a').click(function(){
	jQuery('.linphoneweb .view>div').css('display','none');
});

jQuery('.linphoneweb .menu .goContacts').click(function(){
	jQuery('.linphoneweb .view .contacts').css('display','block');
	jQuery('.linphoneweb .scroll-pane').each(function(){
		setSlider(jQuery(this));
	});
});