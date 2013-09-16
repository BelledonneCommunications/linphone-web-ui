/*!
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (c) 2013 Belledonne Communications
 All rights reserved.
 

 Authors:
 - Yann Diorcet <diorcet.yann@gmail.com>
 
 */

/*globals linphone*/

linphone.core.enums = {
	reason : {
		None : 0,
		NoResponse : 1,
		BadCredentials : 2,
		Declined : 3,
		NotFound : 4,
		NotAnswered : 5,
		Busy : 6,
		Media : 7,
		IOError : 8,
		DoNotDisturb : 9,
		Unauthorized : 10
	},
	getReasonText : function(value) {
		switch (value) {
		case linphone.core.enums.reason.None:
			return "None";
		case linphone.core.enums.reason.NoResponse:
			return "NoResponse";
		case linphone.core.enums.reason.BadCredentials:
			return "BadCredentials";
		case linphone.core.enums.reason.Declined:
			return "Declined";
		case linphone.core.enums.reason.NotFound:
			return "NotFound";
		case linphone.core.enums.reason.NotAnswered:
			return "NotAnswered";
		case linphone.core.enums.reason.Busy:
			return "Busy";
		case linphone.core.enums.reason.Media:
			return "Media";
		case linphone.core.enums.reason.IOError:
			return "IOError";
		case linphone.core.enums.reason.DoNotDisturb:
			return "DoNotDisturb";
		case linphone.core.enums.reason.Unauthorized:
			return "Unauthorized";
		default:
			return "?";
		}
	},

	subscribePolicy : {
		Wait : 0,
		Deny : 1,
		Accept : 2
	},
	getSubscribePolicyText : function(value) {
		switch (value) {
		case linphone.core.enums.subscribePolicy.Wait:
			return "Wait";
		case linphone.core.enums.subscribePolicy.Deny:
			return "Deny";
		case linphone.core.enums.subscribePolicy.Accept:
			return "Accept";
		default:
			return "?";
		}
	},

	presenceBasicStatus : {
		Open : 0,
		Closed : 1
	},
	getPresenceBasicStatus : function(value) {
		switch (value) {
		case linphone.core.enums.presenceBasicStatus.Open:
			return "Open";
		case linphone.core.enums.presenceBasicStatus.Closed:
			return "Closed";
		default:
			return "?";
		}
	},

	presenceActivityType : {
		Offline : 0,
		Online : 1,
		Appointment : 2,
		Away : 3,
		Breakfast : 4,
		Busy : 5,
		Dinner : 6,
		Holiday : 7,
		InTransit : 8,
		LookingForWork : 9,
		Lunch : 10,
		Meal : 11,
		Meeting : 12,
		OnThePhone : 13,
		Other : 14,
		Performance : 15,
		PermanentAbsence : 16,
		Playing : 17,
		Presentation : 18,
		Shopping : 19,
		Sleeping : 20,
		Spectator : 21,
		Steering : 22,
		Travel : 23,
		TV : 24,
		Unknown : 25,
		Vacation : 26,
		Working : 27,
		Worship : 28
	},
	getPresenceActivityType : function(value) {
		switch (value) {
		case linphone.core.enums.presenceActivityType.Offline:
			return "Offline";
		case linphone.core.enums.presenceActivityType.Online:
			return "Online";
		case linphone.core.enums.presenceActivityType.Appointment:
			return "Appointment";
		case linphone.core.enums.presenceActivityType.Away:
			return "Away";
		case linphone.core.enums.presenceActivityType.Breakfast:
			return "Breakfast";
		case linphone.core.enums.presenceActivityType.Busy:
			return "Busy";
		case linphone.core.enums.presenceActivityType.Dinner:
			return "Dinner";
		case linphone.core.enums.presenceActivityType.Holiday:
			return "Holiday";
		case linphone.core.enums.presenceActivityType.InTransit:
			return "InTransit";
		case linphone.core.enums.presenceActivityType.LookingForWork:
			return "LookingForWork";
		case linphone.core.enums.presenceActivityType.Lunch:
			return "Lunch";
		case linphone.core.enums.presenceActivityType.Meal:
			return "Meal";
		case linphone.core.enums.presenceActivityType.Meeting:
			return "Meeting";
		case linphone.core.enums.presenceActivityType.OnThePhone:
			return "OnThePhone";
		case linphone.core.enums.presenceActivityType.Other:
			return "Other";
		case linphone.core.enums.presenceActivityType.Performance:
			return "Performance";
		case linphone.core.enums.presenceActivityType.PermanentAbsence:
			return "PermanentAbsence";
		case linphone.core.enums.presenceActivityType.Playing:
			return "Playing";
		case linphone.core.enums.presenceActivityType.Presentation:
			return "Presentation";
		case linphone.core.enums.presenceActivityType.Shopping:
			return "Shopping";
		case linphone.core.enums.presenceActivityType.Sleeping:
			return "Sleeping";
		case linphone.core.enums.presenceActivityType.Spectator:
			return "Spectator";
		case linphone.core.enums.presenceActivityType.Steering:
			return "Steering";
		case linphone.core.enums.presenceActivityType.Travel:
			return "Travel";
		case linphone.core.enums.presenceActivityType.TV:
			return "TV";
		case linphone.core.enums.presenceActivityType.Unknown:
			return "Unknown";
		case linphone.core.enums.presenceActivityType.Vacation:
			return "Vacation";
		case linphone.core.enums.presenceActivityType.Working:
			return "Working";
		case linphone.core.enums.presenceActivityType.Worship:
			return "Worship";
		default:
			return "?";
		}
	},

	firewallPolicy : {
		NoFirewall : 0,
		UseNatAddress : 1,
		UseStun : 2,
		UseIce : 3,
		UseUpnp : 4
	},
	getFirewallPolicyText : function(value) {
		switch (value) {
		case linphone.core.enums.firewallPolicy.NoFirewall:
			return "NoFirewall";
		case linphone.core.enums.firewallPolicy.UseNatAddress:
			return "UseNatAddress";
		case linphone.core.enums.firewallPolicy.UseStun:
			return "UseStun";
		case linphone.core.enums.firewallPolicy.UseIce:
			return "UseIce";
		case linphone.core.enums.firewallPolicy.UseUpnp:
			return "UseUpnp";
		default:
			return "?";
		}
	},

	mediaEncryption : {
		None : 0,
		SRTP : 1,
		ZRTP : 2
	},
	getMediaEncryption : function(value) {
		switch (value) {
		case linphone.core.enums.mediaEncryption.None:
			return "None";
		case linphone.core.enums.mediaEncryption.SRTP:
			return "SRTP";
		case linphone.core.enums.mediaEncryption.ZRTP:
			return "ZRTP";
		default:
			return "?";
		}
	},

	registrationState : {
		None : 0,
		Progress : 1,
		Ok : 2,
		Cleared : 3,
		Failed : 4
	},
	getRegistrationStateText : function(value) {
		switch (value) {
		case linphone.core.enums.registrationState.None:
			return "None";
		case linphone.core.enums.registrationState.Progress:
			return "Progress";
		case linphone.core.enums.registrationState.Ok:
			return "Ok";
		case linphone.core.enums.registrationState.Cleared:
			return "Cleared";
		case linphone.core.enums.registrationState.Failed:
			return "Failed";
		default:
			return "?";
		}
	},

	globalState : {
		Off : 0,
		Startup : 1,
		On : 2,
		Shutdown : 3
	},
	getGlobalStateText : function(value) {
		switch (value) {
		case linphone.core.enums.globalState.Off:
			return "Off";
		case linphone.core.enums.globalState.Startup:
			return "Startup";
		case linphone.core.enums.globalState.On:
			return "On";
		case linphone.core.enums.globalState.Shutdown:
			return "Shutdown";
		default:
			return "?";
		}
	},

	callDir : {
		Outgoing: 0,
		Incoming: 1
	},
	getCallDirText : function(value) {
		switch (value) {
		case linphone.core.enums.callDir.Outgoing:
			return "Outgoing";
		case linphone.core.enums.callDir.Incoming:
			return "Incoming";
		default:
			return "?";
		}
	},

	callStatus : {
		Success: 0,
		Aborted: 1,
		Missed: 2,
		Declined: 3
	},
	getCallStatusText : function(value) {
		switch (value) {
		case linphone.core.enums.callStatus.Success:
			return "Success";
		case linphone.core.enums.callStatus.Aborted:
			return "Aborted";
		case linphone.core.enums.callStatus.Missed:
			return "Missed";
		case linphone.core.enums.callStatus.Declined:
			return "Declined";
		default:
			return "?";
		}
	},

	callState : {
		Idle : 0,
		IncomingReceived : 1,
		OutgoingInit : 2,
		OutgoingProgress : 3,
		OutgoingRinging : 4,
		OutgoingEarlyMedia : 5,
		Connected : 6,
		StreamsRunning : 7,
		Pausing : 8,
		Paused : 9,
		Resuming : 10,
		Refered : 11,
		Error : 12,
		End : 13,
		PausedByRemote : 14,
		UpdatedByRemote : 15,
		IncomingEarlyMedia : 16,
		Updated : 17,
		Released : 18
	},
	getCallStateText : function(value) {
		switch (value) {
		case linphone.core.enums.callState.Idle:
			return "Idle";
		case linphone.core.enums.callState.IncomingReceived:
			return "IncomingReceived";
		case linphone.core.enums.callState.OutgoingInit:
			return "OutgoingInit";
		case linphone.core.enums.callState.OutgoingProgress:
			return "OutgoingProgress";
		case linphone.core.enums.callState.OutgoingRinging:
			return "OutgoingRinging";
		case linphone.core.enums.callState.OutgoingEarlyMedia:
			return "OutgoingEarlyMedia";
		case linphone.core.enums.callState.Connected:
			return "Connected";
		case linphone.core.enums.callState.StreamsRunning:
			return "StreamsRunning";
		case linphone.core.enums.callState.Pausing:
			return "Pausing";
		case linphone.core.enums.callState.Paused:
			return "Paused";
		case linphone.core.enums.callState.Resuming:
			return "Resuming";
		case linphone.core.enums.callState.Refered:
			return "Refered";
		case linphone.core.enums.callState.Error:
			return "Error";
		case linphone.core.enums.callState.End:
			return "End";
		case linphone.core.enums.callState.PausedByRemote:
			return "PausedByRemote";
		case linphone.core.enums.callState.UpdatedByRemote:
			return "UpdatedByRemote";
		case linphone.core.enums.callState.IncomingEarlyMedia:
			return "IncomingEarlyMedia";
		case linphone.core.enums.callState.Updated:
			return "Updated";
		case linphone.core.enums.callState.Released:
			return "Released";
		default:
			return "?";
		}
	}
};
