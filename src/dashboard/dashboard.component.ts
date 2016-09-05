import { Observable, Subscription, Subject } from 'rxjs/Rx';
import { Component, Input, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Watchlist, WatchlistItem } from '../common/watchlist.model';
import { WatchlistService } from '../common/watchlist.service';
import { FPChartComponent } from './fpchart.component';
import { TopstocksComponent } from './topstocks.component';

@Component({
    selector: 'fp-dashboard',
    templateUrl: 'app/dashboard/dashboard.component.html',
    styles: [`               
                .chart-title {
                    background: lightgrey;
                    line-height: 1.5em;
                    display: flex;
                    text-align: center;
                    justify-content: center;  
                }              
        `]
})

export class DashboardComponent implements OnInit, AfterViewInit {

    @Input() watchlists: Watchlist[] = [];

    // Chart components
    @ViewChild('daychangeChart') daychangeChart: FPChartComponent;
    @ViewChild('marketvalueChart') marketvalueChart: FPChartComponent;
    @ViewChild('pnlChart') pnlChart: FPChartComponent;

    //Topstocks tables
    @ViewChild('topMV') topMV: TopstocksComponent;
    @ViewChild('topPL') topPL: TopstocksComponent;
    @ViewChild('topDC') topDC: TopstocksComponent;

    // Chart option objects    
    optionsDaychangeChart;
    optionsPnLChart;
    optionsMarketValueChart;
    chartData;

    // Portfolio values
    portfolioDaychange = 0;
    portfolioPnL = 0;
    portfolioValue = 0;

    // Refresh scheduler
    refreshScheduler: Observable<number>;
    
    //All stocks
    allStocks: WatchlistItem[];

    constructor(private watchlistService: WatchlistService) { }

    ngOnInit() {

        //create refresh scheduler,  update dashboard and render charts
        this.refreshScheduler = Observable.timer(0, 5000);

        setTimeout(() => {
            this.renderCharts();
            this.updateDashboard();
        }, 400);

    }

    ngAfterViewInit() {
        //subscribe to refresh scheduler and update dashboard at specified interval
        this.refreshScheduler
            .subscribe(() => {
                this.updateDashboard();
            });
    }

    renderCharts() {
        this.setChartData();
        this.setChartOptions();
    }

    updateDashboard() {
        let idx = 0;
        let portfolioValue = 0;
        let portfolioPnL = 0;
        let portfolioDaychange = 0;
        let stocks = [];

        this.watchlists.forEach(wl => {
            //update the charts with new values
            this.daychangeChart.updateData(idx, wl.totalDayChange);
            this.marketvalueChart.updateData(idx, wl.totalMarketValue);
            this.pnlChart.updateData(idx, wl.totalPnL);
            //update portfolio values
            portfolioValue += wl.totalMarketValue;
            portfolioPnL += wl.totalPnL;
            portfolioDaychange += wl.totalDayChange;
            stocks = stocks.concat(wl.instruments);
            //go to next watchlist
            idx += 1;
        });
        this.portfolioValue = portfolioValue;
        this.portfolioPnL = portfolioPnL;
        this.portfolioDaychange = portfolioDaychange;
        //update topstocks tables
        this.allStocks = stocks;
        this.topMV.update();
        this.topPL.update();
        this.topDC.update();
    }

    setChartData() {
        this.portfolioDaychange, this.portfolioPnL, this.portfolioValue = 0;
        let chartData = {
            dataLabels: [],
            marketValues: [],
            pnlValues: [],
            daychangeValues: []
        };

        this.watchlists.forEach(wl => {
            chartData.dataLabels.push(wl.name);

            chartData.marketValues.push([wl.name, wl.totalMarketValue]);
            chartData.pnlValues.push(wl.totalPnL);
            chartData.daychangeValues.push(wl.totalDayChange);

            this.portfolioValue += wl.totalMarketValue;
            this.portfolioPnL += wl.totalPnL;
            this.portfolioDaychange += wl.totalDayChange;
        });
        this.chartData = chartData;
    }

    setChartOptions() {

        function tooltipFn(txt) {
            return '<strong>{x}</strong><br/> ' + txt + '<b>${point.y}</b>';
        }

        let chartStyle = { "font-family": "Lato,'Helvetica Neue', Helvetica, Arial,'sans-serif'" };

        let optionsBaseChart = {
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
                enabled: false
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
                    innerSize: '50%'
                }
            },
            series: [{
                data: this.chartData.marketValues,
                dataLabels: { enabled: true, format: '{key}<br><b>${y}</b>' },
                tooltip: { pointFormat: tooltipFn('Market Value:') }
            }]
        };
        this.optionsMarketValueChart = Object.assign({}, optionsBaseChart, this.optionsMarketValueChart);
    }
}