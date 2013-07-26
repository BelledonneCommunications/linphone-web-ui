jQuery.i18n = {};
jQuery.i18n.locale = '';
jQuery.i18n.data = {};

jQuery.i18n.translate_key = 'i18n';
jQuery.i18n.translate_parameters = 'i18n-parameters';
jQuery.i18n.translate_class = 'i18n_translated';

jQuery.i18n.change = function(locale, element) {
	element = (typeof element === "undefined") ? jQuery('html') : element;
	if (locale !== jQuery.i18n.locale) {
		jQuery.i18n.locale = locale;
		jQuery.i18n.update(element, true);
	}
};

jQuery.i18n.update = function(element, recursive) {
	var _update = function(element) {
		element.find('.'+jQuery.i18n.translate_class).remove();
		var ret = jQuery.i18n.element.call(element, element.data(jQuery.i18n.translate_key), element.data(jQuery.i18n.translate_parameters));
		element.append(ret);
	}
	if (typeof recursive == "undefined") {
		recursive = false;
	}
	element.filter(function () { return jQuery(this).data(jQuery.i18n.translate_key) != null; }).each(function() {
		_update(jQuery(this));
	});
	if(recursive) {
		element.find('*').filter(function () { return jQuery(this).data(jQuery.i18n.translate_key) != null; }).each(function() {
			_update(jQuery(this));
		});
	}
};

jQuery.i18n.element = function(text, parameters) {
	var ret = jQuery('<span class="' + jQuery.i18n.translate_class + '"/>').text(jQuery.i18n.translate.call(this, text, parameters));
	return ret;
}

jQuery.i18n.translate = function(text, parameters) {
	var translated_text;
	if(text[0] !== '{' || text[1] !== '{' || text[text.length - 1] !== '}' || text[text.length - 2] !== '}') {
		var parts = text.split('.');
		var data = jQuery.i18n.data;
		translated_text = '$' + text + '(' + jQuery.i18n.locale + ')' + '$';
		while (parts.length && data) {
			var part = parts.shift();
			data = data[part];
		}
		if (data != null) {
			data = data[jQuery.i18n.locale];
		}
		if (data != null) {
			translated_text = data;
		}
	} else {
		fct = text.slice(2, -2);
		var ret = eval(fct);
		if(typeof ret === 'string') {
			translated_text = ret
		} else if(typeof ret === 'function') {
			translated_text = ret.call(this, parameters);
		} else {
			translated_text = '';
		}
	}
	
	// Replace by parameters
	var final_text = translated_text.replace(/%[0-9]+/g, function(string, offset) {
		var index = parseInt(string.substr(1)) - 1;
		if(index >= 0 && typeof parameters !== 'undefined' && typeof parameters[index] !== 'undefined') {
   			return parameters[index];
   		}
   		return '';
	}).replace(/%%/g, '%');
	return final_text;
};

jQuery.i18n.get = function(text, parameters) {
	var elem = jQuery(jQuery.i18n.skeleton(text, parameters));
	var translated_text = jQuery.i18n.element.call(elem, text, parameters);
	elem.data(jQuery.i18n.translate_parameters, parameters);
	elem.append(translated_text);
	return elem;
};

jQuery.i18n.executeFunctionKey = function(fct, arguments) {
	var args = '';
	if(typeof arguments !== 'undefined') {
		args = JSON.stringify(arguments);
	}
	return '{{' + fct + '(' + args + ')' + '}}';
};

jQuery.i18n.functionKey = function(fct) {
	return '{{' + fct + '}}';
};

jQuery.i18n.skeleton = function(text, parameters) {
	var pdata = '';
	if(typeof parameters !== 'undefined') {
		var phtml = JSON.stringify(parameters);
		pdata = ' data-' + jQuery.i18n.translate_parameters + '=\'' + phtml + '\'';
	}
	return '<span data-'+jQuery.i18n.translate_key+'="' + text + '"' + pdata + '></span>';
};

jQuery.i18n.defined = function(text) {
		var data = jQuery.i18n.data;
		var parts = text.split('.');
		while (parts.length && data) {
			var part = parts.shift();
			data = data[part];
		}
		if (data != null) {
			data = data[jQuery.i18n.locale];
		}
		return data != null;
}

jQuery.i18n.set = function(element, text, parameters, translate) {
	if(typeof translate === 'undefined') {
		translate = true;
	}
	if(typeof text !== 'undefined') {
		element.data(jQuery.i18n.translate_key, text);
	}
	if(typeof parameters !== 'parameters') {
		element.data(jQuery.i18n.translate_parameters, parameters);
	}
	if(translate) {
		jQuery.i18n.update(element);
	}
}
