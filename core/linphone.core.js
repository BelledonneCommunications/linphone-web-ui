/*globals console,localStorage */
var linphone = {};
linphone.config = {
	file : null,
	codebase : ''
};
linphone.core = {
	log : function(message) {
		if (typeof window['console'] !== 'undefined') {
			console.log(message);
		}
	},
	data : function() {
		if (typeof window['localStorage'] !== 'undefined') {
			return localStorage;
		} else {
			return {};
		}
	}
};