var gulp = require('gulp');

var minifyCss = require('gulp-minify-css');

gulp.task('build_index', ['clean'], function() {
  var inline = require('gulp-inline')
    , uglify = require('gulp-uglify')
    , htmlmin = require('gulp-htmlmin');

  gulp.src('src/**/*.html')
    .pipe(inline({
      base: './',
      js: uglify,
      css: [minifyCss],
      disabledTypes: ['svg', 'img'],
      ignore: ['css/print.css']
    }))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('dist'));

});

gulp.task('copy_resources', ['clean'], function() {
  gulp.src(['src/img/*', 'src/views/images/*'], {base: './src/'})
    .pipe(gulp.dest('dist'));

  gulp.src('src/css/print.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('compress_images', ['clean'], function() {
  var responsive = require('gulp-responsive');
  var imagemin = require('gulp-imagemin');

  var config = {
    quality: 70,
    // Global configuration for all images
    // Use progressive (interlace) scan for JPEG and PNG output
    progressive: true,
    // Zlib compression level of PNG output format
    compressionLevel: 9,
    // Strip all metadata
    withMetadata: false,
      format: 'jpg'
  };

  gulp.src(['src/img/*.jpg'])
    .pipe(responsive({
      '*': {}
    }, config))
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));

  gulp.src('src/views/images/pizzeria.jpg')
    .pipe(responsive({
      '*': {},
    }, config))
    .pipe(imagemin())
    .pipe(gulp.dest('dist/views/images'));
});

gulp.task('clean', function () {
  var del = require('del');

  return del('dist/*');
});

gulp.task('default', [
    'build_index',
    'compress_images',
    'copy_resources'
]);
