/*!
 Linphone Web - Web plugin of Linphone an audio/video SIP phone
 Copyright (c) 2013 Belledonne Communications
 All rights reserved.
 

 Authors:
 - Yann Diorcet <diorcet.yann@gmail.com>
 
 */

/*global module:false*/
var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path');
module.exports = function(grunt) {
	coreModules = [
		'linphone.core',
		'linphone.core.enums'
	],
	modelsModules = [
		'linphone.models',
		'linphone.models.contacts',
		'linphone.models.history',
		'linphone.models.contacts.localstorage',
		'linphone.models.history.localstorage',
		'linphone.models.history.core'
	],
	uiModules = [
		'linphone.ui',
		'linphone.ui.utils',
		'linphone.ui.core',
		'linphone.ui.video',
		'linphone.ui.i18n',
		'linphone.ui.locale',
		'linphone.ui.header',
		'linphone.ui.menu',
		'linphone.ui.mainbar',
		'linphone.ui.dialer',
		'linphone.ui.view',
		'linphone.ui.view.main',
		'linphone.ui.view.plugin',
		'linphone.ui.view.install',
		'linphone.ui.view.login',
		'linphone.ui.view.contacts',
		'linphone.ui.view.contact',
		'linphone.ui.view.history',
		'linphone.ui.view.call',
		'linphone.ui.view.conference',
		'linphone.ui.view.chat',
		'linphone.ui.view.settings',
		'linphone.ui.view.settings.media',
		'linphone.ui.view.about',
		'linphone.ui.view.help',
		'linphone.ui.view.error',
		'linphone.ui.popup',
		'linphone.ui.popup.incall',
		'linphone.ui.popup.outcall',
		'linphone.ui.popup.error'
	],
	htmlFiles = [
		'index.html',
		'index.js',
		'index.css'
	],

	/* JS files */
	coreJSFiles = coreModules.map(function(module) {
		return 'modules/' + module.replace(/\./g, '/') + '.js';
	}),

	modelsJSFiles = modelsModules.map(function(module) {
		return 'modules/' + module.replace(/\./g, '/') + '.js';
	}),

	uiJSFiles = uiModules.map(function(module) {
		return 'modules/' + module.replace(/\./g, '/') + '.js';
	}),
	/* ********** */
	
	/* CSS files */
	uiCSSFiles = uiModules.map(function(module) {
		return 'modules/' + module.replace(/\./g, '/') + '.css';
	}),
	
	uiCSSFiles = uiCSSFiles.concat(uiModules.map(function(module) {
		return 'themes/<%= theme %>/' + module + '.css';
	})),
	/* ********** */
	
	/* HTML files */
	htmlFiles = htmlFiles.map(function(file) {
		return 'html/' + file;
	}),
	
	htmlFiles = htmlFiles.concat(uiModules.map(function(module) {
		return 'modules/' + module.replace(/\./g, '/') + '.html';
	})),
	/* ********** */

	// Project configuration.
	grunt.initConfig({
		env: 'debug',
		tmp: 'dist/',
		pkg: grunt.file.readJSON('package.json'),
		theme: 'default',
		meta: {
			version: '<%= pkg.version %>',
			banner: 
				'/*!\n' +
				' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("isoDate") %>\n' +
				'<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
				' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
				' * All rights reserved.\n' +
				' */\n\n'
		},

		// Validation Part
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				browser: true,
				es3: true,
				globals: {}
			},
			core: coreJSFiles,
			models: modelsJSFiles,
			ui: uiJSFiles,
		},
		csslint: {
			options: {
				'box-model': false,
				'outline-none': false,
				'adjoining-classes': false,
				'duplicate-background-images': false,
				'overqualified-elements': false
			},
			ui: uiCSSFiles
		},
		validation: {
			html: '<%= tmp %>/index-processed.html' 
		},

		clean: {
			dist: {
				src: ['dist']
			},
			tmp: {
				src: ['tmp']
			},
			release: {
				src: [
					'dist/style/ui-lightness/jquery-ui-1.8.17.custom.css', 
					'dist/downloads', 
					'dist/js/handlebars.min.js'
				]
			}
		},
		concat: {
			options: {
				stripBanners: true,
				banner: '<%= meta.banner %>'
			},
			coreJS: {
				dest: '<%= tmp %>/js/linphone-core-<%= pkg.version %>.js',
				src: [coreJSFiles]
			},
			modelsJS: {
				dest: '<%= tmp %>/js/linphone-models-<%= pkg.version %>.js',
				src: [modelsJSFiles]
			},
			uiJS: {
				dest: '<%= tmp %>/js/linphone-ui-<%= pkg.version %>.js',
				src: [uiJSFiles]
			},
			uiTmplJS: {
				dest: '<%= tmp %>/js/linphone-ui-tmpl-<%= pkg.version %>.js',
				src: ['<%= handlebars.uiTmplJS.dest %>']
			},
			allJS: {
				dest: '<%= tmp %>/js/linphone-<%= pkg.version %>.js',
				src: [coreJSFiles, modelsJSFiles, uiJSFiles, '<%= handlebars.uiTmplJS.dest %>']
			},
			uiCSS: {
				dest: '<%= tmp %>/style/linphone-ui-<%= pkg.version %>.css',
				src: [uiCSSFiles]
			},
		},
		uglify: {
			options: {
				banner: '<%= meta.banner %>'
			},
			coreJS: {
				dest: '<%= tmp %>/js/linphone-core-<%= pkg.version %>.min.js',
				src: ['<%= concat.coreJS.dest %>']
			},
			modelsJS: {
				dest: '<%= tmp %>/js/linphone-models-<%= pkg.version %>.min.js',
				src: ['<%= concat.modelsJS.dest %>']
			},
			uiJS: {
				dest: '<%= tmp %>/js/linphone-ui-<%= pkg.version %>.min.js',
				src: ['<%= concat.uiJS.dest %>']
			},
			uiTmplJS: {
				dest: '<%= tmp %>/js/linphone-ui-tmpl-<%= pkg.version %>.min.js',
				src: ['<%= concat.uiTmplJS.dest %>']
			},
			allJS: {
				dest: 'dist/js/linphone-<%= pkg.version %>.min.js',
				src: ['<%= concat.allJS.dest %>']
			},
			indexJS: {
				dest: 'tmp/index.js',
				src: 'tmp/index-processed.js',
				options: {
					banner:''
				}
			},
			statics: {
				files: grunt.file.expandMapping(['*.js', '**/*.js'], 'dist/', {
					cwd: 'statics',
					rename: function(dest, matchedSrcPath, options) {
						return path.join(dest, matchedSrcPath).replace('.js', '.min.js');
					}
				}),
				options: {
					banner:'',
					preserveComments: 'some'
				}
			}
		},
		htmlmin: {
			options: {
				removeComments: true,
				collapseWhitespace: true
			},
			html: {
				dest: 'dist/index.html',
				src: ['<%= preprocess.html.dest %>']
			}
		},
		handlebars: {
			options: {
				namespace: 'linphone.ui.templates',
				processName: function(filename) {
					filename = path.normalize(filename);
					var prefix = path.normalize(grunt.template.process('<%= tmp %>/linphone.ui.'));
					return filename.replace(prefix, '').replace('.hbs','');
				}
			},
			uiTmplJS: {
				dest: '<%= tmp %>/js/linphone-ui-tmpl.js',
				src: ['<%= tmp %>/*.hbs']
			}
		},
		preprocess: {
			options: {
				context: {
					env: '<%= env %>',
					version: '<%= pkg.version %>'
				}
			},
			html: {
				src : 'tmp/index.html',
				dest: '<%= tmp %>/index-processed.html'
			},
			indexJS: {
				src : 'html/index.js',
				dest: 'tmp/index-processed.js'
			},
			indexCSS: {
				src : 'html/index.css',
				dest: 'tmp/index-processed.css'
			}
		},
		cssmin: {
			options: {
				banner: '<%= meta.banner %>'
			},
			uiCSS: {
				src: ['<%= oversprite.uiCSS.csslist.dest %>'],
				dest: 'dist/style/linphone-ui-<%= pkg.version %>.min.css'
			},
			indexCSS: {
				dest: 'tmp/index.css',
				src: 'tmp/index-processed.css',
				options: {
					banner:''
				}
			},
			statics: {
				files: grunt.file.expandMapping(['*.css', '**/*.css'], 'dist/', {
					cwd: 'statics',
					rename: function(dest, matchedSrcPath, options) {
						return path.join(dest, matchedSrcPath).replace('.css', '.min.css');
					}
				}),
				options: {
					banner:'',
					preserveComments: 'some'
				}
			}
		},
		imagemin: {
			options: {
				optimizationLevel: '<%= (env=="debug")?0:7 %>'
			},
			theme: {
				expand: true,
				src: [
					 'img/*.{png,jpg,gif}'
				],
				cwd: 'dist/style/',
				dest: 'dist/style/'
			}
		},
		oversprite: {
			uiCSS: {
				spritelist: {
					algorithm: 'binary-tree',
					src: ['themes/' + '<%= theme %>/' + 'img/**/*.png'],
					dest: 'dist/style/img/sprite.png',
					base: 'themes/' + '<%= theme %>/'
				},
				csslist: {
					src: '<%= concat.uiCSS.dest %>',
					dest: '<%= tmp %>/style/linphone-ui-<%= pkg.version %>.sprite.css',
					base: 'dist/style/'
				}
			}
		},
		copy: {
			theme: {
				expand: true,
				src: [
					'**/*',
					'!*.png',
					'!**/*.png',
					'!*.css',
					'!**/*.css'
				],
				cwd: 'themes/' + '<%= theme %>/',
				dest: 'dist/style/'
			},
			theme_png: {
				expand: true,
				src: [
					 '**/*.png'
				],
				cwd: 'themes/' + '<%= theme %>/',
				dest: '<%= tmp %>/style/'
			},
			statics: {
				expand: true,
				src: [
					 '**',
					'!*.js',
					'!**/*.js',
					'!*.css',
					'!**/*.css'
				],
				cwd: 'statics/',
				dest: 'dist/'
			},
			statics_js: {
				expand: true,
				src: [
					'*.js',
					'**/*.js'
				],
				cwd: 'statics/',
				dest: '<%= tmp %>/'
			},
			statics_css: {
				expand: true,
				src: [
					'*.css',
					'**/*.css'
				],
				cwd: 'statics/',
				dest: '<%= tmp %>/'
			},
			html: {
				expand: true,
				src: [
					 '**'
				],
				cwd: 'html/',
				dest: 'tmp/'
			},
			indexJS: {
				src: 'tmp/index-processed.js',
				dest: 'tmp/index.js'
			},
			indexCSS: {
				src: 'tmp/index-processed.css',
				dest: 'tmp/index.css'
			},
			downloads: {
				expand: true,
				src: [
					 '**'
				],
				cwd: 'downloads/',
				dest: 'dist/downloads/'
			},
		},
		watch: {
			server: {
				files:  'server/**',
				tasks:  ['express-server', 'livereload']
			},
			allJS: {
				files: ['<%= concat.coreJS.dest %>', '<%= concat.uiJS.dest %>', '<%= concat.uiTmplJS.dest %>'],
				tasks: ['concat:allJS', 'uglify:allJS']
			},
			coreJS: {
				files: coreJSFiles,
				tasks: ['concat:coreJS', 'uglify:coreJS']
			},
			modelsJS: {
				files: modelsJSFiles,
				tasks: ['concat:modelsJS', 'uglify:modelsJS']
			},
			uiJS: {
				files: uiJSFiles,
				tasks: ['concat:uiJS', 'uglify:uiJS']
			},
			uiTmplJS: {
				files: '<%= handlebars.uiTmplJS.dest %>',
				tasks: ['concat:uiTmplJS', 'uglify:uiTmplJS']
			},
			uiCSS: {
				files: uiCSSFiles,
				tasks: ['concat:uiCSS', 'cssmin:uiCSS']
			},
			htmlFinal: {
				files: ['<%= preprocess.html.dest %>'],
				tasks: ['htmlmin']
			},
			html: {
				files: htmlFiles,
				tasks: ['pre-preprocess', 'preprocess:html', 'htmlmin:html', 'extract-handlebars', 'handlebars']
			}
		},
		server : {
			script: ['server/server.js']
		},
		compress: {
			release: {
				options: {
					archive: '<%= pkg.name %>-<%= pkg.version %>.zip'
				},
				expand: true,
				cwd: 'dist/',
				src: ['**/*'],
			}
		},
		shell : {
			git_describe: {
				command: 'git describe',
		        options: {
		        	stdout: true,
		            callback: set_webapp_version
		        }
			}
		}
	});
	
	function set_webapp_version(err, stdout, stderr, cb) {
		grunt.config.set('pkg.version', stdout.replace(/(\r\n|\n|\r)/gm,"")); // Remove line breaks from stdout
		cb();
	}

	/* Filter non existing files */
	function process_files(files) {
		var ret = Array();
		for(var i in files) {
			var file = files[i];
			var file1 = grunt.config.process(file);
			if(grunt.file.exists(file1)) {
				ret.push(file1);
			}
		}
		return ret;
	}
	
	coreJSFiles = process_files(coreJSFiles)	
	modelsJSFiles = process_files(modelsJSFiles)	
	uiJSFiles = process_files(uiJSFiles) 
	uiCSSFiles = process_files(uiCSSFiles) 
	htmlFiles = process_files(htmlFiles) 

	// Load NPM Tasks
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );
	grunt.loadNpmTasks( 'grunt-contrib-csslint' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-contrib-htmlmin' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-nodeunit' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-livereload');
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-imagemin' );
	grunt.loadNpmTasks( 'grunt-contrib-compress' );
	grunt.loadNpmTasks( 'grunt-contrib-handlebars' );
	grunt.loadNpmTasks( 'grunt-preprocess' );
	grunt.loadNpmTasks( 'grunt-oversprite' );
	grunt.loadNpmTasks( 'grunt-html-validation' );
	grunt.loadNpmTasks( 'grunt-shell' );
	
	// Express server
	var server;
	grunt.registerTask('express-server', 'Start an express web server', function() {
		var done = this.async();
		if (server) {
			console.log('Killing existing Express server');

			server.kill('SIGTERM');
			server = null;
		}

		server = grunt.util.spawn({
			cmd:      process.argv[0],
			args:     grunt.config.get('server.script'),
			fallback: function() {
				// Prevent EADDRINUSE from breaking Grunt
			}
		}, function(err, result, code) {
			// Nothing to do, but callback has to exist
		});

		server.stdout.on('data', function() {
			if (done) {
				done();
			}

			done = null;
		});

		server.stdout.pipe(process.stdout);
		server.stderr.pipe(process.stdout);
	});
	
	// envs
	grunt.registerTask('debug-env', 
		function () {
			grunt.config.set('env', 'debug'); 
			grunt.config.set('tmp', 'dist/');
			
			// Append debug env
			grunt.config.set('server.script', grunt.config.get('server.script').concat([ '-p', '8888', '-d']));
		}
	);
	grunt.registerTask('release-env', 
		function () {
			grunt.config.set('env', 'release');
			grunt.config.set('tmp', 'tmp/');

			
			// Append release env
			grunt.config.set('server.script', grunt.config.get('server.script').concat([ '-p', '8888']));
		}
	);
	grunt.registerTask('extract-handlebars', 
		function() {
			var existingHBS = grunt.file.expand(grunt.template.process('<%= tmp %>/*.hbs'));
			for(var i = 0; i < existingHBS.length; ++i) {
				var hbs = existingHBS[i];
				grunt.log.writeln("Remove " + hbs);
				fs.unlinkSync(hbs);
			}
			htmlFiles.forEach(function(f) {
				var html = fs.readFileSync(f, 'utf8');
				var $ = cheerio.load(html);
				var elements = $("script[type='text/x-handlebars-template']");
				elements.each(
					function(index, element) {
						var that = $(element);
						var name = that.attr('id');	
						var content = that.text();
						//content = content.replace(/\s+/g, ''); // Strip
						var filename = path.normalize(grunt.template.process('<%= tmp %>/' + name + '.hbs'));
						grunt.log.writeln(name  + " ->  " + filename);
						fs.writeFileSync(filename, content, 'utf8');
					}
				);
			});
		}
	);
	grunt.registerTask('pre-preprocess', 
		function() {
			grunt.task.run('preprocess:indexJS');
			grunt.task.run('preprocess:indexCSS');
			if(grunt.config.get('env') === 'release') {
				grunt.task.run('uglify:indexJS');
				grunt.task.run('cssmin:indexCSS');
			} else {
				grunt.task.run('copy:indexJS');
				grunt.task.run('copy:indexCSS');
			}
		}
	);
	
	//generate version.js
	grunt.registerTask('generate_version',
		function() {
			var version = grunt.config.get('pkg.version');
			grunt.file.write('./html/version.js', 'function getWebAppVersion() { return \'' + version + '\'; }');
		}
	);
	
	// Compile task
	grunt.registerTask('compile', ['clean', 'shell:git_describe', 'generate_version', 'copy', 'extract-handlebars', 'handlebars', 'pre-preprocess', 'preprocess', 'concat', 'oversprite', 'imagemin', 'uglify', 'cssmin', 'htmlmin']);
 
	// Default task
	grunt.registerTask('default', ['release-env', 'jshint', 'csslint', 'compile', 'clean:release', 'validation']);
	
	// Release env
	grunt.registerTask('release', ['release-env', 'compile', 'clean:release', 'express-server', 'watch' ]);
	
	// Dev env
	grunt.registerTask('develop', ['debug-env', 'compile', 'express-server', 'watch']);
	
	// Package 
	grunt.registerTask('package', ['release-env', 'jshint', 'csslint', 'compile', 'clean:release', 'compress:release' ]);
};
