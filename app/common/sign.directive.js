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
    var SignDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            SignDirective = (function () {
                function SignDirective() {
                    console.log(this.textContent);
                }
                Object.defineProperty(SignDirective.prototype, "textColor", {
                    get: function () {
                        //console.log(this.textContent);
                        var num = parseFloat(this.textContent);
                        if (isNaN(num) || num === 0) {
                            return 'black';
                        }
                        if (num > 0) {
                            return this.colors.split(',')[1];
                        }
                        else {
                            return this.colors.split(',')[1];
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], SignDirective.prototype, "colors", void 0);
                __decorate([
                    core_1.HostBinding('attr.id'), 
                    __metadata('design:type', Object)
                ], SignDirective.prototype, "textContent", void 0);
                __decorate([
                    core_1.HostBinding('style.color'), 
                    __metadata('design:type', Object)
                ], SignDirective.prototype, "textColor", null);
                SignDirective = __decorate([
                    core_1.Directive({
                        selector: '[sign]'
                    }), 
                    __metadata('design:paramtypes', [])
                ], SignDirective);
                return SignDirective;
            }());
            exports_1("SignDirective", SignDirective);
        }
    }
});
