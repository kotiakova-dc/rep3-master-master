const del = require('del');
const fileinclude = require('gulp-file-include');
const rename = require('gulp-rename');

let project_folder = "build";
let source_folder ="dev";

let path = {
    build:{
        html:project_folder + "/",
        css: project_folder + "/css/",
        js:project_folder + "/js/",
        img:project_folder + "/img/",
        fonts:project_folder + "/fonts/"

    },
    src:{
        html:[source_folder + "/*.html", "!"+ source_folder + "/_*.html"],
        css: source_folder + "/scss/main.scss",
        js:source_folder + "/js/script.js",
        img:source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts:source_folder + "/fonts/**"
    },
    watch:{
        html:source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        js:source_folder + "/js/**/*.js",
        img:source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}"

    },
    clean: "./" + project_folder + "/"
}

let {src,dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require("browser-sync").create();
    scss = require('gulp-sass')(require('sass'));
    autoprefixer = require("gulp-autoprefixer");
    group_media = require("gulp-group-css-media-queries");
    clean_css = require("gulp-clean-css");
    ttf2woff = require('gulp-ttf2woff');
    ttf2woff2 = require('gulp-ttf2woff2');
    imagemin = require('gulp-imagemin');
    //rename = require("gulp-rename");
    //scss = require("gulp-sass");
    //del = require("del");
    //fileinclude = require("gulp-file-include");

function browserSync(params) {
    browsersync.init({
        server:{
            baseDir:"./" + project_folder + "/"
        },
        port:3000,
        notify:false
    })
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}
function images() {
    var img_src = 'dev/img/**/*', img_dest = 'build/img';

    gulp.src(img_src)
    .pipe(imagemin())
    .pipe(gulp.dest(img_dest));
}

function fonts() {
    gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
};

function css() {
    return src(path.src.css)
    .pipe(
        scss({ outputStyle: 'expanded' }).on('error', scss.logError)
    )
    .pipe(
        group_media()
    )
    .pipe(
        autoprefixer({
            overrideBrowserlist: ["last 5 versions"],
            cascade:true
        })
    )
    .pipe(dest(path.build.css))
    .pipe(clean_css())
    .pipe(
        rename({
            extname:".min.css"
        })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
}

function clean(params) {
    return del(path.clean);
}




let build = gulp.series(clean,gulp.parallel(js,css,html,images,fonts));
let watch = gulp.parallel(build, watchFiles,browserSync);

exports.fonts = fonts;
exports.js = js;
exports.html = html;
exports.css = css;
exports.images = images;
exports.build = build;
exports.watch = watch;
exports.default = watch;
