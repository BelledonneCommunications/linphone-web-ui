/*!
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (c) 2013 Belledonne Communications
 All rights reserved.
 

 Authors:
 - Yann Diorcet <diorcet.yann@gmail.com>
 
 */

/*globals jQuery,linphone*/

linphone.ui.view.history = {
	init: function(base) {
		linphone.ui.view.history.uiInit(base);
	},
	uiInit: function(base) {
		var history = base.find('> .content .view > .history');
		history.data('linphoneweb-view', linphone.ui.view.history);
		
		history.find('> .actions > .filters > .all').click(linphone.ui.exceptionHandler(base, function() {
			linphone.ui.view.history.filter.update(base, linphone.ui.view.history.filter.all);
			linphone.ui.view.history.update(base);
		}));
		
		history.find('> .actions > .filters > .incoming').click(linphone.ui.exceptionHandler(base, function() {
			linphone.ui.view.history.filter.update(base, linphone.ui.view.history.filter.incoming);
			linphone.ui.view.history.update(base);
		}));
		
		history.find('> .actions > .filters > .outgoing').click(linphone.ui.exceptionHandler(base, function() {
			linphone.ui.view.history.filter.update(base, linphone.ui.view.history.filter.outgoing);
			linphone.ui.view.history.update(base);
		}));
		
		history.find('> .actions > .filters > .miss').click(linphone.ui.exceptionHandler(base, function() {
			linphone.ui.view.history.filter.update(base, linphone.ui.view.history.filter.miss);
			linphone.ui.view.history.update(base);
		}));
		
		history.find('> .actions .modify').click(linphone.ui.exceptionHandler(base, function() {
			linphone.ui.view.history.enterEdition(base);
		}));
		history.find('> .actions .modify').show();
		
		history.find('> .actions .see').click(linphone.ui.exceptionHandler(base, function() {
			linphone.ui.view.history.exitEdition(base);
		}));
		history.find('> .actions .see').hide();
		
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
					ret = 'WHERE (direction = ' + linphone.CallDir.Incoming + ')';
				break;
				case linphone.ui.view.history.filter.outgoing:
					ret = 'WHERE (direction = ' + linphone.CallDir.Outgoing + ')';
				break;
				case linphone.ui.view.history.filter.miss:
					ret = 'WHERE (status = ' + linphone.CallStatus.Missed + ')';
				break;
				default:
				linphone.ui.logger.error(base, 'Invalid linphone.ui.view.history.filter state');
			}
			return ret + ' ORDER BY date DESC';
		}
	},
	
	enterEdition: function(base) {
		if(!linphone.ui.view.history.isEditing(base)) {
			var history = base.find('> .content .view > .history');
			history.find('> .actions .modify').hide();
			history.find('> .actions .see').show();
			linphone.ui.view.history.update(base);
		}
	},
	
	exitEdition: function(base) {
		if(linphone.ui.view.history.isEditing(base)) {
			var history = base.find('> .content .view > .history');
			history.find('> .actions .modify').show();
			history.find('> .actions .see').hide();
			linphone.ui.view.history.update(base);
		}
	},
	
	isEditing: function(base) {
		var history = base.find('> .content .view > .history');
		return !history.find('> .actions .modify').is(':visible');
	},
	
	/**/
	show: function(base) {
		linphone.ui.menu.show(base);
		linphone.ui.view.history.update(base);
		var history = base.find('> .content .view > .history');
		var fct = function() {
			linphone.ui.view.history.update(base);
		};
		history.data('engineOnUpdate', fct);
		var historyModel = linphone.ui.configuration(base).models.history;
		historyModel.onUpdate.add(fct);
	},
	hide: function(base) {
		var history = base.find('> .content .view > .history');
		linphone.ui.view.history.exitEdition(base);
		var fct = history.data('engineOnUpdate');
		if(fct) {
			var historyModel = linphone.ui.configuration(base).models.history;
			historyModel.onUpdate.remove(fct);
		}
	},
	
	update: function(base) {
		linphone.ui.logger.log(base, 'History update');
		
		var history = base.find('> .content .view > .history');
		var configuration = linphone.ui.configuration(base);
		var filter = linphone.ui.view.history.filter.getFilter(base);
		
		configuration.models.history.list(filter, function(error, data) {
			var list = history.find('.list');
			list.empty();
			
			var edit = linphone.ui.view.history.isEditing(base);
			
			var callWrapper = function(obj) {
				return function() {
					linphone.ui.utils.call(base, obj.remote);
				};
			};
			
			var removeWrapper = function(obj) {
				return function() {
					configuration.models.history.remove(obj.id);
				};
			};
			
			var updateName = function(error, contact) {
				if(contact) {
					var name = linphone.ui.utils.getContactName(base, contact);
					elem.find('.contact .name').text(name);
				}
			};
			
			for(var item in data) {
				var obj = data[item];
				var elem = linphone.ui.template(base, 'view.history.list.entry', obj);
				jQuery.i18n.update(elem);
				elem.find('.actions .call').click(linphone.ui.exceptionHandler(base, callWrapper(obj)));
				elem.find('.actions .remove').click(linphone.ui.exceptionHandler(base, removeWrapper(obj)));
				if(edit) {
					elem.find('.actions .remove').css('display','inline-block');
				} else {
					elem.find('.actions .remove').hide();
				}
				linphone.ui.utils.getContact(base, obj.remote, updateName);
				list.append(elem);
			}
			
			base.find('> .content .view > .history .scroll-pane').each(function(){
				linphone.ui.slider(jQuery(this));
			});
			
			if(linphone.ui.configuration(base).disableChat) {
				base.find('> .content .view > .history .entry .actions .chat').hide();
			}
		});
	},
	
	utils: {
		getCallDirection: function(base, direction) {
			var statusTxt = linphone.getCallDirText(direction).toLowerCase();
			var ret = jQuery.i18n.skeleton('global.unknown');
			if(statusTxt !== '?') {
				ret = jQuery.i18n.skeleton('content.view.history.direction.values.' + statusTxt);
			}
			return ret;
		},
		getCallStatus: function(base, status) {
			var statusTxt = linphone.getCallStatusText(status).toLowerCase();
			var ret = jQuery.i18n.skeleton('global.unknown');
			if(statusTxt !== '?') {
				ret = jQuery.i18n.skeleton('content.view.history.status.values.' + statusTxt);
			}
			return ret;
		}
	}
};