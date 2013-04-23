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
    'linphone.ui.slider',
    'linphone.ui.video',
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

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    theme: 'default',
    meta: {
      version: '0.1.0',
      banner: '/*\n' +
	' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("isoDate") %>\n' +
        '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
	' */\n\n'
    },
    jshint: {
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
    nodeunit: {
      all: ['test/*.js']
    },
    concat: {
      options: {
        stripBanners: true,
        banner: "<%= meta.banner %>"
      },
      coreJS: {
        dest: 'dist/js/linphone-core.js',
        src: [coreJSFiles]
      },
      uiJS: {
        dest: 'dist/js/linphone-ui.js',
        src: [uiJSFiles]
      },
      uiCSS: {
        dest: 'dist/style/linphone-ui.css',
        src: [uiCSSFiles]
      }
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
           '**'
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
  grunt.loadNpmTasks( "tiny-lr" );

  // Default task.
  grunt.registerTask('compile', ['concat', 'uglify', 'cssmin', 'copy']);
 
  grunt.registerTask('default', ['concat', 'jshint', 'csslint', 'uglify', 'cssmin', 'copy']);
  
  grunt.registerTask('express', ['compile', 'express-server', 'watch' ]);
  
  // Dev mode
  grunt.registerTask('dev', ['compile', 'connect', 'watch']);
};
