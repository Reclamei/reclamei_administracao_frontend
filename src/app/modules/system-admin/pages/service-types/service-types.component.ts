import {Component, OnInit} from '@angular/core';
import {ServiceTypeModel} from '../../../../shared/models/aplicacao/service-type.model';
import {ServiceSubtypeModel} from '../../../../shared/models/aplicacao/service-subtype.model';
import {HeadModel} from '../../../../shared/models/aplicacao/head.model';
import {PrimengFactory} from '../../../../shared/factories/primeng.factory';
import {ErrorType} from '../../../../shared/auth/model/error-type.enum';
import {MessageService} from 'primeng/api';
import {ServiceTypesService} from '../../../../shared/services/service-types.service';

@Component({
    selector: 'app-service-types',
    templateUrl: './service-types.component.html',
    styleUrls: ['./service-types.component.scss']
})
export class ServiceTypesComponent implements OnInit {
    filteredServiceTypes: ServiceTypeModel[] = [];
    visible: boolean = false;
    serviceTypeSelected: ServiceTypeModel = new ServiceTypeModel();
    filteredSubtypes: ServiceSubtypeModel[] = [];
    private clonedSubtypes: { [s: number]: HeadModel } = {};
    private clonedServicesType: { [s: number]: HeadModel } = {};

    constructor(
        private serviceTypesService: ServiceTypesService,
        private messageService: MessageService,
    ) { }

    async ngOnInit(): Promise<void> {
        await this.getServiceTypes();
    }

    addServiceType() {
        this.filteredServiceTypes.push(new ServiceTypeModel());
    }

    onRowEditInit(serviceType: ServiceTypeModel) {
        this.clonedServicesType[serviceType.id] = { ...serviceType };
    }

    removeServiceType(serviceType: ServiceTypeModel) {
        this.serviceTypesService.delete(serviceType.id).subscribe({
            next: () => this.filteredServiceTypes = this.filteredServiceTypes.filter((val) => val.id !== serviceType.id),
            error: (error) => PrimengFactory.mensagemErro(this.messageService, 'Erro ao remover tipo de serviço.',
                ErrorType.getMessage(error.code))
        });
    }

    onRowEditSave(serviceType: ServiceTypeModel) {
        if (!serviceType.id) {
            this.createServiceType(serviceType);
            return;
        }
        this.updateServiceType(serviceType);
    }

    onRowEditCancel(serviceType: ServiceTypeModel, index: number) {
        this.filteredServiceTypes[index] = this.clonedServicesType[serviceType.id];
        delete this.clonedServicesType[serviceType.id];
    }

    openSubtypesDialog(serviceType: ServiceTypeModel) {
        this.serviceTypeSelected = serviceType;
        this.filteredSubtypes = this.serviceTypeSelected.subtypes;
        this.visible = true;
    }

    addSubType() {
        this.serviceTypeSelected.subtypes.push(new ServiceSubtypeModel());
    }

    async removeSubtype(subtype: ServiceSubtypeModel) {
        this.serviceTypeSelected.subtypes = this.serviceTypeSelected.subtypes.filter((val) => val.id !== subtype.id);
        this.serviceTypeSelected.subtypes = this.serviceTypeSelected.subtypes.filter(item => !!item.name && !!item.description);

        if (this.serviceTypeSelected.subtypes !== this.filteredSubtypes) {
            await this.updateServiceType(this.serviceTypeSelected);
            await this.getServiceTypes();
        }
    }

    onRowSubtypeEditCancel(subtype: ServiceSubtypeModel, index: number) {
        this.serviceTypeSelected.subtypes[index] = this.clonedSubtypes[subtype.id];
        delete this.clonedSubtypes[subtype.id];
    }

    onRowSubtypeEditInit(subtype: ServiceSubtypeModel) {
        this.clonedSubtypes[subtype.id] = { ...subtype };
    }

    private createServiceType(serviceType: ServiceTypeModel) {
        this.serviceTypesService.create(serviceType).subscribe({
            next: () => this.getServiceTypes(),
            error: (error) => PrimengFactory.mensagemErro(this.messageService, 'Erro ao salvar registro.',
                ErrorType.getMessage(error.code))
        });
    }

    private async updateServiceType(serviceType: ServiceTypeModel) {
        return this.serviceTypesService.update(serviceType).subscribe({
            next: () => this.getServiceTypes(),
            error: (error) => PrimengFactory.mensagemErro(this.messageService, 'Erro ao salvar registro.',
                ErrorType.getMessage(error.code))
        });
    }

    private async getServiceTypes() {
        return this.serviceTypesService.findAll().subscribe({
            next: (serviceTypes: ServiceTypeModel[]) => {
                serviceTypes.forEach(type =>  type.subtypesString = type.subtypes.map(item => item.name).join(', \n'));
                this.filteredServiceTypes = serviceTypes;
            },
            error: (error) => PrimengFactory.mensagemErro(this.messageService, 'Erro na obtenção dos dados',
                ErrorType.getMessage(error.code))
        });
    }

    async saveSubtypes() {
        this.serviceTypeSelected.subtypes = this.serviceTypeSelected.subtypes.filter(item => !!item.name && !!item.description);

        if (this.serviceTypeSelected.subtypes !== this.filteredSubtypes) {
            await this.updateServiceType(this.serviceTypeSelected);
            await this.getServiceTypes();
        }
        this.visible = false;
    }

    cancelDialogSubtypes() {
        this.filteredSubtypes = [];
        this.visible = false;
    }
}
