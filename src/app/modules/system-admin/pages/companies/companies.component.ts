import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {PrimengFactory} from '../../../../shared/factories/primeng.factory';
import {ErrorType} from '../../../../shared/auth/model/error-type.enum';
import {Observable} from 'rxjs';
import {ServiceTypeModel} from '../../../../shared/models/aplicacao/service-type.model';
import {CompanyModel} from '../../../../shared/models/aplicacao/company.model';
import {CompanyService} from '../../../../shared/services/company.service';

@Component({
    selector: 'app-companies',
    templateUrl: './companies.component.html',
    styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
    filteredCompanies: CompanyModel[] = [];
    private clonedCompanies: { [s: number]: CompanyModel } = {};

    constructor(
        private messageService: MessageService,
        private companyService: CompanyService
    ) { }

    async ngOnInit(): Promise<void> {
        await this.getCompanies();
    }

    addCompany() {
        this.filteredCompanies.push(new CompanyModel());
    }

    onRowEditInit(company: CompanyModel) {
        this.clonedCompanies[company.id] = { ...company };
    }

    removeCompany(company: CompanyModel) {
        this.companyService.delete(company.id).subscribe({
            next: () => this.filteredCompanies = this.filteredCompanies.filter((val) => val.id !== company.id),
            error: (error) => PrimengFactory.mensagemErro(this.messageService, 'Erro ao remover localidade.',
                ErrorType.getMessage(error.code))
        });
    }

    onRowEditCancel(company: CompanyModel, index: any) {
        this.filteredCompanies[index] = this.clonedCompanies[company.id];
        delete this.clonedCompanies[company.id];
    }

    onRowEditSave(company: CompanyModel) {
        if (!company.id) {
            this.saveLocation(() => this.companyService.create(company));
            return;
        }
        this.saveLocation(() => this.companyService.update(company));
    }

    private saveLocation(saveMethod: () => Observable<any>) {
        saveMethod().subscribe({
            next: () => this.getCompanies(),
            error: (error) => PrimengFactory.mensagemErro(this.messageService, 'Erro ao salvar registro.',
                ErrorType.getMessage(error.code))
        });
    }

    private async getCompanies() {
        return this.companyService.findAll().subscribe({
            next: (locations: ServiceTypeModel[]) => {
                this.filteredCompanies = locations;
            },
            error: (error) => PrimengFactory.mensagemErro(this.messageService, 'Erro na obtenção dos dados',
                ErrorType.getMessage(error.code))
        });
    }
}
