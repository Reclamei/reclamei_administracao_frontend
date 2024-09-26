import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MessageService, SelectItem } from "primeng/api";
import { PrimengFactory } from "src/app/shared/factories/primeng.factory";
import { ReclamacaoModel } from "src/app/shared/models/aplicacao/reclamacao.model";
import { StatusReclamacaoEnum } from "src/app/shared/models/aplicacao/status-reclamacao.enum";
import { ReclamacaoService } from "src/app/shared/services/reclamacao.service";

@Component({
    selector: 'app-reclamacoes',
    templateUrl: './reclamacoes.component.html',
    styleUrls: ['./reclamacoes.component.scss']
})

export class ReclamacoesComponent implements OnInit {
    public reclamacoes: ReclamacaoModel[] = [];
    public reclamacoesFiltradas: ReclamacaoModel[] = [];
    public modalLocalizacaoVisivel = false;
    public reclamacaoEmFoco: ReclamacaoModel | null = null;
    public reclamacaoEmEdicao: ReclamacaoModel | null = null;
    public centralizarMapa: google.maps.LatLngLiteral = {lat:0,lng:0};
    public ampliacaoMapa: number = 15;
    public configuracaoMapa: google.maps.MapOptions = this.inicializarConfiguracaoMapa();
    public opcoesFiltroReclamacoes: SelectItem<number>[] = [{ value: 0, label: 'Todas' }, ...this.inicializarOpcoesStatusReclamacao()];
    public opcoesStatusReclamacoes: SelectItem<number>[] = this.inicializarOpcoesStatusReclamacao();
    public opcoesSimNao: SelectItem<boolean>[] = this.inicializarOpcoesOrgaoResponsavel();
    public statusReclamacoes: number = 0;
    public termoPesquisa: string = '';

    constructor(
        private reclamacaoService: ReclamacaoService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    public ngOnInit(): void {
        this.obterReclamacoes();
        this.observarReclamacoes();
        this.observarPesquisa();
    }

    public mostrarLocalizacao(reclamacao: ReclamacaoModel): void {
        this.reclamacaoEmFoco = reclamacao;
        this.centralizarMapa = {lat: this.gerarLocalizacaoColatina(-19.5385576), lng: this.gerarLocalizacaoColatina(-40.636211)};
        this.ampliacaoMapa = 3;
        this.modalLocalizacaoVisivel = true;
    }

    public editarReclamacao(reclamacao: ReclamacaoModel): void {
        this.reclamacaoEmEdicao = {...reclamacao};
    }

    public filtrarReclamacoes(): void {
        this.reclamacoesFiltradas = [...this.reclamacoes];
        if(this.statusReclamacoes !== 0) {
            this.reclamacoesFiltradas = this.reclamacoesFiltradas.filter((reclamacao: ReclamacaoModel) => reclamacao.idStatus === this.statusReclamacoes);
        }
        if(this.termoPesquisa) {
            this.reclamacoesFiltradas = this.reclamacoesFiltradas.filter((reclamacao: ReclamacaoModel) => JSON.stringify(reclamacao).toLocaleLowerCase().includes(this.termoPesquisa.toLocaleLowerCase()));
        }
    }

    public salvar(reclamacao: ReclamacaoModel): void {
        PrimengFactory.mensagemSucesso(this.messageService, 'Dados salvos!', 'Reclamação ' + reclamacao.tipo + ' : ' + reclamacao.subtipo + ' atualizada com sucesso.');
        this.reclamacaoEmEdicao = null;
    }

    public confirmarCancelamentoEdicao(): void {
        this.confirmationService.confirm({
            header: 'Atenção!',
            message: 'Voltar agora descartará quaisquer edições não salvas, deseja prosseguir?',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => this.reclamacaoEmEdicao = null,
            reject: () => {}
        });
    }

    private obterReclamacoes(): void {
        this.reclamacoes = this.reclamacaoService.obterReclamacoes();
        this.filtrarReclamacoes();
    }

    private observarReclamacoes(): void {
        this.reclamacaoService.observarReclamacoes().subscribe(() => this.obterReclamacoes());
    }

    private observarPesquisa(): void {
        this.reclamacaoService.observarPesquisa().subscribe((termoPesquisa: string) => {
            this.termoPesquisa = termoPesquisa;
            this.filtrarReclamacoes();
        });
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

    private inicializarOpcoesStatusReclamacao(): SelectItem<number>[] {
        return [
            { value: StatusReclamacaoEnum.RESOLVIDO.getId(), label: StatusReclamacaoEnum.RESOLVIDO.getDescricao() },
            { value: StatusReclamacaoEnum.PENDENTE.getId(), label: StatusReclamacaoEnum.PENDENTE.getDescricao() },
            { value: StatusReclamacaoEnum.PROMESSA.getId(), label: StatusReclamacaoEnum.PROMESSA.getDescricao() }
        ];
    }

    private inicializarOpcoesOrgaoResponsavel(): SelectItem<boolean>[] {
        return [
            { value: true, label: 'Sim' },
            { value: false, label: 'Não' }
        ]
    }
}
