System.config({
    defaultJSExtensions: true,
    baseUrl: '.',
    meta: {
        "*.html": {
            loader: "text",
            scriptLoad: "true"
        },
        "src/resources/data/*": {
            build: false
        }
    },
    paths: {
        npm: "node_modules/",
        "@app/common": ["src/modules/common/"],
        "@app/themes/education": ["src/themes/education/"],
        "@app/apps/learning": ["src/apps/learning/"],
        "@app/apps/dashboard": ["src/apps/dashboard/"]
    },
    map: {
        "src/resources/data/html-templates.json": "@empty",
        "util": "npmutil/util.js",
        "inherits": "npminherits/inherits.js",
        "text": "npmtext/lib/text/index.js",
        "@angular/core": 'npm@angular/core/bundles/core.umd.js',
        '@angular/common': 'npm@angular/common/bundles/common.umd.js',
        '@angular/compiler': 'npm@angular/compiler/bundles/compiler.umd.js',
        '@angular/platform-browser': 'npm@angular/platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser-dynamic': 'npm@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        '@angular/http': 'npm@angular/http/bundles/http.umd.js',
        '@angular/router': 'npm@angular/router/bundles/router.umd.js',
        '@angular/forms': 'npm@angular/forms/bundles/forms.umd.js',
        'rxjs': 'npmrxjs',
        'ts': 'npm@plugin-typescript@4.0.10/lib/plugin.js',
        'typescript': 'npm@typescript@2.0.3/lib/typescript.js',
        'ej-angular2': 'npmej-angular2',
        'syncfusion-javascript': 'npmsyncfusion-javascript',
        'jsrender': 'npmjsrender',
        'jquery': 'npmjquery',
        "jquery-validation": "npmjquery-validation",
        "path": "npmpath/path.js"
    },
    packages: {
        "*.json":{
            defaultExtension: false
        },
        "src/resources": {
            defaultExtension: false
        },
        "jquery-validation": {
            main: "dist/jquery.validate.js"
        },
        "jquery": {
            main: "dist/jquery.js"
        },
        "jsrender": {
            main: "jsrender.js"
        },
        "@app/common": {
            defaultExtension: "js",
            main: "index.js"
        },
        "@app/apps/learning":{
            defaultExtension: "js",
            main: "index.js"
        },
        "@app/apps/dashboard":{
            defaultExtension: "js",
            main: "index.js"
        },
        "@app/themes/education": {
            defaultExtension: "js",
            main: "index.js"
        },
        src: {
            main: "./main.js",
            defaultExtension: "js"
        },
        rxjs: {
            defaultExtension: "js"
        }
    }
});
