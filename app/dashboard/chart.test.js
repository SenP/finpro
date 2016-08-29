System.register(['@angular/core', 'angular2-highcharts'], function(exports_1, context_1) {
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
    var core_1, angular2_highcharts_1;
    var ChartTestComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular2_highcharts_1_1) {
                angular2_highcharts_1 = angular2_highcharts_1_1;
            }],
        execute: function() {
            ChartTestComponent = (function () {
                function ChartTestComponent() {
                    //setInterval(() => console.log(this.chart.series[0].data[1].y), 1000);
                }
                ChartTestComponent.prototype.saveInstance = function (chartInstance) {
                    this.chart = chartInstance;
                };
                ChartTestComponent.prototype.updateData = function (idx, newVal) {
                    var _this = this;
                    // console.log('idx: ' + idx);
                    // console.log('newVal: ' + newVal);
                    if (this.chart) {
                        var oldVal = this.chart.series[0].data[idx].y;
                        if (newVal !== oldVal) {
                            setTimeout(function () { return _this.chart.series[0].data[idx].update(newVal); }, 100);
                        }
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], ChartTestComponent.prototype, "config", void 0);
                ChartTestComponent = __decorate([
                    core_1.Component({
                        selector: 'chart-test',
                        directives: [angular2_highcharts_1.CHART_DIRECTIVES],
                        styles: ["\n                chart {\n                    display: block;\n                }\n            "],
                        template: "\n                <chart [options]=\"config\" \n                        (load)=\"saveInstance($event.context)\">\n                </chart>\n            "
                    }), 
                    __metadata('design:paramtypes', [])
                ], ChartTestComponent);
                return ChartTestComponent;
            }());
            exports_1("ChartTestComponent", ChartTestComponent);
        }
    }
});
