/*globals linphone*/
linphone.ChatMessageState = {
	/**
	 * Initial state 
	*/
	Idle : 0,
	/**
	 * Delivery in progress 
	*/
	InProgress : 1,
	/**
	 * Message succesffully delivered an acknoleged by remote end point 
	*/
	Delivered : 2,
	/**
	 * Message was not delivered 
	*/
	NotDelivered : 3,
	/**
	 * Message was received(and acknowledged) but cannot get file from server 
	*/
	FileTransferError : 4
};
linphone.getChatMessageStateText = function(value) {
	switch (value) {
	case linphone.ChatMessageState.Idle:
		return "Idle";
	case linphone.ChatMessageState.InProgress:
		return "InProgress";
	case linphone.ChatMessageState.Delivered:
		return "Delivered";
	case linphone.ChatMessageState.NotDelivered:
		return "NotDelivered";
	case linphone.ChatMessageState.FileTransferError:
		return "FileTransferError";
	default:
		return "?";
	}
};

linphone.SubscriptionDir = {
	/**
	 * Incoming subscription. 
	*/
	Incoming : 0,
	/**
	 * Outgoing subscription. 
	*/
	Outgoing : 1,
	/**
	 * Invalid subscription direction. 
	*/
	InvalidDir : 2
};
linphone.getSubscriptionDirText = function(value) {
	switch (value) {
	case linphone.SubscriptionDir.Incoming:
		return "Incoming";
	case linphone.SubscriptionDir.Outgoing:
		return "Outgoing";
	case linphone.SubscriptionDir.InvalidDir:
		return "InvalidDir";
	default:
		return "?";
	}
};

linphone.MediaEncryption = {
	/**
	 * No media encryption is used 
	*/
	None : 0,
	/**
	 * Use SRTP media encryption 
	*/
	SRTP : 1,
	/**
	 * Use ZRTP media encryption 
	*/
	ZRTP : 2
};
linphone.getMediaEncryptionText = function(value) {
	switch (value) {
	case linphone.MediaEncryption.None:
		return "None";
	case linphone.MediaEncryption.SRTP:
		return "SRTP";
	case linphone.MediaEncryption.ZRTP:
		return "ZRTP";
	default:
		return "?";
	}
};

linphone.CallState = {
	/**
	 * Initial call state 
	*/
	Idle : 0,
	/**
	 * This is a new incoming call 
	*/
	IncomingReceived : 1,
	/**
	 * An outgoing call is started 
	*/
	OutgoingInit : 2,
	/**
	 * An outgoing call is in progress 
	*/
	OutgoingProgress : 3,
	/**
	 * An outgoing call is ringing at remote end 
	*/
	OutgoingRinging : 4,
	/**
	 * An outgoing call is proposed early media 
	*/
	OutgoingEarlyMedia : 5,
	/**
	 * Connected, the call is answered 
	*/
	Connected : 6,
	/**
	 * The media streams are established and running 
	*/
	StreamsRunning : 7,
	/**
	 * The call is pausing at the initiative of local end 
	*/
	Pausing : 8,
	/**
	 * The call is paused, remote end has accepted the pause 
	*/
	Paused : 9,
	/**
	 * The call is being resumed by local end 
	*/
	Resuming : 10,
	/**
	 * The call is being transfered to another party, resulting in a new outgoing call to follow immediately
	 * 
	*/
	Refered : 11,
	/**
	 * The call encountered an error 
	*/
	Error : 12,
	/**
	 * The call ended normally 
	*/
	End : 13,
	/**
	 * The call is paused by remote end 
	*/
	PausedByRemote : 14,
	/**
	 * The call's parameters change is requested by remote end, used for example when video is added by remote
	 * 
	*/
	UpdatedByRemote : 15,
	/**
	 * We are proposing early media to an incoming call 
	*/
	IncomingEarlyMedia : 16,
	/**
	 * A call update has been initiated by us 
	*/
	Updating : 17,
	/**
	 * The call object is no more retained by the core 
	*/
	Released : 18
};
linphone.getCallStateText = function(value) {
	switch (value) {
	case linphone.CallState.Idle:
		return "Idle";
	case linphone.CallState.IncomingReceived:
		return "IncomingReceived";
	case linphone.CallState.OutgoingInit:
		return "OutgoingInit";
	case linphone.CallState.OutgoingProgress:
		return "OutgoingProgress";
	case linphone.CallState.OutgoingRinging:
		return "OutgoingRinging";
	case linphone.CallState.OutgoingEarlyMedia:
		return "OutgoingEarlyMedia";
	case linphone.CallState.Connected:
		return "Connected";
	case linphone.CallState.StreamsRunning:
		return "StreamsRunning";
	case linphone.CallState.Pausing:
		return "Pausing";
	case linphone.CallState.Paused:
		return "Paused";
	case linphone.CallState.Resuming:
		return "Resuming";
	case linphone.CallState.Refered:
		return "Refered";
	case linphone.CallState.Error:
		return "Error";
	case linphone.CallState.End:
		return "End";
	case linphone.CallState.PausedByRemote:
		return "PausedByRemote";
	case linphone.CallState.UpdatedByRemote:
		return "UpdatedByRemote";
	case linphone.CallState.IncomingEarlyMedia:
		return "IncomingEarlyMedia";
	case linphone.CallState.Updating:
		return "Updating";
	case linphone.CallState.Released:
		return "Released";
	default:
		return "?";
	}
};

