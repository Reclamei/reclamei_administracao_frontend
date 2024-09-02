import {Component, OnInit} from '@angular/core';
import {CoverageService} from '../../../../shared/services/coverage.service';
import {CoverageModel} from '../../../../shared/models/aplicacao/coverage.model';
import {CompanyModel} from '../../../../shared/models/aplicacao/company.model';
import {ServiceTypeModel} from '../../../../shared/models/aplicacao/service-type.model';
import {CompanyService} from '../../../../shared/services/company.service';
import {ServiceTypesService} from '../../../../shared/services/service-types.service';
import {LocationModel} from '../../../../shared/models/aplicacao/location.model';
import {LocationService} from '../../../../shared/services/location.service';
import {Observable} from 'rxjs';
import {PrimengFactory} from '../../../../shared/factories/primeng.factory';
import {ErrorType} from '../../../../shared/auth/model/error-type.enum';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-coverages',
    templateUrl: './coverages.component.html',
    styleUrls: ['./coverages.component.scss']
})
export class CoveragesComponent implements OnInit {
    coverages: CoverageModel[] = [];

    coverage: CoverageModel = new CoverageModel();

    companies: CompanyModel[] = [];
    serviceTypes: ServiceTypeModel[] = [];
    locations: LocationModel[] = [];

    constructor(
        private coverageService: CoverageService,
        private companyService: CompanyService,
        private serviceTypesService: ServiceTypesService,
        private locationService: LocationService,
        private messageService: MessageService,
    ) { }

    async ngOnInit() {
        await this.loadCoverages();
        await this.loadCompanies();
        await this.loadServiceTypes();
        await this.loadLocations();
    }

    async apply() {
        this.saveCoverages(() => this.coverageService.create(this.coverage));
    }

    selectLocations() {
        if (!this.coverage.company?.id || !this.coverage.serviceType?.id) {
            return;
        }
        this.coverageService.findById(this.coverage.serviceType.id, this.coverage.company.id)
            .subscribe({
                next: (coverage: CoverageModel) => this.coverage.locations = coverage.locations,
                error: (error) => PrimengFactory.mensagemErro(this.messageService, 'Erro ao salvar registro.',
                    ErrorType.getMessage(error.code))
            });
    }

    private saveCoverages(saveMethod: () => Observable<any>) {
        return saveMethod().subscribe({
            next: () => {
                this.coverage = new CoverageModel();
                this.loadCoverages();
            },
            error: (error) => PrimengFactory.mensagemErro(this.messageService, 'Erro ao salvar registro.',
                ErrorType.getMessage(error.code))
        });
    }

    private async loadCoverages() {
        return this.coverageService.findAll().subscribe(data => this.coverages = data);
    }

    private async loadCompanies() {
        return this.companyService.findAll().subscribe(data => this.companies = data);
    }

    private async loadServiceTypes() {
        return this.serviceTypesService.findAll().subscribe(data => this.serviceTypes = data);
    }

    private async loadLocations() {
        return this.locationService.findAll().subscribe(data => this.locations = data);
    }
}
