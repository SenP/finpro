System.register(['@angular/core'], function(exports_1, context_1) {
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
    var core_1;
    var FilterArrPipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            // Pipe to filter top/bottom N objects in the given array based on the given order by property
            FilterArrPipe = (function () {
                function FilterArrPipe() {
                }
                FilterArrPipe.prototype.transform = function (value, prop, itemsCount, order) {
                    if (itemsCount === void 0) { itemsCount = 5; }
                    if (order === void 0) { order = 'dsc'; }
                    if (!value || value.length === 0 || !prop)
                        return [];
                    var list = value;
                    // temporary array holds objects with position and sort-value
                    var mapped = list.map(function (el, i) {
                        return { index: i, value: el[prop] };
                    });
                    // sorting the mapped array containing the reduced values
                    mapped.sort(function (a, b) {
                        return a.value - b.value;
                    });
                    // container for the resulting order
                    var inputArr = mapped.map(function (el) {
                        return list[el.index];
                    });
                    return order === 'asc' ? inputArr.slice(0, itemsCount) : inputArr.reverse().slice(0, itemsCount);
                };
                FilterArrPipe = __decorate([
                    core_1.Pipe({ name: 'fp-filter' }), 
                    __metadata('design:paramtypes', [])
                ], FilterArrPipe);
                return FilterArrPipe;
            }());
            exports_1("FilterArrPipe", FilterArrPipe);
        }
    }
});
