import { Component, EventEmitter, Output } from '@angular/core';
import { ReclamacaoService } from '../../services/reclamacao.service';
import { PrimengFactory } from '../../factories/primeng.factory';
import { Message, MessageService } from 'primeng/api';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
    @Output() public aoExibirMenu: EventEmitter<void> = new EventEmitter();
    public notificacoes: Message[] = [];
    public termoPesquisa: string = '';

    constructor(
        private reclamacaoService: ReclamacaoService,
        private messageService: MessageService
    ) {}

    public ngOnInit(): void {
        this.configurarRecebimentoReclamacoes();
    }

    public pesquisar(termoPesquisa: string): void {
        this.termoPesquisa = termoPesquisa;
        this.reclamacaoService.pesquisarReclamacoes(termoPesquisa);
    }

    private configurarRecebimentoReclamacoes(): void {
        this.reclamacaoService.observarReclamacoes().subscribe((quantidadeNovasReclamacoes: number) => {
            this.notificacoes.push(PrimengFactory.mensagemInformacao(this.messageService, 'Novas reclamações!', `${quantidadeNovasReclamacoes} reclamação(ões) foi(ram) recebida(s).`));
        });
    }
}
