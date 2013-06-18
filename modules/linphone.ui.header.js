linphone.ui.header = {
	init: function(base) {
		linphone.ui.header.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .header .profile, > .content .mainbar, > .content .menu').hide();
		
		base.find('> .header .profile .profileOpen').mouseover(function(event){
			base.find('> .header .profile').css('background','#2f3338');
			base.find('> .header .profileModify').show();
			base.find('> .header .profileModify').mouseleave(function(){
				jQuery(this).hide();
				base.find('> .header .profile').css('background','#23262a'); 
			});	
		});
		
		base.find('> .header .navigation .settings').click(function(event){
			if($(this).hasClass('disabled')) return;
			base.find('> .content .view > div').hide();
			base.find('> .content .menu').hide();
			base.find('> .content .view .settings').show();
			base.find('> .content .view .settings .button').click(function(){
				base.find('> .content .view .settings').hide();
				base.find('> .content .menu').show();
			});
		});
		
		base.find('> .header .navigation .about').click(function(event){
			base.find('> .content .view > div').hide();
			base.find('> .content .menu').hide();
			base.find('> .content .view .about').show();
			base.find('> .content .view .about .button').click(function(){
				base.find('> .content .view .about').hide();
				base.find('> .content .menu').show();
			});
		});
	}
};
