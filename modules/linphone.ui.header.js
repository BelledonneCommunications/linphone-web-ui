/*globals jQuery,linphone*/

linphone.ui.header = {
	init: function(base) {
		linphone.ui.header.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .header .navigation').show();
		
		base.find('> .header .profile .profileOpen').mouseover(function(event){
			base.find('> .header .profile').addClass('highlight');
			base.find('> .header .profileModify').show();
			base.find('> .header .profile').mouseleave(function(){
				base.find('> .header .profileModify').hide();
				base.find('> .header .profile').removeClass('highlight'); 
			});
		});
		
		base.find('> .header .navigation .settings').click(function(event){
			if(jQuery(this).hasClass('disabled')) {
				return;
			}
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
		
		/* Samples */
		var list = base.find('> .header .language .list');
		for(var i = 0; i < linphone.ui.locales.length; ++i) {
			var locale = linphone.ui.locales[i];
			console.log(jQuery.i18n.locale + "===" + locale.locale + " " + (locale.locale === jQuery.i18n.locale));
			list.append(linphone.ui.template('header.language.list.entry', {
				lang: locale.name,
				cls: (locale.locale === jQuery.i18n.locale) ? 'selected': ''
			}));
		}
	}
};
