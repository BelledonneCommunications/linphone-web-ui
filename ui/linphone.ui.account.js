/*globals getCore,getBase,localData,jQuery,linphone*/

linphone.ui.account = {
	current_proxy_config : null,
	updateAccountList : function(target) {
		var account_table = getBase(target).find('.window .accounts-options .content tbody');
		var proxy_list = getCore(target).getProxyConfigList();
		account_table.empty();
		for ( var index in proxy_list) {
			var item = proxy_list[index];
			var element = jQuery(jQuery('#Linphone-AccountsList').render(item));
			element.data('data', item);
			account_table.append(element);
		}
		
		// Highlight cells under pointer 
		getBase(target).find('.window .accounts-options .content tbody tr').hover(function() {
			jQuery(this).addClass("ui-state-highlight");
		}, function() {
			jQuery(this).removeClass("ui-state-highlight");
		});
	}
};

//
jQuery('html').click(function(event) {
	var target = jQuery(event.target);
	var base = getBase(target);
	
	// Click on account item
	if (target.is('.linphone .window .tools .accounts > a')) {
		base.find('.window .tools .settings-menu').fadeOut('fast');

		linphone.ui.account.updateAccountList(target);

		base.find('.window .accounts-options').fadeIn('fast');
	}

	// Click on add button
	if (target.is('.linphone .window .accounts-options .add')) {
		linphone.ui.account.current_proxy_config = null;
		base.find('.window .account-form .content button.remove').hide();
		base.find('.window .account-form .content input.identity').val("sip:");
		base.find('.window .account-form .content input.proxy').val("sip:");
		base.find('.window .account-form .content input.route').val("");
		base.find('.window .account-form .content input.expires').val("3600");
		base.find('.window .account-form .content input.register').attr('checked', true);
		base.find('.window .account-form').fadeIn('fast');
	}

	// Click on table row
	if (target.is('.linphone .window .accounts-options .content tbody tr') || target.is('.linphone .window .accounts-options .content tbody td')) {
		var data = base.find('.window .accounts-options .content tbody tr').data('data');
		linphone.ui.account.current_proxy_config = data;
		base.find('.window .account-form .content button.remove').show();
		base.find('.window .account-form .content input.identity').val(data.getIdentity());
		base.find('.window .account-form .content input.proxy').val(data.getServerAddr());
		base.find('.window .account-form .content input.route').val(data.getRoute());
		base.find('.window .account-form .content input.expires').val(data.getExpires());
		base.find('.window .account-form .content input.register').attr('checked', data.registerEnabled());
		base.find('.window .account-form').fadeIn('fast');
	}

	// Remove proxy
	if (target.is('.linphone .window .account-form .remove')) {
		getCore(target).removeProxyConfig(linphone.ui.account.current_proxy_config);

		linphone.ui.account.updateAccountList(target);
		base.find('.window .account-form').fadeOut('fast');
	}

	// Valid account check
	if (target.is('.linphone .window .account-form .valid')) {
		var errors = "";
		var errors_text = "";
		var identity_regex = new RegExp('sip:.+@.+');
		var identity = base.find('.window .account-form .content input.identity').val();
		var proxy_regex = new RegExp('sip:.+');
		var proxy = base.find('.window .account-form .content input.proxy').val();
		var route_regex = new RegExp('.*');
		var route = base.find('.window .account-form .content input.route').val();
		var expires_regex = new RegExp('\\d+');
		var expires = base.find('.window .account-form .content input.expires').val();
		var register = base.find('.window .account-form .content input.register').is(':checked');

		if (identity_regex.exec(identity) == null) {
			errors += '<li class="{translate: \'form.account.errors.identity\'}"></li>';
		}
		if (proxy_regex.exec(proxy) == null) {
			errors += '<li class="{translate: \'form.account.errors.proxy\'}"></li>';
		}
		if (route_regex.exec(route) == null) {
			errors += '<li class="{translate: \'form.account.errors.route\'}"></li>';
		}
		if (expires_regex.exec(expires) == null) {
			errors += '<li class="{translate: \'form.account.errors.duration\'}"></li>';
		}
		if (errors.length > 0) {
			errors_text = '<div><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 20px 0;"></span>';
			errors_text += '<div class="{translate: \'form.account.errors.message\'}"></div><ul>' + errors + '</ul></div>';
			var dialog = jQuery(errors_text);
			jQuery.i18n.update(dialog, true);
			dialog.dialog({
				title : jQuery.i18n.get('form.account.errors.title'),
				modal : false,
				buttons : {
					Ok : function() {
						jQuery(this).dialog("close");
					}
				}
			});

		} else {
			var proxyConfig = null;
			if (linphone.ui.account.current_proxy_config == null) {
				proxyConfig = getCore(target).newProxyConfig();
			} else {
				proxyConfig = linphone.ui.account.current_proxy_config;
				linphone.ui.account.current_proxy_config.edit();
			}

			// Set values
			proxyConfig.setIdentity(identity);
			proxyConfig.setServerAddr(proxy);
			proxyConfig.setRoute(route);
			proxyConfig.setExpires(expires);
			proxyConfig.enableRegister(register);

			if (linphone.ui.account.current_proxy_config == null) {
				getCore(target).addProxyConfig(proxyConfig);
			} else {
				linphone.ui.account.current_proxy_config.done();
			}

			linphone.ui.account.updateAccountList(target);
			base.find('.window .account-form').fadeOut('fast');
		}
	}
});