var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');
var uglifycss = require('gulp-uglifycss'); 
var imagemin = require('gulp-imagemin');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();

//SCSS
gulp.task('sass', function () {
  return gulp.src([
    'node_modules/bootstrap/scss/*.scss', 
    'node_modules/bootstrap-select/sass/bootstrap-select.scss',
    'node_modules/animate.css/animate.css',
    'node_modules/ekko-lightbox/dist/ekko-lightbox.css',
    './src/scss/**/*.scss'
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(uglifycss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream());
});

//IMAGES
gulp.task('imagemin', function() {
    return gulp.src('./src/images/*')
        //.pipe(imagemin())
        .pipe(imagemin({
  		    interlaced: true,
  		    optimizationLevel: 5,
  		    progressive: true
		    }))
        .pipe(gulp.dest('./dist/images'))
});

//LIBS
gulp.task('lib', function(){
	return gulp.src([
		'node_modules/jquery/dist/jquery.js',    
    'node_modules/bootstrap-select/dist/js/bootstrap-select.js',
		'node_modules/popper.js/dist/umd/popper.js',
		'node_modules/bootstrap/dist/js/bootstrap.js',
    'node_modules/@fortawesome/fontawesome-free/js/all.js',  
    'node_modules/ekko-lightbox/dist/ekko-lightbox.min.js',
    'node_modules/jquery/dist/jquery.js'     
		])
	.pipe(concat('lib.js'))
	//.pipe(jsmin())	
	.pipe(gulp.dest('./dist/js/'));
});

//Fonts
gulp.task('fonts', function() {
  return gulp.src([    
    'node_modules/@fortawesome/fontawesome-free/css/all.css',
    'node_modules/@fortawesome/fontawesome-free/webfonts/**/*',    
  ])
  .pipe(gulp.dest('dist/fonts'))
});

//JS
gulp.task('js', function(){
	return gulp.src(['./src/js/functionsProject.js'])
	.pipe(concat('app.js'))
	.pipe(jsmin())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./dist/js/'));
});

//HTML
gulp.task('html', function() {
  return gulp.src('./src/*.html')
  .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['sass', 'imagemin', 'html', 'lib', 'js']);


// WATCH
gulp.task('watch', function() {
	  gulp.watch('./src/images/**/*', ['imagemin'] );
    gulp.watch('./src/scss/*.scss', ['sass'] );
    gulp.watch('./src/js/*.js', ['lib', 'js'] );
    gulp.watch('./src/*.html', ['html'] );

    browserSync.init('./src/**/*', {
    	server: { baseDir: './dist' }
  	});
});
