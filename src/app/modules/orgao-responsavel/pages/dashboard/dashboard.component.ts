import {Component, OnInit} from '@angular/core';
import {EntradaSimples} from 'src/app/shared/models/grafico/entrada-monovalor.model';
import {GraficoBarraModel} from 'src/app/shared/models/grafico/grafico-barra.model';
import {ReclamationService} from '../../../../shared/services/reclamation.service';
import {CompanyFilter} from '../../../../shared/models/aplicacao/company-filter.model';
import {firstValueFrom} from 'rxjs';
import {CoverageModel} from '../../../../shared/models/aplicacao/coverage.model';
import {CachedService} from '../../../../shared/services/cached.service';
import {DashboardModel} from '../../../../shared/models/aplicacao/dashboard.model';
import {BlockUIService} from '../../../../shared/services/block-ui.service';
import {DetailedEvaluation} from '../../../../shared/models/aplicacao/detailed-evaluation.model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public dashboard: DashboardModel = new DashboardModel();

    public graficoBarraResolvidas: GraficoBarraModel = new GraficoBarraModel();
    public graficoBarraRespondidas: GraficoBarraModel = new GraficoBarraModel();
    public detailedEvaluation: DetailedEvaluation = new DetailedEvaluation();

    constructor(
        private reclamationService: ReclamationService,
        private cachedService: CachedService,
        private blockUIService: BlockUIService
    ) {
    }

    async ngOnInit() {
        await this.buildDashboard();
        this.graficoBarraResolvidas = this.inicializarGraficoResolvidas();
        this.graficoBarraRespondidas = this.inicializarGraficoRespondidas();
    }

    private inicializarGraficoResolvidas(): GraficoBarraModel {
        return new GraficoBarraModel('Percentual de Resoluções', '', [
            new EntradaSimples('Resolvidas', '#D9FDD9', '#90CD93', this.dashboard.resolvedCount),
            new EntradaSimples('Não Resolvidas', '#FF8980', '#FF5353', this.dashboard.unresolvedCount)
        ]);
    }

    private inicializarGraficoRespondidas(): GraficoBarraModel {
        return new GraficoBarraModel('Percentual de Respostas', '', [
            new EntradaSimples('Respondidas', '#FDF3DC', '#F9AE61', this.dashboard.answeredCount),
            new EntradaSimples('Não Respondidas', '#FF8980', '#FF5353', this.dashboard.unansweredCount)
        ]);
    }

    private async buildDashboard() {
        const coverages: CoverageModel[] = await this.cachedService.getCoverages();
        const filters = coverages.map(item =>
            new CompanyFilter(item.serviceType.id, item.locations.map(loc => loc.id)));


        this.blockUIService.block();
        this.dashboard = await firstValueFrom(this.reclamationService.buildDashboard({isAdmin: false, coverages: filters}));
        this.detailedEvaluation = this.dashboard.detailedEvaluation;
        this.detailedEvaluation.ratingDistribution.sort((a, b) => b.rating - a.rating);
        this.blockUIService.unblock();
    }

}
