/*global module:false*/
var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path');
module.exports = function(grunt) {
	coreModules = [
		'linphone.core',
		'linphone.core.enums'
	],
	uiModules = [
		'linphone.ui',
		'linphone.ui.i18n',
		'linphone.ui.locale',
		'linphone.ui.header',
		'linphone.ui.menu',
		'linphone.ui.mainbar',
		'linphone.ui.dialer',
		'linphone.ui.view',
		'linphone.ui.view.plugin',
		'linphone.ui.view.login',
		'linphone.ui.view.contacts',
		'linphone.ui.view.contact',
		'linphone.ui.view.history',
		'linphone.ui.view.call',
		'linphone.ui.view.conference',
		'linphone.ui.view.chat',
		'linphone.ui.view.settings',
		'linphone.ui.view.about',
		'linphone.ui.popup',
		'linphone.ui.popup.incall',
		'linphone.ui.popup.outcall',
		'linphone.ui.popup.error'
	],
	htmlFiles = [
		'index',
	],

	/* JS files */
	coreJSFiles = coreModules.map(function(module) {
		return 'modules/' + module + '.js';
	}),

	uiJSFiles = uiModules.map(function(module) {
		return 'modules/' + module + '.js';
	}),
	/* ********** */
	
	/* CSS files */
	uiCSSFiles = uiModules.map(function(module) {
		return 'modules/' + module + '.css';
	}),
	
	uiCSSFiles = uiCSSFiles.concat(uiModules.map(function(module) {
		return 'themes/<%= theme %>/' + module + '.css';
	})),
	/* ********** */
	
	/* HTML files */
	htmlFiles = htmlFiles.map(function(module) {
		return 'html/' + module + '.html';
	}),
	
	htmlFiles = htmlFiles.concat(uiModules.map(function(module) {
		return 'modules/' + module + '.html';
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
				'/*\n' +
				' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("isoDate") %>\n' +
				'<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
				' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
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
				globals: {}
			},
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
				src: ['dist/style/ui-lightness/jquery-ui-1.8.17.custom.css', 'dist/downloads', 'dist/js/handlebars.js']
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
			uiTmplJS: {
				options: {
					stripBanners: true,
					banner: '<%= meta.banner %>'
				},
				dest: '<%= tmp %>/js/linphone-ui-tmpl-<%= pkg.version %>.js',
				src: ['<%= handlebars.uiTmplJS.dest %>']
			},
			allJS: {
				options: {
					stripBanners: true,
					banner: '<%= meta.banner %>'
				},
				dest: '<%= tmp %>/js/linphone-<%= pkg.version %>.js',
				src: [coreJSFiles, uiJSFiles, '<%= handlebars.uiTmplJS.dest %>']
			},
			uiCSS: {
				options: {
					stripBanners: true,
					banner: '<%= meta.banner %>'
				},
				dest: '<%= tmp %>/style/linphone-ui-<%= pkg.version %>.css',
				src: [uiCSSFiles]
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
			},
			allJS: {
				dest: 'dist/js/linphone-<%= pkg.version %>.min.js',
				src: ['<%= concat.allJS.dest %>']
			},
			uiTmplJS: {
				dest: 'dist/js/linphone-ui-tmpl-<%= pkg.version %>.min.js',
				src: ['<%= concat.uiTmplJS.dest %>']
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
			html: {
				src : 'html/index.html',
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
			html: {
				files: htmlFiles,
				tasks: ['preprocess:html', 'htmlmin:html', 'extract-handlebars', 'handlebars']
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
	grunt.loadNpmTasks( 'grunt-contrib-compress' );
	grunt.loadNpmTasks( 'grunt-contrib-handlebars' );
	grunt.loadNpmTasks( 'grunt-preprocess' );
	grunt.loadNpmTasks( 'grunt-oversprite' );
	grunt.loadNpmTasks( 'grunt-html-validation' );
	
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
						var filename = path.normalize(grunt.template.process('<%= tmp %>/' + name + '.hbs'));
						grunt.log.writeln(name  + " ->  " + filename);
						fs.writeFileSync(filename, content, 'utf8');
					}
				);
			});
		}
	);
	
	// Compile task
	grunt.registerTask('compile', ['clean', 'copy', 'extract-handlebars', 'handlebars', 'preprocess', 'concat', 'oversprite', 'imagemin', 'uglify', 'cssmin', 'htmlmin']);
 
	// Default task
	grunt.registerTask('default', ['release-env', 'jshint', 'csslint', 'compile', 'clean:release', 'validation']);
	
	// Release env
	grunt.registerTask('release', ['release-env', 'compile', 'clean:release', 'express-server', 'watch' ]);
	
	// Dev env
	grunt.registerTask('develop', ['debug-env', 'compile', 'express-server', 'watch']);
	
	// Package 
	grunt.registerTask('package', ['release-env', 'jshint', 'csslint', 'compile', 'clean:release', 'compress:release' ]);
};
