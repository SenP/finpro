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
                return WatchlistItem;
            }());
            exports_1("WatchlistItem", WatchlistItem);
            Watchlist = (function () {
                function Watchlist() {
                    this.createdOn = new Date();
                }
                return Watchlist;
            }());
            exports_1("Watchlist", Watchlist);
        }
    }
});
