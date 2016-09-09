System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var WatchlistItem, Watchlist;
    return {
        setters:[],
        execute: function() {
            WatchlistItem = (function () {
                function WatchlistItem() {
                }
                Object.defineProperty(WatchlistItem.prototype, "marketValue", {
                    get: function () {
                        if (this.unitsOwned > 0 && this.lastPrice > 0) {
                            return this.unitsOwned * this.lastPrice;
                        }
                        return 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WatchlistItem.prototype, "dayChange", {
                    get: function () {
                        if (this.unitsOwned && this.change) {
                            return this.unitsOwned * this.change;
                        }
                        return 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WatchlistItem.prototype, "netPnL", {
                    get: function () {
                        if (this.unitsOwned && this.avgPrice && this.lastPrice) {
                            return this.unitsOwned * (this.lastPrice - this.avgPrice);
                        }
                        return 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                return WatchlistItem;
            }());
            exports_1("WatchlistItem", WatchlistItem);
            Watchlist = (function () {
                function Watchlist() {
                    this.createdOn = new Date();
                }
                Object.defineProperty(Watchlist.prototype, "totalMarketValue", {
                    get: function () {
                        var total = this.instruments.reduce(function (totalV, wl) { return totalV + wl.marketValue; }, 0);
                        return parseFloat(total.toFixed(2));
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Watchlist.prototype, "totalDayChange", {
                    get: function () {
                        var total = this.instruments.reduce(function (totalV, wl) { return totalV + wl.dayChange; }, 0);
                        return parseFloat(total.toFixed(2));
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Watchlist.prototype, "totalPnL", {
                    get: function () {
                        var total = this.instruments.reduce(function (totalV, wl) { return totalV + wl.netPnL; }, 0);
                        return parseFloat(total.toFixed(2));
                    },
                    enumerable: true,
                    configurable: true
                });
                return Watchlist;
            }());
            exports_1("Watchlist", Watchlist);
        }
    }
});
