var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');

gulp.task('pre-test', function () {
    return gulp.src(['errors/*.js', 'jsonschema/*.js', 'models/*.js', 'routes/*.js'])
        // Covering files
        .pipe(istanbul({
            includeUntested: true
        }))
        // Force `require` to return covered files
        .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function () {
    return gulp.src(['test/*.js'])
        .pipe(mocha({
            reporter: 'spec'
        }))
        // Creating the reports after tests ran
        .pipe(istanbul.writeReports());
        // Enforce a coverage of at least 90%
});