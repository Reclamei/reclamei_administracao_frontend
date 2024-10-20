import {Component, Input} from '@angular/core';
import {ReclamationModel} from 'src/app/shared/models/aplicacao/reclamation.model';
import {Router} from '@angular/router';

@Component({
    selector: 'app-reclamations-table',
    templateUrl: './reclamations-table.component.html',
    styleUrls: ['./reclamations-table.component.scss']
})
export class ReclamationsTableComponent {
    @Input() reclamations: ReclamationModel[] = [];

    public mapVisible = false;
    public selectedReclamation: ReclamationModel | null = null;
    public mapCentering: Record<string, any> = {};
    public zoomMap = 15;
    public mapConfig: google.maps.MapOptions = this.initializeMapConfig();
    public mapType: google.maps.MapTypeId = google.maps.MapTypeId.ROADMAP;

    constructor(
        private router: Router
    ) {
    }

    public showLocation(reclamation: ReclamationModel): void {
        this.selectedReclamation = reclamation;
        this.mapCentering = {
            lat: Number(this.selectedReclamation.localization.latitude),
            lng: Number(this.selectedReclamation.localization.longitude)
        };
        this.zoomMap = 15;
        this.mapVisible = true;
    }

    edit(reclamation: ReclamationModel) {
        this.router.navigateByUrl(`painel-administrativo/reclamacoes/${reclamation.id.toString()}/edit`);
    }

    private initializeMapConfig(): google.maps.MapOptions {
        return {
            streetViewControl: false,
            mapTypeControl: false,
            clickableIcons: true
        };
    }
}
