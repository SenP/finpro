System.register(['@angular/core', '@angular/http', 'rxjs/Rx', 'rxjs/add/operator/map', './quote.model'], function(exports_1, context_1) {
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
    var core_1, http_1, Rx_1, quote_model_1;
    var QuoteService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (_1) {},
            function (quote_model_1_1) {
                quote_model_1 = quote_model_1_1;
            }],
        execute: function() {
            QuoteService = (function () {
                function QuoteService(jsonp, http) {
                    this.jsonp = jsonp;
                    this.http = http;
                    // Quotes service gets all quotes from Google Finance 
                    this.base_url = 'http://finance.google.com/finance/info';
                    this.tickers = []; // List of all supported tickers in NASDAQ, NYSE and ASX exchanges
                    this.quotesMap = new Map();
                    this.quotePublisher = new Rx_1.Subject();
                }
                // Initialize the scheduler, Return the quotes publisher subject to the subscriber
                QuoteService.prototype.init = function (refInterval) {
                    var _this = this;
                    this.quoteScheduler = Rx_1.Observable.timer(0, refInterval)
                        .subscribe(function () { return _this.refreshQuotes(); });
                    return this.quotePublisher;
                };
                // Method to get the timer
                QuoteService.prototype.getTimer = function () {
                    return this.quotePublisher;
                };
                // Reset the scheduler to the given interval
                QuoteService.prototype.resetTimer = function (refInterval) {
                    var _this = this;
                    this.quoteScheduler.unsubscribe();
                    this.quoteScheduler = Rx_1.Observable.timer(0, refInterval)
                        .subscribe(function () { return _this.refreshQuotes(); });
                };
                // Add instrument to the quotes map
                QuoteService.prototype.register = function (stock, exchg) {
                    if (!this.quotesMap.get(exchg + ':' + stock)) {
                        this.quotesMap.set(exchg + ':' + stock, new quote_model_1.Quote());
                    }
                };
                ;
                // Remove instrument from the quotes map
                QuoteService.prototype.deregister = function (stock, exchg) {
                    this.quotesMap.delete(exchg + ':' + stock);
                };
                ;
                // Clear the quotes map
                QuoteService.prototype.reset = function () {
                    this.quotesMap.clear();
                };
                ;
                // Refresh the quotes map with latest quotes from API
                QuoteService.prototype.refreshQuotes = function () {
                    var _this = this;
                    if (this.quotesMap.size > 0) {
                        var stockcodes_1 = '';
                        // create stock codes list, each stock code is in format 'exchange:stockcode'
                        this.quotesMap.forEach(function (value, key) {
                            stockcodes_1 += key + ',';
                        });
                        // Set query parameters
                        var params = new http_1.URLSearchParams();
                        params.set('client', 'ig');
                        params.set('q', stockcodes_1);
                        params.set('format', 'json');
                        params.set('callback', 'JSONP_CALLBACK');
                        // Call the Google Finance API
                        this.jsonp
                            .get(this.base_url, { search: params })
                            .map(function (response) { return response.json(); })
                            .subscribe(function (newquotes) {
                            // Update the Quotes map with new quotes received
                            _this.updateQuotesMap(newquotes);
                            // Publish new quotes to subscribers
                            _this.quotePublisher.next(_this.quotesMap);
                        });
                    }
                };
                // Update the quotes map with the new quote values from API (called from refreshQuotes method)
                QuoteService.prototype.updateQuotesMap = function (newquotes) {
                    var _this = this;
                    newquotes.forEach(function (newquote) {
                        var quote = _this.quotesMap.get(newquote.e + ':' + newquote.t);
                        if (quote) {
                            quote.lastPrice = parseFloat((newquote.l).replace(',', '')); // * (1 + (Math.random() > 0.5 ? 1 : -1) * 0.1);
                            quote.change = parseFloat((newquote.c).replace(',', '')); //+ (Math.random() - 0.5);
                            quote.percentChange = parseFloat(newquote.cp); // + (Math.random() - 0.5);
                        }
                    });
                };
                ;
                // Utility method to load list of tickers from tickers-list.json
                QuoteService.prototype.getTickers = function () {
                    var _this = this;
                    if (this.tickers.length === 0) {
                        this.http
                            .get("app/tickers-list.json")
                            .map(function (response) { return response.json(); })
                            .subscribe(function (tickers) {
                            _this.tickers = tickers;
                        });
                    }
                    return this.tickers;
                };
                QuoteService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Jsonp, http_1.Http])
                ], QuoteService);
                return QuoteService;
            }());
            exports_1("QuoteService", QuoteService);
        }
    }
});
