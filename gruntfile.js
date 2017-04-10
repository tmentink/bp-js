// ------------------------------------------------------------------------
// Gruntfile
// ------------------------------------------------------------------------

module.exports = function(grunt) {
  "use strict"

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    banner: "/*!\n" +
                " * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n" +
                " * Copyright <%= grunt.template.today('yyyy') %> <%= pkg.author %>\n" +
                " * Licensed under <%= pkg.license %>\n" +
                " */\n",
    babel: {
      js: {
        files: {
          "<%= concat.js.dest %>" : "<%= concat.js.dest %>"
        }
      }
    },
    clean: {
      js: ["<%= concat.js.dest %>"]
    },
    concat: {
      js: {
        src: ["src/js/vendor/jquery-shim.js"],
        dest: "src/js/main.js"
      }
    },
    eslint: {
      target: ["src/js/**/*.js"]
    },
    uglify: {
      dev: {
        options: {
          banner: "<%= banner %>",
          beautify: {
            beautify: true,
            indent_level: 2,
          },
          compress: false,
          mangle: false,
          preserveComments: /\*/
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
        tasks: ["concat", "babel", "uglify:dev"]
      }
    }
  })

  require("load-grunt-tasks")(grunt)
  require("time-grunt")(grunt)

  grunt.registerTask("default", ["eslint", "concat", "babel", "uglify", "clean"])
  grunt.registerTask("lint", ["eslint"])
}