linphone.RegistrationState = {
	/**
	 * Initial state for registrations 
	*/
	None : 0,
	/**
	 * Registration is in progress 
	*/
	Progress : 1,
	/**
	 * Registration is successful 
	*/
	Ok : 2,
	/**
	 * Unregistration succeeded 
	*/
	Cleared : 3,
	/**
	 * Registration failed 
	*/
	Failed : 4
};
linphone.getRegistrationStateText = function(value) {
	switch (value) {
	case linphone.RegistrationState.None:
		return "None";
	case linphone.RegistrationState.Progress:
		return "Progress";
	case linphone.RegistrationState.Ok:
		return "Ok";
	case linphone.RegistrationState.Cleared:
		return "Cleared";
	case linphone.RegistrationState.Failed:
		return "Failed";
	default:
		return "?";
	}
};

linphone.Reason = {
	None : 0,
	/**
	 * No response received from remote 
	*/
	NoResponse : 1,
	/**
	 * Authentication failed due to bad credentials or resource forbidden 
	*/
	Forbidden : 2,
	/**
	 * The call has been declined 
	*/
	Declined : 3,
	/**
	 * Destination of the call was not found. 
	*/
	NotFound : 4,
	/**
	 * The call was not answered in time (request timeout) 
	*/
	NotAnswered : 5,
	/**
	 * Phone line was busy 
	*/
	Busy : 6,
	/**
	 * Unsupported content 
	*/
	UnsupportedContent : 7,
	/**
	 * Transport error: connection failures, disconnections etc... 
	*/
	IOError : 8,
	/**
	 * Do not disturb reason 
	*/
	DoNotDisturb : 9,
	/**
	 * Operation is unauthorized because missing credential 
	*/
	Unauthorized : 10,
	/**
	 * Operation like call update rejected by peer 
	*/
	NotAcceptable : 11,
	/**
	 * Operation could not be executed by server or remote client because it didn't have any context for it 
	*/
	NoMatch : 12,
	/**
	 * Resource moved permanently 
	*/
	MovedPermanently : 13,
	/**
	 * Resource no longer exists 
	*/
	Gone : 14,
	/**
	 * Temporarily unavailable 
	*/
	TemporarilyUnavailable : 15,
	/**
	 * Address incomplete 
	*/
	AddressIncomplete : 16,
	/**
	 * Not implemented 
	*/
	NotImplemented : 17,
	/**
	 * Bad gateway 
	*/
	BadGateway : 18,
	/**
	 * Server timeout 
	*/
	ServerTimeout : 19,
	/**
	 * Unknown reason 
	*/
	Unknown : 20
};
linphone.getReasonText = function(value) {
	switch (value) {
	case linphone.Reason.None:
		return "None";
	case linphone.Reason.NoResponse:
		return "NoResponse";
	case linphone.Reason.Forbidden:
		return "Forbidden";
	case linphone.Reason.Declined:
		return "Declined";
	case linphone.Reason.NotFound:
		return "NotFound";
	case linphone.Reason.NotAnswered:
		return "NotAnswered";
	case linphone.Reason.Busy:
		return "Busy";
	case linphone.Reason.UnsupportedContent:
		return "UnsupportedContent";
	case linphone.Reason.IOError:
		return "IOError";
	case linphone.Reason.DoNotDisturb:
		return "DoNotDisturb";
	case linphone.Reason.Unauthorized:
		return "Unauthorized";
	case linphone.Reason.NotAcceptable:
		return "NotAcceptable";
	case linphone.Reason.NoMatch:
		return "NoMatch";
	case linphone.Reason.MovedPermanently:
		return "MovedPermanently";
	case linphone.Reason.Gone:
		return "Gone";
	case linphone.Reason.TemporarilyUnavailable:
		return "TemporarilyUnavailable";
	case linphone.Reason.AddressIncomplete:
		return "AddressIncomplete";
	case linphone.Reason.NotImplemented:
		return "NotImplemented";
	case linphone.Reason.BadGateway:
		return "BadGateway";
	case linphone.Reason.ServerTimeout:
		return "ServerTimeout";
	case linphone.Reason.Unknown:
		return "Unknown";
	default:
		return "?";
	}
};

