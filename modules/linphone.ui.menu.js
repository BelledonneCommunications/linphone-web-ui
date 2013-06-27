/*globals jQuery,linphone*/

linphone.ui.menu = {
	init: function(base) {
		linphone.ui.menu.uiInit(base);
	},
	uiInit: function(base) {
		linphone.ui.menu.hide(base);
		
		base.find('> .content .menu nav li li').mouseover(linphone.ui.exceptionHandler(base, function() {
			jQuery(this).append('<span class="closeContact"></span>');
		}));
		
		base.find('> .content .menu nav li li').mouseleave(linphone.ui.exceptionHandler(base, function() {
			jQuery(this).find('.closeContact').remove();
		}));
		
		base.find('> .content .menu .goHistory').click(linphone.ui.exceptionHandler(base, function() {
			linphone.ui.view.show(base, 'history');
			base.find('.scroll-pane').each(function(){
				linphone.ui.slider(jQuery(this));
			});
		}));
		
		base.find('> .content .menu .goChat').click(linphone.ui.exceptionHandler(base, function() {
			linphone.ui.view.show(base, 'chat');
			base.find('.scroll-pane').each(function(){
				linphone.ui.slider(jQuery(this));
			});
		}));
		
		base.find('> .content .menu nav li a').click(linphone.ui.exceptionHandler(base, function() {
			base.find('> .content .view > div').hide();
		}));
		
		base.find('> .content .menu .goContacts').click(linphone.ui.exceptionHandler(base, function() {
			linphone.ui.view.show(base, 'contacts');
			base.find('.scroll-pane').each(function(){
				linphone.ui.slider(jQuery(this));
			});
		}));
	},
	translate: function(base) {
		
	},
	show: function(base) {
		base.find('> .content .menu').show();
		base.find('> .content .menu .scroll-pane').each(function(){
			linphone.ui.slider(jQuery(this));
		});
	},
	hide: function(base) {
		base.find('> .content .menu').hide();
	}
};