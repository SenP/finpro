System.register(['@angular/core', './watchlist.model'], function(exports_1, context_1) {
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
    var core_1, watchlist_model_1;
    var WatchlistService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (watchlist_model_1_1) {
                watchlist_model_1 = watchlist_model_1_1;
            }],
        execute: function() {
            WatchlistService = (function () {
                function WatchlistService() {
                    this.watchlists = [];
                    //1st
                    this.watchlists.push(Object.assign(new watchlist_model_1.Watchlist(), {
                        id: 1,
                        name: 'tech',
                        description: "technology stocks",
                        owner: 'sk',
                        instruments: []
                    }));
                    this.watchlists[0].instruments.push(Object.assign(new watchlist_model_1.WatchlistItem(), {
                        instrument: 'GOOG',
                        industry: 'tech',
                        unitsOwned: 100,
                        avgPrice: 50
                    }));
                    //2nd
                    this.watchlists.push(Object.assign(new watchlist_model_1.Watchlist(), {
                        id: 2,
                        name: 'retail',
                        description: "retail stocks",
                        owner: 'sk',
                        instruments: []
                    }));
                    this.watchlists[1].instruments.push(Object.assign(new watchlist_model_1.WatchlistItem(), {
                        instrument: 'ESU16.CME',
                        industry: 'retail',
                        unitsOwned: 200,
                        avgPrice: 50
                    }));
                    //3rd
                    this.watchlists.push(Object.assign(new watchlist_model_1.Watchlist(), {
                        id: 3,
                        name: 'london',
                        description: "london stocks",
                        owner: 'sk',
                        instruments: []
                    }));
                    this.watchlists[2].instruments.push(Object.assign(new watchlist_model_1.WatchlistItem(), {
                        instrument: 'AZN.L',
                        industry: 'pharma',
                        unitsOwned: 10,
                        avgPrice: 5000
                    }));
                    this.watchlists[2].instruments.push(Object.assign(new watchlist_model_1.WatchlistItem(), {
                        instrument: 'AV.L',
                        industry: 'insurance',
                        unitsOwned: 100,
                        avgPrice: 400
                    }));
                }
                //Get the watchlists (modify later to take userid param)
                WatchlistService.prototype.getWatchlists = function () {
                    return this.watchlists;
                };
                //Update watchlist instruments with given quotes 
                WatchlistService.prototype.updateQuotes = function (qmap, wl) {
                    wl.instruments.forEach(function (stock) {
                        var quote = qmap.get(stock.instrument);
                        stock.lastPrice = quote.lastPrice;
                        stock.change = quote.change;
                        stock.percentChange = quote.percentChange;
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
                        return { status: "error", msg: "duplicate name" };
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
                    console.log(wl);
                    var i = wl.instruments.findIndex(function (ins) { return ins.instrument === wlItem.instrument; });
                    var data = null;
                    if (i !== -1) {
                        Object.assign(wl.instruments[i], wlItem);
                        data = wl.instruments[i];
                    }
                    else {
                        wl.instruments.push(Object.assign(new watchlist_model_1.WatchlistItem(), wlItem));
                        data = wl.instruments[wl.instruments.length - 1];
                    }
                    return { status: "success", data: data };
                };
                WatchlistService.prototype.deleteWatchlist = function (wlist) {
                    var _this = this;
                    var p = new Promise(function (resolve) { return setTimeout(function () {
                        resolve(_this.doRemoveWatchlist(wlist));
                    }, 2000); });
                    return p;
                };
                //remove the selected watchlist
                WatchlistService.prototype.doRemoveWatchlist = function (wlist) {
                    var i = this.watchlists.findIndex(function (w) { return w.id === wlist.id; });
                    var ret = null;
                    if (i !== -1) {
                        this.watchlists.splice(i, 1);
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
                    }
                    return { status: "success", data: wlItem };
                };
                WatchlistService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], WatchlistService);
                return WatchlistService;
            }());
            exports_1("WatchlistService", WatchlistService);
        }
    }
});
