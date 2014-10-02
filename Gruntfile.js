'use strict';

module.exports = function(grunt) {
	var config = {
		express: {
			options: {
				script: 'app',
				port: 9001
			},

			prod: {
				options: {
					node_env: "production",
					background: false
				}
			},

			dev: {
				options: {
					node_env: "development",
					output: "Express server listening on port .+",
					debug: true
				}
			}
		},

		compass: {
			dist: {
				options: {
					outputStyle: 'compact',

					// Directory configuration
					sassDir: 'sass',

					cssDir: 'public/assets',
					imagesDir: 'public/images',

					httpImagesPath: '/images',
					generatedImagesDir: 'public/assets/images',
					httpGeneratedImagesPath: '/assets/images'
				}
			}
		},


		browserify: {
			dist: {
				options: {
					watch: true,
					debug: true,
					transform: [
						"reactify"
					]
				},
				files: {
					'public/assets/roguish.js': 'app/application.jsx'
				}
			}
		},

		uglify: {
			dist: {
				files: {
					'public/assets/roguish.js': 'public/assets/roguish.js'
				}
			}
		},

		watch: {
			express: {
				files: ["app/**/*"],
				tasks: ["express:dev"],
				options: {
					spawn: false,
					atBegin: true
				}
			},
			compass: {
				files: ["sass/**/*"],
				tasks: ["compass"]
			}
		}
	};

	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');

	grunt.registerTask('dev', ['browserify', "watch"]);
	grunt.registerTask('prod', ['compass', 'browserify:prod', 'uglify', "express:prod"]);

	grunt.registerTask('default', ['dev']);

	grunt.initConfig(config);
};
