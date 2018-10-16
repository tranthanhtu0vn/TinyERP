var gulp = require('gulp');
var requireDir = require('require-dir');
var del = require("del");
var typescript = require("gulp-typescript");

var runSequence = require("run-sequence");
var gulpConcat = require("gulp-concat");
var rename = require("gulp-rename");
var debug = require("gulp-debug");
var config = require('./gulp.config')();
var fc2json = require('gulp-file-contents-to-json');
var SystemJsBuilder = require("systemjs-builder");

var logger = new ConsoleLogger();
var ROOT_DIR = __dirname;
var destFolder = "dist";
var GULP_FOLDER = "./build/gulp/";
var BASE_PATH = ".";
var tsconfig = require(GULP_FOLDER + "tsconfig.json");
var tsconfig = require(GULP_FOLDER + "/tsconfig.json");
gulp.task('default', function (done) {
    runSequence("clean:dist","compile", "copy:systemjs-config", "bundle:js", "bundle:html-templates", "copy:libs", "copy:statics");
    function finalize() {
        done();
    }
});
gulp.task("bundle:html-templates", function () {
    
    bundle_html_templates({
        patterns: config.templates.patterns,
        fileName:config.templates.fileName,
        dest: config.build.path
    });
    var bundleFolder = destFolder + "/src/";
    var htmlModules=[
        {patterns: ['src/modules/common/**/*.html'], fileName: "src/modules/common/templates.json" , dest: config.build.path}
    ];
    htmlModules.forEach(function(item){
        bundle_html_templates({
            patterns: item.patterns,
            fileName:item.fileName,
            dest: item.dest
        });
    });
});
function bundle_html_templates(option){
    console.log("bundle html templates to '"+ option.fileName +"' file.");
    return gulp.src(option.patterns, { base: ROOT_DIR + "\\" })
        .pipe(debug({ title: "Bundling htmltemplate: " }))
        .pipe(fc2json(
            option.fileName, { flat: true, flatpathdelimiter: "/" }))
        .pipe(gulp.dest(option.dest));
}
gulp.task("compile", function () {
    var filesToBuild = "src/**/*.ts";
    logger.info("Compiling \'" + filesToBuild + "\'");
    return gulp.src(filesToBuild)
        .pipe(debug({ title: "Compiling file: " }))
        .pipe(typescript(tsconfig))
        .pipe(gulp.dest(ROOT_DIR + "/src"));
});

