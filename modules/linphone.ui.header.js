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
		
		base.find('> .header .navigation .settings').click(linphone.ui.exceptionHandler(base, function(event){
			if(jQuery(this).hasClass('disabled')) {
				return;
			}
			linphone.ui.view.show(base, 'settings');
		}));
		
		base.find('> .header .navigation .about').click(linphone.ui.exceptionHandler(base, function(event){
			linphone.ui.view.show(base, 'about');
		}));
		
		base.find('> .header .language .list').click(linphone.ui.exceptionHandler(base, function(event) {
			var target = jQuery(event.target ? event.target : event.srcElement);
			if (target.isOrParent('.linphoneweb > .header .language .list > li')) {
				var locale = target.data('data');
				linphone.ui.locale.change(base, locale);
			}
		}));
	},
	translate: function(base) {
		linphone.ui.header.reloadLanguageList(base);
	},
	reloadLanguageList: function(base) {
		var list = base.find('> .header .language .list');
		list.empty();
		var locales = linphone.ui.configuration(base).locales;
		for(var i = 0; i < locales.length; ++i) {
			var locale = locales[i];
			var element = jQuery(linphone.ui.template(base, 'header.language.list.entry', {
				lang: locale.name,
				cls: (locale.locale === jQuery.i18n.locale) ? 'selected': ''
			}));
			element.data('data', locale);
			list.append(element);
		}
	}
};
