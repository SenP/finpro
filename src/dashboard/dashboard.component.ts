import { Observable, Subscription, Subject } from 'rxjs/Rx';
import { Component, Input, OnInit, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { Watchlist, WatchlistItem } from '../common/watchlist.model';
import { WatchlistService } from '../common/watchlist.service';
import { QuoteService } from '../common/quote.service';
import { Quote } from '../common/quote.model';
import { ChartTestComponent } from './chart.test';

@Component({
    selector: 'fp-dashboard',
    template: `
                   <div class="panel panel-default">	
	                <div class="panel-heading text-center">
			            <h3> Portfolio Dashboard </h3>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-4">
                                <chart-test #daychangeChart [config]="optionsDaychangeChart"></chart-test>
                            </div>
                            <div class="col-md-4">
                                <chart-test [config]="optionsPnLChart"></chart-test>
                            </div>
                            <div class="col-md-4">
                                <chart-test [config]="optionsMarketValueChart"></chart-test>
                            </div>
                        </div>			        
		            </div>
                `,
    styles: [`
           
        `]
})

export class DashboardComponent implements OnInit, AfterViewInit {

    @Input() watchlists: Watchlist[] = [];
    @ViewChild('daychangeChart') daychangeChart: ChartTestComponent;

    marketValueChart;
    pnlChart;

    qsub: Subscription;
    optionsDaychangeChart;
    optionsPnLChart;
    optionsMarketValueChart;
    chartData;
    chartStyle = { "font-family": "Lato,'Helvetica Neue', Helvetica, Arial,'sans-serif'" };
    tooltipFn = function () {
        return '<b>' + this.x + '<b> <br>Day Change: ' + '<b>$ ' + this.y + '</b>';
    }

    constructor(private watchlistService: WatchlistService,
        private quoteService: QuoteService
    ) { }

    ngOnInit() {
        this.qsub = this.quoteService
            .init()
            .take(1)
            .subscribe(qmap => {
                this.updateQuotes(qmap);
                this.renderCharts();
            });

        this.watchlists.forEach(wl => {
            wl.instruments.forEach(stock => {
                this.quoteService.register(stock.instrument);
            });

            //this.renderCharts();

        });

    }

    ngAfterViewInit() {
        console.log(this.daychangeChart);
    }

    renderCharts() {
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
    }

    updateQuotes(qmap: Map<string, Quote>) {
        console.log(qmap);
        let idx = 0;
        this.watchlists.forEach(wl => {
            wl.instruments.forEach(stock => {
                let quote = qmap.get(stock.instrument);
                stock.lastPrice = quote.lastPrice;
                stock.change = quote.change;
                stock.percentChange = quote.percentChange;
            });
            this.daychangeChart.updateData(idx, wl.totalDayChange);
            idx += 1;
            // this.marketValueChart.update(wl.totalMarketValue);
            // this.pnlChart.update(wl.totalPnL);
            // this.daychangeChart.update(wl.totalDayChange);
        });
    }

    getChartData() {
        let portfolioDaychange, portfolioPnL, portfolioValue = 0;
        let chartData = {
            dataLabels: [],
            marketValues: [],
            pnlValues: [],
            daychangeValues: []
        };

        this.watchlists.forEach(wl => {
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
    }

}
