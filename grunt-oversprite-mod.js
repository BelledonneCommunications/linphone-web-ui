var spritesmith = require( 'spritesmith' ),
    fs = require( 'fs' ),
    path = require( 'path' );

module.exports = function ( grunt ) {

    "use strict";
    // Export the SpriteMaker function
    grunt.registerMultiTask( 'oversprite_mod', 'Create sprites and updates css.', function () {
        var imageReplaces = [],
            that = this,
            done = this.async(),
            spritelist = [this.data.spritelist],
            csslist = [this.data.csslist],
            ifErrors = false;

        // Normalize data and validate paths of images

        for ( var i = 0; i < spritelist.length; i++ ) {

            spritelist[ i ].src =        grunt.file.expand( { nonull: true }, spritelist[ i ].src );
            spritelist[ i ].engine =     spritelist[ i ].engine || 'auto';
            spritelist[ i ].algorithm =  spritelist[ i ].algorithm || 'top-down';
            spritelist[ i ].exportOpts = spritelist[ i ].exportOpts || {};

            var tmpExt = path.extname( spritelist[ i ].dest );

            tmpExt = tmpExt.slice( 1, tmpExt.length );

            spritelist[ i ].exportOpts.format = spritelist[ i ].exportOpts.format || tmpExt;

            for ( var k = 0; k < spritelist[ i ].src.length; k++ ) {

                if ( !grunt.file.exists( spritelist[ i ].src[ k ] ) ) {

                    grunt.log.error( 'Image "' +  spritelist[ i ].src[ k ] + '" doesn\'t exist."' );

                    ifErrors = true;

                }

            }

        }

        // Check if css files exits

        for ( var m = 0; m < csslist.length; m++ ) {

            if ( !grunt.file.exists( csslist[ m ].src ) ) {

                grunt.log.error( 'Css "' +  csslist[ m ].src + '" doesn\'t exist."' );

                ifErrors = true;

            }

        }

        // If css or image files don't exists, throw error

        if ( ifErrors ) {

            done( false );

        }

        // Sprite creating function

        var _spriteSmithWrapper = function( config, callback ) {

			var base = ( config.base ) ? path.join( process.cwd(), config.base ) : false;
            var sprite = config.dest;

            delete config.sprite;

            spritesmith( config, function ( err, result ) {

                if ( err ) {

                    grunt.fatal( err );

                    return callback( err );

                }

                else {

                    grunt.file.write( sprite, result.image, { encoding: 'binary' } );

                    var tmpResult = result.coordinates;

                    for ( var key in result.coordinates ) {

                        var newKey = path.normalize(( base ) ? path.relative( base, key ) : path.relative( process.cwd(), key )).replace( /\\/ig, '/' );

                        imageReplaces[ newKey ] = tmpResult[ key ];

                        imageReplaces[ newKey ].sprite = path.join( process.cwd(), sprite );

                    }

                    callback( false );

                }

            } );

        };

        // Path resolving function

        var _insertSprites = function ( css ) {
            var regex     = new RegExp( 'background-image:[\\s]?url\\(["\']?(?!http[s]?|/)([\\w\\d\\s!./\\-\\_]*\\.[\\w?#]+)["\']?\\)[^;]*;', 'ig' ),
                dir       = process.cwd(),
				base      = ( css.base ) ? path.join( dir, css.base ) : false,
                data      = grunt.file.read( css.src ),
                resources = data.match( regex ),
                pathToResource,
                absolutePath,
                newPath,
                img;
            if ( resources !== null ) {

                for ( var x = 0; x < resources.length; x++ ) {

                    pathToResource = resources[x].replace( regex, '$1' );
                    if ( imageReplaces[ pathToResource ] !== undefined ) {

                        img = imageReplaces[ pathToResource ];
                        newPath = ( base ) ? path.relative( base, img.sprite ) : path.relative( dir, img.sprite );
                        newPath = newPath.replace( /\\/ig, '/' );
                        data = data.replace( resources[x], 'background-image: url("' + newPath + '"); background-position: ' +  img.x + 'px -' + img.y + 'px;' );
                    }

                }

            }

            grunt.file.write( css.dest, data );

            return;
        };

        // Process starter

        grunt.util.async.forEach( [this.data.spritelist], _spriteSmithWrapper, function( err ) {

            for ( var j = 0; j < [that.data.csslist].length; j++ ) {

                _insertSprites( [that.data.csslist][ j ] );

            }

            done();

        } );

    } );

};
