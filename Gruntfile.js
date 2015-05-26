module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    aws: grunt.file.readJSON('aws-auth.json'),
    aws_s3: {
      options: {
        accessKeyId: '<%= aws.key %>', // Use the variables
        secretAccessKey: '<%= aws.secret %>', // You can also use env variables
        region: '<%= aws.region %>',
        access: 'public-read',
        debug: false,
        uploadConcurrency: 5, // 5 simultaneous uploads
        downloadConcurrency: 5 // 5 simultaneous downloads
      },
      production: {
        options: {
          bucket: '<%= aws.bucket %>',
          differential: true // Only uploads the files that have changed
        },

        files: [
          {
            src: 'index.html',
            dest: 'index.html'
          },
          {
            src: 'lttp-tiles_2048x1024.png',
            dest: 'lttp-tiles_2048x1024.png'
          },
          {
            src: 'node_modules/stats.js/build/stats.min.js',
            dest: 'node_modules/stats.js/build/stats.min.js'
          },
          {
            src: 'three.js/build/three.js',
            dest: 'three.js/build/three.js'
          },
          {
            expand: true,
            cwd: 'src',
            src: ['**'],
            dest: 'src'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-aws-s3');

  grunt.registerTask('default', ['aws_s3']);
};
