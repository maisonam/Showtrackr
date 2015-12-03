var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var templateCache = require('gulp-angular-templatecache');
var uncss = require('gulp-uncss');
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
  browserSync.init({
    proxy: {
    target: "localhost"
  }
  });
});


gulp.task('sass', function() {
  gulp.src('public/stylesheets/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(csso())
    // .pipe(uncss({
    //     html: ['public/views/**/*.html']
    // }))
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(browserSync.stream({ once: true })); 
});

gulp.task('compress', function() {
  gulp.src([
    // 'public/vendor/angular.js',
    'public/vendor/*.js',
    'public/app.js',
    'public/services/*.js',
    'public/controllers/*.js',
    'public/filters/*.js',
    'public/directives/*.js'
  ])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public'))
    .pipe(browserSync.stream({ once: true }));    
});

gulp.task('templates', function() {
  gulp.src('public/views/**/*.html')
    .pipe(templateCache({ root: 'views', module: 'MyApp' }))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.stream({ once: true })); 
});

gulp.task('watch', ['browserSync'], function() {
  gulp.watch('public/stylesheets/*.scss', ['sass']);
  gulp.watch('public/views/**/*.html', ['templates']);
  gulp.watch(['public/**/*.js', '!public/app.min.js', '!public/templates.js', '!public/vendor'], ['compress']);
});



gulp.task('default', ['sass','compress','templates', 'watch']);