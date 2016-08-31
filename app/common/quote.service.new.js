System.register(['@angular/core', '@angular/http', 'rxjs/Rx', 'rxjs/add/operator/map', '../common/quote.model'], function(exports_1, context_1) {
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
                    var _this = this;
                    this.jsonp = jsonp;
                    this.http = http;
                    this.base_url = 'http://finance.google.com/finance/info';
                    this.quotesMap = new Map();
                    this.quotePublisher = new Rx_1.Subject();
                    this.quoteScheduler = Rx_1.Observable.timer(0, 3000);
                    this.quoteScheduler
                        .subscribe(function () { return _this.refreshQuotes(); });
                }
                // Return the quotes publisher subject to the subscriber
                QuoteService.prototype.init = function () {
                    return this.quotePublisher;
                };
                // Add instrument to the quotes map
                QuoteService.prototype.register = function (stock) {
                    if (!this.quotesMap.get(stock)) {
                        this.quotesMap.set(stock, new quote_model_1.Quote());
                        console.log(this.quotesMap, stock);
                    }
                };
                ;
                // Remove instrument from the quotes map
                QuoteService.prototype.deregister = function (stock) {
                    this.quotesMap.delete(stock);
                };
                ;
                // Clear the quotes map
                QuoteService.prototype.reset = function () {
                    this.quotesMap.clear();
                };
                ;
                // Refresh the quotes map with latest quotes from API
                QuoteService.prototype.refreshQuotes = function () {
                    if (this.quotesMap.size > 0) {
                        var stockcodes = '';
                        this.quotesMap.forEach(function (value, key) {
                            stockcodes += key + "',";
                        });
                        stockcodes = stockcodes.slice(0, stockcodes.length - 1);
                        var params = new http_1.URLSearchParams();
                        params.set('client', 'ig');
                        params.set('q', stockcodes);
                        params.set('format', 'json');
                        params.set('callback', 'JSONP_CALLBACK');
                        this.jsonp
                            .get(this.base_url, { search: params })
                            .map(function (response) {
                            console.log(response.json());
                            return response.json();
                        })
                            .subscribe(function (response) {
                            // let newquotes = response.query.count > 1 ? response.query.results.quote : [response.query.results.quote];
                            // this.updateQuotes(newquotes);
                            // console.log(this.quotesMap);
                            // Publish new quotes
                            // this.quotePublisher.next(this.quotesMap);
                        });
                    }
                };
                // Update the quotes map with the new quote values from API (called from refreshQuotes method)
                QuoteService.prototype.updateQuotes = function (newquotes) {
                    var _this = this;
                    newquotes.forEach(function (newquote) {
                        var stock = _this.quotesMap.get(newquote.symbol);
                        if (stock) {
                            stock.lastPrice = parseFloat(newquote.LastTradePriceOnly); // + (Math.random() - 0.5);
                            stock.change = parseFloat(newquote.Change); // + (Math.random() - 0.5);
                            stock.percentChange = parseFloat(newquote.ChangeinPercent); // + (Math.random() - 0.5);
                        }
                    });
                };
                ;
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