gulp.task("bundle:js", function () {
    var bundleFolder = destFolder + "/src/";
    var files = [
        {
            src: [
                'node_modules/@angular/core/bundles/core.umd.js',
                'node_modules/@angular/common/bundles/common.umd.js',
                'node_modules/@angular/compiler/bundles/compiler.umd.js',
                'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
                'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
                'node_modules/@angular/http/bundles/http.umd.js',
                'node_modules/@angular/router/bundles/router.umd.js',
                'node_modules/@angular/forms/bundles/forms.umd.js'
            ],
            outputFile: destFolder + "/libs/angular.js",
            externals: []
        },{
            src: [
                "node_modules/rxjs/RX.js",
                "node_modules/rxjs/Subject.js",
                "node_modules/rxjs/BehaviorSubject.js",
                "node_modules/rxjs/Notification.js",
                "node_modules/rxjs/InnerSubscriber.js",
                "node_modules/rxjs/OuterSubscriber.js",
                "node_modules/rxjs/SubjectSubscription.js",

                "node_modules/rxjs/operator/filter.js",
                "node_modules/rxjs/operator/mergeAll.js",
                "node_modules/rxjs/operator/last.js",
                "node_modules/rxjs/operator/concatAll.js",
                "node_modules/rxjs/operator/mergeMap.js",
                "node_modules/rxjs/operator/reduce.js",
                "node_modules/rxjs/operator/catch.js",
                "node_modules/rxjs/operator/every.js",
                "node_modules/rxjs/operator/concatMap.js",
                "node_modules/rxjs/operator/first.js",
                "node_modules/rxjs/operator/toPromise.js",
                
                "node_modules/rxjs/operators/takeLast.js",
                "node_modules/rxjs/operators/scan.js",
                "node_modules/rxjs/operators/mergeAll.js",
                "node_modules/rxjs/operators/concatAll.js",
                "node_modules/rxjs/operators/concatMap.js",
                "node_modules/rxjs/operators/every.js",
                "node_modules/rxjs/operators/first.js",
                "node_modules/rxjs/operators/observeOn.js",
                "node_modules/rxjs/operators/defaultIfEmpty.js",
                "node_modules/rxjs/operators/mergeMap.js",
                "node_modules/rxjs/operators/reduce.js",
                "node_modules/rxjs/operators/catchError.js",
                "node_modules/rxjs/operators/last.js",
                "node_modules/rxjs/operators/filter.js",

                "node_modules/rxjs/util/EmptyError.js",
                "node_modules/rxjs/util/identity.js",
                "node_modules/rxjs/util/ArgumentOutOfRangeError.js",
                "node_modules/rxjs/util/isPromise.js",
                "node_modules/rxjs/util/isArrayLike.js",
                "node_modules/rxjs/util/isScheduler.js",
                "node_modules/rxjs/util/subscribeToResult.js",
                "node_modules/rxjs/util/ObjectUnsubscribedError.js",

                "node_modules/rxjs/observable/of.js",
                "node_modules/rxjs/observable/from.js",
                "node_modules/rxjs/observable/fromPromise.js",
                "node_modules/rxjs/observable/ArrayObservable.js",
                "node_modules/rxjs/observable/PromiseObservable.js",
                "node_modules/rxjs/observable/FromObservable.js",
                "node_modules/rxjs/observable/IteratorObservable.js",
                "node_modules/rxjs/observable/ArrayLikeObservable.js",
                "node_modules/rxjs/observable/EmptyObservable.js",
                "node_modules/rxjs/observable/ScalarObservable.js",
                
                "node_modules/rxjs/symbol/iterator.js"
            ],
            outputFile: destFolder + "/libs/rxjs.js",
            externals: []
        },
        {
            src: 'src/modules/common/**/*.js',
            outputFile: bundleFolder + "modules/common/index.js",
            externals: ["rxjs", "@angular/core", "@angular/common", "@angular/compiler", "@angular/platform-browser", "@angular/platform-browser-dynamic", "@angular/http", "@angular/router", "@angular/forms"]
        }, {
            src: 'src/modules/security/**/*.js',
            outputFile: bundleFolder + "modules/security/securityModule.js",
            externals: ["@app/common", "rxjs", "@angular/core", "@angular/common", "@angular/compiler", "@angular/platform-browser", "@angular/platform-browser-dynamic", "@angular/http", "@angular/router", "@angular/forms"]
        },{
            src: 'src/modules/setting/**/*.js',
            outputFile: bundleFolder + "modules/setting/settingModule.js",
            externals: ["@app/common", "rxjs", "@angular/core", "@angular/common", "@angular/compiler", "@angular/platform-browser", "@angular/platform-browser-dynamic", "@angular/http", "@angular/router", "@angular/forms"]
        },{
            src: 'src/modules/auth/**/*.js',
            outputFile: bundleFolder + "modules/auth/authModule.js",
            externals: ["@app/common", "rxjs", "@angular/core", "@angular/common", "@angular/compiler", "@angular/platform-browser", "@angular/platform-browser-dynamic", "@angular/http", "@angular/router", "@angular/forms"]
        },{
            src: 'src/modules/support/**/*.js',
            outputFile: bundleFolder + "modules/support/supportModule.js",
            externals: ["@app/common", "rxjs", "@angular/core", "@angular/common", "@angular/compiler", "@angular/platform-browser", "@angular/platform-browser-dynamic", "@angular/http", "@angular/router", "@angular/forms"]
        },{
            src: 'src/themes/default/index.js',
            outputFile: bundleFolder + "themes/default/index.js",
            externals: ["rxjs", "@app/common", "@angular/core", "@angular/common", "@angular/compiler", "@angular/platform-browser", "@angular/platform-browser-dynamic", "@angular/http", "@angular/router", "@angular/forms"]
        },{
            src: 'src/apps/dashboard/index.js',
            outputFile: bundleFolder + "apps/dashboard/index.js",
            externals: ["rxjs", "@app/common", "@angular/core", "@angular/common", "@angular/compiler", "@angular/platform-browser", "@angular/platform-browser-dynamic", "@angular/http", "@angular/router", "@angular/forms"]
        }, {
            src: 'src/main.js',
            ignores:{
                "src/resources/data/html-templates.json":true
            },
            outputFile: bundleFolder + "main.js",
            externals: ["rxjs", "@app/common", "@angular/core", "@angular/common", "@angular/compiler", "@angular/platform-browser", "@angular/platform-browser-dynamic", "@angular/http", "@angular/router", "@angular/forms"]
        }
    ];
    var index = 0;
    return bundle(files, index);
});


