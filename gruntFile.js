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
		'index_<%= mode %>_header',
		'index_divs',
		'index_scripts',
		'index_<%= mode %>_footer'
	],
	
	coreJSFiles = coreModules.map(function( module ) {
		return 'core/' + module + '.js';
	}),

	uiJSFiles = uiModules.map(function( module ) {
		return 'ui/' + module + '.js';
	}),
	
	testsJSFiles = testModules.map(function( module ) {
		return 'tests/' + module + '.js';
	}),

	uiCSSFiles = uiModules.map(function( module ) {
		return 'ui/' + module + '.css';
	}),
	
	htmlFiles = htmlModules.map(function( module ) {
		return 'html/' + module + '.html';
	}),

	// Project configuration.
	grunt.initConfig({
		mode: 'debug',
		pkg: grunt.file.readJSON('package.json'),
		theme: 'default',
		meta: {
			version: '0.1.0',
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
			files: [] + uiCSSFiles
		},
		htmlint: {
			files: ['test/**/*.html']
		},
		qunit: {
			files: ['test/**/*.html']
		},
		concat: {
			coreJS: {
				options: {
					stripBanners: true,
					banner: "<%= meta.banner %>"
				},
				dest: 'dist/js/linphone-core.js',
				src: [coreJSFiles]
			},
			uiJS: {
				options: {
					stripBanners: true,
					banner: "<%= meta.banner %>"
				},
				dest: 'dist/js/linphone-ui.js',
				src: [uiJSFiles]
			},
			testsJS: {
				options: {
					stripBanners: true,
					banner: "<%= meta.banner %>"
				},
				dest: 'dist/js/linphone-tests.js',
				src: [testsJSFiles]
			},
			uiCSS: {
				options: {
					stripBanners: true,
					banner: "<%= meta.banner %>"
				},
				dest: 'dist/style/linphone-ui.css',
				src: [uiCSSFiles]
			},
			html: {
				dest: 'dist/index-big.html',
				src: [htmlFiles]
			},
		},
		uglify: {
			options: {
				stripBanners: true,
				banner: "<%= meta.banner %>"
			},
			coreJS: {
				dest: 'dist/js/linphone-core.min.js',
				src: ['<%= concat.coreJS.dest %>']
			},
			uiJS: {
				dest: 'dist/js/linphone-ui.min.js',
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
				src: ['<%= concat.html.dest %>']
			}
		},
		cssmin: {
			options: {
				stripBanners: true,
				banner: "<%= meta.banner %>"
			},
			uiCSS: {
				src: ['<%= concat.uiCSS.dest %>'],
				dest: 'dist/style/linphone-ui.min.css'
			}
		},
		copy: {
			theme: {
				expand: true,
				src: [
					 '**'
				],
				cwd: 'themes/' + "<%= theme %>/",
				dest: 'dist/style/'
			},
			lib: {
				expand: true,
				src: [
					 '**'
				],
				cwd: 'libs/',
				dest: 'dist/'
			},
		html: {
				expand: true,
				src: [
					'tests.html'
				],
				cwd: 'html/',
				dest: 'dist/'
			}
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
				tasks: ['concat:html', 'htmlmin:html']
			},
		},
		connect: {
			server: {
				options: {
					port: 8888,
					base: 'dist/'
				}
			}
		},
		server : {
			script: 'server/server.js'
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
		}
	});

	// Load NPM Tasks
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-contrib-concat" );
	grunt.loadNpmTasks( "grunt-contrib-connect" );
	grunt.loadNpmTasks( "grunt-contrib-csslint" );
	grunt.loadNpmTasks( "grunt-contrib-cssmin" );
	grunt.loadNpmTasks( "grunt-contrib-htmlmin" );
	grunt.loadNpmTasks( "grunt-contrib-copy" );
	grunt.loadNpmTasks( "grunt-contrib-nodeunit" );
	grunt.loadNpmTasks( "grunt-contrib-watch" );
	grunt.loadNpmTasks( "grunt-express-server" );
	grunt.loadNpmTasks( "grunt-contrib-livereload");

	// Modes
	grunt.registerTask('debug-mode', function () {grunt.config.set('mode', 'debug');});
	grunt.registerTask('release-mode', function () {grunt.config.set('mode', 'release');});
	
	// Compile task
	grunt.registerTask('compile', ['concat', 'uglify', 'cssmin', 'htmlmin', 'copy']);
 
	// Default task
	grunt.registerTask('default', ['release-mode', 'jshint', 'csslint', 'compile']);
	
	// Release mode
	grunt.registerTask('release', ['release-mode', 'compile', 'express-server', 'watch' ]);
	
	// Dev mode
	grunt.registerTask('develop', ['debug-mode', 'compile', 'express-server', 'watch']);
};
