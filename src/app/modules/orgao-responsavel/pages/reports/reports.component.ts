import {Component, OnInit} from '@angular/core';
import {ReclamationService} from '../../../../shared/services/reclamation.service';
import {firstValueFrom} from 'rxjs';
import {CompanyFilter} from '../../../../shared/models/aplicacao/company-filter.model';
import {CachedService} from '../../../../shared/services/cached.service';
import {CoverageModel} from '../../../../shared/models/aplicacao/coverage.model';
import {ReportsModel} from '../../../../shared/models/aplicacao/reports.model';
import {MainProblemsModel} from '../../../../shared/models/aplicacao/main-problems.model';

type ItemPorcentavel<T> = { item: T, porcentagem: number };

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
    public detalheProblemasVisivel: boolean[] = [true, true];
    public mainProblems: MainProblemsModel[] = [];
    public maiorTipoProblema: ItemPorcentavel<MainProblemsModel> = null;
    public mainCitiesProblems: MainProblemsModel[] = [];
    public maiorCidade: ItemPorcentavel<MainProblemsModel> = null;
    public dadosTempoResposta: Record<string, any> = {
        labels: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
        datasets: [{
            label: 'Tempo de Resposta',
            data: [18, 0, 58, 24, 26, 34, 66],
            borderColor: '#ff9999',
            backgroundColor: '#ff999955',
        }]
    };

    public mapCentering: google.maps.LatLngLiteral = {lat: -19.551675, lng: -40.580482};
    public zoomMap: number = 8;
    public mapConfig: google.maps.MapOptions = this.initializeMapConfig();
    public mapOptions: Partial<google.maps.visualization.HeatmapLayerOptions> = {radius: 5};
    public mapData: google.maps.LatLngLiteral[] = [];

    constructor(
        private reclamationService: ReclamationService,
        private cachedService: CachedService
    ) {
        this.calcularPorcentagens();
    }

    public async ngOnInit() {
        await this.fillReports();
        this.calcularPorcentagens();
    }

    private calcularPorcentagens(): void {
        this.maiorTipoProblema = this.obterMaiorPorcentagem(this.mainProblems, (tipo: MainProblemsModel) => tipo.value);
        this.maiorCidade = this.obterMaiorPorcentagem(this.mainCitiesProblems, (cidade: MainProblemsModel) => cidade.value);
    }

    private obterMaiorPorcentagem<T>(itens: T[], obterQuantidade: (item: T) => number): ItemPorcentavel<T> {
        let total: number = 0;
        itens.forEach((item: T) => total += obterQuantidade(item));
        return itens.map((item: T) => ({
            item: item,
            porcentagem: Math.round((obterQuantidade(item) / total) * 10000) / 10000
        })).sort((a, b) => b.porcentagem - a.porcentagem)[0];
    }

    private initializeMapConfig(): google.maps.MapOptions {
        return {
            streetViewControl: false,
            mapTypeControl: false
        };
    }

    private async fillReports() {
        const coverages: CoverageModel[] = await this.cachedService.getCoverages();
        const filters = coverages.map(item => new CompanyFilter(item.serviceType.id, item.locations.map(loc => loc.id)));
        const data = await firstValueFrom(this.reclamationService.buildReports({coverages: filters}));

        this.fillHeatmap(data);
        this.fillMainProblems(data);
    }

    private fillMainProblems(data: ReportsModel): void {
        this.mainProblems = data.mainProblems;
        this.mainCitiesProblems = data.mainCitiesProblems;
    }

    private fillHeatmap(data: ReportsModel): void {
        this.mapData = data.heatmapData.map(({latitude, longitude}) => ({
            lat: Number(latitude),
            lng: Number(longitude)
        }));
        this.centerMap();
    }

    private centerMap(): void {
        const sumLat = this.mapData.reduce((sum, item) => sum + item.lat, 0);
        const averageLat = this.mapData.length ? sumLat / this.mapData.length : 0;

        const sumLng = this.mapData.reduce((sum, item) => sum + item.lng, 0);
        const averageLng = this.mapData.length ? sumLng / this.mapData.length : 0;

        this.mapCentering = {lat: averageLat, lng: averageLng};
    }

}
