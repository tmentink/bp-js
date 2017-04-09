// ------------------------------------------------------------------------
// Gruntfile
// ------------------------------------------------------------------------

module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    banner: "/*!\n" +
                " * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n" +
                " * Copyright <%= grunt.template.today('yyyy') %> <%= pkg.author %>\n" +
                " * Licensed under <%= pkg.license %>\n" +
                " */\n",
    clean: {
      js: ["<%= concat.js.dest %>", "<%= ts.dev.dest %>", "<%= ts.dev.dest %>.map"]
    },
    concat: {
      js: {
        src: ["src/js/vendor/jquery-shim.js", "<%= ts.dev.dest %>"],
        dest: "src/js/main.js"
      }
    },
    ts: {
      options: {
        fast: "never",
        comments: true
      },
      dev: {
        src: ["src/ts/**/*.ts"],
        dest: "src/js/ts-compile.js"
      }
    },
    uglify: {
      dev: {
        options: {
          beautify: {
            beautify: true,
            indent_level: 2,
          },
          mangle: false,
          compress: false,
          banner: "<%= banner %>"
        },
        src: "<%= concat.js.dest %>",
        dest: "dist/<%= pkg.name %>.js",
      },
      dist: {
        options: {
          banner: "<%= banner %>"
        },
        src: "<%= concat.js.dest %>",
        dest: "dist/<%= pkg.name %>.min.js",
      }
    },
    watch: {
      js: {
        files: ["src/js/**/*.js"],
        tasks: ["concat", "uglify:dev"]
      },
      ts: {
        files: ["src/ts/**/*.ts"],
        tasks: ["ts:dev", "concat", "uglify:dev"]
      }
    }
  });

  require("load-grunt-tasks")(grunt);
  require("time-grunt")(grunt);

  grunt.registerTask("default", ["ts", "concat", "uglify", "clean"]);
  grunt.registerTask("ts-compile", ["ts"])
};

