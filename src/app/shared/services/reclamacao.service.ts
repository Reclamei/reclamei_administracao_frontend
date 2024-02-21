import { Injectable } from '@angular/core';
import { ReclamacaoModel } from '../models/aplicacao/reclamacao.model';
import { StatusReclamacaoEnum } from '../models/aplicacao/status-reclamacao.enum';

@Injectable({
  providedIn: 'root'
})
export class ReclamacaoService {
    private reclamacoes: ReclamacaoModel[] = this.inicializarReclamacoes();

    public obterReclamacoes(): ReclamacaoModel[] {
        return [...this.reclamacoes]
    }

    private inicializarReclamacoes(): ReclamacaoModel[] {
        return [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1].map((item: number) => this.gerarReclamacaoAleatoria());
    }

    private gerarReclamacaoAleatoria(): ReclamacaoModel {
        return new ReclamacaoModel(
            '/assets/images/representative/reclamacoes/' + ['001.png', '002.png', '003.png'][Math.round(Math.random() * 10) % 3],
            'Iluminação Pública',
            'Lâmpada queimada',
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
        return window.btoa((new Date()).toISOString() + (new Date()).toISOString() + (new Date()).toISOString());
    }
}