linphone.PresenceActivityType = {
	/**
	 * This value is not defined in the RFC, it corresponds to no activity with a basic status of "closed". 
	*/
	Offline : 0,
	/**
	 * This value is not defined in the RFC, it corresponds to no activity with a basic status of "open". 
	*/
	Online : 1,
	/**
	 * The person has a calendar appointment, without specifying exactly of what type. This activity is indicated
	 * if more detailed information is not available or the person chooses not to reveal more information. 
	*/
	Appointment : 2,
	/**
	 * The person is physically away from all interactive communication devices. 
	*/
	Away : 3,
	/**
	 * The person is eating the first meal of the day, usually eaten in the morning. 
	*/
	Breakfast : 4,
	/**
	 * The person is busy, without further details. 
	*/
	Busy : 5,
	/**
	 * The person is having his or her main meal of the day, eaten in the evening or at midday. 
	*/
	Dinner : 6,
	/**
	 * This is a scheduled national or local holiday. 
	*/
	Holiday : 7,
	/**
	 * The person is riding in a vehicle, such as a car, but not steering. 
	*/
	InTransit : 8,
	/**
	 * The person is looking for (paid) work. 
	*/
	LookingForWork : 9,
	/**
	 * The person is eating his or her midday meal. 
	*/
	Lunch : 10,
	/**
	 * The person is scheduled for a meal, without specifying whether it is breakfast, lunch, or dinner, or some
	 * other meal. 
	*/
	Meal : 11,
	/**
	 * The person is in an assembly or gathering of people, as for a business, social, or religious purpose.
	 * A meeting is a sub-class of an appointment. 
	*/
	Meeting : 12,
	/**
	 * The person is talking on the telephone. 
	*/
	OnThePhone : 13,
	/**
	 * The person is engaged in an activity with no defined representation. A string describing the activity
	 * in plain text SHOULD be provided. 
	*/
	Other : 14,
	/**
	 * A performance is a sub-class of an appointment and includes musical, theatrical, and cinematic performances
	 * as well as lectures. It is distinguished from a meeting by the fact that the person may either be lecturing
	 * or be in the audience, with a potentially large number of other people, making interruptions particularly
	 * noticeable. 
	*/
	Performance : 15,
	/**
	 * The person will not return for the foreseeable future, e.g., because it is no longer working for the company.
	 * 
	*/
	PermanentAbsence : 16,
	/**
	 * The person is occupying himself or herself in amusement, sport, or other recreation. 
	*/
	Playing : 17,
	/**
	 * The person is giving a presentation, lecture, or participating in a formal round-table discussion. 
	*/
	Presentation : 18,
	/**
	 * The person is visiting stores in search of goods or services. 
	*/
	Shopping : 19,
	/**
	 * The person is sleeping. 
	*/
	Sleeping : 20,
	/**
	 * The person is observing an event, such as a sports event. 
	*/
	Spectator : 21,
	/**
	 * The person is controlling a vehicle, watercraft, or plane. 
	*/
	Steering : 22,
	/**
	 * The person is on a business or personal trip, but not necessarily in-transit. 
	*/
	Travel : 23,
	/**
	 * The person is watching television. 
	*/
	TV : 24,
	/**
	 * The activity of the person is unknown. 
	*/
	Unknown : 25,
	/**
	 * A period of time devoted to pleasure, rest, or relaxation. 
	*/
	Vacation : 26,
	/**
	 * The person is engaged in, typically paid, labor, as part of a profession or job. 
	*/
	Working : 27,
	/**
	 * The person is participating in religious rites. 
	*/
	Worship : 28
};
linphone.getPresenceActivityTypeText = function(value) {
	switch (value) {
	case linphone.PresenceActivityType.Offline:
		return "Offline";
	case linphone.PresenceActivityType.Online:
		return "Online";
	case linphone.PresenceActivityType.Appointment:
		return "Appointment";
	case linphone.PresenceActivityType.Away:
		return "Away";
	case linphone.PresenceActivityType.Breakfast:
		return "Breakfast";
	case linphone.PresenceActivityType.Busy:
		return "Busy";
	case linphone.PresenceActivityType.Dinner:
		return "Dinner";
	case linphone.PresenceActivityType.Holiday:
		return "Holiday";
	case linphone.PresenceActivityType.InTransit:
		return "InTransit";
	case linphone.PresenceActivityType.LookingForWork:
		return "LookingForWork";
	case linphone.PresenceActivityType.Lunch:
		return "Lunch";
	case linphone.PresenceActivityType.Meal:
		return "Meal";
	case linphone.PresenceActivityType.Meeting:
		return "Meeting";
	case linphone.PresenceActivityType.OnThePhone:
		return "OnThePhone";
	case linphone.PresenceActivityType.Other:
		return "Other";
	case linphone.PresenceActivityType.Performance:
		return "Performance";
	case linphone.PresenceActivityType.PermanentAbsence:
		return "PermanentAbsence";
	case linphone.PresenceActivityType.Playing:
		return "Playing";
	case linphone.PresenceActivityType.Presentation:
		return "Presentation";
	case linphone.PresenceActivityType.Shopping:
		return "Shopping";
	case linphone.PresenceActivityType.Sleeping:
		return "Sleeping";
	case linphone.PresenceActivityType.Spectator:
		return "Spectator";
	case linphone.PresenceActivityType.Steering:
		return "Steering";
	case linphone.PresenceActivityType.Travel:
		return "Travel";
	case linphone.PresenceActivityType.TV:
		return "TV";
	case linphone.PresenceActivityType.Unknown:
		return "Unknown";
	case linphone.PresenceActivityType.Vacation:
		return "Vacation";
	case linphone.PresenceActivityType.Working:
		return "Working";
	case linphone.PresenceActivityType.Worship:
		return "Worship";
	default:
		return "?";
	}
};

