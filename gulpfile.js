var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    reactify = require('reactify'),
    rename = require('gulp-rename');

gulp.task('browserify', function() {
    return gulp.src('src/main.jsx')
        .pipe(browserify({
            debug: true,
            transform: [reactify],
            extensions: [".html",".jsx"]
        }).on('error', function(e){ console.warn(e); }))
        .pipe(rename('main.js'))
        .pipe(gulp.dest('build/'));
});


gulp.task('watch', function() {
    gulp.watch(["src/**"], ["browserify"]);
});

gulp.task('default', ["browserify", "watch"]);

gulp.on('error', function(){
    console.log('error');
});
