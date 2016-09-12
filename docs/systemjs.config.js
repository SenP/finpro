(function(global) {

  // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',
    'rxjs':                       'vendor/rxjs',
    '@angular':                   'vendor/@angular',
    'angular2-highcharts':        'vendor/angular2-highcharts/dist', 
    'highcharts/highstock.src':   'vendor/angular2-highcharts/dist/highstock.js',
    'ng2-bootstrap/ng2-bootstrap': 'vendor/ng2-bootstrap',
    'moment':                      'vendor/moment'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js', defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-highcharts' :       { main: 'index', format: 'cjs', defaultExtension: 'js' },
    'ng2-bootstrap/ng2-bootstrap': { main: 'ng2-bootstrap', defaultExtension: 'js' },
    'moment':                     { main: 'moment', defaultExtension: 'js' }
  };

  var packageNames = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/http',
    '@angular/forms',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router',
    '@angular/testing'
  ];

  // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
  packageNames.forEach(function(pkgName) {
    packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
  });

  var config = {
    map: map,
    packages: packages
  };

  // filterSystemConfig - index.html's chance to modify config before we register it.
  if (global.filterSystemConfig) { global.filterSystemConfig(config); }

  System.config(config);

})(this);
