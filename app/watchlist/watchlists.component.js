System.register(['@angular/core', '../common/watchlist.service', '../common/watchlist.model', '../common/quote.service'], function(exports_1, context_1) {
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
    var core_1, watchlist_service_1, watchlist_model_1, quote_service_1;
    var WatchlistsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (watchlist_service_1_1) {
                watchlist_service_1 = watchlist_service_1_1;
            },
            function (watchlist_model_1_1) {
                watchlist_model_1 = watchlist_model_1_1;
            },
            function (quote_service_1_1) {
                quote_service_1 = quote_service_1_1;
            }],
        execute: function() {
            WatchlistsComponent = (function () {
                function WatchlistsComponent(watchlistService, quoteService) {
                    this.watchlistService = watchlistService;
                    this.quoteService = quoteService;
                    this.watchlists = [];
                    this.changeSelection = new core_1.EventEmitter();
                    this.isEditing = false;
                    this.isAdding = false;
                    this.isDeleting = false;
                    this.msg = null;
                    this.msgClasses = {
                        error: "msg text-danger",
                        info: "msg text-info"
                    };
                }
                WatchlistsComponent.prototype.onChangeSelection = function (wl) {
                    this.selectedWatchlist = wl;
                    this.changeSelection.emit(wl);
                };
                WatchlistsComponent.prototype.addWatchlist = function () {
                    var _this = this;
                    this.editedItem = new watchlist_model_1.Watchlist();
                    this.isAdding = true;
                    setTimeout(function () { return _this.editName.nativeElement.focus(); }, 100);
                };
                WatchlistsComponent.prototype.editWatchlist = function (wl) {
                    var _this = this;
                    this.editedItem = Object.assign(new watchlist_model_1.Watchlist(), wl);
                    this.isEditing = true;
                    setTimeout(function () { return _this.editName.nativeElement.focus(); }, 100);
                };
                WatchlistsComponent.prototype.saveWatchlist = function () {
                    var _this = this;
                    this.msg = "Saving...please wait.";
                    this.msgClass = this.msgClasses.info;
                    this.watchlistService
                        .saveWatchlist(this.editedItem)
                        .then(function (res) {
                        if (res.status === "error") {
                            _this.msg = res.msg;
                            _this.msgClass = _this.msgClasses.error;
                        }
                        else {
                            _this.cancelEdit();
                            _this.onChangeSelection(res.data);
                        }
                    });
                };
                WatchlistsComponent.prototype.cancelEdit = function () {
                    this.editedItem = null;
                    this.isEditing = false;
                    this.isAdding = false;
                    this.msg = "";
                    this.msgClass = "";
                };
                WatchlistsComponent.prototype.deleteWatchlist = function (wlist) {
                    var _this = this;
                    this.isDeleting = true;
                    this.msg = "Deleting...please wait.";
                    this.msgClass = this.msgClasses.info;
                    this.watchlistService
                        .deleteWatchlist(wlist)
                        .then(function (res) {
                        //deregister instrument from quote service
                        if (wlist.instruments.length > 0) {
                            wlist.instruments.forEach(function (ins) {
                                _this.quoteService.deregister(ins.instrument);
                            });
                        }
                        _this.isDeleting = false;
                        _this.msg = "";
                        _this.msgClass = "";
                        //reset watchlist selection if currently selected watchlist is the one being deleted
                        if (_this.selectedWatchlist === wlist) {
                            _this.onChangeSelection(null);
                        }
                    });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], WatchlistsComponent.prototype, "watchlists", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], WatchlistsComponent.prototype, "changeSelection", void 0);
                __decorate([
                    core_1.ViewChild('editName'), 
                    __metadata('design:type', Object)
                ], WatchlistsComponent.prototype, "editName", void 0);
                WatchlistsComponent = __decorate([
                    core_1.Component({
                        selector: 'fp-watchlists',
                        templateUrl: 'app/watchlist/watchlists.component.html',
                        styles: ["      \n            .msg {\n                    font-style: italic;\n                    font-size: 1.25em;\n                }   \n            \n        "]
                    }), 
                    __metadata('design:paramtypes', [watchlist_service_1.WatchlistService, quote_service_1.QuoteService])
                ], WatchlistsComponent);
                return WatchlistsComponent;
            }());
            exports_1("WatchlistsComponent", WatchlistsComponent);
        }
    }
});
