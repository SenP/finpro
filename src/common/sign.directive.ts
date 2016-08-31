import { Directive, Renderer, ElementRef } from '@angular/core';

@Directive({
    selector: '[sign]'
})
export class SignDirective {
    constructor(public renderer: Renderer, public elementRef: ElementRef) { }

    ngAfterViewChecked() {
        let text = this.elementRef.nativeElement.innerHTML;

        this.renderer.setElementStyle(this.elementRef.nativeElement, 'color', this.getColor(text));
    }

    getColor(txt) {
        if (!txt) return 'black'; //no text

        let numarr = txt.match(/[\d\.\-eE+]/g);
        if (!numarr) return 'black'; //no numbers in text

        let val = parseFloat(numarr.join(""));
        if (isNaN(val) || val == 0) return 'black'; //not a number

        if (val < 0) {
            return 'red';
        }
        else {
            return 'green';
        }
    }
}
