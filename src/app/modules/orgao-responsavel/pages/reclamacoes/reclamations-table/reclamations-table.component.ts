import {Component, Input, ViewChild} from '@angular/core';
import {ReclamationModel} from 'src/app/shared/models/aplicacao/reclamation.model';
import {Router} from '@angular/router';
import {MapComponent} from '../../../../../shared/components/map/map.component';
import {StatusReclamationEnum} from '../../../../../shared/models/aplicacao/status-reclamation.enum';

@Component({
    selector: 'app-reclamations-table',
    templateUrl: './reclamations-table.component.html',
    styleUrls: ['./reclamations-table.component.scss']
})
export class ReclamationsTableComponent {
    @Input() reclamations: ReclamationModel[] = [];
    @Input() showRating = false;

    @ViewChild(MapComponent) mapComponent!: MapComponent;
    protected readonly StatusReclamationEnum = StatusReclamationEnum;

    constructor(
        private router: Router
    ) {
    }

    public showLocation(reclamation: ReclamationModel): void {
        this.mapComponent.showLocation(reclamation);
    }

    edit(reclamation: ReclamationModel, editMode: boolean = true) {
        this.router.navigateByUrl(`painel-administrativo/reclamacoes/${reclamation.id.toString()}/edit`, {
            state: {editMode}
        });
    }

    isNotResolved(reclamation: ReclamationModel) {
        return ![
            StatusReclamationEnum.RESOLVED.getValue(),
            StatusReclamationEnum.REJECTED.getValue(),
            StatusReclamationEnum.UNIDENTIFIED.getValue()
        ].includes(reclamation.status);
    }
}
