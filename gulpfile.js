// gulpfile.js
  
const gulp = require("gulp"),
      sass = require("gulp-sass"),
      postcss = require("gulp-postcss"),
      autoprefixer = require("autoprefixer"),
      cssnano = require("cssnano"),
      sourcemaps = require("gulp-sourcemaps"),
      browserSync = require("browser-sync").create(),
      pug = require('gulp-pug'),
      del = require('del');

// Config paths
const paths = {
  dist : {
    dest: 'dist'
  },
  styles: {
    src: "src/styles/**/*.scss",
    dest: "dist/static/css"
  },
  html: {
    src: "src/views/**/[^_]*.pug",
    dest: "dist/"
  },
  favico : {
    src: "src/favicon/*",
    dest: "dist/static/"
  }
};

// Copy favicons
const favicons = async () => (
  gulp
    .src(paths.favico.src)
    .pipe(gulp.dest(paths.favico.dest))
);

// Delete dest directory
const clean = async () => (
  await del(paths.dist.dest)
);

// Minify scss files to css to production
const styleProd = () => (
  gulp
    .src(paths.styles.src)
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(
      postcss(
        [
          autoprefixer(), 
          cssnano()
        ]
      )
    )
    .pipe(
      gulp.dest(
        paths.styles.dest
      )
    )
);

// Minify scss files to css with sourcemaps
const style = () => (
  gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(
      postcss(
        [
          autoprefixer(), 
          cssnano()
        ]
      )
    )
    .pipe(sourcemaps.write())
    .pipe(
      gulp.dest(
        paths.styles.dest
      )
    )
);

// Parse .pug files to minified html files
const html = () => (
  gulp
    .src(paths.html.src)
    .pipe(
      pug({
        doctype: 'html',
        pretty: false
      })
    )
    .pipe(
      gulp.dest(
        paths.html.dest
      )
    )
);

// Reload browser
const reload = () =>
  browserSync.reload();

// Build
const build = async () => {
  await clean();
  styleProd();
  html();
  favicons();
};

// Watch files and reload onchange
const watch = async () => {
  
  // Clear dest
  await clean();

  // Build assets
  style();
  html();
  favicons();
  
  // Init auto reload
  browserSync.init({
    server: {
      baseDir: "./dist/"
    }
  });
  
  // watch .scss
  gulp.watch(
    paths.styles.src, style
  ).on('change', browserSync.reload);
  
  // watch .pug
  gulp.watch(
    paths.html.src, html
  ).on('change', browserSync.reload);

  // watch favicons
  gulp.watch(
    paths.favico.src, favicons
  ).on('change', browserSync.reload);
};

exports.style = style;
exports.watch = watch;
exports.build = build;