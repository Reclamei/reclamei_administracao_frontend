import { EntradaModel } from "./entrada.model";

export class EntradaSimples extends EntradaModel {
    constructor(
        titulo: string,
        cor: string,
        hoverColor: string,
        public valor: number
    ) {
        super(titulo, cor, hoverColor);
    }
}
