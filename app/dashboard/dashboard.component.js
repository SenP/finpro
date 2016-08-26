System.register(['@angular/core', '../common/watchlist.service', '../common/quote.service', './chart.test'], function(exports_1, context_1) {
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
    var core_1, watchlist_service_1, quote_service_1, chart_test_1;
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
            function (chart_test_1_1) {
                chart_test_1 = chart_test_1_1;
            }],
        execute: function() {
            DashboardComponent = (function () {
                function DashboardComponent(watchlistService, quoteService) {
                    this.watchlistService = watchlistService;
                    this.quoteService = quoteService;
                    this.watchlists = [];
                    this.chartStyle = { "font-family": "Lato,'Helvetica Neue', Helvetica, Arial,'sans-serif'" };
                    this.tooltipFn = function () {
                        return '<b>' + this.x + '<b> <br>Day Change: ' + '<b>$ ' + this.y + '</b>';
                    };
                }
                DashboardComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.qsub = this.quoteService
                        .init()
                        .take(1)
                        .subscribe(function (qmap) {
                        _this.updateQuotes(qmap);
                        _this.renderCharts();
                    });
                    this.watchlists.forEach(function (wl) {
                        wl.instruments.forEach(function (stock) {
                            _this.quoteService.register(stock.instrument);
                        });
                        //this.renderCharts();
                    });
                };
                DashboardComponent.prototype.ngAfterViewInit = function () {
                    console.log(this.daychangeChart);
                };
                DashboardComponent.prototype.renderCharts = function () {
                    this.chartData = this.getChartData();
                    this.optionsPnLChart = {
                        chart: {
                            type: 'column',
                            style: this.chartStyle
                        },
                        title: {
                            text: 'Net P/L by Watchlist'
                        },
                        xAxis: {
                            categories: this.chartData.dataLabels
                        },
                        yAxis: {
                            title: {
                                text: null
                            }
                        },
                        tooltip: {
                            formatter: this.tooltipFn
                        },
                        legend: {
                            enabled: false
                        },
                        credits: {
                            enabled: false
                        },
                        series: [{
                                data: this.chartData.pnlValues,
                                color: 'green',
                                negativeColor: 'red'
                            }]
                    };
                    this.optionsDaychangeChart = {
                        chart: {
                            type: 'column',
                            style: this.chartStyle
                        },
                        title: {
                            text: 'Day Change by Watchlist'
                        },
                        xAxis: {
                            categories: this.chartData.dataLabels
                        },
                        yAxis: {
                            title: {
                                text: null
                            }
                        },
                        tooltip: {
                            formatter: this.tooltipFn
                        },
                        legend: {
                            enabled: false
                        },
                        credits: {
                            enabled: false
                        },
                        series: [{
                                data: this.chartData.daychangeValues,
                                color: 'green',
                                negativeColor: 'red'
                            }]
                    };
                    this.optionsMarketValueChart = {
                        chart: {
                            type: 'pie',
                            style: this.chartStyle
                        },
                        title: {
                            text: 'Market Value by Watchlist'
                        },
                        xAxis: {
                            categories: this.chartData.dataLabels
                        },
                        yAxis: {
                            title: {
                                text: null
                            }
                        },
                        plotOptions: {
                            pie: {
                                innerSize: '50%'
                            }
                        },
                        tooltip: {
                            formatter: this.tooltipFn
                        },
                        legend: {
                            enabled: false
                        },
                        credits: {
                            enabled: false
                        },
                        series: [{
                                data: this.chartData.marketValues
                            }]
                    };
                };
                DashboardComponent.prototype.updateQuotes = function (qmap) {
                    var _this = this;
                    console.log(qmap);
                    var idx = 0;
                    this.watchlists.forEach(function (wl) {
                        wl.instruments.forEach(function (stock) {
                            var quote = qmap.get(stock.instrument);
                            stock.lastPrice = quote.lastPrice;
                            stock.change = quote.change;
                            stock.percentChange = quote.percentChange;
                        });
                        _this.daychangeChart.updateData(idx, wl.totalDayChange);
                        idx += 1;
                        // this.marketValueChart.update(wl.totalMarketValue);
                        // this.pnlChart.update(wl.totalPnL);
                        // this.daychangeChart.update(wl.totalDayChange);
                    });
                };
                DashboardComponent.prototype.getChartData = function () {
                    var portfolioDaychange, portfolioPnL, portfolioValue = 0;
                    var chartData = {
                        dataLabels: [],
                        marketValues: [],
                        pnlValues: [],
                        daychangeValues: []
                    };
                    this.watchlists.forEach(function (wl) {
                        chartData.dataLabels.push(wl.name);
                        chartData.marketValues.push(wl.totalMarketValue);
                        chartData.pnlValues.push(wl.totalPnL);
                        chartData.daychangeValues.push(wl.totalDayChange);
                        portfolioValue += wl.totalMarketValue;
                        portfolioPnL += wl.totalPnL;
                        portfolioDaychange += wl.totalDayChange;
                    });
                    console.log(chartData);
                    return chartData;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], DashboardComponent.prototype, "watchlists", void 0);
                __decorate([
                    core_1.ViewChild('daychangeChart'), 
                    __metadata('design:type', chart_test_1.ChartTestComponent)
                ], DashboardComponent.prototype, "daychangeChart", void 0);
                DashboardComponent = __decorate([
                    core_1.Component({
                        selector: 'fp-dashboard',
                        template: "\n                   <div class=\"panel panel-default\">\t\n\t                <div class=\"panel-heading text-center\">\n\t\t\t            <h3> Portfolio Dashboard </h3>\n                    </div>\n                    <div class=\"panel-body\">\n                        <div class=\"row\">\n                            <div class=\"col-md-4\">\n                                <chart-test #daychangeChart [config]=\"optionsDaychangeChart\"></chart-test>\n                            </div>\n                            <div class=\"col-md-4\">\n                                <chart-test [config]=\"optionsPnLChart\"></chart-test>\n                            </div>\n                            <div class=\"col-md-4\">\n                                <chart-test [config]=\"optionsMarketValueChart\"></chart-test>\n                            </div>\n                        </div>\t\t\t        \n\t\t            </div>\n                ",
                        styles: ["\n           \n        "]
                    }), 
                    __metadata('design:paramtypes', [watchlist_service_1.WatchlistService, quote_service_1.QuoteService])
                ], DashboardComponent);
                return DashboardComponent;
            }());
            exports_1("DashboardComponent", DashboardComponent);
        }
    }
});
