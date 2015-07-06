module.exports = function(grunt){
    grunt.initConfig({
        useminPrepare : {
            html: '{,*/}*.html',
            options:{
                dest:'dist',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            }
        },
        uglify: {
            options: {
                report: 'min',
                mangle: false
            }
        },
        cssmin: {
            options: {
                noAdvanced: true
            }
        },
        usemin: {
            html:['dist/{,*/}*.html'],
            options: {
                assetsDirs: ['dist']
            }
        },
        copy: {
            task0: {
                src: [
                    '.htaccess',
                    'startup.sh',
                    '*.{ico,png,txt}',
                    '*.html'
/*                    'assets/{,**//*}*.*',
                    'assets/.gitignore',
                    'framework/{,**//*}*.*',
                    'protected/{,**//*}*.*',
                    'resources/{,**//*}*.*',
                    'themes/{,**//*}*.*',
                    'themes/classic/views/.htaccess'*/
                ],
                dest: 'dist/'
            }
        },
        filerev: {
            dist: {
                src: [
                    'dist/lib/{,**//*}*.js',
                    'dist/lib/{,**//*}*.css'
                ]
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        'dist'
                    ]
                }]
            },
            server: '.tmp'
        },
        watch:{
            options: {
                livereload: true
            }
        },
        express: {
            all: {
                options: {
                    port:9001,
                    hostname: '*',
                    bases:['.'],
                    livereload: true
                }
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                },
                reporter: require('jshint-stylish')
            },
            all: ['lib/{,**//*}*.js']
        },
        jslint: { // configure the task
            // lint your project's client code
            all: {
                src: [
                    'lib/{,**//*}*.js'
                ],
                directives: {
                    browser: true,
                    predef: [
                        'jQuery',
                        '$'
                    ]
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');

    grunt.registerTask(['jshint','all']);
    grunt.registerTask(['jslint','all']);
    grunt.registerTask('server', [
        'express','watch'
    ]);
    grunt.registerTask('build', [
        'clean:server',
        'clean:dist',
        'copy:task0',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin'
    ]);
    grunt.registerTask('clear', [
        'clean:server',
        'clean:dist'
    ]);
}