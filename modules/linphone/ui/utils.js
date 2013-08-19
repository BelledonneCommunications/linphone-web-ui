/*globals jQuery,linphone*/

linphone.ui.utils = {
	status: {
		online: {
			value: linphone.core.enums.status.Online,
			cls: 'imageStatusOnline',
			i18n: 'online'
		},
		busy: {
			value: linphone.core.enums.status.Busy,
			cls: 'imageStatusBusy',
			i18n: 'busy'
		},
		onThePhone: {
			value: linphone.core.enums.status.OnThePhone,
			cls: 'imageStatusBusy',
			i18n: 'onThePhone'
		},
		doNotDisturb: {
			value: linphone.core.enums.status.DoNotDisturb,
			cls: 'imageStatusBusy',
			i18n: 'doNotDisturb'
		},
		beRightBack: {
			value: linphone.core.enums.status.BeRightBack,
			cls: 'imageStatusAway',
			i18n: 'beRightBack'
		},
		away: {
			value: linphone.core.enums.status.Away,
			cls: 'imageStatusAway',
			i18n: 'away'
		},
		outToLunch: {
			value: linphone.core.enums.status.OutToLunch,
			cls: 'imageStatusAway',
			i18n: 'outToLunch'
		},
		offline: {
			value: linphone.core.enums.status.Offline,
			cls: 'imageStatusOffline',
			i18n: 'offline'
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
	getTimeFormat: function(timestamp) {
		var date = new Date(parseInt(timestamp, 10) * 1000);
		var values = [
			date.getFullYear(),
			date.getMonth(),
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
		format = format.replace(/ss/g, pad(values[5], 2));
		format = format.replace(/Z/g, getTimeZone(values[6]));
		return format;
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
	getStatus: function(base, object, field) {
		var status = linphone.ui.utils.status.online;
		if(typeof field === 'undefined') {
			return status;
		}
		return status[field];
	},
	getContact: function(base, object) {
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
			var data = configuration.models.contacts.list('WHERE ("' + address + '" IN address)');
			for(var item in data) {
				return data[item];
			}
		}
		return null;
	},
	getContactName: function(base, contact) {
		if(contact) {
			return contact.firstname + ' ' + contact.lastname;
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
		return 'style/img/avatar.png';
	},
	getMainProxyConfig: function(base) {
		var proxy = null;
		if(linphone.ui.core.isRunning(base)) {
			var core = linphone.ui.getCore(base);
			proxy = core.defaultProxy;
		}
		return proxy;
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
			core.inviteAddress_async(address);
			linphone.ui.logger.log(base, "Call: " + address.asString());
			if(typeof success !== 'undefined') {
				success();
			}
		} else {
			if(typeof failure !== 'undefined') {
				failure();
			}
		}
	}
};