linphone.SubscriptionState = {
	/**
	 * Initial state, should not be used. 
	*/
	None : 0,
	/**
	 * An outgoing subcription was sent 
	*/
	OutgoingProgress : 1,
	/**
	 * An incoming subcription is received 
	*/
	IncomingReceived : 2,
	/**
	 * Subscription is pending, waiting for user approval 
	*/
	Pending : 3,
	/**
	 * Subscription is accepted. 
	*/
	Active : 4,
	/**
	 * Subscription is terminated normally 
	*/
	Terminated : 5,
	/**
	 * Subscription encountered an error, indicated by 
	*/
	Error : 6,
	/**
	 * Subscription is about to expire, only sent if [sip]->refresh_generic_subscribe property is set to 0. 
	*/
	Expiring : 7
};
linphone.getSubscriptionStateText = function(value) {
	switch (value) {
	case linphone.SubscriptionState.None:
		return "None";
	case linphone.SubscriptionState.OutgoingProgress:
		return "OutgoingProgress";
	case linphone.SubscriptionState.IncomingReceived:
		return "IncomingReceived";
	case linphone.SubscriptionState.Pending:
		return "Pending";
	case linphone.SubscriptionState.Active:
		return "Active";
	case linphone.SubscriptionState.Terminated:
		return "Terminated";
	case linphone.SubscriptionState.Error:
		return "Error";
	case linphone.SubscriptionState.Expiring:
		return "Expiring";
	default:
		return "?";
	}
};

