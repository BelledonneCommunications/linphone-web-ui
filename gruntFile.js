/*global module:false*/
module.exports = function(grunt) {
	coreModules = [
		'linphone.core',
		'linphone.core.enums'
	],
	uiModules = [
		'linphone.ui',
		'linphone.ui.about',
		'linphone.ui.account',
		'linphone.ui.call',
		'linphone.ui.codec',
		'linphone.ui.locale', 
		'linphone.ui.media',
		'linphone.ui.menu',
		'linphone.ui.network',
		'linphone.ui.slider',
		'linphone.ui.video',
		'linphone.ui.i18n'
	],
	testModules = [
		'linphone.tests',
		'linphone.tests.files'
	],
	htmlModules = [
		'index_header',
		'index_divs',
		'index_scripts',
		'index_footer'
	],
	testsFiles = [
		'tests',
		'update'
	],

	coreJSFiles = coreModules.map(function(module) {
		return 'core/' + module + '.js';
	}).filter(function(file) {
		return grunt.file.exists(file)
	}),

	uiJSFiles = uiModules.map(function(module) {
		return 'ui/' + module + '.js';
	}).filter(function(file) {
		return grunt.file.exists(file)
	}),
	
	testsJSFiles = testModules.map(function(module) {
		return 'tests/' + module + '.js';
	}).filter(function(file) {
		return grunt.file.exists(file)
	}),

	uiCSSFiles = uiModules.map(function(module) {
		return 'ui/' + module + '.css';
	}).filter(function(file) {
		return grunt.file.exists(file)
	}),
	
	htmlFiles = htmlModules.map(function(module) {
		return 'html/' + module + '.html';
	}).filter(function(file) {
		return grunt.file.exists(file)
	}),
	
	testsHtmlFiles = testsFiles.map(function ( file ) {
		return 'html/' + file + '.html';
	}).filter(function(file) {
		return grunt.file.exists(file)
	}),
	
	// Project configuration.
	grunt.initConfig({
		env: 'debug',
		tmp: 'dist/',
		pkg: grunt.file.readJSON('package.json'),
		theme: 'default',
		meta: {
			version: '<%= pkg.version %>',
			banner: 
				'/*\n' +
				' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("isoDate") %>\n' +
				'<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
				' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
				' */\n\n'
		},
		jshint: {
			core: coreJSFiles,
			ui: uiJSFiles,
			tests: testsJSFiles,
		},
		csslint: {
			options: {
				'box-model': false,
				'duplicate-background-images': false,
				'important': false,
				'outline-none': false
			},
			ui: uiCSSFiles
		},
		htmlint: {
			files: ['test/**/*.html']
		},
		qunit: {
			files: ['test/**/*.html']
		},
		clean: {
			dist: {
				src: ['dist']
			},
			tmp: {
				src: ['tmp']
			},
			release: {
				src: ['dist/style/ui-lightness/jquery-ui-1.8.17.custom.css', 'dist/downloads']
			}
		},
		concat: {
			coreJS: {
				options: {
					stripBanners: true,
					banner: '<%= meta.banner %>'
				},
				dest: '<%= tmp %>/js/linphone-core-<%= pkg.version %>.js',
				src: [coreJSFiles]
			},
			uiJS: {
				options: {
					stripBanners: true,
					banner: '<%= meta.banner %>'
				},
				dest: '<%= tmp %>/js/linphone-ui-<%= pkg.version %>.js',
				src: [uiJSFiles]
			},
			testsJS: {
				options: {
					stripBanners: true,
					banner: '<%= meta.banner %>'
				},
				dest: '<%= tmp %>/js/linphone-tests.js',
				src: [testsJSFiles]
			},
			uiCSS: {
				options: {
					stripBanners: true,
					banner: '<%= meta.banner %>'
				},
				dest: '<%= tmp %>/style/linphone-ui-<%= pkg.version %>.css',
				src: [uiCSSFiles]
			},
			html: {
				dest: '<%= tmp %>/index-big.html',
				src: [htmlFiles]
			},
		},
		uglify: {
			options: {
				stripBanners: true,
				banner: '<%= meta.banner %>'
			},
			coreJS: {
				dest: 'dist/js/linphone-core-<%= pkg.version %>.min.js',
				src: ['<%= concat.coreJS.dest %>']
			},
			uiJS: {
				dest: 'dist/js/linphone-ui-<%= pkg.version %>.min.js',
				src: ['<%= concat.uiJS.dest %>']
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
		preprocess: {
			html: {
				src : '<%= concat.html.dest %>',
				dest: '<%= tmp %>/index-processed.html',
				options: {
					context: {
						env: '<%= env %>',
						version: '<%= pkg.version %>'
					}
				}
			}
		},
		cssmin: {
			options: {
				stripBanners: true,
				banner: '<%= meta.banner %>'
			},
			uiCSS: {
				src: ['<%= oversprite.uiCSS.csslist.dest %>'],
				dest: 'dist/style/linphone-ui-<%= pkg.version %>.min.css'
			},
			jQuery: {
				src: 'dist/style/ui-lightness/jquery-ui-1.8.17.custom.css',
				dest: 'dist/style/ui-lightness/jquery-ui-1.8.17.custom.min.css'
			}
		},
		imagemin: {
			options: {
				optimizationLevel: '<%= (env=="debug")?0:7 %>'
			},
			theme: {
				expand: true,
				src: [
					 '**'
				],
				cwd: 'dist/style/',
				dest: 'dist/style/'
			}
		},
		oversprite: {
			uiCSS: {
				spritelist: {
					algorithm: 'binary-tree',
					src: ['themes/' + '<%= theme %>/' + 'images/**/*.png'],
					dest: 'dist/style/images/sprite.png',
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
					 '**/*.gif'
				],
				cwd: 'themes/' + '<%= theme %>/',
				dest: 'dist/style/'
			},
			theme_flags: {
				expand: true,
				src: [
					 '**'
				],
				cwd: 'themes/' + '<%= theme %>/images/flags',
				dest: '<%= tmp %>/style/images/flags'
			},
			tests: {
				expand: true,
				src: testsFiles.map(function ( file ) {
					return file + '.html';
				}),
				cwd: 'html/', 
				dest: '<%= tmp %>/'
			},
			theme_png: {
				expand: true,
				src: [
					 '**/*.png'
				],
				cwd: 'themes/' + '<%= theme %>/',
				dest: '<%= tmp %>/style/'
			},
			lib: {
				expand: true,
				src: [
					 '**'
				],
				cwd: 'libs/',
				dest: 'dist/'
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
				tasks:  [ 'express-server', 'livereload' ]
			},
			coreJS: {
				files: coreJSFiles,
				tasks: ['concat:coreJS', 'uglify:coreJS']
			},
			uiJS: {
				files: uiJSFiles,
				tasks: ['concat:uiJS', 'uglify:uiJS']
			},
			testsJS: {
				files: testsJSFiles,
				tasks: 'concat:testsJS'
			},
			uiCSS: {
				files: uiCSSFiles,
				tasks: ['concat:uiCSS', 'cssmin:uiCSS']
			},
			html: {
				files: htmlFiles,
				tasks: ['concat:html', 'preprocess:html', 'htmlmin:html']
			},
			tests: {
				files: testsHtmlFiles,
				tasks: ['copy:tests']
			}
		},
		server : {
			script: ['server/server.js']
		},
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
				browser: true
			},
			globals: {}
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
		}
	});

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
	grunt.loadNpmTasks( 'grunt-preprocess' );
	grunt.loadNpmTasks( 'grunt-oversprite' );
	grunt.loadNpmTasks( 'grunt-contrib-compress' );
	
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
	
	// Compile task
	grunt.registerTask('compile', ['clean', 'copy', 'concat', 'oversprite', 'imagemin', 'preprocess', 'uglify', 'cssmin', 'htmlmin']);
 
	// Default task
	grunt.registerTask('default', ['release-env', 'jshint', 'csslint', 'compile']);
	
	// Release env
	grunt.registerTask('release', ['release-env', 'compile', 'clean:release', 'express-server', 'watch' ]);
	
	// Dev env
	grunt.registerTask('develop', ['debug-env', 'compile', 'express-server', 'watch']);
	
	// Package 
	grunt.registerTask('package', ['release-env', 'jshint', 'csslint', 'compile', 'clean:release', 'compress:release' ]);
};
