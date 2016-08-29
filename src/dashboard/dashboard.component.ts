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
			            <h4> Portfolio Dashboard </h4>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-6 panel-footer">
                                <chart-test #daychangeChart [config]="optionsDaychangeChart"></chart-test>
                            </div>                            
                            <div class="col-md-6 panel-footer">
                                <chart-test #pnlChart [config]="optionsPnLChart"></chart-test>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 panel-footer">
                                <chart-test #marketvalueChart [config]="optionsMarketValueChart"></chart-test>
                            </div>
                            <div class="col-md-6 panel-footer">                                
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
    @ViewChild('marketvalueChart') marketvalueChart: ChartTestComponent;
    @ViewChild('pnlChart') pnlChart: ChartTestComponent;
    
    qsub: Subscription;
    optionsDaychangeChart;
    optionsPnLChart;
    optionsMarketValueChart;
    chartData;

    chartStyle = { "font-family": "Lato,'Helvetica Neue', Helvetica, Arial,'sans-serif'" };

    tooltipDaychange = function () {
        return '<b>' + this.x + '<b> <br>Day Change: ' + '<b>$ ' + this.y + '</b>';
    }

    tooltipMarketvalue = function () {
        return '<b>' + this.x + '<b> <br>Market Value: ' + '<b>$ ' + this.y + '</b>';
    }

    tooltipNetpnl = function () {
        return '<b>' + this.x + '<b> <br>Net P/L: ' + '<b>$ ' + this.y + '</b>';
    }

    constructor(private watchlistService: WatchlistService,
        private quoteService: QuoteService
    ) { }

    ngOnInit() {
        this.qsub = this.quoteService
            .init()
            .sampleTime(5000)
            .subscribe(qmap => {
                this.updateQuotes(qmap);
                //this.renderCharts();
            });

        this.watchlists.forEach(wl => {
            wl.instruments.forEach(stock => {
                this.quoteService.register(stock.instrument);
            });

            this.renderCharts();

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
            //update the charts with latest quote values
            this.daychangeChart.updateData(idx, parseFloat(wl.totalDayChange.toFixed(2)));
            this.marketvalueChart.updateData(idx, parseFloat(wl.totalMarketValue.toFixed(2)));
            this.pnlChart.updateData(idx, parseFloat(wl.totalPnL.toFixed(2)));
            //go to next watchlist
            idx += 1;
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
            let mv = parseFloat(wl.totalMarketValue.toFixed(2));
            let pnl = parseFloat(wl.totalPnL.toFixed(2));
            let dc = parseFloat(wl.totalDayChange.toFixed(2));

            chartData.marketValues.push(mv);
            chartData.pnlValues.push(pnl);
            chartData.daychangeValues.push(dc);

            portfolioValue += mv;
            portfolioPnL += pnl;
            portfolioDaychange += dc;
        });
        console.log(chartData);
        return chartData;
    }

}
