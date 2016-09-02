import { Component, Input }        from '@angular/core';
import { CHART_DIRECTIVES, ChartComponent } from 'angular2-highcharts';

@Component({
    selector: 'fp-chart',
    directives: [CHART_DIRECTIVES],
    styles: [`
                chart {
                    display: block;
                }
            `],
    template: `
                <chart [options]="config" 
                        (load)="saveInstance($event.context)">
                </chart>
            `
})
export class FPChartComponent {
    @Input() config;
    chart: ChartComponent;

    constructor() {
        //setInterval(() => console.log(this.chart.series[0].data[1].y), 1000);
    }

    saveInstance(chartInstance) {
        this.chart = chartInstance;
    }

    updateData(idx, newVal) {
        if (this.chart && this.chart.series[0].data[idx]) {
            let oldVal = this.chart.series[0].data[idx].y;
            if (newVal !== oldVal) {
                setTimeout(() => this.chart.series[0].data[idx].update(newVal), 100);
            }
        }
    }
}

