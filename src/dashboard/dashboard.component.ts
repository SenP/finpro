import { Observable, Subscription, Subject } from 'rxjs/Rx';
import { Component, Input, OnInit, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { Watchlist, WatchlistItem } from '../common/watchlist.model';
import { WatchlistService } from '../common/watchlist.service';
import { QuoteService } from '../common/quote.service';
import { Quote } from '../common/quote.model';
import { FPChartComponent } from './fpchart.component';

@Component({
    selector: 'fp-dashboard',
    templateUrl: 'app/dashboard/dashboard.component.html'     
})

export class DashboardComponent implements OnInit, AfterViewInit {

    @Input() watchlists: Watchlist[] = [];
    @ViewChild('daychangeChart') daychangeChart: FPChartComponent;
    @ViewChild('marketvalueChart') marketvalueChart: FPChartComponent;
    @ViewChild('pnlChart') pnlChart: FPChartComponent;

    //Subscription to quote service
    qsub: Subscription;

    //Chart option objects
    optionsBaseChart;
    optionsDaychangeChart;
    optionsPnLChart;
    optionsMarketValueChart;
    chartData;

    chartStyle = { "font-family": "Lato,'Helvetica Neue', Helvetica, Arial,'sans-serif'" };

    tooltipDaychange = function () {
        return '<b>' + this.x + '<b> <br>Day Change: ' + '<b>$ ' + this.y + '</b>';
    }

    tooltipMarketvalue = function () {
        return '<b>' + this.key + '<b> <br>Market Value: ' + '<b>$ ' + this.y + '</b>';
    }

    tooltipNetpnl = function () {
        return '<b>' + this.x + '<b> <br>Net P/L: ' + '<b>$ ' + this.y + '</b>';
    }

    constructor(private watchlistService: WatchlistService,
        private quoteService: QuoteService
    ) { }

    ngOnInit() {
        //register all instruments with quote service
        this.watchlists.forEach(wl => {
            wl.instruments.forEach(stock => {
                this.quoteService.register(stock.instrument);
            });

            //subscribe to quote publisher,  update quotes once and render charts
            this.qsub = this.quoteService
                .init()
                .take(1)
                .subscribe(qmap => {
                    this.updateQuotes(qmap);
                    this.renderCharts();
                });

        });
    }

    ngAfterViewInit() {
        console.log('in dashboard after view init');
        //subscribe to quote publisher and update quotes at specified interval
        this.qsub = this.quoteService
            .init()
            //.sampleTime(5000)
            .subscribe(qmap => {
                this.updateQuotes(qmap);
            });
    }

    renderCharts() {
        this.setChartData();
        this.setChartOptions();
    }

    updateQuotes(qmap: Map<string, Quote>) {
        let idx = 0;
        this.watchlists.forEach(wl => {
            //update the watchlist with new quotes
            this.watchlistService.updateQuotes(qmap, wl);
            //update the charts with new values
            this.daychangeChart.updateData(idx, wl.totalDayChange);
            this.marketvalueChart.updateData(idx, wl.totalMarketValue);
            this.pnlChart.updateData(idx, wl.totalPnL);
            //go to next watchlist
            idx += 1;
        });
    }

    setChartData() {
        let portfolioDaychange, portfolioPnL, portfolioValue = 0;
        let chartData = {
            dataLabels: [],
            marketValues: [],
            pnlValues: [],
            daychangeValues: [],
            portfolioValue: 0,
            portfolioPnL: 0,
            portfolioDaychange: 0
        };

        this.watchlists.forEach(wl => {
            chartData.dataLabels.push(wl.name);

            chartData.marketValues.push([wl.name, wl.totalMarketValue]);
            chartData.pnlValues.push(wl.totalPnL);
            chartData.daychangeValues.push(wl.totalDayChange);

            chartData.portfolioValue += wl.totalMarketValue;
            chartData.portfolioPnL += wl.totalPnL;
            chartData.portfolioDaychange += wl.totalDayChange;
        });
        console.log(chartData);
        this.chartData = chartData;
    }

    setChartOptions() {
        this.optionsBaseChart = {            
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
                style: this.chartStyle
            },
            title: {
                text: 'Net P/L by Watchlist'
            },
            tooltip: {
                formatter: this.tooltipNetpnl
            },
            series: [{
                data: this.chartData.pnlValues,
                color: 'green',
                negativeColor: 'red'
            }]
        };
        this.optionsPnLChart = Object.assign({}, this.optionsBaseChart, this.optionsPnLChart);

        this.optionsDaychangeChart = {
            chart: {
                type: 'column',
                style: this.chartStyle
            },
            title: {
                text: 'Day Change by Watchlist'
            },
            tooltip: {
                formatter: this.tooltipDaychange
            },
            series: [{
                data: this.chartData.daychangeValues,
                color: 'green',
                negativeColor: 'red'
            }]
        };
        this.optionsDaychangeChart = Object.assign({}, this.optionsBaseChart, this.optionsDaychangeChart);

        this.optionsMarketValueChart = {
            chart: {
                type: 'pie',
                style: this.chartStyle
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
                formatter: this.tooltipMarketvalue
            },
            series: [{
                data: this.chartData.marketValues
            }]
        };
        this.optionsMarketValueChart = Object.assign({}, this.optionsBaseChart, this.optionsMarketValueChart);
    }
}