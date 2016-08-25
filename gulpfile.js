var gulp = require("gulp");

const config = {    
    templates: {
        src: "./src/**/*.html",
        dest: "./app"
    }
};

//DEV TASKS
gulp.task("dev", devTask);

gulp.task("dev:watch", gulp.series("dev", devWatch));
          
//DEFULT: DEV
gulp.task("default", gulp.series("dev"));

function devWatch() {
    gulp.watch(config.templates.src, gulp.series("dev"));
    
}

function devTask() {
    return gulp
        .src(config.templates.src)
        .pipe(gulp.dest(config.templates.dest));
}

