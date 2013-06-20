jQuery.i18n = {};
jQuery.i18n.locale = '';
jQuery.i18n.data = {};

jQuery.i18n.translate_key = 'i18n';
jQuery.i18n.translate_class = 'i18n_translated';

jQuery.i18n.change = function(locale, element) {
	element = (typeof element === "undefined") ? jQuery('html') : element;
	if (locale !== jQuery.i18n.locale) {
		jQuery.i18n.locale = locale;
		jQuery.i18n.update(element, true);
	}
};

jQuery.i18n.update = function(element, recursive) {
	if (typeof recursive == "undefined") {
		recursive = false;
	}
	element.filter(function () { return jQuery(this).data(jQuery.i18n.translate_key) != null; }).each(function() {
		var element = jQuery(this);
		element.find('.'+jQuery.i18n.translate_class).remove();
		element.append(jQuery.i18n.element(element.data(jQuery.i18n.translate_key)));
	});
	if(recursive) {
		element.find('*').filter(function () { return jQuery(this).data(jQuery.i18n.translate_key) != null; }).each(function() {
			var element = jQuery(this);
			element.find('.'+jQuery.i18n.translate_class).remove();
			element.append(jQuery.i18n.element(element.data(jQuery.i18n.translate_key)));
		});
	}
};

jQuery.i18n.element = function(text) {
	var ret = jQuery('<span class="' + jQuery.i18n.translate_class + '"/>').text(jQuery.i18n.translate(text));
	return ret;
}

jQuery.i18n.translate = function(text) {
	var parts = text.split('.');
	var data = jQuery.i18n.data;
	var translated_text = '$' + text + '(' + jQuery.i18n.locale + ')' + '$';
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
	return translated_text;
};

jQuery.i18n.get = function(text) {
	var translated_text = jQuery.i18n.element(text);
	return jQuery('<div data-'+jQuery.i18n.translate_key+'= "' + text + '" />').append(translated_text);
};