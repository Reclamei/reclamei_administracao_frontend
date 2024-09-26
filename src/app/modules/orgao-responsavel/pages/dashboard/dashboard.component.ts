import { Component, OnInit } from '@angular/core';
import { ReclamacaoModel } from 'src/app/shared/models/aplicacao/reclamacao.model';
import { StatusReclamacaoEnum } from 'src/app/shared/models/aplicacao/status-reclamacao.enum';
import { EntradaSimples } from 'src/app/shared/models/grafico/entrada-monovalor.model';
import { GraficoBarraModel } from 'src/app/shared/models/grafico/grafico-barra.model';
import { ReclamacaoService } from 'src/app/shared/services/reclamacao.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public reclamacoesTotal: number = 0;
    public reclamacoesRespondidas: number = 0;
    public reclamacoesSemResposta: number = 0;
    public reclamacoesResolvidas: number = 0;
    public graficoBarraResolvidas?: GraficoBarraModel;
    public graficoBarraRespondidas?: GraficoBarraModel;

    constructor(private reclamacaoService: ReclamacaoService) {}

    public ngOnInit(): void {
        this.configurarRecebimentoReclamacoes();
        this.atualizarEstatisticas();
    }

    private atualizarEstatisticas(): void {
        let reclamacoes: ReclamacaoModel[] = this.reclamacaoService.obterReclamacoes();
        this.reclamacoesTotal = 0;
        this.reclamacoesSemResposta = 0;
        this.reclamacoesRespondidas = 0;
        this.reclamacoesResolvidas = 0;
        reclamacoes.forEach((reclamacao: ReclamacaoModel) => {
            this.reclamacoesTotal++;
            this.reclamacoesSemResposta += ([StatusReclamacaoEnum.PENDENTE.getId()].includes(reclamacao.idStatus)) ? 1 : 0;
            this.reclamacoesRespondidas += ([StatusReclamacaoEnum.PROMESSA.getId(), StatusReclamacaoEnum.RESOLVIDO.getId()].includes(reclamacao.idStatus)) ? 1 : 0;
            this.reclamacoesResolvidas += (reclamacao.idStatus == StatusReclamacaoEnum.RESOLVIDO.getId()) ? 1 : 0;
        });
        if(this.reclamacoesTotal > 0) {
            this.graficoBarraResolvidas = this.gerarGraficoResolvidas();
            this.graficoBarraRespondidas = this.gerarGraficoRespondidas();
        }
    }

    private configurarRecebimentoReclamacoes(): void {
        this.reclamacaoService.observarReclamacoes().subscribe(() => this.atualizarEstatisticas());
    }

    private gerarGraficoResolvidas(): GraficoBarraModel {
        return new GraficoBarraModel('Percentual de Resoluções', '', [
            new EntradaSimples('Resolvidas', "#D9FDD9", this.reclamacoesResolvidas),
            new EntradaSimples('Não Resolvidas', "#FF5353", (this.reclamacoesTotal - this.reclamacoesResolvidas))
        ]);
    }

    private gerarGraficoRespondidas(): GraficoBarraModel {
        return new GraficoBarraModel('Percentual de Respostas', '', [
            new EntradaSimples('Respondidas', "#FDF3DC", this.reclamacoesRespondidas),
            new EntradaSimples('Não Respondidas', "#FF5353", this.reclamacoesSemResposta)
        ]);
    }
}
