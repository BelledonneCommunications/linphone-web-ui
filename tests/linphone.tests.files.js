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

function test_files_clean(context) {
	var try_remove = function (file, callback) {
		core.getFileManager().exists(file, 
			function (done, error) {
				if(done) {
					core.getFileManager().remove(file, function (done, error) {
					callback();
					})	
				} else {
					callback();
				}
			}
		);
	}
	try_remove("tmp:///image1.jpg", function () {
		try_remove("local:///image1.jpg", function () {
			try_remove("local:///image2.jpg", function () {
				try_remove("tmp:///index.html", function () {
					try_remove("tmp:///aa", function () {
						tests_success(context);
					});
				});
			});
		});
	});
}

function test_files_copy_internal_tmp(context) {
	core = context.core;
	ret = core.getFileManager().copy("internal:///share/images/nowebcamCIF.jpg", "tmp:///image1.jpg", 
		function (done, error) {
			tests_assert(context, done === true, error);
			tests_success(context);
		}
	);
	ret.start();
}

function test_files_copy_internal_local(context) {
	core = context.core;
	ret = core.getFileManager().copy("internal:///share/images/nowebcamCIF.jpg", "local:///image2.jpg", 
		function (done, error) {
			tests_assert(context, done === true, error);
			tests_success(context);
		}
	);
	if(ret !== null) {
		ret.start();
	}
}

function test_files_copy_tmp_local(context) {
	core = context.core;
	ret = core.getFileManager().copy("tmp:///image1.jpg", "local:///image1.jpg", 
		function (done, error) {
			tests_assert(context, done === true, error);
			tests_success(context);
		}
	);
	if(ret !== null) {
		ret.start();
	}
}

function test_files_copy_tmp_internal(context) {
	core = context.core;
	ret = core.getFileManager().copy("tmp:///image1.jpg", "internal:///image1.jpg", 
		function (done, error) {
			tests_assert(context, done === false, "Security issue");
			tests_success(context);
		}
	);
	if(ret !== null) {
		ret.start();
	}
}

function test_files_directory_internal(context) {
	core = context.core;
	core.getFileManager().mkdir("internal:///testd", 
		function (done, error) {
			tests_assert(context, done === false, "Security issue");
			tests_success(context);
		}
	);
}

function test_files_directory_tmp(context) {
	core = context.core;
	core.getFileManager().mkdir("tmp:///testd", 
		function (done, error) {
			tests_assert(context, done === true, error);
			tests_success(context);
		}
	);
}

function test_files_directory_tmp2(context) {
	core = context.core;
	core.getFileManager().mkdir("tmp:///testd/blabla/blai  bla", 
		function (done, error) {
			tests_assert(context, done === true, error);
			tests_success(context);
		}
	);
}

function test_files_relative_path_valid(context) {
	core = context.core;
	core.getFileManager().exists("tmp:///testd/blabla/blai  bla/../../../image1.jpg", 
		function (done, error) {
			tests_assert(context, done === true, error);
			tests_success(context);
		}
	);
}

function test_files_relative_path_invalid(context) {
	core = context.core;
	core.getFileManager().exists("tmp:///testd/blabla/blai bla/../../../image3.jpg", 
		function (done, error) {
			tests_assert(context, done === false, "Found not existing file");
			tests_success(context);
		}
	);
}

function test_files_relative_path_unsecure(context) {
	core = context.core;
	core.getFileManager().exists("tmp://////etc/passwd", 
		function (done, error) {
			tests_assert(context, done === false, "Security issue");
			tests_success(context);
		}
	);
}

function test_files_exists_internal_file(context) {
	core = context.core;
	core.getFileManager().exists("internal:///share/images/nowebcamCIF.jpg", 
		function (done, error) {
			tests_assert(context, done === true, error);
			tests_success(context);
		}
	);
}

function test_files_exists_local_file(context) {
	core = context.core;
	core.getFileManager().exists("local:///image1.jpg", 
		function (done, error) {
			tests_assert(context, done === true, error);
			tests_success(context);
		}
	);
}

function test_files_exists_tmp_file(context) {
	core = context.core;
	core.getFileManager().exists("tmp:///image1.jpg", 
		function (done, error) {
			tests_assert(context, done === true, error);
			tests_success(context);
		}
	);
}

function test_files_exists_tmp_directory(context) {
	core = context.core;
	core.getFileManager().exists("tmp:///testd/blabla", 
		function (done, error) {
			tests_assert(context, done === true, error);
			tests_success(context);
		}
	);
}

function test_files_not_exists_internal_file(context) {
	core = context.core;
	core.getFileManager().exists("internal:///share/images/nowebcamCIF.jpg2", 
		function (done, error) {
			tests_assert(context, done === false, "Found not existing file");
			tests_success(context);
		}
	);
}

function test_files_not_exists_local_file(context) {
	core = context.core;
	core.getFileManager().exists("local:///image221.jpg", 
		function (done, error) {
			tests_assert(context, done === false, "Found not existing file");
			tests_success(context);
		}
	);
}

function test_files_not_exists_tmp_file(context) {
	core = context.core;
	core.getFileManager().exists("tmp:///ime1.jpg", 
		function (done, error) {
			tests_assert(context, done === false, "Found not existing file");
			tests_success(context);
		}
	);
}

function test_files_remove_internal_file(context) {
	core = context.core;
	core.getFileManager().remove("internal:///share/images/nowebcamCIF.jpg", 
		function (done, error) {
			tests_assert(context, done === false, "Security issue");
			tests_success(context);
		}
	);
}

