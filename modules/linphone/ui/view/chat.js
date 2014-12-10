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
		
		var list = base.find('> .content .view > .chat .list');
		list.append(linphone.ui.template(base, 'view.chat.list.entry.received', {
			img: 'style/img/avatar.jpg',
			date: "Jeudi 21 Septembre 2012 à 23h33m22s",
			message: 'Ut auctor nisl vel metus venenatis faucibus. Cras euismod egestas fringilla. Aliquam efficitur risus vestibulum nibh vulputate consequat. Mauris at tempus justo. Fusce quis tincidunt neque. Sed quis tincidunt ipsum. Nunc commodo elit non ante placerat ornare ut ac sem.',
			name: "Test"
		}));
		list.append(linphone.ui.template(base, 'view.chat.list.entry.sent', {
			img: 'style/img/avatar.jpg',
			date: "Jeudi 21 Septembre 2012 à 23h34m22s",
			message: 'Ut auctor nisl vel metus venenatis faucibus. Cras euismod egestas fringilla. Aliquam efficitur risus vestibulum nibh vulputate consequat. Mauris at tempus justo. Fusce quis tincidunt neque. Sed quis tincidunt ipsum. Nunc commodo elit non ante placerat ornare ut ac sem.Ut auctor nisl vel metus venenatis faucibus. Cras euismod egestas fringilla. Aliquam efficitur risus vestibulum nibh vulputate consequat. Mauris at tempus justo. Fusce quis tincidunt neque. Sed quis tincidunt ipsum. Nunc commodo elit non ante placerat ornare ut ac sem.',
			name: "Test2"
		}));
		list.append(linphone.ui.template(base, 'view.chat.list.entry.received', {
			img: 'style/img/avatar.jpg',
			date: "Jeudi 21 Septembre 2012 à 23h37m22s",
			message: 'Ut auctor nisl vel metus venenatis faucibus. Cras euismod egestas fringilla. Aliquam efficitur risus vestibulum nibh vulputate consequat. Mauris at tempus justo. Fusce quis tincidunt neque. Sed quis tincidunt ipsum. Nunc commodo elit non ante placerat ornare ut ac sem.',
			name: "Test3"
		}));
		list.append(linphone.ui.template(base, 'view.chat.list.entry.sent', {
			img: 'style/img/avatar.jpg',
			date: "Jeudi 21 Septembre 2012 à 23h39m22s",
			message: 'Ut auctor nisl vel metus venenatis faucibus. Cras euismod egestas fringilla. Aliquam efficitur risus vestibulum nibh vulputate consequat. Mauris at tempus justo. Fusce quis tincidunt neque. Sed quis tincidunt ipsum. Nunc commodo elit non ante placerat ornare ut ac sem.',
			name: "Test4"
		}));
		list.append(linphone.ui.template(base, 'view.chat.list.entry.sent', {
			img: 'style/img/avatar.jpg',
			date: "Jeudi 21 Septembre 2012 à 23h39m22s",
			message: 'dd',
			name: "Test5"
		}));
		
	},
	translate: function(base) {
		
	},
	
	/**/
	show: function(base, room) {
		var chat = base.find('> .content .view > .chat');
		
		chat.find('.actions .scroll-pane').each(function(){
			linphone.ui.slider(jQuery(this));
		});
			
		base.on('messageReceived', linphone.ui.view.chat.onMessageReceived);
		base.on('isComposingReceived', linphone.ui.view.chat.isComposingReceived);
		linphone.ui.view.chat.update(base,room);
	},
	
	update: function(base, room) {
		var chat = base.find('> .content .view > .chat');
		var core = linphone.ui.getCore(base);
		var actions = chat.find(' .actions');
		
		var contact = room.peerAddress.asStringUriOnly();

		base.find('> .content .menu').data('contact',contact);	
		linphone.ui.menu.show(base,room);	
		
		var sendMessage = function(base, room) {
			return function(){		
				//TODO
				var core = linphone.ui.getCore(base);
				var chatMsg;
				//var message = room.newMessage(chatMsg);
				//linphone.ui.core.addEvent(message, "msgStateChanged", linphone.ui.view.chat.onMsgStateChanged);
				//room.sendChatMessage(message);
				//linphone.ui.view.chat.displaySendMessage(base,room,message);
			};
		};
			
		chat.data('contact',room.peerAddress);		
		
		//actions.empty();		
		//actions.append(linphone.ui.template(base, 'view.chat.actions', contact));
		chat.find('.actions .sendChat').click(linphone.ui.exceptionHandler(base,sendMessage(base,room)));
	},
	
	hide: function(base) {
		base.off('messageReceived', linphone.ui.view.chat.onMessageReceived);
		base.off('isComposingReceived', linphone.ui.view.chat.onMessageReceived);
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
	
	onMsgStateChanged: function(event, message, state) {
		//Message state
	},
	
	isComposingReceived: function(event, room) {
		if(room.remoteComposing) {
			//TODO
			//console.log(room.peerAddress.username + " is composing");
		} else {
			//TODO
		}	
	}
};