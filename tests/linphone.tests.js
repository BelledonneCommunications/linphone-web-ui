/*!
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (c) 2013 Belledonne Communications
 All rights reserved.
 

 Authors:
 - Yann Diorcet <diorcet.yann@gmail.com>
 
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

function tests_log(context, msg) {
	if(context.log !== null) {
		context.log(msg);
	}
	if(typeof window.console !== 'undefined') {
		console.log(msg);
	}
}

function tests_success(context) {
	test = context.tests[context.current];
	tests_log(context, "Test " +  test.name + " (" + (context.current + 1 ) + "/" + context.tests.length + "): Success");
	context.current = context.current + 1;
	setTimeout(function(){tests_run_next(context);}, 1);
}

function tests_error(context, msg) {
	test = context.tests[context.current];
	test.result = msg;
	tests_log(context, "Test " +  test.name + " (" + (context.current + 1 ) + "/" + context.tests.length + "): Failure->" + msg);
	context.current = context.current + 1;
	setTimeout(function(){tests_run_next(context);}, 1);
}

function tests_end(context) {
	pass = 0;
	for (var i = 0; i < context.tests.length; i++) {
		test = context.tests[i];
		if(test.result === null) {
			pass = pass + 1;
		}
	}
	tests_log(context, "------------------------------------------------------");
	tests_log(context, "Tests " + pass + "/" + context.tests.length + " passed");
	tests_log(context, "------------------------------------------------------");
}	

function tests_run_next(context) {
	if(context.current >= context.tests.length) {
		tests_end(context);
		return;
	}
	test = context.tests[context.current];
	
	tests_log(context, "Test " + test.name + " (" + (context.current + 1 ) + "/" + context.tests.length + "): Run");
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

function tests_run(core, log) {
	serialized_tests = [];
	tests_serialize(serialized_tests, tests, "");		
	var context = {
		log: log,
		core: core,
		tests: serialized_tests,
		current: 0
	};
	setTimeout(function(){tests_run_next(context);}, 1);
}
