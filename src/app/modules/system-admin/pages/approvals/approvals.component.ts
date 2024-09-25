import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {CompanyService} from '../../../../shared/services/company.service';
import {PrimengFactory} from '../../../../shared/factories/primeng.factory';
import {ErrorType} from '../../../../shared/auth/model/error-type.enum';
import {CompanyModel} from '../../../../shared/models/aplicacao/company.model';
import {AuthService} from '../../../../shared/auth/auth.service';
import {HeadService} from '../../../../shared/services/head.service';
import {BlockUIService} from '../../../../shared/services/block-ui.service';
import {firstValueFrom} from 'rxjs';

@Component({
    selector: 'app-approvals',
    templateUrl: './approvals.component.html',
    styleUrls: ['./approvals.component.scss']
})

export class ApprovalsComponent implements OnInit {
    filteredApprovals: CompanyModel[] = [];

    constructor(
        private authService: AuthService,
        private companyService: CompanyService,
        private messageService: MessageService,
        private headService: HeadService,
        private blockUIService: BlockUIService
    ) {
    }

    async ngOnInit(): Promise<void> {
        this.blockUIService.block();
        await this.getFilteredApprovals();
        this.blockUIService.unblock();
    }

    async getFilteredApprovals() {
        return this.companyService.findCompaniesPendingApproval().subscribe({
            next: (companies: CompanyModel[]) => {
                companies.forEach(company => {
                    const headAdmin = company.heads.find(head => head.isAdmin);
                    company.createdAt = headAdmin.createdAt;
                    company.secondaryEmail = headAdmin.email;
                });
                this.filteredApprovals = companies;
            },
            error: (error) => PrimengFactory.mensagemErro(this.messageService, 'Erro na obtenção dos dados',
                ErrorType.getMessage(error.code))
        });
    }

    async approve(record: CompanyModel) {
        this.blockUIService.block();
        const headAdmin = record.heads.find(head => head.isAdmin);
        const actionCodeSettings = {
            url: `http://localhost:4200/finalizar-cadastro?hash=${headAdmin.externalId}`,
            handleCodeInApp: true
        };
        await firstValueFrom(this.headService.approveUser(headAdmin.externalId));
        await this.authService
            .sendSignInLinkToEmail(headAdmin.email, actionCodeSettings)
            .catch((error) => PrimengFactory.mensagemErro(this.messageService, 'Erro no registro', ErrorType.getMessage(error.code)));
        await this.getFilteredApprovals();
        this.blockUIService.unblock();
    }

    refuse(record: CompanyModel) {
        this.blockUIService.block();
        const headAdmin = record.heads.find(head => head.isAdmin);
        this.headService.denyUser(headAdmin.externalId).subscribe({
            next: (res) => {
                this.getFilteredApprovals();
                this.blockUIService.unblock();
            },
            error: (error) => PrimengFactory.mensagemErro(this.messageService, 'Erro em recusar cadastro',
                ErrorType.getMessage(error.code))
        });
    }

}
