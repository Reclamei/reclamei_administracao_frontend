import {Component} from '@angular/core';
import {BlockUIService} from '../../services/block-ui.service';

@Component({
    selector: 'app-global-block-ui',
    template: `
        <p-blockUI [blocked]="isBlocked | async">
            <div class="ui-blockui-content">
                <p-progressSpinner></p-progressSpinner>
                <p>Carregando...</p>
            </div>
        </p-blockUI>
    `
})
export class GlobalBlockUIComponent {
    isBlocked = this.blockUIService.isBlocked;

    constructor(private blockUIService: BlockUIService) {
    }
}
