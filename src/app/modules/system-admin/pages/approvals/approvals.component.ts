import {Component} from '@angular/core';

@Component({
    selector: 'app-approvals',
    templateUrl: './approvals.component.html',
    styleUrls: ['./approvals.component.scss']
})

export class ApprovalsComponent {

    filteredApprovals = [
        {cnpj: "11.111.111/0001-00", name: "Luz e Força Santa Maria", email: "principal@gmail.com", secondaryEmail: "livia@gmail.com", createdAt: new Date().toISOString() },
    ];

    constructor(
    ) {
        this.getFilteredApprovals();
    }

    getFilteredApprovals() {
        // TODO: Preencher filteredApprovals
    }

    approve(record: any) {
        // TODO: Implementar
    }

    refuse(record: any) {
        // TODO: Implementar
    }

}
