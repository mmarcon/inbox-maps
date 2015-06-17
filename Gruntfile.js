var manifest = require('./manifest');

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js', 'content.js', 'scripts/**/*.js'],
            options: {
                jshintrc: true
            }
        },
        uglify: {
            options: {
                report: 'min',
                screwIE8: true
            },
            inboxmaps: {
                files: {
                    'dist/content.min.js': manifest.content_scripts[0].js
                }
            }
        },
        manifest: {
            dist: {
                dest: 'dist/manifest.json',
                source: manifest,
                replacer: function(key, value){
                    if(key !== 'content_scripts') {
                        return value;
                    }
                    value[0].js = ['content.min.js'];
                    return value;
                }
            }
        },
        copy: {
            assets: {
                src: 'assets/*',
                dest: 'dist/',
            }
        }
    });

    grunt.registerMultiTask('manifest', 'Makes the dist version of the manifest', function(){
        var data = this.data;
        grunt.file.write(data.dest, JSON.stringify(data.source, data.replacer, 2));
    });

    grunt.registerTask('dist', 'Makes the dist version of the extension', ['jshint', 'uglify', 'manifest', 'copy']);
};