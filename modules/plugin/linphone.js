/*globals linphone*/


linphone.SubscriptionDir = {
	Incoming : 0,
	Outgoing : 1,
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


linphone.RegistrationState = {
	None : 0,
	Progress : 1,
	Ok : 2,
	Cleared : 3,
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


linphone.IceState = {
	NotActivated : 0,
	Failed : 1,
	InProgress : 2,
	HostConnection : 3,
	ReflexiveConnection : 4,
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


linphone.SubscriptionState = {
	None : 0,
	OutgoingProgress : 1,
	IncomingReceived : 2,
	Pending : 3,
	Active : 4,
	Terminated : 5,
	Error : 6,
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


linphone.TunnelMode = {
	Disable : 0,
	Enable : 1,
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


linphone.CallDir = {
	Outgoing : 0,
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


linphone.FirewallPolicy = {
	NoFirewall : 0,
	UseNatAddress : 1,
	UseStun : 2,
	UseIce : 3,
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


linphone.Privacy = {
	None : 0,
	User : 1,
	Header : 2,
	Session : 3,
	Id : 4,
	Critical : 5,
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


linphone.MediaEncryption = {
	None : 0,
	SRTP : 1,
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


linphone.PresenceBasicStatus = {
	Open : 0,
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


linphone.Reason = {
	None : 0,
	NoResponse : 1,
	Forbidden : 2,
	Declined : 3,
	NotFound : 4,
	NotAnswered : 5,
	Busy : 6,
	UnsupportedContent : 7,
	IOError : 8,
	DoNotDisturb : 9,
	Unauthorized : 10,
	NotAcceptable : 11,
	NoMatch : 12,
	MovedPermanently : 13,
	Gone : 14,
	TemporarilyUnavailable : 15,
	AddressIncomplete : 16,
	NotImplemented : 17,
	BadGateway : 18,
	ServerTimeout : 19,
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


linphone.CallStatus = {
	Success : 0,
	Aborted : 1,
	Missed : 2,
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


linphone.CoreLogCollectionUploadState = {
	InProgress : 0,
	Delivered : 1,
	NotDelivered : 2
};
linphone.getCoreLogCollectionUploadStateText = function(value) {
	switch (value) {
	case linphone.CoreLogCollectionUploadState.InProgress:
		return "InProgress";
	case linphone.CoreLogCollectionUploadState.Delivered:
		return "Delivered";
	case linphone.CoreLogCollectionUploadState.NotDelivered:
		return "NotDelivered";
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


linphone.PublishState = {
	None : 0,
	Progress : 1,
	Ok : 2,
	Error : 3,
	Expiring : 4,
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


linphone.AVPFMode = {
	Default : 0,
	Disabled : 1,
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


linphone.UpnpState = {
	Idle : 0,
	Pending : 1,
	Adding : 2,
	Removing : 3,
	NotAvailable : 4,
	Ok : 5,
	Ko : 6,
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


linphone.CallState = {
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
	Updating : 17,
	Released : 18,
	EarlyUpdatedByRemote : 19,
	EarlyUpdating : 20
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
	case linphone.CallState.EarlyUpdatedByRemote:
		return "EarlyUpdatedByRemote";
	case linphone.CallState.EarlyUpdating:
		return "EarlyUpdating";
	default:
		return "?";
	}
};


linphone.PresenceActivityType = {
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



linphone.SubscribePolicy = {
	Wait : 0,
	Deny : 1,
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


linphone.ChatMessageState = {
	Idle : 0,
	InProgress : 1,
	Delivered : 2,
	NotDelivered : 3,
	FileTransferError : 4,
	FileTransferDone : 5
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
	case linphone.ChatMessageState.FileTransferDone:
		return "FileTransferDone";
	default:
		return "?";
	}
};



