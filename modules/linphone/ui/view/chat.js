/*!
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (c) 2013 Belledonne Communications
 All rights reserved.
 

 Authors:
 - Yann Diorcet <diorcet.yann@gmail.com>
 
 */

/*globals jQuery,linphone*/

linphone.ui.view.chat = {
	init: function(base) {
		linphone.ui.view.chat.uiInit(base);
	},
	uiInit: function(base) {
		base.find('> .content .view > .chat').data('linphoneweb-view', linphone.ui.view.chat);
		
		/* Samples */
		/*
		var list = base.find('> .content .view > .chat .list');
		list.append(linphone.ui.template(base, 'view.chat.list.entry.received', {
			img: 'style/img/avatar.jpg',
			date: "Jeudi 21 Septembre 2012 à 23h33m22s",
			message: 'aa',
			name: "Test"
		}));
		list.append(linphone.ui.template(base, 'view.chat.list.entry.sent', {
			img: 'style/img/avatar.jpg',
			date: "Jeudi 21 Septembre 2012 à 23h34m22s",
			message: 'bb',
			name: "Test2"
		}));
		list.append(linphone.ui.template(base, 'view.chat.list.entry.received', {
			img: 'style/img/avatar.jpg',
			date: "Jeudi 21 Septembre 2012 à 23h37m22s",
			message: 'cc',
			name: "Test3"
		}));
		list.append(linphone.ui.template(base, 'view.chat.list.entry.sent', {
			img: 'style/img/avatar.jpg',
			date: "Jeudi 21 Septembre 2012 à 23h39m22s",
			message: 'dd',
			name: "Test4"
		}));
		list.append(linphone.ui.template(base, 'view.chat.list.entry.sent', {
			img: 'style/img/avatar.jpg',
			date: "Jeudi 21 Septembre 2012 à 23h39m22s",
			message: 'dd',
			name: "Test5"
		}));
		*/
	},
	translate: function(base) {
		
	},
	
	/**/
	show: function(base, contact) {
		var chat = base.find('> .content .view > .chat');
		
		chat.find('.actions .scroll-pane').each(function(){
			linphone.ui.slider(jQuery(this));
		});
			
		base.on('messageReceived', linphone.ui.view.chat.onMessageReceived);
		linphone.ui.view.chat.update(base,contact);
	},
	
	update: function(base, contact) {
		var chat = base.find('> .content .view > .chat');
		var core = linphone.ui.getCore(base);
		var actions = chat.find(' .actions');
		var addr = linphone.ui.utils.formatAddress(base, contact);
		var chatRoom = core.getChatRoom(addr);
		
		linphone.ui.menu.update(base,chatRoom);	
		
		var sendMessage = function(base, contact) {
			return function(){		
				//TODO
			};
		};
			
		chat.data('contact',contact);		
		
		//actions.empty();	
		chat.find('.actions .sendChat').click(linphone.ui.exceptionHandler(base,sendMessage(base,contact)));
		//actions.append(linphone.ui.template(base, 'view.chat.actions', contact));
	},
	
	hide: function(base) {
		base.off('messageReceived', linphone.ui.view.chat.onMessageReceived);
	},
	
	onMessageReceived: function(event, room, message){		
		var base = jQuery(this);
		var chat = base.find('> .content .view > .chat');
		
		var contact = chat.data('contact');
		
		if(contact === message.fromAddress.asString()){
			//Display message received
		}
	},
	
	displaySendMessage: function(base,contact, message){
		var chat = base.find('> .content .view > .chat');
		var core = linphone.ui.getCore(base);
	},
	
	onMsgStateChanged: function(chatMsg, state) {
		//Message state
	}
};