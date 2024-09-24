import {Component, OnInit} from '@angular/core';
import {EntradaSimples} from 'src/app/shared/models/grafico/entrada-monovalor.model';
import {GraficoBarraModel} from 'src/app/shared/models/grafico/grafico-barra.model';
import {ComplaintService} from '../../../../shared/services/complaint.service';
import {firstValueFrom} from 'rxjs';
import {DashboardModel} from '../../../../shared/models/aplicacao/dashboard.model';

@Component({
    selector: 'app-dashboard-admin',
    templateUrl: './dashboard-admin.component.html',
    styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {
    public dashboard: DashboardModel = new DashboardModel();

    public graficoBarraResolvidas: GraficoBarraModel = new GraficoBarraModel();
    public graficoBarraRespondidas: GraficoBarraModel = new GraficoBarraModel();

    constructor(
        private complaintService: ComplaintService
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
        this.dashboard = await firstValueFrom(this.complaintService.buildDashboard({isAdmin: true, coverages: []}));
    }

}
