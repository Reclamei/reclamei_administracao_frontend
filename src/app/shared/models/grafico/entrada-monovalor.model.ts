import { EntradaModel } from "./entrada.model";

export class EntradaSimples extends EntradaModel {
    constructor(
        titulo: string,
        cor: string,
        public valor: number
    ) {
        super(titulo, cor);
    }
}
