import {Component} from '@angular/core';
import {LocationModel} from '../../../../shared/models/aplicacao/location.model';
import {HeadModel} from '../../../../shared/models/aplicacao/head.model';

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss']
})
export class LocationComponent {
    filteredLocations: LocationModel[] = [];
    private clonedLocations: { [s: number]: HeadModel } = {};

    constructor(
    ) { }

    addLocation() {
        this.filteredLocations.push(new LocationModel(Math.random()));
    }

    onRowEditInit(location: LocationModel) {
        this.clonedLocations[location.id] = { ...location };
    }

    removeLocation(location: LocationModel) {
        this.filteredLocations = this.filteredLocations.filter((val) => val.id !== location.id);
        // TODO: Implementar chamada backend
    }

    onRowEditSave(location: LocationModel) {
        // TODO: Implementar
    }

    onRowEditCancel(location: LocationModel, index: any) {
        this.filteredLocations[index] = this.clonedLocations[location.id];
        delete this.clonedLocations[location.id];
    }
}
