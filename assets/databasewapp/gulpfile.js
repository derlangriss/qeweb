var gulp = require('gulp');
var php = require('gulp-connect-php'); 
var sass = require("gulp-ruby-sass");
var browserSync = require('browser-sync').create();

// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src('LAYOUT-2/*js')
	return gulp.src('LAYOUT-2/*php')
        
      
        .pipe(gulp.dest('dist/js'));
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('php', function() {
    php.server({ base: 'build', port: 8010, keepalive: true});
});

gulp.task('browser-sync',['php'], function() {
    browserSync({
        proxy: '127.0.0.1:8010',
        port: 8080,
        open: true,
        notify: false
    }).reload();
});


gulp.task('sass', function () {

    return sass('scss', {sourcemap: true})
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(sourcemaps.write('./LAYOUT-2', {
            includeContent: false,
            sourceRoot: 'scss'
        }))
        .pipe(browserSync.stream({match: '**/*.css'}));
});









// use default task to launch Browsersync and watch JS files
gulp.task('default', ['js','php','sass'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
	gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("js/*.js", ['js-watch']);
	gulp.watch('php/*.php', ['browser-sync']);
});

