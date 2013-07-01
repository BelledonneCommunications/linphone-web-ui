/*
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (C) 2012  Yann Diorcet <yann.diorcet@linphone.org>

 This program is free software; you can redistribute it and/or
 modify it under the terms of the GNU General Public License
 as published by the Free Software Foundation; either version 2
 of the License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program; if not, write to the Free Software
 Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
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
		Busy : 6
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
		default:
			return "?";
		}
	},
	
	status : {
          Offline : 0,
          Online : 1,
          Busy : 2,
          BeRightBack : 3,
          Away : 4,
          OnThePhone : 5,
          OutToLunch : 6,
          DoNotDisturb : 7,
          Moved : 8,
          AltService : 9,
          Pending : 10
	},
	getStatusText : function(value) {
		switch (value) {
		case linphone.core.enums.status.Offline:
			return "Offline";
		case linphone.core.enums.status.Online:
			return "Online";
		case linphone.core.enums.status.Busy:
			return "Busy";
		case linphone.core.enums.status.BeRightBack:
			return "BeRightBack";
		case linphone.core.enums.status.Away:
			return "Away";
		case linphone.core.enums.status.OnThePhone:
			return "OnThePhone";
		case linphone.core.enums.status.OutToLunch:
			return "OutToLunch";
		case linphone.core.enums.status.DoNotDisturb:
			return "DoNotDisturb";
		case linphone.core.enums.status.Moved:
			return "Moved";
		case linphone.core.enums.status.AltService:
			return "AltService";
		case linphone.core.enums.status.Pending:
			return "Pending";
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
