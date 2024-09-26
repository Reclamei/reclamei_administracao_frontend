import { Injectable } from '@angular/core';
import { ReclamacaoModel } from '../models/aplicacao/reclamacao.model';
import { StatusReclamacaoEnum } from '../models/aplicacao/status-reclamacao.enum';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamacaoService {
    private reclamacoes: ReclamacaoModel[] = [];
    private assuntoReclamacoes: Subject<number> = new Subject();
    private assuntoPesquisa: Subject<string> = new BehaviorSubject('');
    private loremIpsum: string = 'Lorem ipsum ante malesuada fringilla gravida orci non bibendum vehicula eu, porta purus eu sit nec sagittis lacus nullam odio, consectetur varius lectus aptent cubilia facilisis metus urna tellus. varius adipiscing faucibus suspendisse tempor libero praesent vivamus aptent sollicitudin feugiat fermentum porta facilisis ultricies, tempus non taciti nunc quam malesuada aptent dolor placerat litora pulvinar sem magna. vel lorem augue platea pharetra sagittis integer cras per netus, lectus lacinia tincidunt phasellus nunc eros sodales hac, felis ligula aliquet himenaeos aliquam molestie habitant dui. litora etiam pellentesque fringilla hac tempus venenatis scelerisque, pulvinar fringilla sagittis porta arcu felis curabitur sagittis, aenean per cras placerat sem netus.';

    constructor() {
        this.inicializarReclamacoes();
    }

    public pesquisarReclamacoes(pesquisa: string): void {
        this.assuntoPesquisa.next(pesquisa);
    }

    public obterReclamacoes(): ReclamacaoModel[] {
        return [...this.reclamacoes];
    }

    public observarReclamacoes(): Observable<number> {
        return this.assuntoReclamacoes.asObservable();
    }

    public observarPesquisa(): Observable<string> {
        return this.assuntoPesquisa.asObservable();
    }

    private inicializarReclamacoes(): void {
        window.setInterval(() => {
            let novasReclamacoes: ReclamacaoModel[] = [];
            for(let iterador = 0; iterador < Math.ceil(Math.random() * 10); iterador++) {
                novasReclamacoes.push(this.gerarReclamacaoAleatoria());
            }
            novasReclamacoes.forEach((reclamacao: ReclamacaoModel) => this.reclamacoes.push(reclamacao));
            this.assuntoReclamacoes.next(novasReclamacoes.length);
        }, 10000);
    }

    private gerarReclamacaoAleatoria(): ReclamacaoModel {
        let categoriaEscolhida: string = ['Iluminação Pública/Lâmpada Queimada', 'Saneamento Básico/Esgoto a céu aberto', 'Controle de Zoonoses/Animais vira-latas'][(Math.round(Math.random() * 10)) % 3];
        return new ReclamacaoModel(
            '/assets/images/representative/reclamacoes/' + ['001.png', '002.png', '003.png'][Math.round(Math.random() * 10) % 3],
            categoriaEscolhida.split('/')[0],
            categoriaEscolhida.split('/')[1],
            new Date(),
            (this.gerarStringAleatoria() + this.gerarStringAleatoria()).split(/([AaMnXx])/g).join(' '),
            this.gerarStringAleatoria().split(/([AaMnXx])/g).join(' '),
            Math.random() > 0.5,
            (this.gerarStringAleatoria() + this.gerarStringAleatoria()).split(/([AaMnXx])/g).join(' '),
            [StatusReclamacaoEnum.PENDENTE, StatusReclamacaoEnum.PROMESSA, StatusReclamacaoEnum.RESOLVIDO][Math.round(Math.random() * 10) % 3].getId(),
            Math.random() > 0.5
        )
    }

    private gerarStringAleatoria(): string {
        let loremFatiado: string[] = this.loremIpsum.split(' ');
        return loremFatiado.slice(0, Math.floor(Math.random() * loremFatiado.length)).join(' ');
    }
}
