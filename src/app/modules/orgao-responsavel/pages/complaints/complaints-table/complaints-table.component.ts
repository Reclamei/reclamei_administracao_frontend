import {Component, Input} from '@angular/core';
import {ComplaintModel} from 'src/app/shared/models/aplicacao/complaint-model';

@Component({
    selector: 'app-complaints-table',
    templateUrl: './complaints-table.component.html',
    styleUrls: ['./complaints-table.component.scss']
})
export class ComplaintsTableComponent {
    @Input() complaints: ComplaintModel[] = [];

    public modalLocalizacaoVisivel = false;
    public reclamacaoEmFoco: ComplaintModel | null = null;
    public centralizarMapa: Record<string, any> = {};
    public ampliacaoMapa = 15;
    public configuracaoMapa: google.maps.MapOptions = this.inicializarConfiguracaoMapa();
    public mapType = 'roadmap';

    constructor() {
    }

    public mostrarLocalizacao(reclamacao: ComplaintModel): void {
        this.reclamacaoEmFoco = reclamacao;
        this.centralizarMapa = {lat: this.gerarLocalizacaoColatina(-19.5385576), lng: this.gerarLocalizacaoColatina(-40.636211)};
        this.ampliacaoMapa = 15;
        this.modalLocalizacaoVisivel = true;
    }

    private gerarLocalizacaoColatina(base: number): number {
        return base + ((Math.random() / 100) * (Math.random() > 0.5 ? 1 : -1));
    }

    private inicializarConfiguracaoMapa(): google.maps.MapOptions {
        return {
            streetViewControl: false,
            mapTypeControl: false,
            clickableIcons: true
        };
    }
}
