import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {GraficoBarraModel} from '../../models/grafico/grafico-barra.model';
import {EntradaSimples} from '../../models/grafico/entrada-monovalor.model';

@Component({
    selector: 'app-grafico-barra',
    templateUrl: './grafico-barra.component.html',
    styleUrls: ['./grafico-barra.component.scss']
})
export class GraficoBarraComponent implements OnChanges {
    @Input() public configuracaoGrafico: GraficoBarraModel;

    data: any;

    options: any;

    ngOnChanges(changes: SimpleChanges) {
        if (changes['configuracaoGrafico']) {
            this.loadGraph();
        }
    }

    loadGraph() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.data = {
            labels: this.configuracaoGrafico.entradas.map(item => item.titulo),
            datasets: [
                {
                    data: this.configuracaoGrafico.entradas.map((entrada: EntradaSimples) => entrada.valor),
                    backgroundColor: this.configuracaoGrafico.entradas.map(item => item.cor),
                    hoverBackgroundColor: this.configuracaoGrafico.entradas.map(item => item.hoverColor)
                }
            ]
        };

        this.options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
    }
}
