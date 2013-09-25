Linphone Web Ui
===============

Prerequisites
-------------

* graphicsmagick
* MACOSX: put pngquant binary from http://pngquant.org/pngquant.tar.bz2 into the PATH  

Grunt 
-----

The web project use [grunt](http://gruntjs.com/) for generate Web resources.
(depends on npm). You also have to install grunt with the
following command:

    npm install -g grunt-cli

    npm install

When theses tools are installed you have to "compile" the Web project using
the following command in the `./Web/` directory:

    grunt


### Development
You can use the grunt argument *develop* in order to create a server at
[http://localhost:9999](http://localhost:9999) exposing the web resources
using the following command:

    grunt develop


### Package
You can create a package with the argument *package* using the following
command:

    grunt package

