'use strict';

module.exports = function(grunt) {

grunt.loadNpmTasks('grunt-contrib-uglify');	//compress javascript
grunt.loadNpmTasks('grunt-contrib-concat');	//concatenate files
grunt.loadNpmTasks('grunt-contrib-clean');	//delete files in dist
grunt.loadNpmTasks('grunt-contrib-jshint');	//VALID JAVASCRIPT
grunt.loadNpmTasks('grunt-contrib-copy');	//MOVE FILES

grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	clean: {
		js: {
			src: ['dist/*.js']
		}	
	},
	jshint: {
		options: {
			globals: {
				console: true,
				module: true
			},
			"-W099": true,	//ignore tabs and space warning
			"-W044": true,	//ignore regexp
			"-W033": true
		},
		files: ['js/pivot.js']
	},
	copy: {
		fenixmapconfig: {
			nonull: true,
			src: 'src/FenixMapConfig.js',
			dest: 'dist/fenix-ui-map-config.js'
		},
		imageslayers: {
			nonull: true,
			expand: true,
			cwd: "src/css/images/",
			src: '**',
			dest: "dist/images/"
		},
		i18n: {
			nonull: true,
			expand: true,
			cwd: 'src/i18n/',
			src: '*',
			dest: 'dist/i18n/'
		}		
	},
	concat: {
		options: {
			separator: ';\n',
			stripBanners: {
				block: true
			}
		},
		fenixmap: {
			src: [
				'src/FenixMap.js',
				'src/core/Class.js',
				'src/core/Util.js',
				'src/core/HashMap.js',
				//TODO move to lib
				'src/core/UIUtils.js',
				'src/core/WMSUtils.js',
				'src/core/fullScreenApi.js',
				//TODO move to lib
				'src/map/config/*.js',
				'src/map/Map.js',
				'src/map/utils/LayerLegend.js',
				'src/map/controller/MapControllerDraggable.js',
				'src/map/html/gui-controller.js',
				'src/map/html/gui-map.js',
				'src/map/utils/*.js ',
				'src/map/layer/*.js'
			],
			dest: 'dist/fenix-ui-map.src.js'
		}
	},
	uglify: {
		fenixmap: {
			files: {
				'dist/pivot.min.js': ['js/pivot.js']
			}
		}
	}
});

grunt.registerTask('default', [
	//'jshint',
	'clean',
	//'concat:fenixmap',
	'uglify',
	//'jsonlint',	
	//'copy'
]);

};