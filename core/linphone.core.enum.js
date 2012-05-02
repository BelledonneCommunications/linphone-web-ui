linphone.core.enum = {

	registrationState : {
		None : 0,
		Progress : 1,
		Ok : 2,
		Cleared : 3,
		Failed : 4
	},
	getRegistrationStateText : function(value) {
		switch (value) {
		case linphone.core.enum.registrationState.None:
			return "None";
			break;
		case linphone.core.enum.registrationState.Progress:
			return "Progress";
			break;
		case linphone.core.enum.registrationState.Ok:
			return "Ok";
			break;
		case linphone.core.enum.registrationState.Cleared:
			return "Cleared";
			break;
		case linphone.core.enum.registrationState.Failed:
			return "Failed";
			break;
		default:
			return "?"
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
		case linphone.core.enum.globalState.Off:
			return "Off";
			break;
		case linphone.core.enum.globalState.Startup:
			return "Startup";
			break;
		case linphone.core.enum.globalState.On:
			return "On";
			break;
		case linphone.core.enum.globalState.Shutdown:
			return "Shutdown";
			break;
		default:
			return "?"
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
		case linphone.core.enum.callState.Idle:
			return "Idle";
			break;
		case linphone.core.enum.callState.IncomingReceived:
			return "IncomingReceived";
			break;
		case linphone.core.enum.callState.OutgoingInit:
			return "OutgoingInit";
			break;
		case linphone.core.enum.callState.OutgoingProgress:
			return "OutgoingProgress";
			break;
		case linphone.core.enum.callState.OutgoingRinging:
			return "OutgoingRinging";
			break;
		case linphone.core.enum.callState.OutgoingEarlyMedia:
			return "OutgoingEarlyMedia";
			break;
		case linphone.core.enum.callState.Connected:
			return "Connected";
			break;
		case linphone.core.enum.callState.StreamsRunning:
			return "StreamsRunning";
			break;
		case linphone.core.enum.callState.Pausing:
			return "Pausing";
			break;
		case linphone.core.enum.callState.Paused:
			return "Paused";
			break;
		case linphone.core.enum.callState.Resuming:
			return "Resuming";
			break;
		case linphone.core.enum.callState.Refered:
			return "Refered";
			break;
		case linphone.core.enum.callState.Error:
			return "Error";
			break;
		case linphone.core.enum.callState.End:
			return "End";
			break;
		case linphone.core.enum.callState.PausedByRemote:
			return "PausedByRemote";
			break;
		case linphone.core.enum.callState.UpdatedByRemote:
			return "UpdatedByRemote";
			break;
		case linphone.core.enum.callState.IncomingEarlyMedia:
			return "IncomingEarlyMedia";
			break;
		case linphone.core.enum.callState.Updated:
			return "Updated";
			break;
		case linphone.core.enum.callState.Released:
			return "Released";
			break;
		default:
			return "?"
		}
	}
}