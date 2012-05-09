/*global module:false*/
module.exports = function(grunt) {
var 
  theme = 'default',

  coreModules = [
    'linphone.core',
    'linphone.core.enums'
  ],
  uiModules = [
    'linphone.ui',
    'linphone.ui.account',
    'linphone.ui.codec',
    'linphone.ui.slider',
    'linphone.ui.i18n'
  ],

  coreJSFiles = coreModules.map(function( module ) {
        return 'core/' + module + '.js';
  }),

  uiJSFiles = uiModules.map(function( module ) {
	return 'ui/' + module + '.js';
  }),

  uiCSSFiles = uiModules.map(function( module ) {
        return 'ui/' + module + '.css';
  });

  function stripBanner( files ) {
	return files.map(function( file ) {
		return file;
		//return '<strip_all_banners:' + file + '>';
	});
  };

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      version: '0.1.0',
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    lint: {
      core: coreJSFiles,
      ui: uiJSFiles
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
	src: ['<banner:meta.banner>', stripBanner(coreJSFiles)],
        dest: 'dist/js/linphone-core.js'
      },
      uiJS: {
        src: ['<banner:meta.banner>', stripBanner(uiJSFiles)],
        dest: 'dist/js/linphone-ui.js'
      },
      uiCSS: {
        src: ['<banner:meta.banner>', stripBanner(uiCSSFiles)],
        dest: 'dist/style/linphone-ui.css'
      }
    },
    min: {
      coreJS: {
        src: ['<config:concat.coreJS.dest>'],
        dest: 'dist/js/linphone-core.min.js'
      },
      uiJS: {
        src: ['<config:concat.uiJS.dest>'],
        dest: 'dist/js/linphone-ui.min.js'
      }
   },
   cssmin: {
      uiCSS: {
        src: ['<config:concat.uiCSS.dest>'],
        dest: 'dist/style/linphone-ui.min.css'
      }
   },
   copy: {
      theme: {
	src: [
           'themes/' + theme + '/**'
        ],
	strip: 'themes/' + theme,
	dest: 'dist/style/'
      },
      lib: {
        src: [
           'libs/**'
        ],
        strip: 'libs/',
        dest: 'dist/'
      },
      html: {
	src: [
           'html/**'
        ],
        strip: 'html/',
        dest: 'dist/'
      }
    },
    watch: {
      coreJS: {
        files: coreJSFiles,
        tasks: 'concat:coreJS'
      },
      uiJS: {
        files: uiJSFiles,
        tasks: 'concat:uiJS'
      },
      uiCSS: {
        files: uiCSSFiles,
        tasks: 'concat:uiCSS'
      },
      html: {
        files: 'html/**',
        tasks: 'copy:html'
      }
    },
    server: {
      port: 8000,
      base: 'dist/'
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
    uglify: {}
  });

  // csslint and cssmin tasks
  grunt.loadNpmTasks('grunt-css');

  // html validation task
  grunt.loadNpmTasks( "grunt-html" );  

  // Default task.
  grunt.registerTask('compile', 'concat min cssmin copy');
 
  grunt.registerTask('default', 'concat lint csslint min cssmin copy');
 
  // Dev mode
  grunt.registerTask('dev', 'compile server watch');
  
  grunt.registerMultiTask('copy', 'Copy files to destination folder and replace @VERSION with pkg.version', function() {
	function replaceVersion( source ) {
		return source.replace( /@VERSION/g, grunt.config( "pkg.version" ) );
	}
	function copyFile( src, dest ) {
		if ( /(js|css)$/.test( src ) ) {
			grunt.file.copy( src, dest, {
				process: replaceVersion
			});
		} else {
			grunt.file.copy( src, dest );
		}
	}
	var files = grunt.file.expandFiles( this.file.src ),
		target = this.file.dest + '/',
		strip = this.data.strip,
		renameCount = 0,
		fileName;
	if ( typeof strip === 'string' ) {
		strip = new RegExp( '^' + grunt.template.process( strip, grunt.config() ).replace( /[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&' ) );
	}
	files.forEach(function( fileName ) {
		var targetFile = strip ? fileName.replace( strip, '' ) : fileName;
		copyFile( fileName, target + targetFile );
	});
	grunt.log.writeln( 'Copied ' + files.length + ' files.' );
	for ( fileName in this.data.renames ) {
		renameCount += 1;
		copyFile( fileName, target + grunt.template.process( this.data.renames[ fileName ], grunt.config() ) );
	}
	if ( renameCount ) {
		grunt.log.writeln( 'Renamed ' + renameCount + ' files.' );
	}
 });

};
