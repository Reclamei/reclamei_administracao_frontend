import {Component, OnInit} from '@angular/core';
import {ReclamationService} from '../../../../shared/services/reclamation.service';
import {firstValueFrom} from 'rxjs';
import {CompanyFilter} from '../../../../shared/models/aplicacao/company-filter.model';
import {CachedService} from '../../../../shared/services/cached.service';
import {CoverageModel} from '../../../../shared/models/aplicacao/coverage.model';
import {ReportsModel} from '../../../../shared/models/aplicacao/reports.model';
import {MainProblemsModel} from '../../../../shared/models/aplicacao/main-problems.model';
import {BlockUIService} from '../../../../shared/services/block-ui.service';

type ItemPorcentavel<T> = { item: T, percentage: number };

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
    public detailVisibleProblems: boolean[] = [true, true];
    public mainProblems: MainProblemsModel[] = [];
    public mostCommonIssueType: ItemPorcentavel<MainProblemsModel> = null;
    public mainCitiesProblems: MainProblemsModel[] = [];
    public cityWithMostIssues: ItemPorcentavel<MainProblemsModel> = null;

    public responseTimeGraph: Record<string, any> = {
        labels: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
        datasets: []
    };

    public mapCentering: google.maps.LatLngLiteral = {lat: -19.551675, lng: -40.580482};
    public zoomMap: number = 8;
    public mapConfig: google.maps.MapOptions = this.initializeMapConfig();
    public mapOptions: Partial<google.maps.visualization.HeatmapLayerOptions> = {radius: 5};
    public mapData: google.maps.LatLngLiteral[] = [];
    public groupedServiceTypes: any[] = [];
    public subtypeFilter: any;
    public rangeDatesFilter: Date[] = [];

    constructor(
        private reclamationService: ReclamationService,
        private cachedService: CachedService,
        private blockUIService: BlockUIService
    ) {
        this.calcularPorcentagens();
    }

    public async ngOnInit() {
        await this.fillReports();
        this.calcularPorcentagens();
    }

    async onFilter() {
        const coverages: CoverageModel[] = await this.cachedService.getCoverages();
        const filters: CompanyFilter[] = coverages.reduce((acc, item) => {
            const subFilters = item.serviceType.subtypes.map(sub => new CompanyFilter(sub.id, item.locations.map(loc => loc.id)));
            return acc.concat(subFilters);
        }, []);
        this.blockUIService.block();
        const data = await firstValueFrom(this.reclamationService.buildReports(
            {
                coverages: filters,
                serviceSubtypeId: this.subtypeFilter?.id,
                startDate: this.rangeDatesFilter?.length > 0 ? this.rangeDatesFilter[0] : null,
                endDate: this.rangeDatesFilter?.length > 1 ? this.rangeDatesFilter[1] : null,
            }
        ));
        this.fillHeatmap(data);
        this.blockUIService.unblock();
    }

    private calcularPorcentagens(): void {
        this.mostCommonIssueType = this.getHighestPercentage(this.mainProblems, (type: MainProblemsModel) => type.value);
        this.cityWithMostIssues = this.getHighestPercentage(this.mainCitiesProblems, (city: MainProblemsModel) => city.value);
    }

    private getHighestPercentage<T>(itens: T[], obterQuantidade: (item: T) => number): ItemPorcentavel<T> {
        let total: number = 0;
        itens.forEach((item: T) => total += obterQuantidade(item));
        return itens.map((item: T) => ({
            item: item,
            percentage: Math.round((obterQuantidade(item) / total) * 10000) / 10000
        })).sort((a, b) => b.percentage - a.percentage)[0];
    }

    private initializeMapConfig(): google.maps.MapOptions {
        return {
            streetViewControl: false,
            mapTypeControl: false
        };
    }

    private async fillReports() {
        const coverages: CoverageModel[] = await this.cachedService.getCoverages();
        const filters: CompanyFilter[] = coverages.reduce((acc, item) => {
            const subFilters = item.serviceType.subtypes.map(sub => new CompanyFilter(sub.id, item.locations.map(loc => loc.id)));
            return acc.concat(subFilters);
        }, []);
        this.groupedServiceTypes = coverages.map(item => item.serviceType);

        this.blockUIService.block();
        const data = await firstValueFrom(this.reclamationService.buildReports({coverages: filters}));

        this.fillHeatmap(data);
        this.fillMainProblems(data);
        this.fillResponseTimeGraph(data);
        this.blockUIService.unblock();
    }

    private fillMainProblems(data: ReportsModel): void {
        this.mainProblems = data.mainProblems;
        this.mainCitiesProblems = data.mainCitiesProblems;
    }

    private fillResponseTimeGraph(data: ReportsModel): void {
        const groupedData = data.responseTimeGraph.reduce((acc, item) => {
            const dayOfWeek = new Date(item.day).getDay() + 1;
            if (!acc[dayOfWeek]) {
                acc[dayOfWeek] = {totalResponseTime: 0, totalAnswered: 0, count: 0};
            }
            acc[dayOfWeek].totalResponseTime += item.averageResponseTime || 0;
            acc[dayOfWeek].totalAnswered += item.quantityAnswered || 0;
            acc[dayOfWeek].count += 1;

            return acc;
        }, {});

        const averages = [];
        const count = [];
        const labels = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

        labels.forEach((label, index) => {
            if (groupedData[index]) {
                averages.push(groupedData[index].totalResponseTime / groupedData[index].count);
                count.push(groupedData[index].totalAnswered);
            } else {
                averages.push(0); // Se não houver dados para o dia, coloca 0
                count.push(0);
            }
        });

        this.buildResponseTimeGraph(labels, averages, count);
    }

    private buildResponseTimeGraph(labels: string[], averages: number[], count: number[]): void {
        this.responseTimeGraph = {
            labels: labels,
            datasets: [
                {
                    type: 'line',
                    label: 'Tempo de Resposta (em dias)',
                    data: averages,
                    borderColor: '#a6a6a6',
                    backgroundColor: '#a6a6a6',
                },
                {
                    type: 'bar',
                    label: 'Quantidade respondida',
                    data: count,
                    backgroundColor: '#f8d444',
                }
            ]
        };
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

        this.mapCentering = averageLat === 0 && averageLng === 0 ? {lat: -19.551675, lng: -40.580482} : {lat: averageLat, lng: averageLng};
    }
}
