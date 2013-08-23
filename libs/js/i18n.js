/*!
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (c) 2013 Belledonne Communications
 All rights reserved.
 

 Authors:
 - Yann Diorcet <diorcet.yann@gmail.com>
 
 */

jQuery.i18n = {}
jQuery.i18n.locale = ''
jQuery.i18n.data = {}
jQuery.i18n.change = function(locale) {
	if (locale != jQuery.i18n.locale) {
		jQuery.i18n.locale = locale
		jQuery.i18n.update(jQuery('*'))
	}
}

jQuery.i18n.update = function(element, recursive) {
	if (typeof recursive == "undefined") {
		recursive = false
	}
	element.filter(function () { return $(this).metadata().translate != null}).each(function() {
		var element = $(this)
		element.find('.i18n_translated').remove()
		element.append(jQuery.i18n.translate(element.metadata().translate))
	})
	if(recursive) {
		element.find('*').filter(function () { return $(this).metadata().translate != null}).each(function() {
			var element = $(this)
			element.find('.i18n_translated').remove()
			element.append(jQuery.i18n.translate(element.metadata().translate))
		})
	}
}

jQuery.i18n.translate = function(text) {
	var parts = text.split('.')
	var data = jQuery.i18n.data
	var translated_text = '$' + text + '$'
	while (parts.length && data) {
		var part = parts.shift()
		data = data[part]
	}

	if (data != null)
		data = data[jQuery.i18n.locale]

	if (data != null) {
		translated_text = data
	}
	var ret = jQuery('<span class="i18n_translated"/>').text(translated_text)
	return ret
}

jQuery.i18n.get = function(text) {
	var translated_text = jQuery.i18n.translate(text)
	return jQuery('<div class="{translate: \'' + text + '\'}" />').append(translated_text);
}