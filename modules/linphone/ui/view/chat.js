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
		
		chat.find('.status').hide();
	
		//Add callbacks on chatroom
		base.on('messageReceived', linphone.ui.view.chat.onMessageReceived);
		base.on('isComposingReceived', linphone.ui.view.chat.isComposingReceived);
		
		linphone.ui.view.chat.update(base,room);
	},
	
	update: function(base, room) {
		var core = linphone.ui.getCore(base);
		
		var chat = base.find('> .content .view > .chat');		
		var actions = chat.find(' .actions');
		var list = base.find('> .content .view > .chat .list');
		
		actions.empty();
		list.empty();	

		//Display chat history		
		linphone.ui.view.chat.displayHistory(base, room);
		room.markAsRead();
		
		chat.data('contact',room.peerAddress);	
		base.find('> .content .menu').data('contact',room.peerAddress.asStringUriOnly());	
		linphone.ui.menu.show(base);
		
		var sendMessage = function(base, room) {
			return function(){		
				linphone.ui.view.chat.sendChatMessage(base,room);
			};
		};

		actions.append(linphone.ui.template(base, 'view.chat.actions', room.peerAddress));
		
		//Init text area
		var textArea = actions.find('.messageToSend .textArea');
		textArea.val('');
		textArea.focus();
		textArea.focus(function() {
			//room.compose();
		});
		
		chat.find('.actions .sendChat').click(linphone.ui.exceptionHandler(base,sendMessage(base,room)));
	},
	
	hide: function(base) {
		base.off('messageReceived', linphone.ui.view.chat.onMessageReceived);
		base.off('isComposingReceived', linphone.ui.view.chat.isComposingReceived);
	},
	
	sendChatMessage: function(base,room){
		var chat = base.find('> .content .view > .chat');
		var core = linphone.ui.getCore(base);
		var textArea = chat.find('.messageToSend .textArea');
		var chatMsg = textArea.val();
		if(chatMsg !== ''){
			var message = room.newMessage(chatMsg);	
			linphone.ui.core.addEvent(message, "msgStateChanged", linphone.ui.view.chat.onMsgStateChanged);
			room.sendChatMessage(message);
			linphone.ui.view.chat.displaySendMessage(base,room,message);
			
			//Reinit textArea
			textArea.val('');
			textArea.focus();
		}
	},
	
	displayHistory: function(base, room){
		var chats = room.getHistoryRange(0,-1);
		
		for(var i = 0; i < chats.length; ++i) {
			var chat = chats[i];
			if(chat.outgoing){
				linphone.ui.view.chat.displaySendMessage(base, room, chat);
			} else {
				linphone.ui.view.chat.displayReceivedMessage(base, room, chat);
			}
		}	
		linphone.ui.view.chat.scrollDown(base);
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
		
		linphone.ui.view.chat.scrollDown(base);
	},
	
	displayReceivedMessage: function(base,room, message){
		var chat = base.find('> .content .view > .chat');
		var core = linphone.ui.getCore(base);
		var list = base.find('> .content .view > .chat .list');
		
		list.append(linphone.ui.template(base, 'view.chat.list.entry.received', {
			img: 'style/img/avatar.jpg',
			date: linphone.ui.utils.getTimeFormat(message.time),
			message: message.text,
			name: message.peerAddress.username + ":"
		}));

		linphone.ui.view.chat.scrollDown(base);
	},
	
	scrollDown: function(base){
		var list = base.find('> .content .view > .chat .scroll-pane');
		
		var child = list.children();
		var heightTot = 0;
		for(var i =0; i < child.length; i++){
			heightTot += child[i].scrollHeight;
		}

		list.scrollTop(heightTot);
	},
	
	onMessageReceived: function(event, room, message){		
		var base = jQuery(this);
		var chat = base.find('> .content .view > .chat');	
		
		var contact = chat.data('contact');	
		if(contact.asString() === message.fromAddress.asString()){
			linphone.ui.view.chat.displayReceivedMessage(base,room,message);	
		}
	},
	
	onMsgStateChanged: function(event, message, state) {
		//Message state
	},
	
	isComposingReceived: function(event, room){	
		var base = jQuery(this);
		var core = linphone.ui.getCore(base);
		var chat = base.find('> .content .view > .chat');
		
		var status = chat.find('.status');
		var contact = chat.data('contact');	
		
		if(room.remoteComposing && contact.asString() === room.peerAddress.asString()) {
			status.show();
		} else {
			status.hide();
		}	
	}
};