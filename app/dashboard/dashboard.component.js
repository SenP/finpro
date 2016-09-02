System.register(['rxjs/Rx', '@angular/core', '../common/watchlist.service', './fpchart.component', './topstocks.component'], function(exports_1, context_1) {
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
    var Rx_1, core_1, watchlist_service_1, fpchart_component_1, topstocks_component_1;
    var DashboardComponent;
    return {
        setters:[
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (watchlist_service_1_1) {
                watchlist_service_1 = watchlist_service_1_1;
            },
            function (fpchart_component_1_1) {
                fpchart_component_1 = fpchart_component_1_1;
            },
            function (topstocks_component_1_1) {
                topstocks_component_1 = topstocks_component_1_1;
            }],
        execute: function() {
            DashboardComponent = (function () {
                function DashboardComponent(watchlistService) {
                    this.watchlistService = watchlistService;
                    this.watchlists = [];
                    // Portfolio values
                    this.portfolioDaychange = 0;
                    this.portfolioPnL = 0;
                    this.portfolioValue = 0;
                }
                DashboardComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    //create refresh scheduler,  update dashboard and render charts
                    this.refreshScheduler = Rx_1.Observable.timer(0, 5000);
                    setTimeout(function () {
                        _this.renderCharts();
                        _this.updateDashboard();
                    }, 400);
                };
                DashboardComponent.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    //subscribe to refresh scheduler and update dashboard at specified interval
                    this.refreshScheduler
                        .subscribe(function () {
                        _this.updateDashboard();
                    });
                };
                DashboardComponent.prototype.renderCharts = function () {
                    this.setChartData();
                    this.setChartOptions();
                };
                DashboardComponent.prototype.updateDashboard = function () {
                    var _this = this;
                    var idx = 0;
                    var portfolioValue = 0;
                    var portfolioPnL = 0;
                    var portfolioDaychange = 0;
                    this.watchlists.forEach(function (wl) {
                        //update the charts with new values
                        _this.daychangeChart.updateData(idx, wl.totalDayChange);
                        _this.marketvalueChart.updateData(idx, wl.totalMarketValue);
                        _this.pnlChart.updateData(idx, wl.totalPnL);
                        //update portfolio values
                        portfolioValue += wl.totalMarketValue;
                        portfolioPnL += wl.totalPnL;
                        portfolioDaychange += wl.totalDayChange;
                        //go to next watchlist
                        idx += 1;
                    });
                    this.portfolioValue = portfolioValue;
                    this.portfolioPnL = portfolioPnL;
                    this.portfolioDaychange = portfolioDaychange;
                    //update topstocks tables
                    this.topMV.update();
                    this.topPL.update();
                    this.topDC.update();
                };
                DashboardComponent.prototype.setChartData = function () {
                    var _this = this;
                    this.portfolioDaychange, this.portfolioPnL, this.portfolioValue = 0;
                    var chartData = {
                        dataLabels: [],
                        marketValues: [],
                        pnlValues: [],
                        daychangeValues: []
                    };
                    this.watchlists.forEach(function (wl) {
                        chartData.dataLabels.push(wl.name);
                        chartData.marketValues.push([wl.name, wl.totalMarketValue]);
                        chartData.pnlValues.push(wl.totalPnL);
                        chartData.daychangeValues.push(wl.totalDayChange);
                        _this.portfolioValue += wl.totalMarketValue;
                        _this.portfolioPnL += wl.totalPnL;
                        _this.portfolioDaychange += wl.totalDayChange;
                    });
                    this.chartData = chartData;
                };
                DashboardComponent.prototype.setChartOptions = function () {
                    var tooltipDaychange = function () {
                        return '<b>' + this.key + '<b> <br>Day Change: ' + '<b>$ ' + this.y + '</b>';
                    };
                    var tooltipMarketvalue = function () {
                        return '<b>' + this.key + '<b> <br>Market Value: ' + '<b>$ ' + this.y + '</b>';
                    };
                    var tooltipNetpnl = function () {
                        return '<b>' + this.x + '<b> <br>Net P/L: ' + '<b>$ ' + this.y + '</b>';
                    };
                    var chartStyle = { "font-family": "Lato,'Helvetica Neue', Helvetica, Arial,'sans-serif'" };
                    var optionsBaseChart = {
                        xAxis: {
                            categories: this.chartData.dataLabels
                        },
                        yAxis: {
                            title: {
                                text: null
                            }
                        },
                        legend: {
                            enabled: false
                        },
                        credits: {
                            enabled: false
                        }
                    };
                    this.optionsPnLChart = {
                        chart: {
                            type: 'column',
                            style: chartStyle
                        },
                        title: {
                            text: 'Net P/L by Watchlist'
                        },
                        tooltip: {
                            formatter: tooltipNetpnl
                        },
                        series: [{
                                data: this.chartData.pnlValues,
                                color: 'green',
                                negativeColor: 'red'
                            }]
                    };
                    this.optionsPnLChart = Object.assign({}, optionsBaseChart, this.optionsPnLChart);
                    this.optionsDaychangeChart = {
                        chart: {
                            type: 'column',
                            style: chartStyle
                        },
                        title: {
                            text: 'Day Change by Watchlist'
                        },
                        tooltip: {
                            formatter: tooltipDaychange
                        },
                        series: [{
                                data: this.chartData.daychangeValues,
                                color: 'green',
                                negativeColor: 'red'
                            }]
                    };
                    this.optionsDaychangeChart = Object.assign({}, optionsBaseChart, this.optionsDaychangeChart);
                    this.optionsMarketValueChart = {
                        chart: {
                            type: 'pie',
                            style: chartStyle
                        },
                        title: {
                            text: 'Market Value by Watchlist'
                        },
                        plotOptions: {
                            pie: {
                                innerSize: '50%'
                            }
                        },
                        tooltip: {
                            formatter: tooltipMarketvalue
                        },
                        series: [{
                                data: this.chartData.marketValues
                            }]
                    };
                    this.optionsMarketValueChart = Object.assign({}, optionsBaseChart, this.optionsMarketValueChart);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], DashboardComponent.prototype, "watchlists", void 0);
                __decorate([
                    core_1.ViewChild('daychangeChart'), 
                    __metadata('design:type', fpchart_component_1.FPChartComponent)
                ], DashboardComponent.prototype, "daychangeChart", void 0);
                __decorate([
                    core_1.ViewChild('marketvalueChart'), 
                    __metadata('design:type', fpchart_component_1.FPChartComponent)
                ], DashboardComponent.prototype, "marketvalueChart", void 0);
                __decorate([
                    core_1.ViewChild('pnlChart'), 
                    __metadata('design:type', fpchart_component_1.FPChartComponent)
                ], DashboardComponent.prototype, "pnlChart", void 0);
                __decorate([
                    core_1.ViewChild('topMV'), 
                    __metadata('design:type', topstocks_component_1.TopstocksComponent)
                ], DashboardComponent.prototype, "topMV", void 0);
                __decorate([
                    core_1.ViewChild('topPL'), 
                    __metadata('design:type', topstocks_component_1.TopstocksComponent)
                ], DashboardComponent.prototype, "topPL", void 0);
                __decorate([
                    core_1.ViewChild('topDC'), 
                    __metadata('design:type', topstocks_component_1.TopstocksComponent)
                ], DashboardComponent.prototype, "topDC", void 0);
                DashboardComponent = __decorate([
                    core_1.Component({
                        selector: 'fp-dashboard',
                        templateUrl: 'app/dashboard/dashboard.component.html'
                    }), 
                    __metadata('design:paramtypes', [watchlist_service_1.WatchlistService])
                ], DashboardComponent);
                return DashboardComponent;
            }());
            exports_1("DashboardComponent", DashboardComponent);
        }
    }
});
