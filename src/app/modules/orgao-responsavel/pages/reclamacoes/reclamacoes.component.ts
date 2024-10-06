import {Component, OnInit} from '@angular/core';
import {ReclamationModel} from 'src/app/shared/models/aplicacao/reclamation.model';
import {StatusReclamationEnum} from 'src/app/shared/models/aplicacao/status-reclamation.enum';
import {ReclamationService} from 'src/app/shared/services/reclamation.service';
import {firstValueFrom} from 'rxjs';
import {CompanyFilter} from '../../../../shared/models/aplicacao/company-filter.model';
import {CoverageModel} from '../../../../shared/models/aplicacao/coverage.model';
import {CompanyModel} from '../../../../shared/models/aplicacao/company.model';
import {CachedService} from '../../../../shared/services/cached.service';
import {BlockUIService} from '../../../../shared/services/block-ui.service';

@Component({
    selector: 'app-reclamacoes',
    templateUrl: './reclamacoes.component.html',
    styleUrls: ['./reclamacoes.component.scss']
})

export class ReclamacoesComponent implements OnInit {
    public coverages: CoverageModel[] = [];
    public company: CompanyModel;
    public reclamations: ReclamationModel[] = [];

    public filteredReclamations: ReclamationModel[] = [];

    constructor(
        private reclamacaoService: ReclamationService,
        private cachedService: CachedService,
        private blockUIService: BlockUIService,
    ) {
    }

    async ngOnInit() {
        await this.getCompanyByExternalId();
        await this.loadCoverages();
        await this.loadReclamations();
    }

    public filterReclamations(index: number): void {
        switch (index) {
            case 0:
                this.filteredReclamations = [...this.reclamations];
                break;
            case 1:
                this.filteredReclamations = this.reclamations.filter(rec => rec.status === StatusReclamationEnum.OPEN.getId());
                break;
            case 2:
                this.filteredReclamations = this.reclamations.filter(rec => rec.status !== StatusReclamationEnum.OPEN.getId());
                break;
        }
    }

    private async loadCoverages() {
        this.coverages = await this.cachedService.getCoverages();
    }

    private async getCompanyByExternalId() {
        this.company = await this.cachedService.getCompany();
    }

    private async loadReclamations() {
        const filters = this.coverages.map(item =>
            new CompanyFilter(item.serviceType.id, item.locations.map(loc => loc.id)));
        this.blockUIService.block();
        this.reclamations = await firstValueFrom(this.reclamacaoService.findByCompany(filters));
        // TODO: Remover
        this.reclamations.forEach(item => item.photo = '/assets/images/representative/reclamacoes/' +
            ['001.png', '002.png', '003.png'][Math.round(Math.random() * 10) % 3]);
        this.blockUIService.unblock();
    }
}
