module.exports = function(grunt) {
	grunt.initConfig({
		project: grunt.file.readJSON('project.json'),
		concat: {
			js: {
				options: {
					separator: ';'
				},
				files: '<%= project.js %>',
				nonull: true
			}
		},
		less: {
			options: {
				cleancss: true
			},
			style: {
				files: '<%= project.less %>'
			}
		},
		uglify: {
			options: {
				mangle: false
			},
			js: {
				files: '<%= project.js %>'
			}
		},
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: '<%= project.src %>img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: '<%= project.dest %>img/'
				}]
			}
		},
		sprite: {
			normal: '<%= project.sprite %>'
		},
		copyto: {
			stuff: {
				files: [
					{
						cwd:'<%= project.src %>',
						src: ['**/*'],
						dest: '<%= project.dest %>'
					}
				],
				options: {
					ignore: [
						'<%= project.src %>js{,/**/*}',
						'<%= project.src %>less{,/**/*}',
						'<%= project.src %>sprite{,/**/*}'
					]
				}
			}
		},
		connect: {
			server: {
				options: {
					port: '<%= project.server.port %>',
					base: '<%= project.dest %>',
					hostname: '<%= project.server.host %>',
					keepalive: true
				}
			}
		},
		watch: {
			js: {
				files: ['<%= project.src %>**/*.js'],
				tasks: ['concat:js','uglify'],
				options: {
					livereload: true,
					atBegin: true,
					interval: 500
				}
			},
			css: {
				files: ['<%= project.src %>less/*.less'],
				tasks: ['less:style'],
				options: {
					livereload: true,
					atBegin: true,
					interval: 500
				}
			},
			spritegeneration: {
				files: ['<%= project.src %>sprite/**/*'],
				tasks: ['sprite'],
				options: {
					livereload: true,
					atBegin: true,
					interval: 500
				}
			},
			copyto: {
				files: ['<%= project.src %>**/*','!<%= project.src %>**/*.{png,jpg,gif,less,js}'],
				tasks: ['copyto:stuff'],
				options: {
					livereload: true,
					atBegin: true,
					interval: 500
				}
			}
		}
	});

	grunt.event.on('watch', function(action, filepath, target) {
		var notify = require('./node_modules/grunt-notify/lib/notify-lib.js');
		notify({message: filepath + ' has ' + action});
	});

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-spritesmith');
	grunt.loadNpmTasks('grunt-copy-to');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('dev', ['watch']);
	grunt.registerTask('build', ['copyto','less','uglify:js','imagemin','sprite']);
};
