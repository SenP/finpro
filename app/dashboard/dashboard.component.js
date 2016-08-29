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
                    this.tooltipDaychange = function () {
                        return '<b>' + this.x + '<b> <br>Day Change: ' + '<b>$ ' + this.y + '</b>';
                    };
                    this.tooltipMarketvalue = function () {
                        return '<b>' + this.x + '<b> <br>Market Value: ' + '<b>$ ' + this.y + '</b>';
                    };
                    this.tooltipNetpnl = function () {
                        return '<b>' + this.x + '<b> <br>Net P/L: ' + '<b>$ ' + this.y + '</b>';
                    };
                }
                DashboardComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.qsub = this.quoteService
                        .init()
                        .sampleTime(5000)
                        .subscribe(function (qmap) {
                        _this.updateQuotes(qmap);
                        //this.renderCharts();
                    });
                    this.watchlists.forEach(function (wl) {
                        wl.instruments.forEach(function (stock) {
                            _this.quoteService.register(stock.instrument);
                        });
                        _this.renderCharts();
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
                            formatter: this.tooltipNetpnl
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
                            formatter: this.tooltipDaychange
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
                            formatter: this.tooltipMarketvalue
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
                        //update the charts with latest quote values
                        _this.daychangeChart.updateData(idx, parseFloat(wl.totalDayChange.toFixed(2)));
                        _this.marketvalueChart.updateData(idx, parseFloat(wl.totalMarketValue.toFixed(2)));
                        _this.pnlChart.updateData(idx, parseFloat(wl.totalPnL.toFixed(2)));
                        //go to next watchlist
                        idx += 1;
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
                        var mv = parseFloat(wl.totalMarketValue.toFixed(2));
                        var pnl = parseFloat(wl.totalPnL.toFixed(2));
                        var dc = parseFloat(wl.totalDayChange.toFixed(2));
                        chartData.marketValues.push(mv);
                        chartData.pnlValues.push(pnl);
                        chartData.daychangeValues.push(dc);
                        portfolioValue += mv;
                        portfolioPnL += pnl;
                        portfolioDaychange += dc;
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
                __decorate([
                    core_1.ViewChild('marketvalueChart'), 
                    __metadata('design:type', chart_test_1.ChartTestComponent)
                ], DashboardComponent.prototype, "marketvalueChart", void 0);
                __decorate([
                    core_1.ViewChild('pnlChart'), 
                    __metadata('design:type', chart_test_1.ChartTestComponent)
                ], DashboardComponent.prototype, "pnlChart", void 0);
                DashboardComponent = __decorate([
                    core_1.Component({
                        selector: 'fp-dashboard',
                        template: "\n                   <div class=\"panel panel-default\">\t\n\t                <div class=\"panel-heading text-center\">\n\t\t\t            <h4> Portfolio Dashboard </h4>\n                    </div>\n                    <div class=\"panel-body\">\n                        <div class=\"row\">\n                            <div class=\"col-md-6 panel-footer\">\n                                <chart-test #daychangeChart [config]=\"optionsDaychangeChart\"></chart-test>\n                            </div>                            \n                            <div class=\"col-md-6 panel-footer\">\n                                <chart-test #pnlChart [config]=\"optionsPnLChart\"></chart-test>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-md-6 panel-footer\">\n                                <chart-test #marketvalueChart [config]=\"optionsMarketValueChart\"></chart-test>\n                            </div>\n                            <div class=\"col-md-6 panel-footer\">                                \n                            </div>\n                        </div>\t\t\t        \n\t\t            </div>\n                ",
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
