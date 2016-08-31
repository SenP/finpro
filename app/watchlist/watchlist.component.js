System.register(['@angular/core', '../common/watchlist.service', '../common/watchlist.model'], function(exports_1, context_1) {
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
    var core_1, watchlist_service_1, watchlist_model_1;
    var WatchlistComponent;
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
            }],
        execute: function() {
            WatchlistComponent = (function () {
                function WatchlistComponent(watchlistService) {
                    this.watchlistService = watchlistService;
                    this.watchlist = null;
                    this.isEditing = false;
                    this.isAdding = false;
                    this.isDeleting = false;
                    this.msg = "";
                    this.msgClasses = {
                        error: " msg text-center text-danger",
                        info: "msg text-center text-info"
                    };
                }
                WatchlistComponent.prototype.ngOnChanges = function () {
                    this.isEditing = false;
                    this.isAdding = false;
                    this.isDeleting = false;
                };
                WatchlistComponent.prototype.addWatchlistItem = function () {
                    var _this = this;
                    this.editedItem = new watchlist_model_1.WatchlistItem();
                    this.isAdding = true;
                    setTimeout(function () { return _this.editCode.nativeElement.focus(); }, 100);
                };
                WatchlistComponent.prototype.editWatchlistItem = function (stock) {
                    var _this = this;
                    this.editedItem = Object.assign(new watchlist_model_1.WatchlistItem(), stock);
                    this.isEditing = true;
                    setTimeout(function () { return _this.editUnits.nativeElement.focus(); }, 100);
                };
                WatchlistComponent.prototype.saveWatchlistItem = function () {
                    var _this = this;
                    var valid = this.validateWatchlistItem();
                    if (valid.status === "error") {
                        this.msg = valid.msg;
                        this.msgClass = this.msgClasses.error;
                    }
                    else {
                        this.msg = "Saving...please wait.";
                        this.msgClass = this.msgClasses.info;
                        this.watchlistService
                            .saveWatchlistItem(this.watchlist, this.editedItem)
                            .then(function (res) {
                            _this.actionDone();
                        });
                    }
                };
                //validate edited watchlist item
                WatchlistComponent.prototype.validateWatchlistItem = function () {
                    var wli = this.editedItem;
                    var result = { status: "success", msg: "success" };
                    //validate instrument
                    if (wli.instrument.length < 1 || wli.instrument.length > 10) {
                        result.status = "error";
                        result.msg = "Stock code should be between 3 to 10 characters";
                        return result;
                    }
                    if (this.isAdding && this.watchlist.instruments.findIndex(function (w) { return w.instrument === wli.instrument; }) !== -1) {
                        result.status = "error";
                        result.msg = "'" + wli.instrument + "' already exists in this watchlist";
                        return result;
                    }
                    //validate quantity
                    if (isNaN(wli.unitsOwned)) {
                        result.status = "error";
                        result.msg = "'Units owned' should be a number between 1 to 99,999,999,999";
                        return result;
                    }
                    if (wli.unitsOwned < 1 || wli.unitsOwned > 99999999999) {
                        result.status = "error";
                        result.msg = "'Units owned' should be between 1 to 99,999,999,999";
                        return result;
                    }
                    //validate avg price
                    if (isNaN(wli.avgPrice)) {
                        result.status = "error";
                        result.msg = "'Avg buy price' should be a number";
                        return result;
                    }
                    if (wli.avgPrice <= 0 || wli.avgPrice >= 10000) {
                        result.status = "error";
                        result.msg = "'Avg buy price' should be more than 0 and less than 10000";
                        return result;
                    }
                    return result;
                };
                WatchlistComponent.prototype.deleteWatchlistItem = function (stock) {
                    var _this = this;
                    if (confirm('Delete ' + stock.instrument + ' from watchlist?')) {
                        this.isDeleting = true;
                        this.msg = "Deleting...please wait.";
                        this.msgClass = this.msgClasses.info;
                        this.watchlistService
                            .deleteWatchlistItem(this.watchlist, stock)
                            .then(function (res) {
                            _this.actionDone();
                        });
                    }
                };
                WatchlistComponent.prototype.actionDone = function () {
                    this.editedItem = null;
                    this.isEditing = false;
                    this.isAdding = false;
                    this.isDeleting = false;
                    this.msg = "";
                    this.msgClass = "";
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', watchlist_model_1.Watchlist)
                ], WatchlistComponent.prototype, "watchlist", void 0);
                __decorate([
                    core_1.ViewChild('editCode'), 
                    __metadata('design:type', Object)
                ], WatchlistComponent.prototype, "editCode", void 0);
                __decorate([
                    core_1.ViewChild('editUnits'), 
                    __metadata('design:type', Object)
                ], WatchlistComponent.prototype, "editUnits", void 0);
                WatchlistComponent = __decorate([
                    core_1.Component({
                        selector: 'fp-watchlist',
                        templateUrl: 'app/watchlist/watchlist.component.html',
                        styles: ["           \n                .number-field {\n                    text-align: right\n                }\n\n                .panel-heading {\n                    font-size: 2em;\n                }\n                .msg {\n                    font-style: italic;\n                    font-size: 1.2em;\n                }\n            "]
                    }), 
                    __metadata('design:paramtypes', [watchlist_service_1.WatchlistService])
                ], WatchlistComponent);
                return WatchlistComponent;
            }());
            exports_1("WatchlistComponent", WatchlistComponent);
        }
    }
});
