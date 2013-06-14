jQuery('.scroll-pane').each(function(){
	setSlider(jQuery(this));
});

jQuery('.wrapper').css({'width':'410px','margin':'20px 0 0 260px','background':'#e4edf2'});
jQuery('.wrapper-plugin').css('display','block');

jQuery('.wrapper-plugin').click(function(){
	jQuery('.wrapper-plugin').css('display','none');
	jQuery('.wrapper-login').css('display','block');
	jQuery('.wrapper-login .accountOther').css('display','none');
});

jQuery('.popup-error .btnTxt').click(function(){
	jQuery('.popup-error').css('display','none');
});	

/*
jQuery('.call').click(function(event) {
        var target = jQuery(event.target);
        var base = linphone.ui.getBase(target);
        base.find('.outcall').css('display','block');
        });
        
        */