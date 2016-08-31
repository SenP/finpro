import { Observable, Subscription, Subject } from 'rxjs/Rx';
import { Component, Input, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Watchlist, WatchlistItem } from '../common/watchlist.model';
import { WatchlistService } from '../common/watchlist.service';
import { FPChartComponent } from './fpchart.component';

@Component({
    selector: 'fp-dashboard',
    templateUrl: 'app/dashboard/dashboard.component.html'
})

export class DashboardComponent implements OnInit, AfterViewInit {

    @Input() watchlists: Watchlist[] = [];

    // Chart components
    @ViewChild('daychangeChart') daychangeChart: FPChartComponent;
    @ViewChild('marketvalueChart') marketvalueChart: FPChartComponent;
    @ViewChild('pnlChart') pnlChart: FPChartComponent;

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

        this.watchlists.forEach(wl => {
            //update the charts with new values
            this.daychangeChart.updateData(idx, wl.totalDayChange);
            this.marketvalueChart.updateData(idx, wl.totalMarketValue);
            this.pnlChart.updateData(idx, wl.totalPnL);
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

         let tooltipDaychange = function () {
            return '<b>' + this.key + '<b> <br>Day Change: ' + '<b>$ ' + this.y + '</b>';
        }

        let tooltipMarketvalue = function () {
            return '<b>' + this.key + '<b> <br>Market Value: ' + '<b>$ ' + this.y + '</b>';
        }

        let tooltipNetpnl = function () {
            return '<b>' + this.x + '<b> <br>Net P/L: ' + '<b>$ ' + this.y + '</b>';
        }

        let chartStyle = { "font-family": "Lato,'Helvetica Neue', Helvetica, Arial,'sans-serif'" };

        let optionsBaseChart = {
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
    }
}