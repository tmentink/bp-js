// ------------------------------------------------------------------------
// Gruntfile
// ------------------------------------------------------------------------

module.exports = function(grunt) {
  "use strict"

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    version: "<%= pkg.version %>-alpha",
    banner: "/*!\n" +
            " * <%= pkg.name %> v<%= version %> (<%= pkg.homepage %>)\n" +
            " * Copyright <%= grunt.template.today('yyyy') %> <%= pkg.author %>\n" +
            " * Licensed under <%= pkg.license %>\n" +
            " */\n",
    dependencyCheck: "",
    closure: {
      start: "!function() {\n",
      end: "}()"
    },


    // --------------------------------------------------------------------
    // Grunt Tasks
    // --------------------------------------------------------------------

    babel: {
      js: {
        files: {
          "<%= concat.project.dest %>" : "<%= concat.project.dest %>"
        }
      }
    },
    clean: {
      js: ["<%= concat.project.dest %>"]
    },
    concat: {
      project: {
        src: ["src/js/vendor/jquery-shim.js"],
        dest: "src/js/main.js"
      }
    },
    eslint: {
      target: ["src/js/**/*.js"]
    },
    stamp: {
      project: {
        options: {
          banner: "<%= dependencyCheck %><%= closure.start %>",
          footer: "<%= closure.end %>"
        },
        files: {
          src: "<%= concat.project.dest %>"
        }
      }
    },
    uglify: {
      dev: {
        options: {
          banner: "<%= banner %>",
          beautify: true,
          compress: false,
          mangle: false,
          output: {
            indent_level: 2,
            comments: /\*/
          }
        },
        src: "<%= concat.project.dest %>",
        dest: "dist/<%= pkg.name %>.js",
      },
      dist: {
        options: {
          banner: "<%= banner %>"
        },
        src: "<%= concat.project.dest %>",
        dest: "dist/<%= pkg.name %>.min.js",
      }
    },
    watch: {
      js: {
        files: ["src/js/**/*.js"],
        tasks: ["concat", "stamp", "babel", "uglify:dev", "clean"]
      }
    }
  })

  require("load-grunt-tasks")(grunt)
  require("time-grunt")(grunt)

  grunt.registerTask("default", ["eslint", "concat", "babel", "stamp", "uglify", "clean"])
  grunt.registerTask("lint", ["eslint"])
}
