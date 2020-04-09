const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require("gulp-rm");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const sassGlob = require("gulp-sass-glob");
const autoprefixer = require("gulp-autoprefixer");
const px2rem = require("gulp-smile-px2rem");

const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const svgo = require("gulp-svgo");
const svgSprite = require("gulp-svg-sprite");
const gulpif = require("gulp-if");

const env = process.env.NODE_ENV;

sass.compiler = require("node-sass");

task("clean", () => {
  console.log(env);
  return src("dist/**/*", { read: false }).pipe(rm());
});

task("copy:html", () => {
  return src("src/*.html")
    .pipe(dest("dist"))
    .pipe(reload({ stream: true }));
});

task("copy:fonts", () => {
  return src("src/fonts/*.*")
    .pipe(dest("dist/fonts"))
    .pipe(reload({ stream: true }));
});

const styles = [
  "node_modules/normalize.css/normalize.css",
  "src/styles/layout/fonts.scss",
  "src/styles/main.scss",
];

task("styles", () => {
  return (
    src(styles)
      .pipe(gulpif(env === "dev", sourcemaps.init()))
      .pipe(concat("main.min.scss"))
      .pipe(sassGlob())
      .pipe(sass().on("error", sass.logError))
      // .pipe(px2rem())
      .pipe(
        gulpif(
          env === "dev",
          autoprefixer({
            browsers: ["last 2 versions"],
            cascade: false,
          })
        )
      )
      .pipe(gulpif(env === "prod", cleanCSS()))
      .pipe(gulpif(env === "dev", sourcemaps.write()))
      .pipe(dest("dist/style"))
      .pipe(reload({ stream: true }))
  );
});

const libs = ["node_modules/jquery/dist/jquery.js", "src/js/*.js"];

task("scripts", () => {
  return src(libs)
    .pipe(gulpif(env === "dev", sourcemaps.init()))
    .pipe(concat("main.min.js", { newLine: ";" }))
    .pipe(
      gulpif(
        env === "prod",
        babel({
          presets: ["@babel/env"],
        })
      )
    )
    .pipe(gulpif(env === "prod", uglify()))
    .pipe(gulpif(env === "dev", sourcemaps.write()))
    .pipe(dest("dist/js"))
    .pipe(reload({ stream: true }));
});

const img = ["src/images/*.*", "src/images/bg/*.*", "src/images/team/*.*"];
task("copy:img", () => {
  return src(img)
    .pipe(dest("dist/images"))
    .pipe(reload({ stream: true }));
});
task("copy:svg", () => {
  return src("src/images/icon/ctrl/*.svg").pipe(dest("dist/images/icons"));
});
task("icons", () => {
  return src("src/images/icon/svg/*.svg")
    .pipe(
      svgo({
        plugins: [
          {
            removeAttrs: {
              attrs: "(stroke|width|height|data.*)",
            },
          },
        ],
      })
    )
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: "../sprite.svg",
          },
        },
      })
    )
    .pipe(dest("dist/images/icons"));
});

task("server", () => {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
    open: false,
  });
});

watch("./src/styles/**/*.scss", series("styles"));
watch("./src/*.html", series("copy:html"));

task(
  "default",
  series(
    "clean",
    parallel(
      "copy:html",
      "copy:fonts",
      "styles",
      "scripts",
      "copy:svg",
      "copy:img",
      "icons"
    ),
    "server"
  )
);
