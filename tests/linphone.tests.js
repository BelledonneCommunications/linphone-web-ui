/*
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (C) 2012  Yann Diorcet <yann.diorcet@linphone.org>

 This program is free software; you can redistribute it and/or
 modify it under the terms of the GNU General Public License
 as published by the Free Software Foundation; either version 2
 of the License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program; if not, write to the Free Software
 Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

window.onerror = function() {
	return true;
};

function tests_assert(context, value, description) {
	if(!value) {
		tests_error(context, description);	
		throw null;	
	}
}

var tests = [];	

function tests_log(msg) {
	console.log(msg);
}

function tests_success(context) {
	test = context.tests[context.current];
	tests_log("Test " +  test.name + " (" + (context.current + 1 ) + "/" + context.tests.length + "): Success");
	context.current = context.current + 1;
	setTimeout(function(){tests_run_next(context)}, 1);
}

function tests_error(context, msg) {
	test = context.tests[context.current];
	test.result = msg;
	tests_log("Test " +  test.name + " (" + (context.current + 1 ) + "/" + context.tests.length + "): Failure->" + msg);
	context.current = context.current + 1;
	setTimeout(function(){tests_run_next(context)}, 1);
}

function tests_end(context) {
	pass = 0;
	for (var i = 0; i < context.tests.length; i++) {
		test = context.tests[i];
		if(test.result === null) {
			pass = pass + 1;
		}
	}
	tests_log("Tests " + pass + "/" + context.tests.length + " passed");
}	

function tests_run_next(context) {
	if(context.current >= context.tests.length) {
		tests_end(context)
		return;
	}
	test = context.tests[context.current];
	
	tests_log("Test " + test.name + " (" + (context.current + 1 ) + "/" + context.tests.length + "): Run");
	try {
		test.fct(context);
	} catch(err) {
		tests_error(context, err);
	}
}

function tests_serialize(serialized_tests, obj, prefix) {
	for (var i = 0; i < obj.length; i++) {
		test = obj[i];
		test_name = test.name;
		if(typeof test.tests !== "undefined") {
			tests_serialize(serialized_tests, test.tests, prefix + "/" + test_name);
		} else if(typeof test.fct !== "undefined") {
			serialized_tests.push({
				name: test_name,
				fct: test.fct,
				result: null
			});
		}
	}
}

function tests_run(core) {
	serialized_tests = [];
	tests_serialize(serialized_tests, tests, "");		
	var context = {
		core: core,
		tests: serialized_tests,
		current: 0
	}
	setTimeout(function(){tests_run_next(context)}, 1);
}
