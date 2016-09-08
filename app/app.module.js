System.register(['@angular/core', '@angular/platform-browser', '@angular/http', '@angular/forms', 'angular2-highcharts', './app.component', './navbar/navbar.component', './watchlist/watchlists.component', './watchlist/watchlist.component', './dashboard/dashboard.component', './common/watchlist.service', './common/quote.service', './common/sign.directive', './common/filterArr.pipe', './dashboard/fpchart.component', './dashboard/topstocks.component', 'ng2-bootstrap/ng2-bootstrap'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, platform_browser_1, http_1, forms_1, angular2_highcharts_1, app_component_1, navbar_component_1, watchlists_component_1, watchlist_component_1, dashboard_component_1, watchlist_service_1, quote_service_1, sign_directive_1, filterArr_pipe_1, fpchart_component_1, topstocks_component_1, ng2_bootstrap_1;
    var AppModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (angular2_highcharts_1_1) {
                angular2_highcharts_1 = angular2_highcharts_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (navbar_component_1_1) {
                navbar_component_1 = navbar_component_1_1;
            },
            function (watchlists_component_1_1) {
                watchlists_component_1 = watchlists_component_1_1;
            },
            function (watchlist_component_1_1) {
                watchlist_component_1 = watchlist_component_1_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            },
            function (watchlist_service_1_1) {
                watchlist_service_1 = watchlist_service_1_1;
            },
            function (quote_service_1_1) {
                quote_service_1 = quote_service_1_1;
            },
            function (sign_directive_1_1) {
                sign_directive_1 = sign_directive_1_1;
            },
            function (filterArr_pipe_1_1) {
                filterArr_pipe_1 = filterArr_pipe_1_1;
            },
            function (fpchart_component_1_1) {
                fpchart_component_1 = fpchart_component_1_1;
            },
            function (topstocks_component_1_1) {
                topstocks_component_1 = topstocks_component_1_1;
            },
            function (ng2_bootstrap_1_1) {
                ng2_bootstrap_1 = ng2_bootstrap_1_1;
            }],
        execute: function() {
            AppModule = (function () {
                function AppModule() {
                }
                AppModule = __decorate([
                    core_1.NgModule({
                        imports: [http_1.HttpModule, http_1.JsonpModule, platform_browser_1.BrowserModule, forms_1.FormsModule, ng2_bootstrap_1.TypeaheadModule],
                        declarations: [app_component_1.AppComponent, navbar_component_1.NavbarComponent, angular2_highcharts_1.CHART_DIRECTIVES, sign_directive_1.SignDirective, filterArr_pipe_1.FilterArrPipe,
                            watchlists_component_1.WatchlistsComponent, watchlist_component_1.WatchlistComponent, dashboard_component_1.DashboardComponent, fpchart_component_1.FPChartComponent, topstocks_component_1.TopstocksComponent],
                        providers: [watchlist_service_1.WatchlistService, quote_service_1.QuoteService, filterArr_pipe_1.FilterArrPipe],
                        bootstrap: [app_component_1.AppComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppModule);
                return AppModule;
            }());
            exports_1("AppModule", AppModule);
        }
    }
});
