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
	},
	translate: function(base) {
		
	},
	
	/**/
	show: function(base, room) {
		var chat = base.find('> .content .view > .chat');

        chat.find('> .content .view > .chat .scroll-pane').each(function(){
				linphone.ui.slider(jQuery(this));
		});
		
		var list = base.find('> .content .view > .chat .list');
		list.empty();	
		
		chat.find('.status').hide();
		base.on('messageReceived', linphone.ui.view.chat.onMessageReceived);
		base.on('isComposingReceived', linphone.ui.view.chat.isComposingReceived);
		linphone.ui.view.chat.update(base,room);
	},
	
	update: function(base, room) {
		var chat = base.find('> .content .view > .chat');
		var core = linphone.ui.getCore(base);
		var actions = chat.find(' .actions');
		actions.empty();
		
		var list = base.find('> .content .view > .chat .list');
		list.empty();	
		
		var contact = room.peerAddress.asStringUriOnly();
		base.find('> .content .menu').data('contact',contact);	
		linphone.ui.menu.show(base);
		
		
	
		var sendMessage = function(base, room) {
			return function(){		
				var core = linphone.ui.getCore(base);
				var chatMsg = chat.find('.messageToSend .textArea').val();
				var message = room.newMessage(chatMsg);
				linphone.ui.core.addEvent(message, "msgStateChanged", linphone.ui.view.chat.onMsgStateChanged);
				room.sendChatMessage(message);
				chat.find('.messageToSend .textArea').val('');
				linphone.ui.view.chat.displaySendMessage(base,room,message);
			};
		};
			
		chat.data('contact',room.peerAddress);		
	
		actions.append(linphone.ui.template(base, 'view.chat.actions', contact));
		var textArea = actions.find('.messageToSend .textArea');
		textArea.val('');
		textArea.focus(function() {
			//room.compose();
		});
		chat.find('.actions .sendChat').click(linphone.ui.exceptionHandler(base,sendMessage(base,room)));
	},
	
	hide: function(base) {
		base.off('messageReceived', linphone.ui.view.chat.onMessageReceived);
		base.off('isComposingReceived', linphone.ui.view.chat.isComposingReceived);
	},
	
	displaySendMessage: function(base,room, message){
		var chat = base.find('> .content .view > .chat');
		var core = linphone.ui.getCore(base);
		var list = base.find('> .content .view > .chat .list');
		var proxy = linphone.ui.utils.getMainProxyConfig(base);
		
		list.append(linphone.ui.template(base, 'view.chat.list.entry.sent', {
			img: 'style/img/avatar.jpg',
			date: linphone.ui.utils.getTimeFormat(message.time),
			message: message.text,
			name: linphone.ui.utils.getUsername(base, proxy.identity) + ":"
		}));
	},
	
	displayReceivedMessage: function(base,contact, message){
		var chat = base.find('> .content .view > .chat');
		var core = linphone.ui.getCore(base);
		var list = base.find('> .content .view > .chat .list');
		
		list.append(linphone.ui.template(base, 'view.chat.list.entry.received', {
			img: 'style/img/avatar.jpg',
			date: linphone.ui.utils.getTimeFormat(message.time),
			message: message.text,
			name: message.peerAddress.username + ":"
		}));
	},
	
	onMessageReceived: function(event, room, message){		
		var base = jQuery(this);
		var chat = base.find('> .content .view > .chat');	
		
		var contact = chat.data('contact');	
		if(contact.asString() === message.fromAddress.asString()){
			linphone.ui.view.chat.displayReceivedMessage(base,contact,message);	
		}
	},
	
	onMsgStateChanged: function(event, message, state) {
		//Message state
	},
	
	isComposingReceived: function(event, room) {
		var base = jQuery(this);
		var chat = base.find('> .content .view > .chat');
		var core = linphone.ui.getCore(base);
		var status = chat.find('.status');
		var contact = chat.data('contact');	
		
		if(room.remoteComposing && contact.asString() === room.peerAddress.asString()) {
			status.show();
		} else {
			status.hide();
		}	
	}
};