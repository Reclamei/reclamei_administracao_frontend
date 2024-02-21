import { EntradaSimples } from "./entrada-monovalor.model";
import { GraficoModel } from "./grafico.model";

export class GraficoBarraModel extends GraficoModel {
    constructor(
        titulo: string = '',
        subtitulo: string = '',
        public entradas: EntradaSimples[] = []
    ) {
        super(titulo, subtitulo);
    }
}
