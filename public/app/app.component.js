System.register(['@angular/core', './common/watchlist.service', './common/quote.service'], function(exports_1, context_1) {
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
    var AppComponent;
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
            AppComponent = (function () {
                function AppComponent(watchlistService, quoteService) {
                    this.watchlistService = watchlistService;
                    this.quoteService = quoteService;
                    this.watchlists = [];
                    this.refInterval = 60;
                    this.refFreqs = [10, 20, 30, 40, 50, 60];
                }
                AppComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    // Get all watchlist from local storage
                    this.watchlists = this.watchlistService.getWatchlists();
                    //register all instruments with quote service
                    this.watchlists.forEach(function (wl) {
                        wl.instruments.forEach(function (stock) {
                            _this.quoteService.register(stock.instrument, stock.exchange);
                        });
                    });
                    // Start quote service and update quotes at refInterval
                    this.quoteService
                        .init(this.refInterval * 1000)
                        .subscribe(function (qmap) {
                        _this.watchlistService.updateQuotes(qmap);
                    });
                    // Load the supported tickers
                    this.quoteService.getTickers();
                };
                AppComponent.prototype.onSelect = function (wl) {
                    // Keep track of current watchlist being displayed, null for dashboard display
                    this.selectedWatchlist = wl;
                };
                AppComponent.prototype.onChangeTimer = function () {
                    // Reset timer to new interval
                    this.quoteService.resetTimer(this.refInterval * 1000);
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'finpro-app',
                        templateUrl: 'app/app.component.html'
                    }), 
                    __metadata('design:paramtypes', [watchlist_service_1.WatchlistService, quote_service_1.QuoteService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
