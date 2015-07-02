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
		autoprefixer: {
      options: {
        cascade: false,
        browsers: ['last 2 version', '> 10%', 'ie 9']
      },
      dist: {
        src: '<%= project.dest %>css/*.css'
      }
    },
    cssmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= project.dest %>css/',
          src: ['**/*.css'],
          dest: '<%= project.dest %>css/'
        }]
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
					cwd: '<%= project.src %>/assets/img/',
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
						cwd:'<%= project.src %>/public/',
						src: ['**/*'],
						dest: '<%= project.dest %>'
					}
				]
			}
		},
		connect: {
			server: {
				options: {
					port: '<%= project.server.port %>',
					base: '<%= project.dest %>',
					hostname: '<%= project.server.host %>',
					keepalive: true,
					open: true
				}
			}
		},
		watch: {
			js: {
				files: ['**/*.js'],
				tasks: ['concat:js','uglify'],
				options: {
					cwd: '<%= project.src %>/assets/js/',
					livereload: true,
					atBegin: true
				}
			},
			css: {
				files: ['**/*.less'],
				tasks: ['less:style'],
				options: {
					cwd: '<%= project.src %>/assets/less/'
					livereload: true,
					atBegin: true
				}
			},
			spritegeneration: {
				files: ['**/*'],
				tasks: ['sprite'],
				options: {
					cwd: '<%= project.src %>/assets/sprite/'
					livereload: true,
					atBegin: true
				}
			},
			copyto: {
				files: ['**/*'],
				tasks: ['copyto:stuff'],
				options: {
					cwd: '<%= project.src %>/public/'
					livereload: true,
					atBegin: true
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
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-autoprefixer');

	grunt.registerTask('dev', ['watch','connect']);
	grunt.registerTask('build', ['copyto','less','concat','autoprefixer','imagemin','sprite','cssmin','uglify:js','connect']);
};
