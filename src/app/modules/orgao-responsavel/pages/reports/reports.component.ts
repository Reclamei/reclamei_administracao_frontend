import {Component, OnInit} from '@angular/core';
import {CidadeModel} from 'src/app/shared/models/aplicacao/cidade.model';
import {TipoProblemaModel} from 'src/app/shared/models/aplicacao/tipo-problema.model';
import {ReclamationService} from '../../../../shared/services/reclamation.service';
import {firstValueFrom} from 'rxjs';
import {CompanyFilter} from '../../../../shared/models/aplicacao/company-filter.model';
import {CachedService} from '../../../../shared/services/cached.service';
import {CoverageModel} from '../../../../shared/models/aplicacao/coverage.model';

type ItemPorcentavel<T> = { item: T, porcentagem: number };

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
    public detalheProblemasVisivel: boolean[] = [true, true];
    public tiposProblema: TipoProblemaModel[] = [
        new TipoProblemaModel('Mal funcionamento do equipamento', 263),
        new TipoProblemaModel('Produto com defeito', 214),
        new TipoProblemaModel('Produto quebrou com pouco tempo de uso', 93),
        new TipoProblemaModel('Outro problema', 68),
        new TipoProblemaModel('Não liga', 30),
    ];
    public maiorTipoProblema: ItemPorcentavel<TipoProblemaModel> = null;
    public cidades: CidadeModel[] = [
        new CidadeModel('Colatina', 259),
        new CidadeModel('Linhares', 105),
        new CidadeModel('Vitória', 29),
        new CidadeModel('São Mateus', 2)
    ];
    public maiorCidade: ItemPorcentavel<CidadeModel> = null;
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
        await this.fillHeatmap();
        this.calcularPorcentagens();
    }

    private calcularPorcentagens(): void {
        this.maiorTipoProblema = this.obterMaiorPorcentagem(this.tiposProblema, (tipo: TipoProblemaModel) => tipo.quantidadeReclamacoes);
        this.maiorCidade = this.obterMaiorPorcentagem(this.cidades, (cidade: CidadeModel) => cidade.quantidadeReclamacoes);
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

    private async fillHeatmap() {
        const coverages: CoverageModel[] = await this.cachedService.getCoverages();
        const filters = coverages.map(item => new CompanyFilter(item.serviceType.id, item.locations.map(loc => loc.id)));
        const data = await firstValueFrom(this.reclamationService.buildReports({coverages: filters}));

        this.mapData = data.heatmapData.map(({latitude, longitude}) => ({
            lat: Number(latitude),
            lng: Number(longitude)
        }));
        this.centerMap();
    }

    private centerMap() {
        const sumLat = this.mapData.reduce((sum, item) => sum + item.lat, 0);
        const averageLat = this.mapData.length ? sumLat / this.mapData.length : 0;

        const sumLng = this.mapData.reduce((sum, item) => sum + item.lng, 0);
        const averageLng = this.mapData.length ? sumLng / this.mapData.length : 0;

        this.mapCentering = {lat: averageLat, lng: averageLng};
    }

}
