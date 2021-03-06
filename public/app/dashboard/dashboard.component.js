System.register(['@angular/core', '../common/watchlist.service', '../common/quote.service', './fpchart.component', './topstocks.component'], function(exports_1, context_1) {
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
    var core_1, watchlist_service_1, quote_service_1, fpchart_component_1, topstocks_component_1;
    var DashboardComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (watchlist_service_1_1) {
                watchlist_service_1 = watchlist_service_1_1;
            },
            function (quote_service_1_1) {
                quote_service_1 = quote_service_1_1;
            },
            function (fpchart_component_1_1) {
                fpchart_component_1 = fpchart_component_1_1;
            },
            function (topstocks_component_1_1) {
                topstocks_component_1 = topstocks_component_1_1;
            }],
        execute: function() {
            DashboardComponent = (function () {
                function DashboardComponent(watchlistService, quoteService) {
                    this.watchlistService = watchlistService;
                    this.quoteService = quoteService;
                    this.watchlists = [];
                    // Portfolio values
                    this.portfolioDaychange = 0;
                    this.portfolioPnL = 0;
                    this.portfolioValue = 0;
                }
                DashboardComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    // set initial chart data & options and update the dashboard        
                    this.initChartData();
                    this.setChartOptions();
                    this.updateDashboard();
                    //subscribe to refresh scheduler and update dashboard at specified interval
                    this.refTimerSub = this.quoteService
                        .getTimer()
                        .subscribe(function () {
                        _this.updateDashboard();
                    });
                };
                DashboardComponent.prototype.ngOnDestroy = function () {
                    this.refTimerSub.unsubscribe();
                };
                // recompute portfolio values, update charts with latest watchlist values 
                DashboardComponent.prototype.updateDashboard = function () {
                    var _this = this;
                    var idx = 0;
                    var portfolioValue = 0;
                    var portfolioPnL = 0;
                    var portfolioDaychange = 0;
                    var stocks = new Map();
                    this.watchlists.forEach(function (wl) {
                        var totalDayChange = wl.totalDayChange;
                        var totalMarketValue = wl.totalMarketValue;
                        var totalPnL = wl.totalPnL;
                        //update the charts with new values
                        _this.daychangeChart.updateData(idx, totalDayChange);
                        _this.marketvalueChart.updateData(idx, totalMarketValue);
                        _this.pnlChart.updateData(idx, totalPnL);
                        //update portfolio values
                        portfolioValue += totalMarketValue;
                        portfolioPnL += totalPnL;
                        portfolioDaychange += totalDayChange;
                        // update all stocks map
                        wl.instruments.forEach(function (ins) {
                            var stk = stocks.get(ins.instrument + ':' + ins.exchange);
                            stk ? stk.push(ins) : stocks.set(ins.instrument + ':' + ins.exchange, [ins]);
                        });
                        idx += 1;
                    });
                    this.portfolioValue = portfolioValue;
                    this.portfolioPnL = portfolioPnL;
                    this.portfolioDaychange = portfolioDaychange;
                    //update allstocks list
                    this.allStocks = stocks;
                };
                // compute initial chart values
                DashboardComponent.prototype.initChartData = function () {
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
                // set the chart display options
                DashboardComponent.prototype.setChartOptions = function () {
                    var tooltipFn = function (txt) { return '<strong>{x}</strong><br/> ' + txt + '<b>${point.y}</b>'; };
                    var chartStyle = { "font-family": "Lato,'Helvetica Neue', Helvetica, Arial,'sans-serif'" };
                    var optionsBaseChart = {
                        title: {
                            text: null,
                        },
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
                            enabled: true
                        }
                    };
                    this.optionsPnLChart = {
                        chart: {
                            type: 'column',
                            style: chartStyle
                        },
                        series: [{
                                data: this.chartData.pnlValues,
                                dataLabels: { enabled: true, format: '${y}' },
                                tooltip: { pointFormat: tooltipFn('Net P/L:') },
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
                        series: [{
                                data: this.chartData.daychangeValues,
                                dataLabels: { enabled: true, format: '${y}' },
                                tooltip: { pointFormat: tooltipFn('Day Change:') },
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
                        plotOptions: {
                            pie: {
                                innerSize: '40%',
                                center: ['50%', '50%'],
                                borderColor: null
                            }
                        },
                        series: [{
                                data: this.chartData.marketValues,
                                dataLabels: {
                                    enabled: true, format: '{key}<br><b>${y}</b>',
                                    distance: 15,
                                    connectorPadding: 5,
                                    connectorWidth: 2
                                },
                                tooltip: { pointFormat: tooltipFn('Market Value:') }
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
                        templateUrl: 'app/dashboard/dashboard.component.html',
                        styles: ["               \n                .chart-title {\n                    background: lightgrey;\n                    line-height: 1.5em;\n                    display: flex;\n                    text-align: center;\n                    justify-content: center;  \n                } \n                .chart-panel {\n                    padding-right: 5px;\n                }            \n        "]
                    }), 
                    __metadata('design:paramtypes', [watchlist_service_1.WatchlistService, quote_service_1.QuoteService])
                ], DashboardComponent);
                return DashboardComponent;
            }());
            exports_1("DashboardComponent", DashboardComponent);
        }
    }
});
