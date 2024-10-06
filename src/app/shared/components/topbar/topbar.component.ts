import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Message, MessageService} from 'primeng/api';
import {ReclamationService} from '../../services/reclamation.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
    @Output() public aoExibirMenu: EventEmitter<void> = new EventEmitter();
    public notificacoes: Message[] = [];
    public termoPesquisa: string = '';

    constructor(
        private reclamationService: ReclamationService,
        private messageService: MessageService
    ) {
    }

    public ngOnInit(): void {
        // this.configurarRecebimentoReclamacoes();
    }

    public pesquisar(termoPesquisa: string): void {
        this.termoPesquisa = termoPesquisa;
        // TODO: Implementar
        // this.reclamationService.pesquisarReclamacoes(termoPesquisa);
    }

    // private configurarRecebimentoReclamacoes(): void {
    // this.reclamationService.observarReclamacoes().subscribe((quantidadeNovasReclamacoes: number) => {
    //     this.notificacoes.push(PrimengFactory.mensagemInformacao(this.messageService, 'Novas reclamações!',
    //     `${quantidadeNovasReclamacoes} reclamação(ões) foi(ram) recebida(s).`));
    // });
    // }
}
