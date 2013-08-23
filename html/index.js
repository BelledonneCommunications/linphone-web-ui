/*!
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (c) 2013 Belledonne Communications
 All rights reserved.
 

 Authors:
 - Yann Diorcet <diorcet.yann@gmail.com>
 
 */

function __linphone_init(base) {	
	/* @if env='release' */
	var debug = false;
	/* @endif */
	/* @if env='debug' */
	var debug = true;
	/* @endif */
	
	var config = {
		files: {
			'Windows' : {
				'x86' : {
					'Explorer': {
						file: 'downloads/linphone-web-0.0.2.0-Win32.cab',
						version: '0,0,2,0'
					},
					'Firefox' : {
						file: 'downloads/linphone-web-0.0.2.0-Win32.xpi',
						icon: 'style/images/linphone.png'
					},
					'DEFAULT' : 'downloads/linphone-web-0.0.2.0-Win32.msi'
				},
				'x86_64' : {
					'Explorer': {
						file: 'downloads/linphone-web-0.0.2.0-Win32.cab',
						version: '0,0,2,0'
					},
					'Firefox' : {
						file: 'downloads/linphone-web-0.0.2.0-Win32.xpi',
						icon: 'style/images/linphone.png'
					},
					'DEFAULT' : 'downloads/linphone-web-0.0.2.0-Win32.msi'
				}
			},
			'Linux' : {
				'x86' : {
					'Firefox' : {
						file: 'downloads/linphone-web-0.0.2.0-Linux-x86.xpi',
						icon: 'style/images/linphone.png'
					},
					'DEFAULT' : 'downloads/linphone-web-0.0.2.0-Linux-x86.tar.gz'
				}, 
				'x86_64' : {
					'Firefox' : {
						file: 'downloads/linphone-web-0.0.2.0-Linux-x86_64.xpi',
						icon: 'style/images/linphone.png'
					},
					'DEFAULT' : 'downloads/linphone-web-0.0.2.0-Linux-x86_64.tar.gz'
				}
			},
			'Mac' : {
				'x86' : {
					'Firefox' : {
						file: 'downloads/linphone-web-0.0.2.0-Mac-x86.xpi',
						icon: 'style/images/linphone.png'
					},
					'DEFAULT' : 'downloads/linphone-web-0.0.2.0-Mac-x86.pkg'
				}, 
				'x86_64' : {
					'Firefox' : {
						file: 'downloads/linphone-web-0.0.2.0-Mac-x86.xpi',
						icon: 'style/images/linphone.png'
					},
					'DEFAULT' : 'downloads/linphone-web-0.0.2.0-Mac-x86.pkg'
				}
			}
		},
		name: 'Linphone Web',
		version: '0.0.2.0',
		copyright: 'Copyright© Belledonne Communications 2013. All rights reserved.',
		links: [{
			cls: 'support',
			text: 'support',
			link: 'mailto:linphone-web@belledonne-communications.com',
		},{
			cls: 'sales',
			text: 'sales',
			link: 'mailto:sales@belledonne-communications.com',
		}],
		locales: [ {
			name : 'US',
			title: 'English',
			locale : 'en_US'
		}, {
			name : 'FR',
			title : 'Français',
			locale : 'fr_FR'
		} ],
		models: {
			contacts: new linphone.models.contacts.localStorage.engine('Linphone Web', debug),
			history: new linphone.models.history.core.engine(base, debug)
		},
		disableChat: true,
		disableConference: true,
		disablePresence: true
	}

	config.debug = debug;
	config.logs = debug;
	
	// Enable debug only if lpdebug is set to true	
	if(jQuery.getUrlVar('lpdebug') === '1' ||
		jQuery.getUrlVar('lpdebug') === 'true' ||
		jQuery.getUrlVar('lpdebug') === 'yes') {
		config.logs = true;
	}
	linphone.ui.init(base, config);
	linphone.ui.core.load(base);
}

/* @if env='release' */
(function(w, d, s) {
	var scripts = [
		{url: "js/jquery-1.10.1.min.js"},
		{url: "js/jquery.client.min.js"},
		
		{url: "js/i18n.min.js"},
		{url: "js/persistent.min.js"},
		
		{url: "js/jsonsql-0.1.min.js"},
		
		{url: "js/jquery-ui-1.10.3.min.js"},
		{url: "js/jquery.mousewheel.min.js"},
		{url: "js/vertical.slider.min.js"},
		
		{url: "js/jquery.geturlvars.min.js"},
		
		{url: "js/jquery.watermark.min.js"},
		
		{url: "js/handlebars.runtime.min.js"},
		
		{url: "js/linphone-/* @echo version */.min.js"}
	];
	function go(){
		function getScript(url,success){
			var script=document.createElement('script');
			script.src=url;
			script.type="text/javascript";
			var head=document.getElementsByTagName('head')[0];
			var done=false;
			script.onload=script.onreadystatechange = function(){
				if ( !done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') ) {
					done=true;
					success();
					script.onload = script.onreadystatechange = null;
					head.removeChild(script);
				}
			};
			head.appendChild(script);
		}
		function run(success) {
			if(scripts.length > 0) {
				var script = scripts[0];
				scripts.shift();
				getScript(script.url, 
					function() {
						run(success);
					}
				);
			} else {
				success();
			}
		}
		run(function () {
			jQuery('.linphoneweb').each(function (index) {
				var base = linphone.ui.getBase(jQuery(this));
				__linphone_init(base);
			});
		});
	}
	if (w.addEventListener) { 
		w.addEventListener("load", go, false); 
	} else if (w.attachEvent) { 
		w.attachEvent("onload",go); 
	}
}(window, document, 'script'));
/* @endif */
/* @if env='debug' */
(function(w, d, s) {
	function go() {
		var timeout; 
		function run(){
			window.clearTimeout(timeout);
			jQuery('.linphoneweb').each(function (index) {
				var base = linphone.ui.getBase(jQuery(this));
				__linphone_init(base);
			});
		}
		timeout = window.setTimeout(run, 1000);
	}
	if (w.addEventListener) { 
		w.addEventListener("load", go, false); 
	} else if (w.attachEvent) { 
		w.attachEvent("onload",go); 
	}
}(window, document, 'script'));
/* @endif */