function bundle(bundles, index) {
    if (index >= bundles.length) {
        console.log("Invalid index for bundles");
        return null;
    }
    var bundleItem = bundles[index];
    var builder = new SystemJsBuilder(BASE_PATH, GULP_FOLDER + "systemjs.gulp.conf.js");
    logger.info("Bundling files:\n" + bundleItem.src + "' to '" + bundleItem.outputFile + "' file");
    return builder
        .bundle(bundleItem.src, bundleItem.outputFile, {
            externals: bundleItem.externals || [],
            minify: false,
            sourceMaps: false,
            fetch: function (file, fetch) {
                var filePath = file.name.replace("file:///" + ROOT_DIR.replace(/\\/gi, "/"), "");
                logger.info("Bundling: " + filePath);
                return fetch(file);
            }
        })
        .then(function () {
            logger.info("Bundling was completed for " + bundleItem.src + "...");
            return bundle(bundles, index + 1);
        })
        .catch(function (err) {
            logger.error("Error while bundling " + bundleItem.src + " file");
            console.log("Bundling with error:", err);
        });
}

gulp.task("copy:systemjs-config", function () {
    var files = [
        GULP_FOLDER + 'systemjs.prod.conf.js'
    ];
    return gulp.src(files, { base: "./" })
        .pipe(rename("systemjs.conf.js"))
        .pipe(gulp.dest(destFolder));
});

gulp.task("copy:statics", function () {
    var files = [
        'index.html',
        'favicon.ico',
        'systemjs.conf.js',
        'src/**/*.js',
        "!src/resources/data/html-templates.json",
        'src/resources/**/*',
        'src/themes/education/resources/themes/**/*',
        'src/themes/default/vendors/**/*',
        'src/themes/default/css/**/*',
        'src/themes/default/fonts/**/*',
        'src/themes/default/js/**/*',
        'src/themes/default/images/**/*',
        "!systemjs.conf.js",
        '!src/apps/**/*.js',
        '!src/config/**/*.js',
        '!src/modules/**/*.js',
        '!src/themes/education/**/*.js',
        '!src/themes/education/resources/images/**/*',
        '!src/themes/education/resources/sass/**/*',
        '!src/themes/education/resources/vendors/**/*',
        '!src/*.js',
        '!src/**/*.ts',
        "!src/**/*.scss"
    ];
    return gulp.src(files, { base: "./" })
        .pipe(debug({ title: "Copying: " }))
        .pipe(gulp.dest(destFolder));
});


gulp.task("copy:libs", function () {
    var files = [
        'web.config',
        'src/resources/js/jsextension.js',
        'node_modules/core-js/client/shim.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/reflect.js',
        'node_modules/systemjs/dist/system.src.js',
        'src/themes/default/vendors/jquery/dist/jquery.min.js',
        'node_modules/rxjs/**/*.js'
    ];

    return gulp.src(files, { base: "./" })
        .pipe(gulp.dest(destFolder));
});

gulp.task("clean:dist", function () {
    var path = destFolder + "/**/*";
    logger.info("Deleting files:" + path + "\n");
    return del([path]).then(paths => {
        logger.info("Deleting files using '" + path + "' pattern:" + paths.length + " files(s)\n", paths.join("\n"));
    });
});

var COLOR = {
    RED: "\x1b[31m"
};

function ConsoleLogger() {
    this.error = error;
    this.info = info;
    return this;
    function error(error) {
        console.log(COLOR.RED, error);
    }
    function info(data) {
        console.log.call(console, data);
    }
}