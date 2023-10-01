import { Component, Input } from '@angular/core';
import { GraficoBarraModel } from '../../models/grafico/grafico-barra.model';
import { EntradaSimples } from '../../models/grafico/entrada-monovalor.model';

@Component({
    selector: 'app-grafico-barra',
    templateUrl: './grafico-barra.component.html',
    styleUrls: ['./grafico-barra.component.scss']
})
export class GraficoBarraComponent {
    @Input() public configuracaoGrafico: GraficoBarraModel;

    public calcularPorcentagem(entrada: number): number {
        // TODO: isso não é performático (pode-se detectar a mudança de dados externa e recalcular o total somente nesses momentos)
        return entrada / this.configuracaoGrafico.entradas.map((entrada: EntradaSimples) => entrada.valor).reduce(
            (valorAtual: number, valorAnterior: number) => valorAtual + valorAnterior
        );
    }

    public calcularPorcentagemTextual(valor: number): string {
        return Math.round(this.calcularPorcentagem(valor) * 10000) / 100 + '%';
    }
}
