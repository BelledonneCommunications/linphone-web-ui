/*!
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (c) 2013 Belledonne Communications
 All rights reserved.
 

 Authors:
 - Yann Diorcet <diorcet.yann@gmail.com>
 
 */

/*globals jQuery,linphone*/

linphone.ui.utils = {
	status: {
		online: {
			value: 1,
			cls: 'imageStatusOnline',
			i18n: 'Online'
		},
		busy: {
			value: 5,
			cls: 'imageStatusBusy',
			i18n: 'Busy'
		},
		away: {
			value: 3,
			cls: 'imageStatusAway',
			i18n: 'Away'
		},
		onThePhone: {
			value: 13,
			cls: 'imageStatusAway',
			i18n: 'OnThePhone'
		},
		offline: {
			value: 0,
			cls: 'imageStatusOffline',
			i18n: 'Offline'
		}
	},
	regex: {
		sip: {
			username: "([0-9a-zA-Z-_.!~*'()&=+$,;?/]+)",
			domain: "([0-9a-zA-Z.-]+)",
			complete: "([0-9a-zA-Z-_.!~*'()&=+$,;?/]+)@([0-9a-zA-Z.-]+)"
		}
	},
	formatToKey: function(text) {
		return text.toLowerCase().
				replace(/ /g, '_').
				replace(/\./g, '');
	},
	getChatStateImg: function(state) {
		var img = '';
		switch (state) {
			case linphone.ChatMessageState.Delivered:
				img = 'imageSendChat';
			break;
		case linphone.ChatMessageState.InProgress:
			img = 'imageInProgress';
			break;
		case linphone.ChatMessageState.NotDelivered:
			img = 'imageErrorMessage';
				break;
		}
		
		return img;
	},
	getChatSentFile: function(fileTransferInformation) {
		return jQuery.i18n.translate('content.view.chat.sent_file') + fileTransferInformation.name + " - " + linphone.ui.utils.formatFileSize(fileTransferInformation.size) + "";
	},
	getChatReceivedFile: function(fileTransferInformation) {
		return jQuery.i18n.translate('content.view.chat.received_file') + fileTransferInformation.name + " - " + linphone.ui.utils.formatFileSize(fileTransferInformation.size) +"";
	},
	getTimeFormat: function(timestamp) {
		var date = new Date(parseInt(timestamp, 10) * 1000);
		var values = [
			date.getFullYear(),
			date.getMonth() + 1,
			date.getDate(),
			date.getHours(),
			date.getMinutes(),
			date.getSeconds(),
			date.getMilliseconds(),
			date.getTimezoneOffset()
		];
		var getTimeZone = function(offset) {
			offset = - (offset/60);
			if(offset > 0) {
				offset = '+' + offset.toString();
			} else if(offset < 0) {
				offset = offset.toString();
			} else {
				offset = '';
			}
			return 'UTC' + offset;
		};
		function pad(number, length) {
			var str = '' + number;
			while (str.length < length) {
				str = '0' + str;
			}
			return str;
		}
		var format = jQuery.i18n.translate('global.stringFormat.time');
		format = format.replace(/yyyy/g, pad(values[0], 4));
		format = format.replace(/sss/g, pad(values[7], 3));
		format = format.replace(/MM/g, pad(values[1], 2));
		format = format.replace(/dd/g, pad(values[2], 2));
		format = format.replace(/HH/g, pad(values[3], 2));
		format = format.replace(/mm/g, pad(values[4], 2));
		format = format.replace(/Z/g, getTimeZone(values[6]));
		return format;
	},
	formatFileSize: function (bytes) {
		if (typeof bytes !== 'number') {
			if(typeof bytes === 'string'){
				bytes = parseInt(bytes,10);
			} else {
				return '';
			}         
		}
		if (bytes >= 1000000000) {
			return (bytes / 1000000000).toFixed(2) + ' GB';
		}
		if (bytes >= 1000000) {
			return (bytes / 1000000).toFixed(2) + ' MB';
		}
		return (bytes / 1000).toFixed(2) + ' KB';
    },
	getTime: function(base, timestamp) {
		var ret = jQuery.i18n.skeleton(jQuery.i18n.functionKey('linphone.ui.utils.getTimeFormat'), parseInt(timestamp, 10));
		return ret;
	},
	getDurationFormat: function(duration) {
		function pad(number, length) {
			var str = '' + number;
			while (str.length < length) {
				str = '0' + str;
			}
			return str;
		}
		var format = jQuery.i18n.translate('global.stringFormat.duration');
		var totalSeconds = parseInt(duration, 10);
		var seconds = totalSeconds%60;
		var totalMinutes = Math.floor(totalSeconds/60);
		var minutes = totalMinutes%60;
		var totalHours = Math.floor(totalMinutes/60);
		var hours = totalHours;
		
		// Hours
		if(hours !== 0) {
			format = format.replace(/\([^\(]*HH[^\)]*\)/g, function(string, offset) { return string.slice(1, -1); });
		} else {
			format = format.replace(/\([^\(]*HH[^\)]*\)/g, '');
		}
		format = format.replace(/HH/g, pad(hours, 2));
		
		// Minutes
		if(hours !==0 || minutes !== 0) {
			format = format.replace(/\([^\(]*mm[^\)]*\)/g, function(string, offset) { return string.slice(1, -1); });
		} else {
			format = format.replace(/\([^\(]*mm[^\)]*\)/g, '');
		}
		format = format.replace(/mm/g, pad(minutes, 2));
		
		// Seconds
		format = format.replace(/\([^\(]*ss[^\)]*\)/g, function(string, offset) { return string.slice(1, -1); });
		format = format.replace(/ss/g, pad(seconds, 2));
		return format;
	},
	getDuration: function(base, duration) {
		var ret = jQuery.i18n.skeleton(jQuery.i18n.functionKey('linphone.ui.utils.getDurationFormat'), parseInt(duration, 10));
		return ret;
	},
	formatAddress: function(base, uri) {
		var core = linphone.ui.getCore(base);
		return core.interpretUrl(uri);
	},
	getStatus: function(base, friend) {
		if(friend.subscribesEnabled){
			var presenceModel = friend.presenceModel;
			if(presenceModel !== null){
				for(var i in linphone.ui.utils.status) {
					var item = linphone.ui.utils.status[i];
					if(item.value === presenceModel.activity.type) {
						return item;
					}
				}
			}
		}
		return linphone.ui.utils.status.offline;
	},
	getChatRoom: function(base, object){
		var core = linphone.ui.getCore(base);
		var address;
		
		if(typeof object === 'string') {
			address = linphone.ui.utils.formatAddress(base, object);
		} else {
			address = object;
		}
		
		return core.getChatRoom(address);
	},
	getContact: function(base, object, callback) {
		var configuration = linphone.ui.configuration(base);
		var address;
		if(typeof object === 'string') {
			var core = linphone.ui.getCore(base);
			object = core.newAddress(object);
			address = object.asStringUriOnly();
		} else {
			address = object.asStringUriOnly();
		}
		if(address) {
			configuration.models.contacts.list('WHERE ("' + address + '" IN address)', function(error, data) {
				for(var item in data) {
					if(data[item].address.asStringUriOnly() === address){
						return callback(null,data[item]);
					} else {
						return callback("Not found", null);
					}
				}
				return callback("Not found", null);
			});
		}
		callback("Not found", null);
	},
	getContactName: function(base, contact) {
		if(contact) {
			return contact.name;
		}
		return null;
	},
	getUsername: function(base, object) {
		var address;
		if (typeof object === 'string') {
			var core = linphone.ui.getCore(base);
			address = core.newAddress(object);
		} else {
			address = object;
		}
		if(!address) {
			return String(object);
		}
		
		var displayName = address.displayName;
		if(displayName) {
			return displayName;
		}
		var username = address.username;
		if(username) {
			return username;
		}
		return 'Unknown';
	},
	getAddress: function(base, object, resolve) {
		var address;
		if(typeof resolve === 'undefined') {
			resolve = true;
		}
		if(typeof object === 'string') {
			var core = linphone.ui.getCore(base);
			address = core.newAddress(object);
		} else {
			address = object;
		}
		if(resolve) {
			var proxy = linphone.ui.utils.getMainProxyConfig(base);
			if(proxy) {
				if(proxy.domain === address.domain) {
					return address.username;
				}
			}
		}
		var uri = address.asStringUriOnly();
		if(uri) {
			return uri;
		}
		return 'Unknown';
	},
	getAvatar: function(base, object) {
		return 'style/img/avatar.jpg';
	},
	getMainProxyConfig: function(base) {
		var proxy = null;
		if(linphone.ui.core.isRunning(base)) {
			var core = linphone.ui.getCore(base);
			proxy = core.defaultProxy;
		}
		return proxy;
	},
	acceptUpdate: function(base,call,enableVideo){
		var core = linphone.ui.getCore(base);
		var currentParams = call.currentParams;
		if(enableVideo === true){
			currentParams.videoEnabled = true;
		} else {
			currentParams.videoEnabled = false;
		}
		core.acceptCallUpdate(call,currentParams);
	},
	call: function(base, object, success, failure) {
		var address;
		if (typeof object === 'string') {
			address = linphone.ui.utils.formatAddress(base, object);
		} else {
			address = object;
		}
		
		if(address) {
			var core = linphone.ui.getCore(base);
			core.inviteAddress(address);
			linphone.ui.logger.log(base, "Call: " + address.asString());
			if(typeof success !== 'undefined') {
				success();
			}
		} else {
			if(typeof failure !== 'undefined') {
				failure();
			}
		}
	},
	setCookie: function(nom, valeur, expire, chemin, domaine, securite){
		document.cookie = nom + ' = ' + valeur + '  ' +
			((expire === undefined) ? '' : ('; expires = ' + expire.toGMTString())) +
			((chemin === undefined) ? '' : ('; path = ' + chemin)) +
			((domaine === undefined) ? '' : ('; domain = ' + domaine)) +
			((securite === true) ? '; secure' : '');
	},
	readCookie: function(name){
		if(document.cookie.length === 0){
			return null;
		}
			
		var regSepCookie = new RegExp('(; )', 'g');
		var cookies = document.cookie.split(regSepCookie);
		
		for(var i = 0; i < cookies.length; i++){
			var regInfo = new RegExp('=', 'g');
			var infos = cookies[i].split(regInfo);
			if(infos[0] === name){
				return infos[1];
			}
		}
		return null;	
	}
};
