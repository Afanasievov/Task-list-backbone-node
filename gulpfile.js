'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const del = require('del');
const uglify = require('gulp-uglifyjs');
const babel = require('gulp-babel');

const serverParams = {
  app: {
    port: 3000,
    ui: {
      port: 3001
    },
    server: {
      baseDir: 'app',
    },
    notify: false
  },
  test: {
    port: 4000,
    ui: {
      port: 4001
    },
    server: {
      baseDir: ['test', 'app'],
      routes: {
        '/node_modules': 'node_modules'
      }
    },
    notify: false
  }
};

gulp.task('watch', ['browser-sync'], watchAppFiles);

gulp.task('test-watch', [], () => {
  watchAppFiles();
  gulp.watch('test/*.html', browserSync.reload);
  gulp.watch('test/*.js', browserSync.reload);
});

gulp.task('default', ['watch']);


gulp.task('browser-sync', () => {
  browserSync(serverParams.app);
});

gulp.task('test-sync', () => {
  browserSync(serverParams.test);
});

gulp.task('test', ['test-sync', 'test-watch'], () => {
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('clean', () => {
  return del.sync('dist');
});


gulp.task('build', ['clean'], () => {

  const buildCss = gulp.src([
      'app/css/main.css',
      'app/css/libs.min.css'
    ])
    .pipe(gulp.dest('dist/css'));

  const buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));

  const buildJs = gulp.src(['app/js/**/*', '!app/js/lib/*'])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));

  const buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));

});

function watchAppFiles() {
  gulp.watch('app/**/*.html', browserSync.reload);
  gulp.watch('app/css/*.css', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
}
