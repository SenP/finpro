System.register(['@angular/core', '../common/watchlist.service', '../common/quote.service'], function(exports_1, context_1) {
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
    var core_1, watchlist_service_1, quote_service_1;
    var DashboardComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (watchlist_service_1_1) {
                watchlist_service_1 = watchlist_service_1_1;
            },
            function (quote_service_1_1) {
                quote_service_1 = quote_service_1_1;
            }],
        execute: function() {
            DashboardComponent = (function () {
                function DashboardComponent(watchlistService, quoteService) {
                    this.watchlistService = watchlistService;
                    this.quoteService = quoteService;
                    this.watchlists = [];
                }
                DashboardComponent.prototype.ngOnInit = function () { };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], DashboardComponent.prototype, "watchlists", void 0);
                DashboardComponent = __decorate([
                    core_1.Component({
                        selector: 'fp-dashboard',
                        template: "\n                   <div class=\"jumbotron\">\n\t\t\t            <p> Dashboard View </p>\t\t\t\t        \n\t\t            </div>\n                ",
                        styles: ["\n           \n        "]
                    }), 
                    __metadata('design:paramtypes', [watchlist_service_1.WatchlistService, quote_service_1.QuoteService])
                ], DashboardComponent);
                return DashboardComponent;
            }());
            exports_1("DashboardComponent", DashboardComponent);
        }
    }
});
