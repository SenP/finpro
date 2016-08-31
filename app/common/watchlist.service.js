System.register(['@angular/core', './watchlist.model', '../common/quote.service'], function(exports_1, context_1) {
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
    var core_1, watchlist_model_1, quote_service_1;
    var WatchlistService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (watchlist_model_1_1) {
                watchlist_model_1 = watchlist_model_1_1;
            },
            function (quote_service_1_1) {
                quote_service_1 = quote_service_1_1;
            }],
        execute: function() {
            WatchlistService = (function () {
                function WatchlistService(quoteService) {
                    this.quoteService = quoteService;
                    this.watchlists = [];
                    //1st
                    this.watchlists.push(Object.assign(new watchlist_model_1.Watchlist(), {
                        id: 1,
                        name: 'US',
                        description: "technology stocks",
                        owner: 'sk',
                        instruments: []
                    }));
                    this.watchlists[0].instruments.push(Object.assign(new watchlist_model_1.WatchlistItem(), {
                        instrument: 'GOOG',
                        exchange: 'NASDAQ',
                        unitsOwned: 100,
                        avgPrice: 50
                    }));
                    //2nd
                    this.watchlists.push(Object.assign(new watchlist_model_1.Watchlist(), {
                        id: 2,
                        name: 'UK',
                        description: "UK stocks",
                        owner: 'sk',
                        instruments: []
                    }));
                    this.watchlists[1].instruments.push(Object.assign(new watchlist_model_1.WatchlistItem(), {
                        instrument: 'AZN',
                        exchange: 'LON',
                        unitsOwned: 20,
                        avgPrice: 5000
                    }));
                    //3rd
                    this.watchlists.push(Object.assign(new watchlist_model_1.Watchlist(), {
                        id: 3,
                        name: 'India',
                        description: "Indian stocks",
                        owner: 'sk',
                        instruments: []
                    }));
                    this.watchlists[2].instruments.push(Object.assign(new watchlist_model_1.WatchlistItem(), {
                        instrument: 'INFY',
                        exchange: 'NSE',
                        unitsOwned: 100,
                        avgPrice: 1000
                    }));
                    this.watchlists[2].instruments.push(Object.assign(new watchlist_model_1.WatchlistItem(), {
                        instrument: 'RELIANCE',
                        exchange: 'NSE',
                        unitsOwned: 100,
                        avgPrice: 900
                    }));
                }
                //Get the watchlists (modify later to take userid param)
                WatchlistService.prototype.getWatchlists = function () {
                    // localStorage.setItem("watchlists", JSON.stringify(this.watchlists));
                    // console.log(localStorage.getItem("watchlists"));
                    return this.watchlists;
                };
                //Update watchlist instruments with given quotes 
                WatchlistService.prototype.updateQuotes = function (qmap) {
                    this.watchlists.forEach(function (wl) {
                        wl.instruments.forEach(function (stock) {
                            var quote = qmap.get(stock.exchange + ':' + stock.instrument);
                            if (quote) {
                                stock.lastPrice = quote.lastPrice || 0;
                                stock.change = quote.change || 0;
                                stock.percentChange = quote.percentChange || 0;
                            }
                        });
                    });
                };
                //Save a watchlist, simulate http post delay  
                WatchlistService.prototype.saveWatchlist = function (wl) {
                    var _this = this;
                    var p = new Promise(function (resolve) { return setTimeout(function () {
                        resolve(_this.doSaveWatchlist(wl));
                    }, 2000); });
                    return p;
                };
                //utility: save the edited/new watchlist
                WatchlistService.prototype.doSaveWatchlist = function (wlist) {
                    var i = this.watchlists.findIndex(function (wl) { return wl.id === wlist.id; });
                    var data = null;
                    var dupName = this.watchlists.findIndex(function (wl) { return (wl.id !== wlist.id) && (wl.name === wlist.name); });
                    if (dupName !== -1) {
                        return { status: "error", msg: "Duplicate watchlist name" };
                    }
                    if (i === -1 && this.watchlists.length === 10) {
                        return { status: "error", msg: "Can not create more than 10 watchlists" };
                    }
                    if (i !== -1) {
                        Object.assign(this.watchlists[i], wlist);
                        data = this.watchlists[i];
                    }
                    else {
                        wlist.id = this.watchlists.reduce(function (prev, curr) { return prev.id > curr.id ? prev : curr; }, { id: 0 }).id + 1;
                        wlist.instruments = [];
                        this.watchlists.push(Object.assign(new watchlist_model_1.Watchlist(), wlist));
                        data = this.watchlists[this.watchlists.length - 1];
                    }
                    return { status: "success", data: data };
                };
                //Save a watchlist item, simulate http post delay  
                WatchlistService.prototype.saveWatchlistItem = function (wlist, wlItem) {
                    var _this = this;
                    var p = new Promise(function (resolve) { return setTimeout(function () {
                        resolve(_this.doSaveWatchlistItem(wlist, wlItem));
                    }, 2000); });
                    return p;
                };
                //utility: save the edited/new watchlist item
                WatchlistService.prototype.doSaveWatchlistItem = function (wlist, wlItem) {
                    var wl = this.watchlists[this.watchlists.findIndex(function (w) { return w.id === wlist.id; })];
                    var i = wl.instruments.findIndex(function (ins) { return ins.instrument === wlItem.instrument; });
                    var data = null;
                    if (i === -1 && wl.instruments.length === 30) {
                        return { status: "error", msg: "Can not have more than 30 stocks in a watchlist" };
                    }
                    if (i !== -1) {
                        Object.assign(wl.instruments[i], wlItem);
                        data = wl.instruments[i];
                    }
                    else {
                        wl.instruments.push(Object.assign(new watchlist_model_1.WatchlistItem(), wlItem));
                        this.quoteService.register(wlItem.instrument, wlItem.exchange);
                        data = wl.instruments[wl.instruments.length - 1];
                    }
                    return { status: "success", data: data };
                };
                //simulate http delete of watchlist
                WatchlistService.prototype.deleteWatchlist = function (wlist) {
                    var _this = this;
                    var p = new Promise(function (resolve) { return setTimeout(function () {
                        resolve(_this.doRemoveWatchlist(wlist));
                    }, 2000); });
                    return p;
                };
                //remove the selected watchlist
                WatchlistService.prototype.doRemoveWatchlist = function (wlist) {
                    var _this = this;
                    var i = this.watchlists.findIndex(function (w) { return w.id === wlist.id; });
                    var ret = null;
                    if (i !== -1) {
                        this.watchlists.splice(i, 1);
                        //deregister instrument from quote service
                        if (wlist.instruments.length > 0) {
                            wlist.instruments.forEach(function (ins) {
                                _this.quoteService.deregister(ins.instrument, ins.exchange);
                            });
                        }
                    }
                    return { status: "success", data: wlist };
                };
                WatchlistService.prototype.deleteWatchlistItem = function (wlist, wlItem) {
                    var _this = this;
                    var p = new Promise(function (resolve) { return setTimeout(function () {
                        resolve(_this.doRemoveWatchlistItem(wlist, wlItem));
                    }, 2000); });
                    return p;
                };
                //remove the selected watchlist item
                WatchlistService.prototype.doRemoveWatchlistItem = function (wlist, wlItem) {
                    var wl = this.watchlists[this.watchlists.findIndex(function (w) { return w.id === wlist.id; })];
                    var i = wl.instruments.findIndex(function (ins) { return ins.instrument === wlItem.instrument; });
                    var ret = null;
                    if (i !== -1) {
                        wl.instruments.splice(i, 1);
                        this.quoteService.deregister(wlItem.instrument, wlItem.exchange);
                    }
                    return { status: "success", data: wlItem };
                };
                WatchlistService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [quote_service_1.QuoteService])
                ], WatchlistService);
                return WatchlistService;
            }());
            exports_1("WatchlistService", WatchlistService);
        }
    }
});
