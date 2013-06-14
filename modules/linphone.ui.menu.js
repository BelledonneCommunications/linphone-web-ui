jQuery('aside nav li li').mouseover(function(){
	jQuery(this).append('<span class="closeContact"></span>');
});

jQuery('aside nav li li').mouseleave(function(){
	jQuery('.closeContact',this).remove();
});

jQuery('aside .goHistory').click(function(){
	jQuery('.wrapper .history').css('display','block');
	jQuery('.scroll-pane').each(function(){
		setSlider(jQuery(this));
	});
});

jQuery('aside .goChat').click(function(){
	jQuery('.wrapper .chat').css('display','block');
	jQuery('.scroll-pane').each(function(){
		setSlider(jQuery(this));
	});
});

jQuery('aside nav li a').click(function(){
	jQuery('.wrapper>div').css('display','none');
});

jQuery('aside .goContacts').click(function(){
	jQuery('.wrapper .contacts').css('display','block');
	jQuery('.scroll-pane').each(function(){
		setSlider(jQuery(this));
	});
});