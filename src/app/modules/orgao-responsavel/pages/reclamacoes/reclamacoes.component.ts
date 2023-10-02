import { Component } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { SelectItem } from "primeng/api";
import { MapsConstants } from "src/app/shared/constants/maps";
import { ReclamacaoModel } from "src/app/shared/models/aplicacao/reclamacao.model";
import { StatusReclamacaoEnum } from "src/app/shared/models/aplicacao/status-reclamacao.enum";
import { ReclamacaoService } from "src/app/shared/services/reclamacao.service";

@Component({
    selector: 'app-reclamacoes',
    templateUrl: './reclamacoes.component.html',
    styleUrls: ['./reclamacoes.component.scss']
})

export class ReclamacoesComponent {
    public reclamacoes: ReclamacaoModel[] = [];
    public reclamacoesFiltradas: ReclamacaoModel[] = [];
    public modalLocalizacaoVisivel = false;
    public reclamacaoEmFoco: ReclamacaoModel | null = null;
    public centralizarMapa: Record<string, any> = {};
    public ampliacaoMapa: number = 15;
    public configuracaoMapa: google.maps.MapOptions = this.inicializarConfiguracaoMapa();
    public opcoesFiltroReclamacoes: SelectItem<number>[] = this.inicializarOpcoesFiltroReclamacoes();
    public statusReclamacoes: number = 0;

    constructor(
        private reclamacaoService: ReclamacaoService,
        private domSanitizer: DomSanitizer
    ) {
        this.reclamacoes = this.reclamacaoService.obterReclamacoes();
        this.filtrarReclamacoes();
    }

    public mostrarLocalizacao(reclamacao: ReclamacaoModel): void {
        this.reclamacaoEmFoco = reclamacao;
        this.centralizarMapa = {lat: this.gerarLocalizacaoColatina(-19.5385576), lng: this.gerarLocalizacaoColatina(-40.636211)};
        this.ampliacaoMapa = 15;
        this.modalLocalizacaoVisivel = true;
    }

    public filtrarReclamacoes(): void {
        if(this.statusReclamacoes === 0) {
            this.reclamacoesFiltradas = [...this.reclamacoes];
        } else {
            this.reclamacoesFiltradas = this.reclamacoes.filter((reclamacao: ReclamacaoModel) => reclamacao.idStatus === this.statusReclamacoes);
        }
    }

    private gerarLocalizacaoColatina(base: number): number {
        return base + ((Math.random() / 100) * (Math.random() > 0.5 ? 1 : -1));
    }

    private inicializarConfiguracaoMapa(): google.maps.MapOptions {
        return {
            streetViewControl: false,
            mapTypeControl: false
        };
    }

    private inicializarOpcoesFiltroReclamacoes(): SelectItem<number>[] {
        return [
            { value: 0, label: 'Todas' },
            { value: StatusReclamacaoEnum.RESOLVIDO.getId(), label: StatusReclamacaoEnum.RESOLVIDO.getDescricao() },
            { value: StatusReclamacaoEnum.PENDENTE.getId(), label: StatusReclamacaoEnum.PENDENTE.getDescricao() },
            { value: StatusReclamacaoEnum.PROMESSA.getId(), label: StatusReclamacaoEnum.PROMESSA.getDescricao() },
        ];
    }
}