linphone.CallStatus = {
	/**
	 * The call was sucessful 
	*/
	Success : 0,
	/**
	 * The call was aborted 
	*/
	Aborted : 1,
	/**
	 * The call was missed (unanswered) 
	*/
	Missed : 2,
	/**
	 * The call was declined, either locally or by remote end 
	*/
	Declined : 3
};
linphone.getCallStatusText = function(value) {
	switch (value) {
	case linphone.CallStatus.Success:
		return "Success";
	case linphone.CallStatus.Aborted:
		return "Aborted";
	case linphone.CallStatus.Missed:
		return "Missed";
	case linphone.CallStatus.Declined:
		return "Declined";
	default:
		return "?";
	}
};

linphone.CallDir = {
	/**
	 * outgoing calls 
	*/
	Outgoing : 0,
	/**
	 * incoming calls 
	*/
	Incoming : 1
};
linphone.getCallDirText = function(value) {
	switch (value) {
	case linphone.CallDir.Outgoing:
		return "Outgoing";
	case linphone.CallDir.Incoming:
		return "Incoming";
	default:
		return "?";
	}
};

linphone.AVPFMode = {
	/**
	 * Use default value defined at upper level 
	*/
	Default : 0,
	/**
	 * AVPF is disabled 
	*/
	Disabled : 1,
	/**
	 * AVPF is enabled 
	*/
	Enabled : 2
};
linphone.getAVPFModeText = function(value) {
	switch (value) {
	case linphone.AVPFMode.Default:
		return "Default";
	case linphone.AVPFMode.Disabled:
		return "Disabled";
	case linphone.AVPFMode.Enabled:
		return "Enabled";
	default:
		return "?";
	}
};

linphone.PresenceBasicStatus = {
	/**
	 * This value means that the associated contact element, if any, is ready to accept communication. 
	*/
	Open : 0,
	/**
	 * This value means that the associated contact element, if any, is unable to accept communication. 
	*/
	Closed : 1
};
linphone.getPresenceBasicStatusText = function(value) {
	switch (value) {
	case linphone.PresenceBasicStatus.Open:
		return "Open";
	case linphone.PresenceBasicStatus.Closed:
		return "Closed";
	default:
		return "?";
	}
};

linphone.Privacy = {
	/**
	 * Privacy services must not perform any privacy function 
	*/
	None : 0,
	/**
	 * Request that privacy services provide a user-level privacy function. With this mode, "from" header is
	 * hidden, usually replaced by From: "Anonymous" <sip:
	*/
	User : 1,
	/**
	 * Request that privacy services modify headers that cannot be set arbitrarily by the user (Contact/Via).
	 * 
	*/
	Header : 2,
	/**
	 * Request that privacy services provide privacy for session media 
	*/
	Session : 3,
	/**
	 * rfc3325 The presence of this privacy type in a Privacy header field indicates that the user would like
	 * the Network Asserted Identity to be kept private with respect to SIP entities outside the Trust Domain
	 * with which the user authenticated. Note that a user requesting multiple types of privacy MUST include
	 * all of the requested privacy types in its Privacy header field value 
	*/
	Id : 4,
	/**
	 * Privacy service must perform the specified services or fail the request 
	*/
	Critical : 5,
	/**
	 * Special keyword to use privacy as defined either globally or by proxy using 
	*/
	Default : 6
};
linphone.getPrivacyText = function(value) {
	switch (value) {
	case linphone.Privacy.None:
		return "None";
	case linphone.Privacy.User:
		return "User";
	case linphone.Privacy.Header:
		return "Header";
	case linphone.Privacy.Session:
		return "Session";
	case linphone.Privacy.Id:
		return "Id";
	case linphone.Privacy.Critical:
		return "Critical";
	case linphone.Privacy.Default:
		return "Default";
	default:
		return "?";
	}
};

