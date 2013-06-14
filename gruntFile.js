/*global module:false*/
module.exports = function(grunt) {
	coreModules = [
		'linphone.core',
		'linphone.core.enums'
	],
	uiModules = [
		'linphone.ui.base',
		'linphone.ui.header',
		'linphone.ui.menu',
		'linphone.ui.dialer',
		'linphone.ui.plugin',
		'linphone.ui.login',
		'linphone.ui.contacts',
		'linphone.ui.contact',
		'linphone.ui.history',
		'linphone.ui.call',
		'linphone.ui.conference',
		'linphone.ui.chat',
		'linphone.ui.settings',
		'linphone.ui.about',		
		'linphone.ui.incall',
		'linphone.ui.outcall',
		'linphone.ui.error'
	],
	htmlModules = [
		'index_header',
		'base',
		'plugin',
		'login',
		'contacts',
		'contact',
		'history',
		'call',
		'chat',
		'conference',
		'settings',
		'about',
		'incall',
		'outcall',
		'error',
		'index_footer'
	],

	coreJSFiles = coreModules.map(function(module) {
		return 'modules/' + module + '.js';
	}),

	uiJSFiles = uiModules.map(function(module) {
		return 'modules/' + module + '.js';
	}),

	uiCSSFiles = uiModules.map(function(module) {
		return 'modules/' + module + '.css';
	}),
	
	uiCSSFiles = uiCSSFiles.concat(uiModules.map(function(module) {
		return 'themes/<%= theme %>/' + module + '.css';
	})),
	
	htmlFiles = htmlModules.map(function(module) {
		return 'html/' + module + '.html';
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
		},
		csslint: {
			options: {
				'box-model': false,
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
					'!**/*.png',
					'!*.css'
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
			uiCSS: {
				files: uiCSSFiles,
				tasks: ['concat:uiCSS', 'cssmin:uiCSS']
			},
			html: {
				files: htmlFiles,
				tasks: ['concat:html', 'preprocess:html', 'htmlmin:html']
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

	/* Filter non existing files */
	function process_files(files) {
		var ret = Array();
		for(var i in files) {
			var file = files[i];
			file = grunt.config.process(file);
			if(grunt.file.exists(file)) {
				ret.push(file);
			}
		}
		return ret;
	}
	
	coreJSFiles = process_files(coreJSFiles)	
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
