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
			linphone.ui.view.history.update(base);
		}));
		
		history.find('.actions .incoming').click(linphone.ui.exceptionHandler(base, function() {
			linphone.ui.view.history.filter.update(base, linphone.ui.view.history.filter.incoming);
			linphone.ui.view.history.update(base);
		}));
		
		history.find('.actions .outgoing').click(linphone.ui.exceptionHandler(base, function() {
			linphone.ui.view.history.filter.update(base, linphone.ui.view.history.filter.outgoing);
			linphone.ui.view.history.update(base);
		}));
		
		history.find('.actions .miss').click(linphone.ui.exceptionHandler(base, function() {
			linphone.ui.view.history.filter.update(base, linphone.ui.view.history.filter.miss);
			linphone.ui.view.history.update(base);
		}));
		
		linphone.ui.view.history.filter.update(base, linphone.ui.view.history.filter.all);
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
		},
		getState: function(base) {
			var history = base.find('> .content .view > .history');
			if(history.find('.actions .all').hasClass('selected')) {
				return linphone.ui.view.history.filter.all;
			}
			if(history.find('.actions .incoming').hasClass('selected')) {
				return linphone.ui.view.history.filter.incoming;
			}
			if(history.find('.actions .outgoing').hasClass('selected')) {
				return linphone.ui.view.history.filter.outgoing;
			}
			if(history.find('.actions .miss').hasClass('selected')) {
				return linphone.ui.view.history.filter.miss;
			}
		},
		getFilter: function(base, state) {
			if(typeof state === 'undefined') {
				state = linphone.ui.view.history.filter.getState(base);
			}
			var ret = '';
			switch(state) {
				case linphone.ui.view.history.filter.all:
				break;
				case linphone.ui.view.history.filter.incoming:
					ret = 'direction = ' + linphone.core.enums.callDir.Incoming.toString();
				break;
				case linphone.ui.view.history.filter.outgoing:
					ret = 'direction = ' + linphone.core.enums.callDir.Outgoing.toString();
				break;
				case linphone.ui.view.history.filter.miss:
					ret = 'status = ' + linphone.core.enums.callStatus.Missed.toString();
				break;
				default:
				linphone.ui.logger.error(base, 'Invalid linphone.ui.view.history.filter state');
			}
			return ret;
		}
	},
	
	/**/
	show: function(base) {
		linphone.ui.menu.show(base);
		linphone.ui.view.history.update(base);
	},
	hide: function(base) {
	},
	
	
	update: function(base) {
		var history = base.find('> .content .view > .history');
		var configuration = linphone.ui.configuration(base);
		var filter = linphone.ui.view.history.filter.getFilter(base);
		var data = configuration.models.history.list(filter);
		var list = history.find('.list');
		list.empty();
		
		for(var item in data) {
			var obj = configuration.models.history.read(data[item]);
			var elem = linphone.ui.template(base, 'view.history.list.entry', obj);
			jQuery.i18n.update(elem);
			list.append(elem);
		}
		
		base.find('> .content .view > .history .scroll-pane').each(function(){
			linphone.ui.slider(jQuery(this));
		});
		
		if(linphone.ui.configuration(base).disableChat) {
			base.find('> .content .view > .history .entryActions .chat').hide();
		}
	},
	
	utils: {
		getCallDirection: function(base, direction) {
			var statusTxt = linphone.core.enums.getCallDirText(direction).toLowerCase();
			var ret = jQuery.i18n.skeleton('global.unknown');
			if(statusTxt !== '?') {
				ret = jQuery.i18n.skeleton('content.view.history.direction.values.' + statusTxt);
			}
			return ret;
		},
		getCallStatus: function(base, status) {
			var statusTxt = linphone.core.enums.getCallStatusText(status).toLowerCase();
			var ret = jQuery.i18n.skeleton('global.unknown');
			if(statusTxt !== '?') {
				ret = jQuery.i18n.skeleton('content.view.history.status.values.' + statusTxt);
			}
			return ret;
		}
	}
};