import { Component, OnInit } from '@angular/core';
import { EntradaSimples } from 'src/app/shared/models/grafico/entrada-monovalor.model';
import { GraficoBarraModel } from 'src/app/shared/models/grafico/grafico-barra.model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    public reclamacoesTotal: number = 243;
    public reclamacoesRespondidas: number = 13;
    public reclamacoesSemResposta: number = 227;
    public reclamacoesResolvidas: number = 3;
    public graficoBarraResolvidas: GraficoBarraModel = this.inicializarGraficoResolvidas();
    public graficoBarraRespondidas: GraficoBarraModel = this.inicializarGraficoRespondidas();

    constructor() {}

    private inicializarGraficoResolvidas(): GraficoBarraModel {
        return new GraficoBarraModel('Percentual de Resoluções', '', [
            new EntradaSimples('Resolvidas', "#D9FDD9", this.reclamacoesResolvidas),
            new EntradaSimples('Não Resolvidas', "#FF5353", (this.reclamacoesTotal - this.reclamacoesResolvidas))
        ]);
    }

    private inicializarGraficoRespondidas(): GraficoBarraModel {
        return new GraficoBarraModel('Percentual de Respostas', '', [
            new EntradaSimples('Respondidas', "#FDF3DC", this.reclamacoesRespondidas),
            new EntradaSimples('Não Respondidas', "#FF5353", (this.reclamacoesTotal - (this.reclamacoesResolvidas + this.reclamacoesRespondidas)))
        ]);
    }
}
