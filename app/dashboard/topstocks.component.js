System.register(['@angular/core', '../common/watchlist.service', '../common/filterArr.pipe'], function(exports_1, context_1) {
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
    var core_1, watchlist_service_1, filterArr_pipe_1;
    var TopstocksComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (watchlist_service_1_1) {
                watchlist_service_1 = watchlist_service_1_1;
            },
            function (filterArr_pipe_1_1) {
                filterArr_pipe_1 = filterArr_pipe_1_1;
            }],
        execute: function() {
            TopstocksComponent = (function () {
                function TopstocksComponent(watchlistService, filterList) {
                    this.watchlistService = watchlistService;
                    this.filterList = filterList;
                    this.topStocks = [];
                }
                TopstocksComponent.prototype.update = function () {
                    this.topStocks = this.filterList.transform(this.allStocks, this.orderBy, this.numRequired, this.sortOrder);
                };
                __decorate([
                    core_1.Input('stocks'), 
                    __metadata('design:type', Array)
                ], TopstocksComponent.prototype, "allStocks", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], TopstocksComponent.prototype, "title", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], TopstocksComponent.prototype, "orderBy", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], TopstocksComponent.prototype, "numRequired", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], TopstocksComponent.prototype, "sortOrder", void 0);
                TopstocksComponent = __decorate([
                    core_1.Component({
                        selector: 'fp-topstocks',
                        templateUrl: 'app/dashboard/topstocks.component.html',
                        styles: ["\n                .number-field {\n                    text-align: center\n                }                \n                .topTable {\n                    background: white\n                }                \n        "]
                    }), 
                    __metadata('design:paramtypes', [watchlist_service_1.WatchlistService, filterArr_pipe_1.FilterArrPipe])
                ], TopstocksComponent);
                return TopstocksComponent;
            }());
            exports_1("TopstocksComponent", TopstocksComponent);
        }
    }
});
