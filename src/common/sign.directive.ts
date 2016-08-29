import { Directive, Renderer, ElementRef } from '@angular/core';

@Directive({
    selector: '[sign]'
})
export class SignDirective {
    constructor(public renderer: Renderer, public elementRef: ElementRef) { }

    ngAfterViewChecked() {
        let text = this.elementRef.nativeElement.innerHTML;
        let val = parseFloat(text.match(/[\d\.\-eE+]/g).join(""));
        if (isNaN(val) || val === 0) return;

        if (val < 0) {
            this.renderer.setElementStyle(this.elementRef.nativeElement, 'color', 'red');
        }
        else {
            this.renderer.setElementStyle(this.elementRef.nativeElement, 'color', 'green');
        }
    }

}
