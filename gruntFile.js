module.exports = function(grunt) {
  var style = require("grunt-cmd-transport").style.init(grunt);
	var css2jsParser = style.css2jsParser;
  
  
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    imgAbsoluteAdress :"http://wres.mangocity.com/js/lib/<%= pkg.name %>/<%= pkg.version %>/img/",
    transport:{
	     options :{
		   idleading:'<%= pkg.name %>/<%= pkg.version %>/',
		   debug:false
	    },
	   chain :{
	    files: [{
                cwd: 'src',
                src: '*.js',
                dest: 'temp'
            }]
	   },
	   css: {
			options: {
			  parsers: {
			    '.css': [css2jsParser],
			 }
			},
			files: [{
			  cwd: 'css',
			  src: '*.css',
			  dest: 'temp'
			}]
        }
	},
	uglify: {
		options: {
      banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
		},
		build: {
			files:{
				"dist/<%= pkg.name %>.js":["temp/*.js"]
			}
      }
    }
	
  });


  grunt.registerTask("replace","change the img relative url to absoute url", function(){
   var data = grunt.file.read("./temp/"+ grunt.config.get("pkg.name") +".css.js");
		data = data.replace(/url\(..\/img\//g,function(){
			return "url\("+grunt.config.get("imgAbsoluteAdress");
		});
		
		grunt.file.write("./temp/"+ grunt.config.get("pkg.name") +".css.js", data);
  });
  
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Default task(s).
  grunt.registerTask('default', ['transport', "replace", "uglify"]);

};