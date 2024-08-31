import {Component, OnInit} from '@angular/core';
import {LocationModel} from '../../../../shared/models/aplicacao/location.model';
import {MessageService} from 'primeng/api';
import {LocationService} from '../../../../shared/services/location.service';
import {ServiceTypeModel} from '../../../../shared/models/aplicacao/service-type.model';
import {PrimengFactory} from '../../../../shared/factories/primeng.factory';
import {ErrorType} from '../../../../shared/auth/model/error-type.enum';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
    filteredLocations: LocationModel[] = [];
    private clonedLocations: { [s: number]: LocationModel } = {};

    constructor(
        private messageService: MessageService,
        private locationService: LocationService
    ) { }

    async ngOnInit(): Promise<void> {
        await this.getLocations();
    }

    addLocation() {
        this.filteredLocations.push(new LocationModel());
    }

    onRowEditInit(location: LocationModel) {
        this.clonedLocations[location.id] = { ...location };
    }

    removeLocation(location: LocationModel) {
        this.locationService.delete(location.id).subscribe({
            next: () => this.filteredLocations = this.filteredLocations.filter((val) => val.id !== location.id),
            error: (error) => PrimengFactory.mensagemErro(this.messageService, 'Erro ao remover localidade.',
                ErrorType.getMessage(error.code))
        });
    }

    onRowEditCancel(location: LocationModel, index: any) {
        this.filteredLocations[index] = this.clonedLocations[location.id];
        delete this.clonedLocations[location.id];
    }

    onRowEditSave(location: LocationModel) {
        if (!location.id) {
            this.saveLocation(() => this.locationService.create(location));
            return;
        }
        this.saveLocation(() => this.locationService.update(location));
    }

    private saveLocation(saveMethod: () => Observable<any>) {
        saveMethod().subscribe({
            next: () => this.getLocations(),
            error: (error) => PrimengFactory.mensagemErro(this.messageService, 'Erro ao salvar registro.',
                ErrorType.getMessage(error.code))
        });
    }

    private async getLocations() {
        return this.locationService.findAll().subscribe({
            next: (locations: ServiceTypeModel[]) => {
                this.filteredLocations = locations;
            },
            error: (error) => PrimengFactory.mensagemErro(this.messageService, 'Erro na obtenção dos dados',
                ErrorType.getMessage(error.code))
        });
    }
}
