(function(w, d, s) {
	var scripts = [
		{url: "js/jquery.js"},
		{url: "js/jquery.client.js"},
		
		{url: "js/jquery.metadata.js"},
		{url: "js/i18n.js"},
		
		{url: "js/jquery-ui.js"},
		{url: "js/jquery.mousewheel.js"},
		{url: "js/vertical.slider.js"},
		
		// <!-- @if env='release' -->
		{url: "js/handlebars.runtime.js"},
		{url: "js/linphone-core-<!-- @echo version -->.min.js"},
		{url: "js/linphone-ui-<!-- @echo version -->.min.js"},
		{url: "js/linphone-ui-tmpl-<!-- @echo version -->.min.js"},
		// <!-- @endif -->
		// <!-- @if env='debug' -->
		{url: "js/handlebars.js"},
		{url: "js/linphone-core-<!-- @echo version -->.js"},
		{url: "js/linphone-ui-<!-- @echo version -->.js"},
		{url: "js/linphone-ui-tmpl-<!-- @echo version -->.js"},
		// <!-- @endif -->
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
				// <!-- @if env='release' -->
				linphone.ui.debug = false;
				// <!-- @endif -->
				// <!-- @if env='debug' -->
				linphone.ui.debug = true;
				// <!-- @endif -->
				linphone.ui.init(linphone.ui.getBase(jQuery(this)));
			});
		});
	}
	if (w.addEventListener) { 
		w.addEventListener("load", go, false); 
	} else if (w.attachEvent) { 
		w.attachEvent("onload",go); 
	}
}(window, document, 'script'));