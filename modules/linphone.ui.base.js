linphone.ui = {
	getCore: function(target) {
		var base = linphone.ui.getBase(target);
		return base.find('> .core').get()[0];
	},
	getBase: function(target) {
		if (typeof target === 'undefined') {
			target = jQuery(this);
		}
		if (target.is('.linphoneweb')) {
			return target;
		} else {
			return target.parents('.linphoneweb');
		}
	},
};

jQuery('.linphoneweb .scroll-pane').each(function(){
	setSlider(jQuery(this));
});

jQuery('.linphoneweb .view').css({'width':'410px','margin':'20px 0 0 260px','background':'#e4edf2'});
jQuery('.linphoneweb .view .plugin').css('display','block');

jQuery('.linphoneweb .view .plugin').click(function(){
	jQuery('.linphoneweb .view .plugin').css('display','none');
	jQuery('.linphoneweb .view .login').css('display','block');
	jQuery('.linphoneweb .view .login .accountOther').css('display','none');
});	

/*
jQuery('.linphoneweb .call').click(function(event) {
        var target = jQuery(event.target);
        var base = linphone.ui.getBase(target);
        base.find('.outcall').css('display','block');
        });
        
        */