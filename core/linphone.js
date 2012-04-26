jQuery.linphone = {}

jQuery.linphone.locales = [ {
	name : 'English(US)',
	locale : 'en_US',
	icon : 'css/images/flags/us.png'
}, {
	name : 'Français',
	locale : 'fr_FR',
	icon : 'css/images/flags/fr.png'
}, {
	name : 'Deutsche',
	locale : 'de_DE',
	icon : 'css/images/flags/de.png'
}, {
	name : 'Italiano',
	locale : 'it_IT',
	icon : 'css/images/flags/it.png'
} ]

var LinphoneRegistrationState = {
	None : 0,
	Progress : 1,
	Ok : 2,	
	Cleared : 3,
	Failed : 4,
}

var LinphoneRegistrationStateText = new Array();
LinphoneRegistrationStateText[LinphoneRegistrationState.None] = "None"
LinphoneRegistrationStateText[LinphoneRegistrationState.Progress] = "Progress"
LinphoneRegistrationStateText[LinphoneRegistrationState.Ok] = "Ok"
LinphoneRegistrationStateText[LinphoneRegistrationState.Cleared] = "Cleared"
LinphoneRegistrationStateText[LinphoneRegistrationState.Failed] = "Failed"
	
var LinphoneGlobalState = {
	Off : 0,
	Startup : 1,
	On : 2,
	Shutdown : 3,
}

var LinphoneGlobalStateText = new Array();
LinphoneGlobalStateText[LinphoneGlobalState.Off] = "Off"
LinphoneGlobalStateText[LinphoneGlobalState.Startup] = "Startup"
LinphoneGlobalStateText[LinphoneGlobalState.On] = "On"
LinphoneGlobalStateText[LinphoneGlobalState.Shutdown] = "Shutdown"

var LinphoneCallState = {
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
	Released : 18,
}

var LinphoneCallStateText = new Array();
LinphoneCallStateText[LinphoneCallState.Idle] = "Idle"
LinphoneCallStateText[LinphoneCallState.IncomingReceived] = "IncomingReceived"
LinphoneCallStateText[LinphoneCallState.OutgoingInit] = "OutgoingInit"
LinphoneCallStateText[LinphoneCallState.OutgoingProgress] = "OutgoingProgress"
LinphoneCallStateText[LinphoneCallState.OutgoingRinging] = "OutgoingRinging"
LinphoneCallStateText[LinphoneCallState.OutgoingEarlyMedia] = "OutgoingEarlyMedia"
LinphoneCallStateText[LinphoneCallState.Connected] = "Connected"
LinphoneCallStateText[LinphoneCallState.StreamsRunning] = "StreamsRunning"
LinphoneCallStateText[LinphoneCallState.Pausing] = "Pausing"
LinphoneCallStateText[LinphoneCallState.Paused] = "Paused"
LinphoneCallStateText[LinphoneCallState.Resuming] = "Resuming"
LinphoneCallStateText[LinphoneCallState.Refered] = "Refered"
LinphoneCallStateText[LinphoneCallState.Error] = "Error"
LinphoneCallStateText[LinphoneCallState.End] = "End"
LinphoneCallStateText[LinphoneCallState.PausedByRemote] = "PausedByRemote"
LinphoneCallStateText[LinphoneCallState.UpdatedByRemote] = "UpdatedByRemote"
LinphoneCallStateText[LinphoneCallState.IncomingEarlyMedia] = "IncomingEarlyMedia"
LinphoneCallStateText[LinphoneCallState.Updated] = "Updated"
LinphoneCallStateText[LinphoneCallState.Released] = "Released"