linphone.TunnelMode = {
	/**
	 * The tunnel is disabled. 
	*/
	Disable : 0,
	/**
	 * The tunnel is enabled. 
	*/
	Enable : 1,
	/**
	 * The tunnel is enabled automatically if it is required. 
	*/
	Auto : 2
};
linphone.getTunnelModeText = function(value) {
	switch (value) {
	case linphone.TunnelMode.Disable:
		return "Disable";
	case linphone.TunnelMode.Enable:
		return "Enable";
	case linphone.TunnelMode.Auto:
		return "Auto";
	default:
		return "?";
	}
};

linphone.PublishState = {
	/**
	 * Initial state, do not use 
	*/
	None : 0,
	/**
	 * An outgoing publish was created and submitted 
	*/
	Progress : 1,
	/**
	 * Publish is accepted. 
	*/
	Ok : 2,
	/**
	 * Publish encoutered an error, 
	*/
	Error : 3,
	/**
	 * Publish is about to expire, only sent if [sip]->refresh_generic_publish property is set to 0. 
	*/
	Expiring : 4,
	/**
	 * Event has been un published 
	*/
	Cleared : 5
};
linphone.getPublishStateText = function(value) {
	switch (value) {
	case linphone.PublishState.None:
		return "None";
	case linphone.PublishState.Progress:
		return "Progress";
	case linphone.PublishState.Ok:
		return "Ok";
	case linphone.PublishState.Error:
		return "Error";
	case linphone.PublishState.Expiring:
		return "Expiring";
	case linphone.PublishState.Cleared:
		return "Cleared";
	default:
		return "?";
	}
};

linphone.ConfiguringState = {
	Successful : 0,
	Failed : 1,
	Skipped : 2
};
linphone.getConfiguringStateText = function(value) {
	switch (value) {
	case linphone.ConfiguringState.Successful:
		return "Successful";
	case linphone.ConfiguringState.Failed:
		return "Failed";
	case linphone.ConfiguringState.Skipped:
		return "Skipped";
	default:
		return "?";
	}
};

linphone.UpnpState = {
	/**
	 * uPnP is not activate 
	*/
	Idle : 0,
	/**
	 * uPnP process is in progress 
	*/
	Pending : 1,
	/**
	 * Internal use: Only used by port binding 
	*/
	Adding : 2,
	/**
	 * Internal use: Only used by port binding 
	*/
	Removing : 3,
	/**
	 * uPnP is not available 
	*/
	NotAvailable : 4,
	/**
	 * uPnP is enabled 
	*/
	Ok : 5,
	/**
	 * uPnP processing has failed 
	*/
	Ko : 6,
	/**
	 * IGD router is blacklisted 
	*/
	Blacklisted : 7
};
linphone.getUpnpStateText = function(value) {
	switch (value) {
	case linphone.UpnpState.Idle:
		return "Idle";
	case linphone.UpnpState.Pending:
		return "Pending";
	case linphone.UpnpState.Adding:
		return "Adding";
	case linphone.UpnpState.Removing:
		return "Removing";
	case linphone.UpnpState.NotAvailable:
		return "NotAvailable";
	case linphone.UpnpState.Ok:
		return "Ok";
	case linphone.UpnpState.Ko:
		return "Ko";
	case linphone.UpnpState.Blacklisted:
		return "Blacklisted";
	default:
		return "?";
	}
};

