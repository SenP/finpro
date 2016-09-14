var gulp = require("gulp");

const config = {    
    templates: {
        src: "./**/*.html",
        dest: "../public"
    }
};

const buildConfig = {
    styles: {
        src: ["./src/styles/site.less"],
        srcDir: ["./src/styles/**/*.{css,less}"],
        dest: "./public/styles"
    },
    
    scripts: {
        src: "./src/scripts/**/*.js",
        dest: "./public/scripts",
        bundle: "app_prod.js"
    }
};

//DEV TASKS
gulp.task("dev", devTask);

gulp.task("dev:watch", gulp.series("dev", devWatch));
          
//DEFULT: DEV
gulp.task("default", gulp.series("dev"));

// Prod build
gulp.task("prod:build", prodBuild);

function devWatch() {
    gulp.watch(config.templates.src, gulp.series("dev"));
    
}

function devTask() {
    return gulp
        .src(config.templates.src)
        .pipe(gulp.dest(config.templates.dest));
}

function prodBuild() {
    return gulp
        .src(config.scripts.src)
        .pipe($.sourcemaps.init())
        .pipe($.babel())
        .pipe($.sourcemaps.write("."))
        .pipe(gulp.dest(config.scripts.dest));
}

