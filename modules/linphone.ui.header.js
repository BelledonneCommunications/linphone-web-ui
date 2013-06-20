/*globals jQuery,linphone*/

linphone.ui.header = {
	init: function(base) {
		linphone.ui.header.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .header .navigation').visible();
		
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
			linphone.ui.menu.hide(base);
			base.find('> .content .view > .settings').show();
			base.find('> .content .view > .settings .button').click(function(){
				base.find('> .content .view > .settings').hide();
				linphone.ui.menu.hide(base);
			});
		});
		
		base.find('> .header .navigation .about').click(function(event){
			base.find('> .content .view > div').hide();
			linphone.ui.menu.hide(base);
			base.find('> .content .view > .about').show();
			base.find('> .content .view > .about .button').click(function(){
				base.find('> .content .view > .about').hide();
				linphone.ui.menu.show(base);
			});
		});
		
		base.click(function(event) {
			var target = jQuery(event.target);
			var base = linphone.ui.getBase(target);
			if (target.isOrParent('.linphoneweb > .header .language .list > li')) {
				var locale = target.data('data');
				linphone.ui.locale.change(base, locale);
			}
		});
	},
	translate: function(base) {
		linphone.ui.header.reloadLanguageList(base);
	},
	reloadLanguageList: function(base) {
		var list = base.find('> .header .language .list');
		list.empty();
		for(var i = 0; i < linphone.ui.locales.length; ++i) {
			var locale = linphone.ui.locales[i];
			var element = jQuery(linphone.ui.template('header.language.list.entry', {
				lang: locale.name,
				cls: (locale.locale === jQuery.i18n.locale) ? 'selected': ''
			}));
			element.data('data', locale);
			list.append(element);
		}
	}
};
