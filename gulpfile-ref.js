var gulp = require("gulp"),
    $ = require("gulp-load-plugins")();

const config = {
    styles: {
        src: ["./src/styles/site.less"],
        srcDir: ["./src/styles/**/*.{css,less}"],
        dest: "./public/styles",
        autoprefix: ["last 2 versions"]
    },
    
    scripts: {
        src: "./src/scripts/**/*.js",
        dest: "./public/scripts",
        bundle: "app_prod.js"
    }
};

//DEV TASKS
gulp.task("dev:styles", styles(true));
gulp.task("dev:scripts", devScripts);

gulp.task("dev",
    gulp.parallel(
        "dev:styles",
        "dev:scripts"
    ));

gulp.task("dev:watch", gulp.series("dev", devWatch));
          
//PROD TASKS
gulp.task("prod:styles", styles(false));
gulp.task("prod:scripts", prodScripts);

gulp.task("prod",
    gulp.parallel(
        "prod:styles",
        "prod:scripts"
    ));

//DEFULT: DEV
gulp.task("default", gulp.series("dev"));

function devWatch() {
    gulp.watch(config.styles.srcDir, gulp.series("dev:styles"));
    gulp.watch(config.scripts.src, gulp.series("dev:scripts"));
    
}

function styles(isDev) {
    return function () {
        return gulp
            .src(config.styles.src)
            .pipe($.if(isDev, $.sourcemaps.init()))
            .pipe($.less())
            .pipe($.autoprefixer({
                browsers: config.styles.autoprefix
            }))
            .pipe($.if(!isDev, $.minifyCss()))
            .pipe($.if(isDev, $.sourcemaps.write()))
            .pipe(gulp.dest(config.styles.dest));
    }
}

function devScripts() {
    return gulp
        .src(config.scripts.src)
        .pipe($.sourcemaps.init())
        .pipe($.babel())
        .pipe($.sourcemaps.write("."))
        .pipe(gulp.dest(config.scripts.dest));
}

function prodScripts() {
    return gulp
        .src(config.scripts.src)
        .pipe($.babel())
        .pipe($.concat(config.scripts.bundle))
        .pipe($.uglify())
        .pipe(gulp.dest(config.scripts.dest));
}