function test_files_remove_tmp_directory(context) {
	core = context.core;
	core.getFileManager().remove("tmp:///testd", 
		function (done, error) {
			tests_assert(context, done === true, error);
			tests_success(context);
		}
	);
}
		
function test_files_remove_existing_local_file(context) {
	core = context.core;
	core.getFileManager().remove("local:///image1.jpg", 
		function (done, error) {
			tests_assert(context, done === true, error);
			tests_success(context);
		}
	);
}

function test_files_remove_not_existing_tmp_file(context) {
	core = context.core;
	core.getFileManager().remove("tmp:///ddimage1.jpg", 
		function (done, error) {
			tests_assert(context, done === false, "Remove not existing file");
			tests_success(context);
		}
	);
}

function test_files_download_existing_to_tmp_file(context) {
	core = context.core;
	var full = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
	ret = core.getFileManager().copy(full + "/index.html", "tmp:///index.html", 
		function (done, error) {
			tests_assert(context, done === true, error);
			tests_success(context);
		}
	);
	if(ret !== null) {
		ret.start();
	}
}

function test_files_download_not_existing_to_tmp_file(context) {
	core = context.core;
	var full = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
	ret = core.getFileManager().copy(full + "/indexxxxxx.html", "tmp:///indexxxxxx.html", 
		function (done, error) {
			tests_assert(context, done === false, "Download not existing file");
			tests_success(context);
		}
	);
	if(ret !== null) {
		ret.start();
	}
}

function test_files_upload_existing_from_tmp_file(context) {
	core = context.core;
	var full = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
	ret = core.getFileManager().copy("tmp:///index.html", full + "/upload", 
		function (done, error) {
			tests_assert(context, done === true, error);
			tests_success(context);
		}
	);
	if(ret !== null) {
		ret.start();
	}
}

function test_files_upload_not_existing_from_tmp_file(context) {
	core = context.core;
	var full = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
	ret = core.getFileManager().copy("tmp:///indexxxxxx.html", full + "/upload", 
		function (done, error) {
			tests_assert(context, done === false, "Upload not existing file");
			tests_success(context);
		}
	);
	if(ret !== null) {
		ret.start();
	}
}

function test_files_download_invalid_url(context) {
	core = context.core;
	var full = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
	ret = core.getFileManager().copy(full + "/uploadfdsfd", "tmp:///aa", 
		function (done, error) {
			tests_assert(context, done === false, "Download from invalid url");
			tests_success(context);
		}
	);
	if(ret !== null) {
		ret.start();
	}
}

function test_files_upload_invalid_url(context) {
	core = context.core;
	var full = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
	ret = core.getFileManager().copy("tmp:///index.html", full + "/upload2", 
		function (done, error) {
			tests_assert(context, done === false, "Upload to invalid url");
			tests_success(context);
		}
	);
	if(ret !== null) {
		ret.start();
	}
}

/*
 * Add tests
 */
tests.push({
	name: "Files",
	tests: [{
		name: "Copy a file from internal to tmp",
		fct: test_files_copy_internal_tmp
	}, {
		name: "Copy a file from internal to local",
		fct: test_files_copy_internal_local
	}, {
		name: "Copy a file from tmp to local",
		fct: test_files_copy_tmp_local
	}, {
		name: "Copy a file from tmp to internal",
		fct: test_files_copy_tmp_internal
	}, {
		name: "Create internal directory",
		fct: test_files_directory_internal
	}, {
		name: "Create tmp directory",
		fct: test_files_directory_tmp
	}, {
		name: "Create tmp directories",
		fct: test_files_directory_tmp2
	}, {
		name: "Use unsecure relative path",
		fct: test_files_relative_path_unsecure
	}, {
		name: "Use invalid relative path",
		fct: test_files_relative_path_invalid
	}, {
		name: "Use valid relative path",
		fct: test_files_relative_path_valid
	}, {
		name: "Exists internal file",
		fct: test_files_exists_internal_file
	}, {
		name: "Exists local file",
		fct: test_files_exists_local_file
	}, {
		name: "Exists tmp file",
		fct: test_files_exists_tmp_file
	}, {
		name: "Exists tmp directory",
		fct: test_files_exists_tmp_directory
	}, {
		name: "Not exists internal file",
		fct: test_files_not_exists_internal_file
	}, {
		name: "Not exists local file",
		fct: test_files_not_exists_local_file
	}, {
		name: "Not exists tmp file",
		fct: test_files_not_exists_tmp_file
	}, {
		name: "Remove internal file",
		fct: test_files_remove_internal_file
	}, {
		name: "Remove tmp directory",
		fct: test_files_remove_tmp_directory
	}, {
		name: "Remove existing local file",
		fct: test_files_remove_existing_local_file
	}, {
		name: "Remove not existing tmp file",
		fct: test_files_remove_not_existing_tmp_file
	}, {
		name: "Download http to tmp file",
		fct: test_files_download_existing_to_tmp_file
	}, {
		name: "Download not existing http to tmp file",
		fct: test_files_download_not_existing_to_tmp_file
	}, {
		name: "Upload http from tmp file",
		fct: test_files_upload_existing_from_tmp_file
	}, {
		name: "Upload http from not existing tmp file",
		fct: test_files_upload_not_existing_from_tmp_file
	}, {
		name: "Download from invalid url",
		fct: test_files_download_invalid_url
	}, {
		name: "Upload to invalid url",
		fct: test_files_upload_invalid_url
	}, {
		name: "Clean",
		fct: test_files_clean
	}]	
});	
