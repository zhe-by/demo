/*jshint node:true*/
var spawn = require('child_process').spawn;
var path = require('path');

var gulp = require('gulp');
var stylus = require('gulp-stylus');
var nib = require('nib');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var bower = require('bower');

gulp.task('frontend:static:bower', function (next) {
    bower.commands.install([], {}, {
            cwd: './frontend/static'
        })
        .on('end', function (data) {
            console.dir(data);
            next();
        });
});

gulp.task('frontend:static:css:quick', function () {
    return gulp.src('frontend/static/styles/main.styl')
        .pipe(stylus({
            errors: true,
            use: [nib()]
        }))
        .pipe(rename('build.css'))
        .pipe(gulp.dest('frontend/static'))
        .pipe(livereload());
});

gulp.task('frontend:static:css', [
    'frontend:static:bower',
    'frontend:static:css:quick'
]);

gulp.task('frontend:static', [
    'frontend:static:css',
    'frontend:static:bower'
]);

gulp.task('server:run', function () {
    var server = spawn(
        path.join(__dirname, './node_modules/.bin/nodemon'), [
            '--debug', 'app.js'
        ], {
            cwd: path.join(__dirname, './server')
        });
    server.stdout.pipe(process.stdout);
    server.stderr.pipe(process.stdout);
    process.on('exit', function () {
        server.kill();
    });
});

gulp.task('watch', ['frontend:static', 'server:run'], function () {
    livereload.listen();
    gulp.watch('frontend/static/styles/**', ['frontend:static:css:quick']);
    gulp.watch('frontend/static/bower.json', ['frontend:static:bower']);
});

gulp.task('default', ['watch']);
