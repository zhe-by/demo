/*jshint node:true*/
'use strict';

var gulp = require('gulp');
var stylus = require('gulp-stylus');
var nib = require('nib');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');

gulp.task('dev:css', function stylusBuild() {
    return gulp.src('static/styles/main.styl')
        .pipe(stylus({
            errors: true,
            use: [nib()]
        }))
        .pipe(rename('build.css'))
        .pipe(gulp.dest('static'))
        .pipe(livereload());
});

gulp.task('dev', [
    'dev:css'
]);

gulp.task('dev:watch', ['dev'], function () {
    livereload.listen();
    gulp.watch('static/styles/**', ['dev:css']);
});

gulp.task('default', ['dev:watch']);
