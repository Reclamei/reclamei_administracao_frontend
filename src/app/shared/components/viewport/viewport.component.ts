import { Component } from '@angular/core';

@Component({
    selector: 'app-viewport',
    templateUrl: './viewport.component.html',
    styleUrls: ['./viewport.component.scss']
})
export class ViewportComponent {
    public esconderMenuMobile: boolean = true;

    constructor() { }
}