linphone.IceState = {
	/**
	 * ICE has not been activated for this call 
	*/
	NotActivated : 0,
	/**
	 * ICE processing has failed 
	*/
	Failed : 1,
	/**
	 * ICE process is in progress 
	*/
	InProgress : 2,
	/**
	 * ICE has established a direct connection to the remote host 
	*/
	HostConnection : 3,
	/**
	 * ICE has established a connection to the remote host through one or several NATs 
	*/
	ReflexiveConnection : 4,
	/**
	 * ICE has established a connection through a relay 
	*/
	RelayConnection : 5
};
linphone.getIceStateText = function(value) {
	switch (value) {
	case linphone.IceState.NotActivated:
		return "NotActivated";
	case linphone.IceState.Failed:
		return "Failed";
	case linphone.IceState.InProgress:
		return "InProgress";
	case linphone.IceState.HostConnection:
		return "HostConnection";
	case linphone.IceState.ReflexiveConnection:
		return "ReflexiveConnection";
	case linphone.IceState.RelayConnection:
		return "RelayConnection";
	default:
		return "?";
	}
};

linphone.TransportType = {
	Udp : 0,
	Tcp : 1,
	Tls : 2,
	Dtls : 3
};
linphone.getTransportTypeText = function(value) {
	switch (value) {
	case linphone.TransportType.Udp:
		return "Udp";
	case linphone.TransportType.Tcp:
		return "Tcp";
	case linphone.TransportType.Tls:
		return "Tls";
	case linphone.TransportType.Dtls:
		return "Dtls";
	default:
		return "?";
	}
};

linphone.GlobalState = {
	Off : 0,
	Startup : 1,
	On : 2,
	Shutdown : 3,
	Configuring : 4
};
linphone.getGlobalStateText = function(value) {
	switch (value) {
	case linphone.GlobalState.Off:
		return "Off";
	case linphone.GlobalState.Startup:
		return "Startup";
	case linphone.GlobalState.On:
		return "On";
	case linphone.GlobalState.Shutdown:
		return "Shutdown";
	case linphone.GlobalState.Configuring:
		return "Configuring";
	default:
		return "?";
	}
};

linphone.FirewallPolicy = {
	/**
	 * Do not use any mechanism to pass through firewalls 
	*/
	NoFirewall : 0,
	/**
	 * Use the specified public adress 
	*/
	UseNatAddress : 1,
	/**
	 * Use a STUN server to get the public address 
	*/
	UseStun : 2,
	/**
	 * Use the ICE protocol 
	*/
	UseIce : 3,
	/**
	 * Use the uPnP protocol 
	*/
	UseUpnp : 4
};
linphone.getFirewallPolicyText = function(value) {
	switch (value) {
	case linphone.FirewallPolicy.NoFirewall:
		return "NoFirewall";
	case linphone.FirewallPolicy.UseNatAddress:
		return "UseNatAddress";
	case linphone.FirewallPolicy.UseStun:
		return "UseStun";
	case linphone.FirewallPolicy.UseIce:
		return "UseIce";
	case linphone.FirewallPolicy.UseUpnp:
		return "UseUpnp";
	default:
		return "?";
	}
};

linphone.SubscribePolicy = {
	/**
	 * Does not automatically accept an incoming subscription request. This policy implies that a decision has
	 * to be taken for each incoming subscription request notified by callback 
	*/
	Wait : 0,
	/**
	 * Rejects incoming subscription request. 
	*/
	Deny : 1,
	/**
	 * Automatically accepts a subscription request. 
	*/
	Accept : 2
};
linphone.getSubscribePolicyText = function(value) {
	switch (value) {
	case linphone.SubscribePolicy.Wait:
		return "Wait";
	case linphone.SubscribePolicy.Deny:
		return "Deny";
	case linphone.SubscribePolicy.Accept:
		return "Accept";
	default:
		return "?";
	}
};
