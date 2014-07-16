var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    reactify = require('reactify');

gulp.task('browserify', function() {
    return gulp.src('src/main.js')
        .pipe(browserify({
            debug: true,
            transform: [reactify],
            extensions: [".html",".jsx"]
        }).on('error', function(e){ console.warn(e); }))
        .pipe(gulp.dest('build/'));
});


gulp.task('watch', function() {
    gulp.watch(["src/**"], ["browserify"]);
});

gulp.task('default', ["browserify", "watch"]);

gulp.on('error', function(){
    console.log('error');
});
