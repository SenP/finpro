import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[sign]'
})
export class SignDirective {
    @Input() colors: string;
    @HostBinding('attr.id') textContent;
    @HostBinding('style.color') get textColor() {
        //console.log(this.textContent);
        let num = parseFloat(this.textContent);
        
        if (isNaN(num) || num === 0) { 
            return 'black';
        }

        if (num > 0) {
            return this.colors.split(',')[1];
        }
        else {
            return this.colors.split(',')[1];
        }
    }

    constructor() {
        console.log(this.textContent);
    }
}