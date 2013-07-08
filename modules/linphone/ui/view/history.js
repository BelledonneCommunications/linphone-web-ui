/*globals jQuery,linphone*/

linphone.ui.view.history = {
	init: function(base) {
		linphone.ui.view.history.uiInit(base);
	},
	uiInit: function(base) {
		var history = base.find('> .content .view > .history');
		history.data('linphoneweb-view', linphone.ui.view.history);
		
		history.find('.actions .all').click(linphone.ui.exceptionHandler(base, function() {
			linphone.ui.view.history.filter.update(base, linphone.ui.view.history.filter.all);
		}));
		
		history.find('.actions .incoming').click(linphone.ui.exceptionHandler(base, function() {
			linphone.ui.view.history.filter.update(base, linphone.ui.view.history.filter.incoming);
		}));
		
		history.find('.actions .outgoing').click(linphone.ui.exceptionHandler(base, function() {
			linphone.ui.view.history.filter.update(base, linphone.ui.view.history.filter.outgoing);
		}));
		
		history.find('.actions .miss').click(linphone.ui.exceptionHandler(base, function() {
			linphone.ui.view.history.filter.update(base, linphone.ui.view.history.filter.miss);
		}));
		
		linphone.ui.view.history.filter.update(base, linphone.ui.view.history.filter.all);
		
		var configuration = linphone.ui.configuration(base);
		var data = configuration.models.history.list();
		var list = history.find('.list');
		
		for(var item in data) {
			list.append(data[item]);
		}
	},
	translate: function(base) {
		
	},
	
	/* */
	filter : {
		all: 0,
		incoming: 1,
		outgoing: 2,
		miss: 3,
		update: function(base, state) {
			var history = base.find('> .content .view > .history');
			history.find('.actions .all').removeClass('selected');
			history.find('.actions .incoming').removeClass('selected');
			history.find('.actions .outgoing').removeClass('selected');
			history.find('.actions .miss').removeClass('selected');
			switch(state) {
				case linphone.ui.view.history.filter.all:
					history.find('.actions .all').addClass('selected');
				break;
				case linphone.ui.view.history.filter.incoming:
					history.find('.actions .incoming').addClass('selected');
				break;
				case linphone.ui.view.history.filter.outgoing:
					history.find('.actions .outgoing').addClass('selected');
				break;
				case linphone.ui.view.history.filter.miss:
					history.find('.actions .miss').addClass('selected');
				break;
				default:
				linphone.ui.logger.error(base, 'Invalid linphone.ui.view.history.filter state');
			}
		}
	},
	
	/**/
	show: function(base) {
		linphone.ui.menu.show(base);
		base.find('> .content .view > .history .scroll-pane').each(function(){
			linphone.ui.slider(jQuery(this));
		});
	},
	hide: function(base) {
	}
};