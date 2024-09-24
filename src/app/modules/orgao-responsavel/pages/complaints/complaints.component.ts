import {Component, OnInit} from '@angular/core';
import {ComplaintModel} from 'src/app/shared/models/aplicacao/complaint-model';
import {StatusComplaintsEnum} from 'src/app/shared/models/aplicacao/status-complaints.enum';
import {ComplaintService} from 'src/app/shared/services/complaint.service';
import {firstValueFrom} from 'rxjs';
import {CompanyFilter} from '../../../../shared/models/aplicacao/company-filter.model';
import {CoverageModel} from '../../../../shared/models/aplicacao/coverage.model';
import {CompanyModel} from '../../../../shared/models/aplicacao/company.model';
import {CachedService} from '../../../../shared/services/cached.service';

@Component({
    selector: 'app-complaints',
    templateUrl: './complaints.component.html',
    styleUrls: ['./complaints.component.scss']
})

export class ComplaintsComponent implements OnInit {
    public coverages: CoverageModel[] = [];
    public company: CompanyModel;
    public complaints: ComplaintModel[] = [];

    public filteredComplaints: ComplaintModel[] = [];

    constructor(
        private complaintService: ComplaintService,
        private cachedService: CachedService,
    ) {
    }

    async ngOnInit() {
        await this.getCompanyByExternalId();
        await this.loadCoverages();
        await this.loadComplaints();
    }

    public filterComplaints(index: number): void {
        switch (index) {
            case 0:
                this.filteredComplaints = [...this.complaints];
                break;
            case 1:
                this.filteredComplaints = this.complaints.filter(rec => rec.status === StatusComplaintsEnum.OPEN.getId());
                break;
            case 2:
                this.filteredComplaints = this.complaints.filter(rec => rec.status !== StatusComplaintsEnum.OPEN.getId());
                break;
        }
    }

    private async loadCoverages() {
        this.coverages = await this.cachedService.getCoverages();
    }

    private async getCompanyByExternalId() {
        this.company = await this.cachedService.getCompany();
    }

    private async loadComplaints() {
        const filters = this.coverages.map(item =>
            new CompanyFilter(item.serviceType.id, item.locations.map(loc => loc.id)));
        this.complaints = await firstValueFrom(this.complaintService.findByCompany(filters));
        // TODO: Remover
        this.complaints.forEach(item => item.photo = '/assets/images/representative/reclamacoes/' +
            ['001.png', '002.png', '003.png'][Math.round(Math.random() * 10) % 3]);
    }
}
