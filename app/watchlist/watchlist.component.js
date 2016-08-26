System.register(['rxjs/add/operator/map', '@angular/core', '../common/watchlist.service', '../common/quote.service', '../common/watchlist.model'], function(exports_1, context_1) {
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
    var core_1, watchlist_service_1, quote_service_1, watchlist_model_1;
    var WatchlistComponent;
    return {
        setters:[
            function (_1) {},
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (watchlist_service_1_1) {
                watchlist_service_1 = watchlist_service_1_1;
            },
            function (quote_service_1_1) {
                quote_service_1 = quote_service_1_1;
            },
            function (watchlist_model_1_1) {
                watchlist_model_1 = watchlist_model_1_1;
            }],
        execute: function() {
            WatchlistComponent = (function () {
                function WatchlistComponent(watchlistService, quoteService) {
                    var _this = this;
                    this.watchlistService = watchlistService;
                    this.quoteService = quoteService;
                    this.watchlist = null;
                    this.isEditing = false;
                    this.isAdding = false;
                    this.isDeleting = false;
                    this.msg = null;
                    this.qsub = this.quoteService
                        .init()
                        .subscribe(function (qmap) {
                        _this.updateQuotes(qmap);
                    });
                }
                WatchlistComponent.prototype.ngOnChanges = function () {
                    this.isEditing = false;
                    this.isAdding = false;
                };
                WatchlistComponent.prototype.ngOnDestroy = function () {
                    this.qsub.unsubscribe();
                };
                WatchlistComponent.prototype.updateQuotes = function (qmap) {
                    this.watchlist.instruments.forEach(function (stock) {
                        var quote = qmap.get(stock.instrument);
                        stock.lastPrice = quote.lastPrice;
                        stock.change = quote.change;
                        stock.percentChange = quote.percentChange;
                    });
                };
                WatchlistComponent.prototype.addWatchlistItem = function () {
                    this.editedItem = new watchlist_model_1.WatchlistItem();
                    this.isAdding = true;
                };
                WatchlistComponent.prototype.editWatchlistItem = function (stock) {
                    this.editedItem = Object.assign(new watchlist_model_1.WatchlistItem(), stock);
                    this.isEditing = true;
                };
                WatchlistComponent.prototype.saveWatchlistItem = function () {
                    var _this = this;
                    this.msg = "Saving...please wait.";
                    console.log(this.watchlist);
                    this.watchlistService
                        .saveWatchlistItem(this.watchlist, this.editedItem)
                        .then(function (res) {
                        _this.quoteService.register(_this.editedItem.instrument);
                        _this.cancelEdit();
                    });
                };
                WatchlistComponent.prototype.cancelEdit = function () {
                    this.editedItem = null;
                    this.isEditing = false;
                    this.isAdding = false;
                    this.msg = "";
                };
                WatchlistComponent.prototype.deleteWatchlistItem = function (stock) {
                    var _this = this;
                    console.log('deleting :' + JSON.stringify(stock));
                    this.isDeleting = true;
                    this.watchlistService
                        .deleteWatchlistItem(this.watchlist, stock)
                        .then(function (res) {
                        _this.quoteService.deregister(stock.instrument);
                        _this.isDeleting = false;
                    });
                };
                //utility method for getting font color based on positive/negative change
                WatchlistComponent.prototype.getChangeColor = function (val) {
                    if (!val || isNaN(val) || val === 0)
                        return 'black';
                    return (val > 0 ? 'green' : 'red');
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', watchlist_model_1.Watchlist)
                ], WatchlistComponent.prototype, "watchlist", void 0);
                WatchlistComponent = __decorate([
                    core_1.Component({
                        selector: 'fp-watchlist',
                        templateUrl: 'app/watchlist/watchlist.component.html',
                        styles: ["           \n                .number-field {\n                    text-align: right\n                }\n\n                .panel-heading {\n                    font-size: 2em;\n                }\n            "]
                    }), 
                    __metadata('design:paramtypes', [watchlist_service_1.WatchlistService, quote_service_1.QuoteService])
                ], WatchlistComponent);
                return WatchlistComponent;
            }());
            exports_1("WatchlistComponent", WatchlistComponent);
        }
    }
});
