import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {CompanyService} from '../../../../shared/services/company.service';
import {PrimengFactory} from '../../../../shared/factories/primeng.factory';
import {ErrorType} from '../../../../shared/auth/model/error-type.enum';
import {CompanyModel} from '../../../../shared/models/aplicacao/company.model';

@Component({
    selector: 'app-approvals',
    templateUrl: './approvals.component.html',
    styleUrls: ['./approvals.component.scss']
})

export class ApprovalsComponent implements OnInit {
    filteredApprovals: CompanyModel[] = [];

    filteredApprovals1 = [
        {cnpj: "11.111.111/0001-00", name: "Luz e Força Santa Maria", email: "principal@gmail.com", secondaryEmail: "livia@gmail.com", createdAt: new Date().toISOString() },
    ];

    constructor(
        private companyService: CompanyService,
        private messageService: MessageService,
    ) { }

    async ngOnInit(): Promise<void> {
        await this.getFilteredApprovals();
    }

    async getFilteredApprovals() {
        return this.companyService.findCompaniesPendingApproval().subscribe({
            next: (companies: CompanyModel[]) => {
                companies.forEach(companie => companie.createdAt = companie.heads.find(head => head.isAdmin).createdAt);
                this.filteredApprovals = companies;
            },
            error: (error) => PrimengFactory.mensagemErro(this.messageService, 'Erro na obtenção dos dados',
                ErrorType.getMessage(error.code))
        });
    }

    approve(record: any) {
        // TODO: Implementar: enviar email para o head
    }

    refuse(record: any) {
        // TODO: Implementar: chamar endpoint de deny
    }

}
