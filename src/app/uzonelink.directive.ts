import { Directive, ElementRef, HostListener, Input, Inject } from '@angular/core';
function getWindow (): any {
    return window;
}

@Directive({ selector: '[uzonelink]' })
export class OpenLinkInNewWindowDirective {
    @Input('routerLink') link: string;
    @Input('disable') newtabs: boolean = false;
    constructor(private el: ElementRef) {}

    @HostListener('mousedown') onMouseEnter() {
        getWindow().open(this.link || '');
        return false;
    }
}
