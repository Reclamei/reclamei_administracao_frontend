import { Component } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { MapsConstants } from "src/app/shared/constants/maps";
import { ReclamacaoModel } from "src/app/shared/models/aplicacao/reclamacao.model";
import { ReclamacaoService } from "src/app/shared/services/reclamacao.service";

@Component({
    selector: 'app-reclamacoes',
    templateUrl: './reclamacoes.component.html',
    styleUrls: ['./reclamacoes.component.scss']
})

export class ReclamacoesComponent {
    public reclamacoes: ReclamacaoModel[] = [];
    public modalLocalizacaoVisivel = false;
    public reclamacaoEmFoco: ReclamacaoModel | null = null;
    public urlAsseguradaMaps: SafeResourceUrl | null = null;

    constructor(
        private reclamacaoService: ReclamacaoService,
        private domSanitizer: DomSanitizer
    ) {
        this.reclamacoes = this.reclamacaoService.obterReclamacoes();
    }

    public mostrarLocalizacao(reclamacao: ReclamacaoModel): void {
        this.reclamacaoEmFoco = reclamacao;
        this.urlAsseguradaMaps = this.domSanitizer.bypassSecurityTrustResourceUrl(`https://www.google.com/maps/embed/v1/view?key=${MapsConstants.CHAVE_API}&center=${this.gerarLocalizacaoColatina(-19.5385576)},${this.gerarLocalizacaoColatina(-40.636211)}&zoom=18`);
        this.modalLocalizacaoVisivel = true;
    }

    private gerarLocalizacaoColatina(base: number): number {
        return base + ((Math.random() / 100) * (Math.random() > 0.5 ? 1 : -1));
    }
}
