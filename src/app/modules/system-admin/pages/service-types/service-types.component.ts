import {Component} from '@angular/core';
import {ServiceTypeModel} from '../../../../shared/models/aplicacao/service-type.model';
import {ServiceSubtypeModel} from '../../../../shared/models/aplicacao/service-subtype.model';
import {HeadModel} from '../../../../shared/models/aplicacao/head.model';

@Component({
    selector: 'app-service-types',
    templateUrl: './service-types.component.html',
    styleUrls: ['./service-types.component.scss']
})
export class ServiceTypesComponent {
    filteredServiceTypes: ServiceTypeModel[] = [];
    visible: boolean = false;
    serviceTypeSelected: ServiceTypeModel = new ServiceTypeModel();
    private clonedSubtypes: { [s: number]: HeadModel } = {};
    private clonedServicesType: { [s: number]: HeadModel } = {};

    constructor(
    ) { }

    addServiceType() {
        this.filteredServiceTypes.push(new ServiceTypeModel(Math.random()));
        // TODO: Implementar
    }

    onRowEditInit(serviceType: ServiceTypeModel) {
        this.clonedServicesType[serviceType.id] = { ...serviceType };
    }

    removeServiceType(serviceType: ServiceTypeModel) {
        this.filteredServiceTypes = this.filteredServiceTypes.filter((val) => val.id !== serviceType.id);
        // TODO: Implementar chamada backend
    }

    onRowEditSave(serviceType: ServiceTypeModel) {
        // TODO: Implementar
    }

    onRowEditCancel(serviceType: ServiceTypeModel, index: number) {
        this.filteredServiceTypes[index] = this.clonedServicesType[serviceType.id];
        delete this.clonedServicesType[serviceType.id];
    }

    openSubtypesDialog(serviceType: ServiceTypeModel) {
        this.serviceTypeSelected = serviceType;
        this.visible = true;
    }

    addSubType() {
        this.serviceTypeSelected.serviceSubtypes.push(new ServiceSubtypeModel(Math.random()));
    }

    removeSubtype(subtype: ServiceSubtypeModel) {
        this.serviceTypeSelected.serviceSubtypes = this.serviceTypeSelected.serviceSubtypes.filter((val) => val.id !== subtype.id);
        // TODO: Implementar chamada backend
    }

    onRowSubtypeEditSave(subtype: ServiceSubtypeModel) {
        // TODO: Implementar
    }

    onRowSubtypeEditCancel(subtype: ServiceSubtypeModel, index: number) {
        this.serviceTypeSelected.serviceSubtypes[index] = this.clonedSubtypes[subtype.id];
        delete this.clonedSubtypes[subtype.id];
    }

    onRowSubtypeEditInit(subtype: ServiceSubtypeModel) {
        this.clonedSubtypes[subtype.id] = { ...subtype };
    }
}
